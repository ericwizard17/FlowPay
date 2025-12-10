import * as SecureStore from 'expo-secure-store';
import api from './api';
import { AuthResponse, User } from '../types/types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const authService = {
    // Login user
    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/auth/login', {
                email,
                password,
            });

            // Store token and user data securely
            await this.storeToken(response.data.token);
            await this.storeUser(response.data.user);

            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    },

    // Register new user
    async register(email: string, password: string, name: string): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/auth/register', {
                email,
                password,
                name,
            });

            // Store token and user data securely
            await this.storeToken(response.data.token);
            await this.storeUser(response.data.user);

            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Registration failed');
        }
    },

    // Get current user
    async getCurrentUser(): Promise<User> {
        try {
            const response = await api.get<User>('/auth/me');
            await this.storeUser(response.data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to get user data');
        }
    },

    // Logout user
    async logout(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_KEY);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    },

    // Store token securely
    async storeToken(token: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
        } catch (error) {
            console.error('Error storing token:', error);
            throw new Error('Failed to store authentication token');
        }
    },

    // Get stored token
    async getToken(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(TOKEN_KEY);
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    },

    // Store user data
    async storeUser(user: User): Promise<void> {
        try {
            await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Error storing user:', error);
        }
    },

    // Get stored user data
    async getStoredUser(): Promise<User | null> {
        try {
            const userData = await SecureStore.getItemAsync(USER_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    },

    // Check if user is authenticated
    async isAuthenticated(): Promise<boolean> {
        const token = await this.getToken();
        return !!token;
    },
};
