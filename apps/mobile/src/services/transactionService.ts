import api from './api';
import { Transaction } from '../store/transactionStore';

export const transactionService = {
    // Get all transactions
    getAll: async (): Promise<Transaction[]> => {
        const response = await api.get('/transactions');
        return response.data;
    },

    // Create a new transaction
    create: async (data: {
        amount: number;
        category: string;
        note?: string;
        date?: Date;
    }): Promise<Transaction> => {
        const response = await api.post('/transactions', data);
        return response.data;
    },

    // Delete a transaction
    delete: async (id: string): Promise<void> => {
        await api.delete(`/transactions/${id}`);
    },
};
