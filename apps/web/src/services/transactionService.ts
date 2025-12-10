import api from './api';
import { Transaction, TransactionStats } from '../types';

export const transactionService = {
    async getAll(filters?: {
        category?: string;
        startDate?: string;
        endDate?: string;
        type?: 'income' | 'expense';
    }): Promise<Transaction[]> {
        const params = new URLSearchParams();
        if (filters?.category) params.append('category', filters.category);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        if (filters?.type) params.append('type', filters.type);

        const response = await api.get<Transaction[]>(`/transactions?${params.toString()}`);
        return response.data;
    },

    async create(data: {
        amount: number;
        category: string;
        note?: string;
        date?: string;
    }): Promise<Transaction> {
        const response = await api.post<Transaction>('/transactions', data);
        return response.data;
    },

    async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
        const response = await api.put<Transaction>(`/transactions/${id}`, data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/transactions/${id}`);
    },

    async getStats(startDate?: string, endDate?: string): Promise<TransactionStats> {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const response = await api.get<TransactionStats>(`/transactions/stats/summary?${params.toString()}`);
        return response.data;
    },
};
