import axios from 'axios';

// API base URL - production'da değiştirilmeli
const API_URL = __DEV__
    ? 'http://localhost:3000/api'
    : 'https://your-production-api.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - her istekte user-id ekle (basit auth)
api.interceptors.request.use(
    (config) => {
        // TODO: Gerçek uygulamada JWT token kullanılmalı
        config.headers['user-id'] = 'test-user-id';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
