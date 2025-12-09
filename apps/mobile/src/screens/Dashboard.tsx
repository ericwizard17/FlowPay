import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    useColorScheme,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../components/Card';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

// Mock data - gerçek uygulamada API'den gelecek
const mockTransactions = [
    { id: '1', amount: -150, category: 'Market', date: new Date('2025-12-08') },
    { id: '2', amount: -80, category: 'Ulaşım', date: new Date('2025-12-07') },
    { id: '3', amount: 5000, category: 'Maaş', date: new Date('2025-12-05') },
    { id: '4', amount: -200, category: 'Market', date: new Date('2025-12-04') },
    { id: '5', amount: -120, category: 'Eğlence', date: new Date('2025-12-03') },
    { id: '6', amount: -90, category: 'Market', date: new Date('2025-12-02') },
];

interface DashboardProps {
    user?: {
        name: string;
    };
}

export const Dashboard: React.FC<DashboardProps> = ({ user } = {}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Hesaplamalar
    const totalIncome = mockTransactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = Math.abs(
        mockTransactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + t.amount, 0)
    );

    const balance = totalIncome - totalExpense;

    // Son 7 gün için basit veri
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dayExpense = mockTransactions
            .filter(t => {
                const tDate = new Date(t.date);
                return tDate.toDateString() === date.toDateString() && t.amount < 0;
            })
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        return { date, amount: dayExpense };
    });

    // Basit AI analizi
    const aiMessage = "Market harcamalarınız bu ay geçen aya göre %8 arttı. 💡";

    return (
        <ScrollView
            style={[
                styles.container,
                { backgroundColor: isDark ? theme.colors.dark.bg : theme.colors.light.bg },
            ]}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={[styles.greeting, { color: isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary }]}>
                        Merhaba,
                    </Text>
                    <Text style={[styles.userName, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                        {user?.name || 'Kullanıcı'}
                    </Text>
                </View>
            </View>

            {/* Balance Card */}
            <Card variant="gradient" style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Toplam Bakiye</Text>
                <Text style={styles.balanceAmount}>
                    ₺{balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </Text>
                <View style={styles.balanceStats}>
                    <View style={styles.balanceStat}>
                        <Text style={styles.balanceStatLabel}>Gelir</Text>
                        <Text style={[styles.balanceStatValue, { color: theme.colors.income }]}>
                            +₺{totalIncome.toLocaleString('tr-TR')}
                        </Text>
                    </View>
                    <View style={styles.balanceStat}>
                        <Text style={styles.balanceStatLabel}>Gider</Text>
                        <Text style={[styles.balanceStatValue, { color: theme.colors.expense }]}>
                            -₺{totalExpense.toLocaleString('tr-TR')}
                        </Text>
                    </View>
                </View>
            </Card>

            {/* Son 7 Gün Grafiği */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                    Son 7 Gün
                </Text>
                <Card variant="default">
                    <View style={styles.chartContainer}>
                        {last7Days.map((day, index) => {
                            const maxAmount = Math.max(...last7Days.map(d => d.amount), 1);
                            const heightPercent = (day.amount / maxAmount) * 100;

                            return (
                                <View key={index} style={styles.chartBar}>
                                    <View style={styles.chartBarContainer}>
                                        <View
                                            style={[
                                                styles.chartBarFill,
                                                {
                                                    height: `${heightPercent}%`,
                                                    backgroundColor: theme.colors.primary[500],
                                                },
                                            ]}
                                        />
                                    </View>
                                    <Text style={[styles.chartLabel, { color: isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary }]}>
                                        {day.date.toLocaleDateString('tr-TR', { weekday: 'short' })}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </Card>
            </View>

            {/* AI Mesajı */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                    AI Analizi
                </Text>
                <Card variant="glass" style={styles.aiCard}>
                    <View style={styles.aiIcon}>
                        <Text style={styles.aiIconText}>🤖</Text>
                    </View>
                    <Text style={[styles.aiMessage, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                        {aiMessage}
                    </Text>
                </Card>
            </View>

            {/* Son İşlemler */}
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                    Son İşlemler
                </Text>
                {mockTransactions.slice(0, 5).map(transaction => (
                    <Card key={transaction.id} variant="default" style={styles.transactionCard}>
                        <View style={styles.transactionRow}>
                            <View style={styles.transactionInfo}>
                                <Text style={[styles.transactionCategory, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                                    {transaction.category}
                                </Text>
                                <Text style={[styles.transactionDate, { color: isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary }]}>
                                    {new Date(transaction.date).toLocaleDateString('tr-TR')}
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
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.lg,
        paddingTop: theme.spacing.xl,
    },
    greeting: {
        fontSize: theme.typography.sizes.base,
        marginBottom: theme.spacing.xs,
    },
    userName: {
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: theme.typography.weights.bold,
    },
    balanceCard: {
        marginHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    balanceLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: theme.typography.sizes.sm,
        marginBottom: theme.spacing.xs,
    },
    balanceAmount: {
        color: '#FFFFFF',
        fontSize: theme.typography.sizes['4xl'],
        fontWeight: theme.typography.weights.bold,
        marginBottom: theme.spacing.lg,
    },
    balanceStats: {
        flexDirection: 'row',
        gap: theme.spacing.lg,
    },
    balanceStat: {
        flex: 1,
    },
    balanceStatLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: theme.typography.sizes.xs,
        marginBottom: theme.spacing.xs,
    },
    balanceStatValue: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.semibold,
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
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 120,
        paddingVertical: theme.spacing.md,
    },
    chartBar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    chartBarContainer: {
        width: '70%',
        height: 80,
        justifyContent: 'flex-end',
    },
    chartBarFill: {
        width: '100%',
        borderRadius: theme.borderRadius.sm,
        minHeight: 4,
    },
    chartLabel: {
        fontSize: theme.typography.sizes.xs,
        marginTop: theme.spacing.xs,
    },
    aiCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    aiIcon: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
    },
    aiIconText: {
        fontSize: 20,
    },
    aiMessage: {
        flex: 1,
        fontSize: theme.typography.sizes.base,
        lineHeight: theme.typography.sizes.base * 1.5,
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
    transactionDate: {
        fontSize: theme.typography.sizes.sm,
    },
    transactionAmount: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.bold,
    },
});
