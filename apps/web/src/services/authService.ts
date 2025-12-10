import api from './api';
import { AuthResponse, User } from '../types';

export const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', {
            email,
            password,
        });

        // Store token and user data
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_data', JSON.stringify(response.data.user));

        return response.data;
    },

    async register(email: string, password: string, name: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', {
            email,
            password,
            name,
        });

        // Store token and user data
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_data', JSON.stringify(response.data.user));

        return response.data;
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>('/auth/me');
        localStorage.setItem('user_data', JSON.stringify(response.data));
        return response.data;
    },

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
    },

    getStoredUser(): User | null {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token');
    },
};
