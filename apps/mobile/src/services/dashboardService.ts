import api from './api';
import { DashboardData } from '../types/types';

export const dashboardService = {
    // Get dashboard data including balance, income, expense, and trends
    async getDashboardData(): Promise<DashboardData> {
        try {
            const response = await api.get<DashboardData>('/dashboard');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to fetch dashboard data');
        }
    },
};
