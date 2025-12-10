// Type definitions matching backend API responses

export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    category: string;
    note?: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

export interface Budget {
    id: string;
    userId: string;
    category: string;
    limitAmount: number;
    month: string;
    spent?: number;
    remaining?: number;
    percentage?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TransactionStats {
    income: number;
    expense: number;
    balance: number;
    totalTransactions: number;
    categoryBreakdown: Record<string, number>;
}

export interface DashboardData {
    balance: number;
    income: number;
    expense: number;
    recentTransactions: Transaction[];
    categoryBreakdown: Record<string, number>;
    monthlyTrend: {
        month: string;
        income: number;
        expense: number;
    }[];
}

export interface ApiError {
    error: string;
    message?: string;
}
