import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    useColorScheme,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { theme } from '../theme';

interface Transaction {
    id: string;
    amount: number; // Pozitif = Gelir, Negatif = Gider
    category: string;
    note?: string;
    date: Date;
}

const CATEGORIES = ['Market', 'Ulaşım', 'Eğlence', 'Faturalar', 'Maaş', 'Diğer'];

export const Transactions: React.FC = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [showAddModal, setShowAddModal] = useState(false);
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Mock data
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: '1', amount: -150, category: 'Market', note: 'Haftalık alışveriş', date: new Date('2025-12-08') },
        { id: '2', amount: -80, category: 'Ulaşım', date: new Date('2025-12-07') },
        { id: '3', amount: 5000, category: 'Maaş', date: new Date('2025-12-05') },
        { id: '4', amount: -200, category: 'Market', date: new Date('2025-12-04') },
        { id: '5', amount: -120, category: 'Eğlence', note: 'Sinema', date: new Date('2025-12-03') },
    ]);

    // Form state
    const [formData, setFormData] = useState({
        amount: '',
        category: 'Market',
        note: '',
        type: 'expense' as 'income' | 'expense',
    });

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'income' && t.amount <= 0) return false;
        if (filter === 'expense' && t.amount >= 0) return false;
        if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
        return true;
    });

    const handleAddTransaction = () => {
        const amount = parseFloat(formData.amount);
        if (isNaN(amount) || amount <= 0) return;

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            amount: formData.type === 'expense' ? -amount : amount,
            category: formData.category,
            note: formData.note || undefined,
            date: new Date(),
        };

        setTransactions([newTransaction, ...transactions]);
        setShowAddModal(false);
        setFormData({ amount: '', category: 'Market', note: '', type: 'expense' });
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isDark ? theme.colors.dark.bg : theme.colors.light.bg },
            ]}
        >
            {/* Filters */}
            <View style={styles.filters}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'all' && styles.filterButtonActive,
                            { borderColor: isDark ? theme.colors.dark.border : theme.colors.light.border },
                        ]}
                        onPress={() => setFilter('all')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === 'all' && styles.filterButtonTextActive,
                                { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                            ]}
                        >
                            Tümü
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'income' && styles.filterButtonActive,
                            { borderColor: isDark ? theme.colors.dark.border : theme.colors.light.border },
                        ]}
                        onPress={() => setFilter('income')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === 'income' && styles.filterButtonTextActive,
                                { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                            ]}
                        >
                            Gelir
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === 'expense' && styles.filterButtonActive,
                            { borderColor: isDark ? theme.colors.dark.border : theme.colors.light.border },
                        ]}
                        onPress={() => setFilter('expense')}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === 'expense' && styles.filterButtonTextActive,
                                { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                            ]}
                        >
                            Gider
                        </Text>
                    </TouchableOpacity>

                    {CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.filterButton,
                                selectedCategory === cat && styles.filterButtonActive,
                                { borderColor: isDark ? theme.colors.dark.border : theme.colors.light.border },
                            ]}
                            onPress={() => setSelectedCategory(selectedCategory === cat ? 'all' : cat)}
                        >
                            <Text
                                style={[
                                    styles.filterButtonText,
                                    selectedCategory === cat && styles.filterButtonTextActive,
                                    { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Transactions List */}
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                {filteredTransactions.length === 0 ? (
                    <Card variant="default" style={styles.emptyCard}>
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateIcon}>📝</Text>
                            <Text
                                style={[
                                    styles.emptyStateText,
                                    { color: isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary },
                                ]}
                            >
                                Henüz işlem bulunmuyor
                            </Text>
                        </View>
                    </Card>
                ) : (
                    filteredTransactions.map(transaction => (
                        <Card key={transaction.id} variant="default" style={styles.transactionCard}>
                            <View style={styles.transactionRow}>
                                <View style={styles.transactionInfo}>
                                    <Text
                                        style={[
                                            styles.transactionCategory,
                                            { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                                        ]}
                                    >
                                        {transaction.category}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.transactionNote,
                                            { color: isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary },
                                        ]}
                                    >
                                        {transaction.note || new Date(transaction.date).toLocaleDateString('tr-TR')}
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.transactionAmount,
                                        { color: transaction.amount > 0 ? theme.colors.income : theme.colors.expense },
                                    ]}
                                >
                                    {transaction.amount > 0 ? '+' : ''}₺{Math.abs(transaction.amount).toLocaleString('tr-TR')}
                                </Text>
                            </View>
                        </Card>
                    ))
                )}
            </ScrollView>

            {/* Add Button */}
            <View style={styles.addButtonContainer}>
                <Button
                    title="İşlem Ekle"
                    variant="gradient"
                    size="lg"
                    fullWidth
                    onPress={() => setShowAddModal(true)}
                />
            </View>

            {/* Add Transaction Modal */}
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
                            Yeni İşlem
                        </Text>

                        {/* Type Selection */}
                        <View style={styles.typeSelector}>
                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    formData.type === 'expense' && styles.typeButtonActive,
                                    { backgroundColor: formData.type === 'expense' ? theme.colors.expense : 'transparent' },
                                ]}
                                onPress={() => setFormData({ ...formData, type: 'expense' })}
                            >
                                <Text style={[styles.typeButtonText, formData.type === 'expense' && { color: '#FFF' }]}>
                                    Gider
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    formData.type === 'income' && styles.typeButtonActive,
                                    { backgroundColor: formData.type === 'income' ? theme.colors.income : 'transparent' },
                                ]}
                                onPress={() => setFormData({ ...formData, type: 'income' })}
                            >
                                <Text style={[styles.typeButtonText, formData.type === 'income' && { color: '#FFF' }]}>
                                    Gelir
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Amount Input */}
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: isDark ? theme.colors.dark.bg : theme.colors.light.bg,
                                    color: isDark ? theme.colors.dark.text : theme.colors.light.text,
                                },
                            ]}
                            placeholder="Tutar (₺)"
                            placeholderTextColor={isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary}
                            keyboardType="numeric"
                            value={formData.amount}
                            onChangeText={(text) => setFormData({ ...formData, amount: text })}
                        />

                        {/* Category Selection */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                            {CATEGORIES.map(cat => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.categoryButton,
                                        formData.category === cat && styles.categoryButtonActive,
                                        { borderColor: isDark ? theme.colors.dark.border : theme.colors.light.border },
                                    ]}
                                    onPress={() => setFormData({ ...formData, category: cat })}
                                >
                                    <Text
                                        style={[
                                            styles.categoryButtonText,
                                            formData.category === cat && styles.categoryButtonTextActive,
                                            { color: isDark ? theme.colors.dark.text : theme.colors.light.text },
                                        ]}
                                    >
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Note Input */}
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: isDark ? theme.colors.dark.bg : theme.colors.light.bg,
                                    color: isDark ? theme.colors.dark.text : theme.colors.light.text,
                                },
                            ]}
                            placeholder="Not (opsiyonel)"
                            placeholderTextColor={isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary}
                            value={formData.note}
                            onChangeText={(text) => setFormData({ ...formData, note: text })}
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
                                onPress={handleAddTransaction}
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
    filters: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
    },
    filterButton: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        marginRight: theme.spacing.sm,
    },
    filterButtonActive: {
        backgroundColor: theme.colors.primary[500],
        borderColor: theme.colors.primary[500],
    },
    filterButtonText: {
        fontSize: theme.typography.sizes.sm,
    },
    filterButtonTextActive: {
        color: '#FFFFFF',
        fontWeight: theme.typography.weights.semibold,
    },
    list: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    emptyCard: {
        marginTop: theme.spacing.xl,
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
    transactionCard: {
        marginBottom: theme.spacing.sm,
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    transactionInfo: {
        flex: 1,
    },
    transactionCategory: {
        fontSize: theme.typography.sizes.base,
        fontWeight: theme.typography.weights.semibold,
        marginBottom: theme.spacing.xs,
    },
    transactionNote: {
        fontSize: theme.typography.sizes.sm,
    },
    transactionAmount: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.bold,
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
        marginBottom: theme.spacing.lg,
    },
    typeSelector: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    typeButton: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.gray[300],
    },
    typeButtonActive: {
        borderWidth: 0,
    },
    typeButtonText: {
        fontSize: theme.typography.sizes.base,
        fontWeight: theme.typography.weights.semibold,
    },
    input: {
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.typography.sizes.base,
        marginBottom: theme.spacing.md,
    },
    categoryScroll: {
        marginBottom: theme.spacing.md,
    },
    categoryButton: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        marginRight: theme.spacing.sm,
    },
    categoryButtonActive: {
        backgroundColor: theme.colors.primary[500],
        borderColor: theme.colors.primary[500],
    },
    categoryButtonText: {
        fontSize: theme.typography.sizes.sm,
    },
    categoryButtonTextActive: {
        color: '#FFFFFF',
        fontWeight: theme.typography.weights.semibold,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginTop: 'auto',
    },
});
