import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { theme } from '../theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon,
    fullWidth = false,
    onPress,
    style,
    ...props
}) => {
    const handlePress = (e: any) => {
        if (!disabled && !loading) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPress?.(e);
        }
    };

    const buttonStyle: ViewStyle = [
        styles.base,
        styles[`size_${size}`],
        styles[`variant_${variant}`],
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
    ] as ViewStyle;

    const textStyle: TextStyle = [
        styles.text,
        styles[`text_${size}`],
        styles[`text_${variant}`],
        (disabled || loading) && styles.textDisabled,
    ] as TextStyle;

    if (variant === 'gradient') {
        return (
            <TouchableOpacity
                onPress={handlePress}
                disabled={disabled || loading}
                activeOpacity={0.8}
                style={[buttonStyle, { padding: 0, backgroundColor: 'transparent' }]}
                {...props}
            >
                <LinearGradient
                    colors={theme.gradients.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradient, styles[`size_${size}`]]}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <>
                            {icon && <>{icon}</>}
                            <Text style={textStyle}>{title}</Text>
                        </>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={buttonStyle}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? '#FFFFFF' : theme.colors.primary[500]}
                />
            ) : (
                <>
                    {icon && <>{icon}</>}
                    <Text style={textStyle}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.md,
        gap: theme.spacing.sm,
    },

    // Sizes
    size_sm: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: 36,
    },
    size_md: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 48,
    },
    size_lg: {
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
        minHeight: 56,
    },

    // Variants
    variant_primary: {
        backgroundColor: theme.colors.primary[500],
    },
    variant_secondary: {
        backgroundColor: theme.colors.secondary[500],
    },
    variant_outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary[500],
    },
    variant_ghost: {
        backgroundColor: 'transparent',
    },
    variant_gradient: {
        backgroundColor: 'transparent',
    },

    // States
    disabled: {
        opacity: 0.5,
    },
    fullWidth: {
        width: '100%',
    },

    // Gradient
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.md,
        gap: theme.spacing.sm,
        width: '100%',
    },

    // Text Styles
    text: {
        fontWeight: theme.typography.weights.semibold,
    },
    text_sm: {
        fontSize: theme.typography.sizes.sm,
    },
    text_md: {
        fontSize: theme.typography.sizes.base,
    },
    text_lg: {
        fontSize: theme.typography.sizes.lg,
    },

    text_primary: {
        color: '#FFFFFF',
    },
    text_secondary: {
        color: '#FFFFFF',
    },
    text_outline: {
        color: theme.colors.primary[500],
    },
    text_ghost: {
        color: theme.colors.primary[500],
    },
    text_gradient: {
        color: '#FFFFFF',
    },

    textDisabled: {
        opacity: 0.7,
    },
});
