import { create } from 'zustand';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    login: (user: User) => void;
    logout: () => void;
    initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: !!user }),

    login: (user) => set({ user, isAuthenticated: true }),

    logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
    },

    initialize: () => {
        const user = authService.getStoredUser();
        const isAuthenticated = authService.isAuthenticated();
        set({ user, isAuthenticated });
    },
}));
