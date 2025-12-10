import { create } from 'zustand';
import { authService } from '../services/authService';
import { User } from '../types/types';

interface AuthStore {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    login: (user: User, token: string) => void;
    logout: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    setUser: (user) => set({ user, isAuthenticated: !!user }),

    setToken: (token) => set({ token }),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error }),

    login: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
        error: null
    }),

    logout: async () => {
        await authService.logout();
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null
        });
    },

    // Initialize auth state from stored data
    initialize: async () => {
        set({ isLoading: true });
        try {
            const token = await authService.getToken();
            const user = await authService.getStoredUser();

            if (token && user) {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false
                });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            console.error('Error initializing auth:', error);
            set({ isLoading: false });
        }
    },
}));
