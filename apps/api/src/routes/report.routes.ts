import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Export transactions to CSV
router.get('/export/csv', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const { startDate, endDate } = req.query;

        const where: any = { userId };

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date.gte = new Date(startDate as string);
            if (endDate) where.date.lte = new Date(endDate as string);
        }

        const transactions = await prisma.transaction.findMany({
            where,
            orderBy: { date: 'desc' },
        });

        // Generate CSV
        const headers = ['Date', 'Category', 'Amount', 'Type', 'Note'];
        const rows = transactions.map(t => [
            new Date(t.date).toISOString().split('T')[0],
            t.category,
            Math.abs(t.amount).toFixed(2),
            t.amount > 0 ? 'Income' : 'Expense',
            t.note || '',
        ]);

        const csv = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
        ].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');
        res.send(csv);
    } catch (error) {
        next(error);
    }
});

// Get monthly report
router.get('/report/monthly', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const month = req.query.month as string || new Date().toISOString().slice(0, 7);

        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            orderBy: { date: 'desc' },
        });

        const budgets = await prisma.budget.findMany({
            where: {
                userId,
                month,
            },
        });

        // Calculate totals
        const totalIncome = transactions
            .filter(t => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        // Category breakdown
        const categoryBreakdown: Record<string, { income: number; expense: number; count: number }> = {};

        transactions.forEach(t => {
            if (!categoryBreakdown[t.category]) {
                categoryBreakdown[t.category] = { income: 0, expense: 0, count: 0 };
            }

            categoryBreakdown[t.category].count++;

            if (t.amount > 0) {
                categoryBreakdown[t.category].income += t.amount;
            } else {
                categoryBreakdown[t.category].expense += Math.abs(t.amount);
            }
        });

        // Budget vs actual
        const budgetComparison = await Promise.all(
            budgets.map(async (budget) => {
                const spent = transactions
                    .filter(t => t.category === budget.category && t.amount < 0)
                    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

                return {
                    category: budget.category,
                    budgeted: budget.limitAmount,
                    spent,
                    remaining: budget.limitAmount - spent,
                    percentage: ((spent / budget.limitAmount) * 100).toFixed(2),
                    status: spent > budget.limitAmount ? 'exceeded' : spent > budget.limitAmount * 0.8 ? 'warning' : 'good',
                };
            })
        );

        // Daily breakdown
        const dailyBreakdown: Record<string, { income: number; expense: number }> = {};

        transactions.forEach(t => {
            const day = new Date(t.date).toISOString().split('T')[0];

            if (!dailyBreakdown[day]) {
                dailyBreakdown[day] = { income: 0, expense: 0 };
            }

            if (t.amount > 0) {
                dailyBreakdown[day].income += t.amount;
            } else {
                dailyBreakdown[day].expense += Math.abs(t.amount);
            }
        });

        res.json({
            month,
            summary: {
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense,
                transactionCount: transactions.length,
                savingsRate: totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(2) : '0',
            },
            categoryBreakdown,
            budgetComparison,
            dailyBreakdown,
            transactions: transactions.slice(0, 20), // Last 20 transactions
        });
    } catch (error) {
        next(error);
    }
});

// Get yearly summary
router.get('/report/yearly', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const year = req.query.year as string || new Date().getFullYear().toString();

        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31`);

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { date: 'asc' },
        });

        // Monthly breakdown
        const monthlyBreakdown: Record<string, { income: number; expense: number; balance: number }> = {};

        for (let month = 0; month < 12; month++) {
            const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
            monthlyBreakdown[monthKey] = { income: 0, expense: 0, balance: 0 };
        }

        transactions.forEach(t => {
            const month = t.date.toISOString().slice(0, 7);

            if (monthlyBreakdown[month]) {
                if (t.amount > 0) {
                    monthlyBreakdown[month].income += t.amount;
                } else {
                    monthlyBreakdown[month].expense += Math.abs(t.amount);
                }
                monthlyBreakdown[month].balance = monthlyBreakdown[month].income - monthlyBreakdown[month].expense;
            }
        });

        // Total summary
        const totalIncome = transactions
            .filter(t => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        // Category totals
        const categoryTotals: Record<string, number> = {};

        transactions
            .filter(t => t.amount < 0)
            .forEach(t => {
                if (!categoryTotals[t.category]) {
                    categoryTotals[t.category] = 0;
                }
                categoryTotals[t.category] += Math.abs(t.amount);
            });

        res.json({
            year,
            summary: {
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense,
                transactionCount: transactions.length,
                avgMonthlyIncome: (totalIncome / 12).toFixed(2),
                avgMonthlyExpense: (totalExpense / 12).toFixed(2),
            },
            monthlyBreakdown,
            topCategories: Object.entries(categoryTotals)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([category, amount]) => ({ category, amount })),
        });
    } catch (error) {
        next(error);
    }
});

export default router;
