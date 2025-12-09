import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, useColorScheme, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppNavigator } from './src/navigation/AppNavigator';
import AuthScreen from './src/screens/AuthScreen';
import { theme } from './src/theme';

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const authStatus = await AsyncStorage.getItem('isAuthenticated');
            const user = await AsyncStorage.getItem('currentUser');

            if (authStatus === 'true' && user) {
                setIsAuthenticated(true);
                setCurrentUser(JSON.parse(user));
            }
        } catch (error) {
            console.error('Auth check error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuthSuccess = (user: any) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('isAuthenticated');
        await AsyncStorage.removeItem('currentUser');
        setIsAuthenticated(false);
        setCurrentUser(null);
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
                            <AppNavigator onLogout={handleLogout} />
                        </SafeAreaView>
                    </NavigationContainer>
                )}
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
