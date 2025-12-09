import { z } from 'zod';

export const createTransactionSchema = z.object({
    amount: z.number().or(z.string().transform(Number)),
    category: z.string().min(1, 'Category is required'),
    note: z.string().optional(),
    date: z.string().datetime().optional(),
});

export const updateTransactionSchema = z.object({
    amount: z.number().or(z.string().transform(Number)).optional(),
    category: z.string().min(1).optional(),
    note: z.string().optional(),
    date: z.string().datetime().optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
