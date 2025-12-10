import api from './api';
import { Budget } from '../types';

export const budgetService = {
    async getAll(month?: string): Promise<Budget[]> {
        const params = new URLSearchParams();
        if (month) params.append('month', month);

        const response = await api.get<Budget[]>(`/budgets?${params.toString()}`);
        return response.data;
    },

    async create(data: {
        category: string;
        limitAmount: number;
        month?: string;
    }): Promise<Budget> {
        const response = await api.post<Budget>('/budgets', data);
        return response.data;
    },

    async update(id: string, data: Partial<Budget>): Promise<Budget> {
        const response = await api.put<Budget>(`/budgets/${id}`, data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/budgets/${id}`);
    },
};
