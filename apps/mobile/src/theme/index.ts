/**
 * Design System — Finans Takip
 * 
 * Modern, premium tasarım sistemi. Tüm renkler, tipografi, spacing ve animasyon
 * değerleri burada merkezi olarak yönetilir.
 */

// ============================================
// COLORS — Modern & Premium Palette
// ============================================

export const colors = {
    // Primary — Vibrant Purple/Blue Gradient
    primary: {
        50: '#F0F4FF',
        100: '#E0E9FF',
        200: '#C7D7FE',
        300: '#A4BCFD',
        400: '#8098F9',
        500: '#6366F1', // Main
        600: '#4F46E5',
        700: '#4338CA',
        800: '#3730A3',
        900: '#312E81',
    },

    // Secondary — Emerald Green
    secondary: {
        50: '#ECFDF5',
        100: '#D1FAE5',
        200: '#A7F3D0',
        300: '#6EE7B7',
        400: '#34D399',
        500: '#10B981', // Main
        600: '#059669',
        700: '#047857',
        800: '#065F46',
        900: '#064E3B',
    },

    // Accent — Vibrant Orange
    accent: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#F97316', // Main
        600: '#EA580C',
        700: '#C2410C',
        800: '#9A3412',
        900: '#7C2D12',
    },

    // Neutrals — Sophisticated Grays
    gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
        950: '#030712',
    },

    // Semantic Colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    // Income & Expense
    income: '#10B981',
    expense: '#EF4444',

    // Dark Mode
    dark: {
        bg: '#0A0A0F',
        surface: '#16161F',
        surfaceElevated: '#1E1E2D',
        border: '#2A2A3C',
        text: '#E5E7EB',
        textSecondary: '#9CA3AF',
    },

    // Light Mode
    light: {
        bg: '#FFFFFF',
        surface: '#F9FAFB',
        surfaceElevated: '#FFFFFF',
        border: '#E5E7EB',
        text: '#111827',
        textSecondary: '#6B7280',
    },
};

// ============================================
// TYPOGRAPHY — Modern Font System
// ============================================

export const typography = {
    fonts: {
        regular: 'System',
        medium: 'System',
        semibold: 'System',
        bold: 'System',
    },

    sizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
    },

    lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },

    weights: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },
};

// ============================================
// SPACING — Consistent 4px Grid
// ============================================

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
};

// ============================================
// BORDER RADIUS — Smooth Corners
// ============================================

export const borderRadius = {
    none: 0,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
};

// ============================================
// SHADOWS — Depth & Elevation
// ============================================

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 12,
    },
};

// ============================================
// ANIMATIONS — Smooth Transitions
// ============================================

export const animations = {
    durations: {
        fast: 150,
        normal: 250,
        slow: 350,
    },

    easing: {
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        spring: 'spring',
    },
};

// ============================================
// BREAKPOINTS — Responsive Design
// ============================================

export const breakpoints = {
    sm: 375,
    md: 768,
    lg: 1024,
    xl: 1280,
};

// ============================================
// GRADIENTS — Premium Effects
// ============================================

export const gradients = {
    primary: ['#6366F1', '#8B5CF6'],
    secondary: ['#10B981', '#059669'],
    accent: ['#F97316', '#FB923C'],
    income: ['#10B981', '#34D399'],
    expense: ['#EF4444', '#F87171'],
    dark: ['#0A0A0F', '#16161F'],
    sunset: ['#F97316', '#EC4899', '#8B5CF6'],
};

// ============================================
// CATEGORY COLORS — Vibrant & Distinct
// ============================================

export const categoryColors = [
    '#10B981', // Green
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#06B6D4', // Cyan
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#F97316', // Orange
    '#A855F7', // Violet
    '#6B7280', // Gray
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getColorWithOpacity = (color: string, opacity: number): string => {
    // Convert hex to rgba
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const isDarkMode = (scheme: 'light' | 'dark'): boolean => {
    return scheme === 'dark';
};

// ============================================
// THEME OBJECT — Complete Design System
// ============================================

export const theme = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    animations,
    breakpoints,
    gradients,
    categoryColors,
};

export type Theme = typeof theme;
