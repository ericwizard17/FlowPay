import { create } from 'zustand';

export interface Budget {
    id: string;
    userId: string;
    category: string;
    limitAmount: number;
    month: string;
    createdAt: Date;
    updatedAt: Date;
}

interface BudgetStore {
    budgets: Budget[];
    isLoading: boolean;
    error: string | null;
    setBudgets: (budgets: Budget[]) => void;
    addBudget: (budget: Budget) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
    budgets: [],
    isLoading: false,
    error: null,
    setBudgets: (budgets) => set({ budgets }),
    addBudget: (budget) =>
        set((state) => ({
            budgets: [...state.budgets, budget],
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));
