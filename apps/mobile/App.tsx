import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, useColorScheme, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/navigation/AppNavigator';
import AuthScreen from './src/screens/AuthScreen';
import { theme } from './src/theme';
import { useAuthStore } from './src/store/authStore';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

export default function App() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { isAuthenticated, isLoading, user, initialize, logout } = useAuthStore();

    useEffect(() => {
        initialize();
    }, []);

    const handleAuthSuccess = (user: any) => {
        // Auth state is already updated by authService and authStore
        console.log('Auth success:', user);
    };

    const handleLogout = async () => {
        await logout();
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDark ? theme.colors.dark.bg : theme.colors.light.bg }}>
                <ActivityIndicator size="large" color="#667eea" />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                {!isAuthenticated ? (
                    <AuthScreen onAuthSuccess={handleAuthSuccess} />
                ) : (
                    <NavigationContainer>
                        <SafeAreaView
                            style={{
                                flex: 1,
                                backgroundColor: isDark ? theme.colors.dark.bg : theme.colors.light.bg,
                            }}
                        >
                            <StatusBar
                                barStyle={isDark ? 'light-content' : 'dark-content'}
                                backgroundColor={isDark ? theme.colors.dark.bg : theme.colors.light.bg}
                            />
                            <AppNavigator user={user} onLogout={handleLogout} />
                        </SafeAreaView>
                    </NavigationContainer>
                )}
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
