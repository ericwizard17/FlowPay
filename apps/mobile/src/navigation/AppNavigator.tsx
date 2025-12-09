import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme, Text } from 'react-native';
import { Dashboard } from '../screens/Dashboard';
import { Transactions } from '../screens/Transactions';
import { Budgets } from '../screens/Budgets';
import SettingsScreen from '../screens/SettingsScreen';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();

interface AppNavigatorProps {
    onLogout: () => void;
}

// Wrapper components to handle navigation props
const DashboardScreen = () => <Dashboard />;
const TransactionsScreen = () => <Transactions />;
const BudgetsScreen = () => <Budgets />;

export const AppNavigator = ({ onLogout }: AppNavigatorProps) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const SettingsScreenWrapper = () => <SettingsScreen onLogout={onLogout} />;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.light.surface,
                    borderTopColor: isDark ? theme.colors.dark.border : theme.colors.light.border,
                    borderTopWidth: 1,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: theme.colors.primary[500],
                tabBarInactiveTintColor: isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Ana Sayfa',
                    tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏠</Text>,
                }}
            />
            <Tab.Screen
                name="Transactions"
                component={TransactionsScreen}
                options={{
                    tabBarLabel: 'İşlemler',
                    tabBarIcon: () => <Text style={{ fontSize: 24 }}>💳</Text>,
                }}
            />
            <Tab.Screen
                name="Budgets"
                component={BudgetsScreen}
                options={{
                    tabBarLabel: 'Bütçe',
                    tabBarIcon: () => <Text style={{ fontSize: 24 }}>💰</Text>,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreenWrapper}
                options={{
                    tabBarLabel: 'Ayarlar',
                    tabBarIcon: () => <Text style={{ fontSize: 24 }}>⚙️</Text>,
                }}
            />
        </Tab.Navigator>
    );
};
