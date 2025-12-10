import api from './api';
import { Budget } from '../types/types';

export interface CreateBudgetData {
    category: string;
    limitAmount: number;
    month?: string; // Format: YYYY-MM
}

export interface UpdateBudgetData {
    category?: string;
    limitAmount?: number;
    month?: string;
}

export const budgetService = {
    // Get all budgets for a specific month
    async getAll(month?: string): Promise<Budget[]> {
        try {
            const params = new URLSearchParams();

            if (month) {
                params.append('month', month);
            }

            const response = await api.get<Budget[]>(`/budgets?${params.toString()}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to fetch budgets');
        }
    },

    // Get single budget by ID
    async getById(id: string): Promise<Budget> {
        try {
            const response = await api.get<Budget>(`/budgets/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to fetch budget');
        }
    },

    // Create new budget
    async create(data: CreateBudgetData): Promise<Budget> {
        try {
            const response = await api.post<Budget>('/budgets', data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to create budget');
        }
    },

    // Update existing budget
    async update(id: string, data: UpdateBudgetData): Promise<Budget> {
        try {
            const response = await api.put<Budget>(`/budgets/${id}`, data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to update budget');
        }
    },

    // Delete budget
    async delete(id: string): Promise<void> {
        try {
            await api.delete(`/budgets/${id}`);
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to delete budget');
        }
    },
};
