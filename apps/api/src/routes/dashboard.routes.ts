import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get dashboard statistics
router.get('/stats', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const now = new Date();
        const currentMonth = now.toISOString().slice(0, 7);
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 7);

        // Current month transactions
        const currentMonthTransactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(`${currentMonth}-01`),
                    lt: new Date(new Date(`${currentMonth}-01`).setMonth(new Date(`${currentMonth}-01`).getMonth() + 1)),
                },
            },
        });

        // Last month transactions
        const lastMonthTransactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(`${lastMonth}-01`),
                    lt: new Date(new Date(`${lastMonth}-01`).setMonth(new Date(`${lastMonth}-01`).getMonth() + 1)),
                },
            },
        });

        // Calculate current month stats
        const currentIncome = currentMonthTransactions
            .filter(t => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);

        const currentExpense = currentMonthTransactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        const currentBalance = currentIncome - currentExpense;

        // Calculate last month stats
        const lastIncome = lastMonthTransactions
            .filter(t => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);

        const lastExpense = lastMonthTransactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        // Calculate changes
        const incomeChange = lastIncome > 0 ? ((currentIncome - lastIncome) / lastIncome) * 100 : 0;
        const expenseChange = lastExpense > 0 ? ((currentExpense - lastExpense) / lastExpense) * 100 : 0;

        // Category breakdown
        const categoryBreakdown: Record<string, { income: number; expense: number }> = {};
        currentMonthTransactions.forEach(t => {
            if (!categoryBreakdown[t.category]) {
                categoryBreakdown[t.category] = { income: 0, expense: 0 };
            }
            if (t.amount > 0) {
                categoryBreakdown[t.category].income += t.amount;
            } else {
                categoryBreakdown[t.category].expense += Math.abs(t.amount);
            }
        });

        // Top spending categories
        const topCategories = Object.entries(categoryBreakdown)
            .map(([category, data]) => ({
                category,
                amount: data.expense,
            }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5);

        // Recent transactions
        const recentTransactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: 10,
        });

        // Budget status
        const budgets = await prisma.budget.findMany({
            where: {
                userId,
                month: currentMonth,
            },
        });

        const budgetStatus = await Promise.all(
            budgets.map(async (budget) => {
                const spent = await prisma.transaction.aggregate({
                    where: {
                        userId,
                        category: budget.category,
                        amount: { lt: 0 },
                        date: {
                            gte: new Date(`${currentMonth}-01`),
                            lt: new Date(new Date(`${currentMonth}-01`).setMonth(new Date(`${currentMonth}-01`).getMonth() + 1)),
                        },
                    },
                    _sum: {
                        amount: true,
                    },
                });

                const spentAmount = Math.abs(spent._sum.amount || 0);
                const percentage = (spentAmount / budget.limitAmount) * 100;

                return {
                    category: budget.category,
                    limit: budget.limitAmount,
                    spent: spentAmount,
                    remaining: budget.limitAmount - spentAmount,
                    percentage: percentage.toFixed(2),
                    status: percentage > 100 ? 'exceeded' : percentage > 80 ? 'warning' : 'good',
                };
            })
        );

        res.json({
            currentMonth: {
                income: currentIncome,
                expense: currentExpense,
                balance: currentBalance,
                transactionCount: currentMonthTransactions.length,
            },
            changes: {
                income: incomeChange.toFixed(2),
                expense: expenseChange.toFixed(2),
            },
            categoryBreakdown,
            topCategories,
            recentTransactions,
            budgetStatus,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
