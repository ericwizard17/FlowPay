import { z } from 'zod';

export const createBudgetSchema = z.object({
    category: z.string().min(1, 'Category is required'),
    limitAmount: z.number().positive('Limit amount must be positive').or(z.string().transform(Number)),
    month: z.string().regex(/^\d{4}-\d{2}$/, 'Month must be in format YYYY-MM').optional(),
});

export const updateBudgetSchema = z.object({
    category: z.string().min(1).optional(),
    limitAmount: z.number().positive().or(z.string().transform(Number)).optional(),
    month: z.string().regex(/^\d{4}-\d{2}$/).optional(),
});

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
