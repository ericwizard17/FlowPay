import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Predefined categories
const DEFAULT_CATEGORIES = {
    expense: [
        { name: 'Market', icon: '🛒', color: '#FF6B6B' },
        { name: 'Ulaşım', icon: '🚗', color: '#4ECDC4' },
        { name: 'Eğlence', icon: '🎮', color: '#95E1D3' },
        { name: 'Faturalar', icon: '📄', color: '#F38181' },
        { name: 'Sağlık', icon: '⚕️', color: '#AA96DA' },
        { name: 'Eğitim', icon: '📚', color: '#FCBAD3' },
        { name: 'Giyim', icon: '👕', color: '#A8D8EA' },
        { name: 'Yemek', icon: '🍔', color: '#FFD93D' },
        { name: 'Spor', icon: '⚽', color: '#6BCB77' },
        { name: 'Teknoloji', icon: '💻', color: '#4D96FF' },
        { name: 'Ev', icon: '🏠', color: '#FF8787' },
        { name: 'Diğer', icon: '📦', color: '#9B9B9B' },
    ],
    income: [
        { name: 'Maaş', icon: '💰', color: '#6BCB77' },
        { name: 'Freelance', icon: '💼', color: '#4D96FF' },
        { name: 'Yatırım', icon: '📈', color: '#FFD93D' },
        { name: 'Hediye', icon: '🎁', color: '#FF6B9D' },
        { name: 'Diğer', icon: '💵', color: '#9B9B9B' },
    ],
};

// Get all categories
router.get('/', (req, res) => {
    const type = req.query.type as string;

    if (type === 'expense') {
        return res.json(DEFAULT_CATEGORIES.expense);
    } else if (type === 'income') {
        return res.json(DEFAULT_CATEGORIES.income);
    }

    res.json({
        expense: DEFAULT_CATEGORIES.expense,
        income: DEFAULT_CATEGORIES.income,
    });
});

// Get category statistics
router.get('/stats', async (req, res, next) => {
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

        const transactions = await prisma.transaction.findMany({ where });

        // Calculate stats per category
        const categoryStats: Record<string, {
            totalIncome: number;
            totalExpense: number;
            transactionCount: number;
            avgAmount: number;
        }> = {};

        transactions.forEach(t => {
            if (!categoryStats[t.category]) {
                categoryStats[t.category] = {
                    totalIncome: 0,
                    totalExpense: 0,
                    transactionCount: 0,
                    avgAmount: 0,
                };
            }

            categoryStats[t.category].transactionCount++;

            if (t.amount > 0) {
                categoryStats[t.category].totalIncome += t.amount;
            } else {
                categoryStats[t.category].totalExpense += Math.abs(t.amount);
            }
        });

        // Calculate averages
        Object.keys(categoryStats).forEach(category => {
            const stats = categoryStats[category];
            const total = stats.totalIncome + stats.totalExpense;
            stats.avgAmount = total / stats.transactionCount;
        });

        // Add category metadata
        const enrichedStats = Object.entries(categoryStats).map(([name, stats]) => {
            const expenseCategory = DEFAULT_CATEGORIES.expense.find(c => c.name === name);
            const incomeCategory = DEFAULT_CATEGORIES.income.find(c => c.name === name);
            const categoryMeta = expenseCategory || incomeCategory || { icon: '📦', color: '#9B9B9B' };

            return {
                name,
                ...categoryMeta,
                ...stats,
            };
        });

        // Sort by total spending
        enrichedStats.sort((a, b) => b.totalExpense - a.totalExpense);

        res.json(enrichedStats);
    } catch (error) {
        next(error);
    }
});

export default router;
