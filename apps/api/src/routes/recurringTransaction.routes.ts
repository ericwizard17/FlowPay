import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Helper function to calculate next run date
function calculateNextRun(currentDate: Date, frequency: string): Date {
    const next = new Date(currentDate);

    switch (frequency) {
        case 'daily':
            next.setDate(next.getDate() + 1);
            break;
        case 'weekly':
            next.setDate(next.getDate() + 7);
            break;
        case 'monthly':
            next.setMonth(next.getMonth() + 1);
            break;
        case 'yearly':
            next.setFullYear(next.getFullYear() + 1);
            break;
    }

    return next;
}

// Get all recurring transactions
router.get('/', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const recurringTransactions = await prisma.recurringTransaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        res.json(recurringTransactions);
    } catch (error) {
        next(error);
    }
});

// Create recurring transaction
router.post('/', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const { amount, category, note, frequency, startDate, endDate } = req.body;

        const start = new Date(startDate);
        const nextRun = calculateNextRun(start, frequency);

        const recurringTransaction = await prisma.recurringTransaction.create({
            data: {
                userId,
                amount: parseFloat(amount),
                category,
                note,
                frequency,
                startDate: start,
                endDate: endDate ? new Date(endDate) : null,
                nextRun,
            },
        });

        res.status(201).json(recurringTransaction);
    } catch (error) {
        next(error);
    }
});

// Update recurring transaction
router.put('/:id', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const existing = await prisma.recurringTransaction.findFirst({
            where: { id, userId },
        });

        if (!existing) {
            return res.status(404).json({ error: 'Recurring transaction not found' });
        }

        const { amount, category, note, frequency, startDate, endDate, isActive } = req.body;

        const updated = await prisma.recurringTransaction.update({
            where: { id },
            data: {
                ...(amount !== undefined && { amount: parseFloat(amount) }),
                ...(category && { category }),
                ...(note !== undefined && { note }),
                ...(frequency && { frequency }),
                ...(startDate && { startDate: new Date(startDate) }),
                ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
                ...(isActive !== undefined && { isActive }),
            },
        });

        res.json(updated);
    } catch (error) {
        next(error);
    }
});

// Toggle active status
router.post('/:id/toggle', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const existing = await prisma.recurringTransaction.findFirst({
            where: { id, userId },
        });

        if (!existing) {
            return res.status(404).json({ error: 'Recurring transaction not found' });
        }

        const updated = await prisma.recurringTransaction.update({
            where: { id },
            data: { isActive: !existing.isActive },
        });

        res.json(updated);
    } catch (error) {
        next(error);
    }
});

// Delete recurring transaction
router.delete('/:id', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const existing = await prisma.recurringTransaction.findFirst({
            where: { id, userId },
        });

        if (!existing) {
            return res.status(404).json({ error: 'Recurring transaction not found' });
        }

        await prisma.recurringTransaction.delete({ where: { id } });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
