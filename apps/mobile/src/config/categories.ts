export const CATEGORIES = {
    Market: { icon: 'cart', color: '#10b981' },
    Ulaşım: { icon: 'car', color: '#3b82f6' },
    Eğlence: { icon: 'movie', color: '#8b5cf6' },
    Faturalar: { icon: 'receipt', color: '#f59e0b' },
    Maaş: { icon: 'cash', color: '#10b981' },
    Diğer: { icon: 'dots-horizontal', color: '#6b7280' },
};

export const getCategoryIcon = (category: string) => {
    return CATEGORIES[category as keyof typeof CATEGORIES] || CATEGORIES.Diğer;
};
