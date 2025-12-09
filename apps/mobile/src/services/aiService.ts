import api from './api';

export interface AIAnalysis {
    message: string;
    analysis: Record<string, { current: number; previous: number }>;
}

export const aiService = {
    // Get AI price analysis
    getAnalysis: async (): Promise<AIAnalysis> => {
        const response = await api.get('/ai/analysis');
        return response.data;
    },
};
