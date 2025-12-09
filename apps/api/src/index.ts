import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Finans Takip API is running' });
});

// ============================================
// TRANSACTIONS ROUTES
// ============================================

// Get all transactions for a user
app.get('/api/transactions', async (req, res) => {
    try {
        const userId = req.headers['user-id'] as string; // Basit auth - gerçek uygulamada JWT kullanılmalı

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new transaction
app.post('/api/transactions', async (req, res) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const { amount, category, note, date } = req.body;

        const transaction = await prisma.transaction.create({
            data: {
                userId,
                amount: parseFloat(amount),
                category,
                note,
                date: date ? new Date(date) : new Date(),
            },
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// BUDGETS ROUTES
// ============================================

// Get all budgets for a user
app.get('/api/budgets', async (req, res) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const month = req.query.month as string || new Date().toISOString().slice(0, 7);

        const budgets = await prisma.budget.findMany({
            where: {
                userId,
                month,
            },
        });

        res.json(budgets);
    } catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new budget
app.post('/api/budgets', async (req, res) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const { category, limitAmount, month } = req.body;

        const budget = await prisma.budget.create({
            data: {
                userId,
                category,
                limitAmount: parseFloat(limitAmount),
                month: month || new Date().toISOString().slice(0, 7),
            },
        });

        res.status(201).json(budget);
    } catch (error) {
        console.error('Error creating budget:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// AI ANALYSIS ROUTE
// ============================================

// Get AI price analysis
app.get('/api/ai/analysis', async (req, res) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        // Basit AI analizi - son 3 ayın verilerini karşılaştır
        const now = new Date();
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: { gte: threeMonthsAgo },
                amount: { lt: 0 }, // Sadece giderler
            },
            orderBy: { date: 'desc' },
        });

        // Kategori bazlı analiz
        const categoryAnalysis: Record<string, { current: number; previous: number }> = {};

        transactions.forEach(t => {
            const month = t.date.toISOString().slice(0, 7);
            const currentMonth = now.toISOString().slice(0, 7);
            const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 7);

            if (!categoryAnalysis[t.category]) {
                categoryAnalysis[t.category] = { current: 0, previous: 0 };
            }

            if (month === currentMonth) {
                categoryAnalysis[t.category].current += Math.abs(t.amount);
            } else if (month === previousMonth) {
                categoryAnalysis[t.category].previous += Math.abs(t.amount);
            }
        });

        // En büyük artışı bul
        let maxIncrease = 0;
        let maxCategory = '';

        Object.entries(categoryAnalysis).forEach(([category, data]) => {
            if (data.previous > 0) {
                const increase = ((data.current - data.previous) / data.previous) * 100;
                if (increase > maxIncrease) {
                    maxIncrease = increase;
                    maxCategory = category;
                }
            }
        });

        const message = maxIncrease > 5
            ? `${maxCategory} harcamalarınız bu ay geçen aya göre %${maxIncrease.toFixed(0)} arttı. 💡`
            : 'Harcamalarınız dengeli görünüyor. ✅';

        res.json({
            message,
            analysis: categoryAnalysis,
        });
    } catch (error) {
        console.error('Error generating AI analysis:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
