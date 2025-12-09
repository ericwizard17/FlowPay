import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validate } from '../middleware/validation';
import { createBudgetSchema, updateBudgetSchema } from '../schemas/budget.schema';

const router = Router();
const prisma = new PrismaClient();

// Get all budgets
router.get('/', async (req, res, next) => {
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

        // Calculate spent amount for each budget
        const budgetsWithSpent = await Promise.all(
            budgets.map(async (budget) => {
                const spent = await prisma.transaction.aggregate({
                    where: {
                        userId,
                        category: budget.category,
                        amount: { lt: 0 },
                        date: {
                            gte: new Date(`${month}-01`),
                            lt: new Date(new Date(`${month}-01`).setMonth(new Date(`${month}-01`).getMonth() + 1)),
                        },
                    },
                    _sum: {
                        amount: true,
                    },
                });

                return {
                    ...budget,
                    spent: Math.abs(spent._sum.amount || 0),
                    remaining: budget.limitAmount - Math.abs(spent._sum.amount || 0),
                    percentage: ((Math.abs(spent._sum.amount || 0) / budget.limitAmount) * 100).toFixed(2),
                };
            })
        );

        res.json(budgetsWithSpent);
    } catch (error) {
        next(error);
    }
});

// Get single budget
router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        const budget = await prisma.budget.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        res.json(budget);
    } catch (error) {
        next(error);
    }
});

// Create budget
router.post('/', validate(createBudgetSchema), async (req, res, next) => {
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
        next(error);
    }
});

// Update budget
router.put('/:id', validate(updateBudgetSchema), async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        // Check if budget exists and belongs to user
        const existing = await prisma.budget.findFirst({
            where: { id, userId },
        });

        if (!existing) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        const { category, limitAmount, month } = req.body;

        const budget = await prisma.budget.update({
            where: { id },
            data: {
                ...(category && { category }),
                ...(limitAmount !== undefined && { limitAmount: parseFloat(limitAmount) }),
                ...(month && { month }),
            },
        });

        res.json(budget);
    } catch (error) {
        next(error);
    }
});

// Delete budget
router.delete('/:id', async (req, res, next) => {
    try {
        const userId = req.headers['user-id'] as string;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'User ID required' });
        }

        // Check if budget exists and belongs to user
        const existing = await prisma.budget.findFirst({
            where: { id, userId },
        });

        if (!existing) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        await prisma.budget.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
