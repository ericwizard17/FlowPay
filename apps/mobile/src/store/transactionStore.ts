import { create } from 'zustand';

export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    category: string;
    note?: string;
    date: Date;
    createdAt: Date;
}

interface TransactionStore {
    transactions: Transaction[];
    isLoading: boolean;
    error: string | null;
    setTransactions: (transactions: Transaction[]) => void;
    addTransaction: (transaction: Transaction) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
    transactions: [],
    isLoading: false,
    error: null,
    setTransactions: (transactions) => set({ transactions }),
    addTransaction: (transaction) =>
        set((state) => ({
            transactions: [transaction, ...state.transactions],
        })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));
