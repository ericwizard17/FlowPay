import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    useColorScheme,
    Modal,
    TextInput,
} from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { theme } from '../theme';

interface Budget {
    id: string;
    category: string;
    limitAmount: number;
    spentAmount: number;
    month: string;
}

const CATEGORIES = ['Market', 'Ulaşım', 'Eğlence', 'Faturalar', 'Diğer'];

export const Budgets: React.FC = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [showAddModal, setShowAddModal] = useState(false);
    const [budgets, setBudgets] = useState<Budget[]>([
        { id: '1', category: 'Market', limitAmount: 2000, spentAmount: 1540, month: '2025-12' },
        { id: '2', category: 'Ulaşım', limitAmount: 500, spentAmount: 280, month: '2025-12' },
        { id: '3', category: 'Eğlence', limitAmount: 800, spentAmount: 620, month: '2025-12' },
    ]);

    const [formData, setFormData] = useState({
        category: 'Market',
        limitAmount: '',
    });

    const currentMonth = new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

    const getPercentage = (spent: number, limit: number) => {
        return Math.min((spent / limit) * 100, 100);
    };

    const getStatusColor = (percentage: number) => {
        if (percentage >= 90) return theme.colors.error;
        if (percentage >= 70) return theme.colors.warning;
        return theme.colors.success;
    };

    const handleAddBudget = () => {
        const limit = parseFloat(formData.limitAmount);
        if (isNaN(limit) || limit <= 0) return;

        const newBudget: Budget = {
            id: Date.now().toString(),
            category: formData.category,
            limitAmount: limit,
            spentAmount: 0,
            month: new Date().toISOString().slice(0, 7),
        };

        setBudgets([...budgets, newBudget]);
        setShowAddModal(false);
        setFormData({ category: 'Market', limitAmount: '' });
    };

    const totalLimit = budgets.reduce((sum, b) => sum + b.limitAmount, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spentAmount, 0);
    const totalPercentage = getPercentage(totalSpent, totalLimit);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isDark ? theme.colors.dark.bg : theme.colors.light.bg },
            ]}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Stats */}
                <View style={styles.header}>
                    <Card variant="gradient" style={styles.statsCard}>
                        <Text style={styles.statsLabel}>{currentMonth} Bütçesi</Text>
                        <Text style={styles.statsAmount}>
                            ₺{totalSpent.toLocaleString('tr-TR')} / ₺{totalLimit.toLocaleString('tr-TR')}
                        </Text>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: `${totalPercentage}%`,
                                        backgroundColor: '#FFFFFF',
                                    },
                                ]}
                            />
                        </View>
                        <Text style={styles.statsSubtext}>
                            %{totalPercentage.toFixed(0)} kullanıldı
                        </Text>
                    </Card>
                </View>

                {/* Budgets List */}
                <View style={styles.section}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                        ]}
                    >
                        Kategori Bütçeleri
                    </Text>

                    {budgets.length === 0 ? (
                        <Card variant="default">
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyStateIcon}>💰</Text>
                                <Text
                                    style={[
                                        styles.emptyStateText,
                                        {
                                            color: isDark
                                                ? theme.colors.dark.textSecondary
                                                : theme.colors.light.textSecondary,
                                        },
                                    ]}
                                >
                                    Henüz bütçe eklemediniz
                                </Text>
                            </View>
                        </Card>
                    ) : (
                        budgets.map(budget => {
                            const percentage = getPercentage(budget.spentAmount, budget.limitAmount);
                            const statusColor = getStatusColor(percentage);
                            const remaining = budget.limitAmount - budget.spentAmount;

                            return (
                                <Card key={budget.id} variant="default" style={styles.budgetCard}>
                                    <View style={styles.budgetHeader}>
                                        <Text
                                            style={[
                                                styles.budgetCategory,
                                                { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                                            ]}
                                        >
                                            {budget.category}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.budgetPercentage,
                                                { color: statusColor },
                                            ]}
                                        >
                                            %{percentage.toFixed(0)}
                                        </Text>
                                    </View>

                                    <View style={styles.budgetAmounts}>
                                        <Text
                                            style={[
                                                styles.budgetAmount,
                                                { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                                            ]}
                                        >
                                            ₺{budget.spentAmount.toLocaleString('tr-TR')}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.budgetLimit,
                                                {
                                                    color: isDark
                                                        ? theme.colors.dark.textSecondary
                                                        : theme.colors.light.textSecondary,
                                                },
                                            ]}
                                        >
                                            / ₺{budget.limitAmount.toLocaleString('tr-TR')}
                                        </Text>
                                    </View>

                                    <View style={[styles.progressBar, styles.budgetProgressBar]}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                {
                                                    width: `${percentage}%`,
                                                    backgroundColor: statusColor,
                                                },
                                            ]}
                                        />
                                    </View>

                                    <Text
                                        style={[
                                            styles.budgetRemaining,
                                            {
                                                color: remaining >= 0 ? theme.colors.success : theme.colors.error,
                                            },
                                        ]}
                                    >
                                        {remaining >= 0 ? 'Kalan: ' : 'Aşım: '}
                                        ₺{Math.abs(remaining).toLocaleString('tr-TR')}
                                    </Text>
                                </Card>
                            );
                        })
                    )}
                </View>
            </ScrollView>

            {/* Add Button */}
            <View style={styles.addButtonContainer}>
                <Button
                    title="Bütçe Ekle"
                    variant="gradient"
                    size="lg"
                    fullWidth
                    onPress={() => setShowAddModal(true)}
                />
            </View>

            {/* Add Budget Modal */}
            <Modal
                visible={showAddModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowAddModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.modalContent,
                            { backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.light.surface },
                        ]}
                    >
                        <Text
                            style={[
                                styles.modalTitle,
                                { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                            ]}
                        >
                            Yeni Bütçe Ekle
                        </Text>
                        <Text
                            style={[
                                styles.modalSubtitle,
                                {
                                    color: isDark
                                        ? theme.colors.dark.textSecondary
                                        : theme.colors.light.textSecondary,
                                },
                            ]}
                        >
                            {currentMonth} için kategori limiti belirleyin
                        </Text>

                        {/* Category Selection */}
                        <Text
                            style={[
                                styles.inputLabel,
                                { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                            ]}
                        >
                            Kategori
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                            {CATEGORIES.map(cat => (
                                <Button
                                    key={cat}
                                    title={cat}
                                    variant={formData.category === cat ? 'primary' : 'outline'}
                                    size="sm"
                                    onPress={() => setFormData({ ...formData, category: cat })}
                                    style={styles.categoryButton}
                                />
                            ))}
                        </ScrollView>

                        {/* Amount Input */}
                        <Text
                            style={[
                                styles.inputLabel,
                                { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                            ]}
                        >
                            Limit Tutarı (₺)
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: isDark ? theme.colors.dark.bg : theme.colors.light.bg,
                                    color: isDark ? theme.colors.dark.text : theme.colors.light.text,
                                },
                            ]}
                            placeholder="Örn: 2000"
                            placeholderTextColor={isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary}
                            keyboardType="numeric"
                            value={formData.limitAmount}
                            onChangeText={(text) => setFormData({ ...formData, limitAmount: text })}
                        />

                        {/* Buttons */}
                        <View style={styles.modalButtons}>
                            <Button
                                title="İptal"
                                variant="outline"
                                onPress={() => setShowAddModal(false)}
                                style={{ flex: 1 }}
                            />
                            <Button
                                title="Kaydet"
                                variant="gradient"
                                onPress={handleAddBudget}
                                style={{ flex: 1 }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: theme.spacing.lg,
        paddingTop: theme.spacing.xl,
    },
    statsCard: {
        alignItems: 'center',
    },
    statsLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: theme.typography.sizes.sm,
        marginBottom: theme.spacing.xs,
    },
    statsAmount: {
        color: '#FFFFFF',
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: theme.typography.weights.bold,
        marginBottom: theme.spacing.md,
    },
    progressBar: {
        width: '100%',
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: theme.borderRadius.full,
        overflow: 'hidden',
        marginBottom: theme.spacing.sm,
    },
    progressFill: {
        height: '100%',
        borderRadius: theme.borderRadius.full,
    },
    statsSubtext: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: theme.typography.sizes.sm,
    },
    section: {
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.semibold,
        marginBottom: theme.spacing.md,
    },
    budgetCard: {
        marginBottom: theme.spacing.md,
    },
    budgetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    budgetCategory: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.semibold,
    },
    budgetPercentage: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.bold,
    },
    budgetAmounts: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: theme.spacing.sm,
    },
    budgetAmount: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: theme.typography.weights.bold,
    },
    budgetLimit: {
        fontSize: theme.typography.sizes.base,
        marginLeft: theme.spacing.xs,
    },
    budgetProgressBar: {
        marginBottom: theme.spacing.sm,
    },
    budgetRemaining: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: theme.typography.weights.semibold,
    },
    emptyState: {
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    emptyStateIcon: {
        fontSize: 48,
        marginBottom: theme.spacing.md,
    },
    emptyStateText: {
        fontSize: theme.typography.sizes.sm,
        textAlign: 'center',
    },
    addButtonContainer: {
        padding: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        minHeight: 400,
    },
    modalTitle: {
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: theme.typography.weights.bold,
        marginBottom: theme.spacing.xs,
    },
    modalSubtitle: {
        fontSize: theme.typography.sizes.base,
        marginBottom: theme.spacing.lg,
    },
    inputLabel: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: theme.typography.weights.semibold,
        marginBottom: theme.spacing.sm,
    },
    categoryScroll: {
        marginBottom: theme.spacing.lg,
    },
    categoryButton: {
        marginRight: theme.spacing.sm,
    },
    input: {
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.typography.sizes.base,
        marginBottom: theme.spacing.lg,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginTop: 'auto',
    },
});
