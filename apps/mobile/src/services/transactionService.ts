import api from './api';
import { Transaction, TransactionStats } from '../types/types';

export interface CreateTransactionData {
    amount: number;
    category: string;
    note?: string;
    date?: string;
}

export interface UpdateTransactionData {
    amount?: number;
    category?: string;
    note?: string;
    date?: string;
}

export interface TransactionFilters {
    category?: string;
    startDate?: string;
    endDate?: string;
    type?: 'income' | 'expense';
}

export const transactionService = {
    // Get all transactions with optional filters
    async getAll(filters?: TransactionFilters): Promise<Transaction[]> {
        try {
            const params = new URLSearchParams();

            if (filters?.category) params.append('category', filters.category);
            if (filters?.startDate) params.append('startDate', filters.startDate);
            if (filters?.endDate) params.append('endDate', filters.endDate);
            if (filters?.type) params.append('type', filters.type);

            const response = await api.get<Transaction[]>(`/transactions?${params.toString()}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to fetch transactions');
        }
    },

    // Get single transaction by ID
    async getById(id: string): Promise<Transaction> {
        try {
            const response = await api.get<Transaction>(`/transactions/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to fetch transaction');
        }
    },

    // Create new transaction
    async create(data: CreateTransactionData): Promise<Transaction> {
        try {
            const response = await api.post<Transaction>('/transactions', data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to create transaction');
        }
    },

    // Update existing transaction
    async update(id: string, data: UpdateTransactionData): Promise<Transaction> {
        try {
            const response = await api.put<Transaction>(`/transactions/${id}`, data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to update transaction');
        }
    },

    // Delete transaction
    async delete(id: string): Promise<void> {
        try {
            await api.delete(`/transactions/${id}`);
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to delete transaction');
        }
    },

    // Get transaction statistics
    async getStats(startDate?: string, endDate?: string): Promise<TransactionStats> {
        try {
            const params = new URLSearchParams();

            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);

            const response = await api.get<TransactionStats>(`/transactions/stats/summary?${params.toString()}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to fetch transaction stats');
        }
    },
};
