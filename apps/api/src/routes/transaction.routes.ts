import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validate } from '../middleware/validation';
import { createTransactionSchema, updateTransactionSchema } from '../schemas/transaction.schema';

const router = Router();
const prisma = new PrismaClient();

// Get all transactions
router.get('/', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const { category, startDate, endDate, type } = req.query;

        const where: any = { userId };

        if (category) {
            where.category = category as string;
        }

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date.gte = new Date(startDate as string);
            if (endDate) where.date.lte = new Date(endDate as string);
        }

        if (type === 'income') {
            where.amount = { gt: 0 };
        } else if (type === 'expense') {
            where.amount = { lt: 0 };
        }

        const transactions = await prisma.transaction.findMany({
            where,
            orderBy: { date: 'desc' },
        });

        res.json(transactions);
    } catch (error) {
        next(error);
    }
});

// Get single transaction
router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const transaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (error) {
        next(error);
    }
});

// Create transaction
router.post('/', validate(createTransactionSchema), async (req, res, next) => {
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
        next(error);
    }
});

// Update transaction
router.put('/:id', validate(updateTransactionSchema), async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        // Check if transaction exists and belongs to user
        const existing = await prisma.transaction.findFirst({
            where: { id, userId },
        });

        if (!existing) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const { amount, category, note, date } = req.body;

        const transaction = await prisma.transaction.update({
            where: { id },
            data: {
                ...(amount !== undefined && { amount: parseFloat(amount) }),
                ...(category && { category }),
                ...(note !== undefined && { note }),
                ...(date && { date: new Date(date) }),
            },
        });

        res.json(transaction);
    } catch (error) {
        next(error);
    }
});

// Delete transaction
router.delete('/:id', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        // Check if transaction exists and belongs to user
        const existing = await prisma.transaction.findFirst({
            where: { id, userId },
        });

        if (!existing) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        await prisma.transaction.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// Get transaction statistics
router.get('/stats/summary', async (req, res, next) => {
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

        const income = transactions
            .filter(t => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = transactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        const balance = income - expense;

        // Category breakdown
        const categoryBreakdown: Record<string, number> = {};
        transactions.forEach(t => {
            if (!categoryBreakdown[t.category]) {
                categoryBreakdown[t.category] = 0;
            }
            categoryBreakdown[t.category] += Math.abs(t.amount);
        });

        res.json({
            income,
            expense,
            balance,
            totalTransactions: transactions.length,
            categoryBreakdown,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
