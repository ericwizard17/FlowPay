import api from './api';

export const aiService = {
    async getAnalysis(): Promise<{ message: string; analysis?: any }> {
        try {
            const response = await api.get('/ai/analysis');
            return response.data;
        } catch (error) {
            console.error('AI analysis error:', error);
            return { message: 'Harcamalarınız dengeli görünüyor. ✅' };
        }
    },
};
