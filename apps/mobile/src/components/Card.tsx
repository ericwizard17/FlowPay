import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    useColorScheme,
    ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { theme } from '../theme';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'gradient' | 'glass';
    padding?: keyof typeof theme.spacing;
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    style,
}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    if (variant === 'gradient') {
        return (
            <LinearGradient
                colors={theme.gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.base,
                    { padding: theme.spacing[padding] },
                    theme.shadows.md,
                    style,
                ]}
            >
                {children}
            </LinearGradient>
        );
    }

    if (variant === 'glass') {
        return (
            <BlurView
                intensity={80}
                tint={isDark ? 'dark' : 'light'}
                style={[
                    styles.base,
                    styles.glass,
                    { padding: theme.spacing[padding] },
                    style,
                ]}
            >
                {children}
            </BlurView>
        );
    }

    return (
        <View
            style={[
                styles.base,
                styles.default,
                {
                    padding: theme.spacing[padding],
                    backgroundColor: isDark
                        ? theme.colors.dark.surface
                        : theme.colors.light.surface,
                },
                theme.shadows.md,
                style,
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
    },
    default: {
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
    },
    glass: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
});
