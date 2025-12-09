import api from './api';
import { Budget } from '../store/budgetStore';

export const budgetService = {
    // Get all budgets for current month
    getAll: async (month?: string): Promise<Budget[]> => {
        const response = await api.get('/budgets', {
            params: { month },
        });
        return response.data;
    },

    // Create a new budget
    create: async (data: {
        category: string;
        limitAmount: number;
        month?: string;
    }): Promise<Budget> => {
        const response = await api.post('/budgets', data);
        return response.data;
    },

    // Delete a budget
    delete: async (id: string): Promise<void> => {
        await api.delete(`/budgets/${id}`);
    },
};
