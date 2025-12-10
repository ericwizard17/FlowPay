import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// API base URL - production'da değiştirilmeli
const API_URL = __DEV__
    ? 'http://localhost:3000/api'
    : 'https://your-production-api.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Request interceptor - JWT token ekle
api.interceptors.request.use(
    async (config) => {
        try {
            // Get token from secure storage
            const token = await SecureStore.getItemAsync('auth_token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // Also add user-id header for backward compatibility with current backend
            const userData = await SecureStore.getItemAsync('user_data');
            if (userData) {
                const user = JSON.parse(userData);
                config.headers['user-id'] = user.id;
            }
        } catch (error) {
            console.error('Error getting auth token:', error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Clear stored auth data
            try {
                await SecureStore.deleteItemAsync('auth_token');
                await SecureStore.deleteItemAsync('user_data');
            } catch (e) {
                console.error('Error clearing auth data:', e);
            }

            // You can emit an event here to redirect to login screen
            // For now, just reject the promise
        }

        // Log error for debugging
        if (error.response) {
            console.error('API Error:', {
                status: error.response.status,
                data: error.response.data,
                url: error.config?.url,
            });
        } else if (error.request) {
            console.error('Network Error:', error.message);
        } else {
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
