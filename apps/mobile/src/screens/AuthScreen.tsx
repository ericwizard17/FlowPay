import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

interface AuthScreenProps {
    onAuthSuccess: (user: any) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const { login: setAuthState } = useAuthStore();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen email ve şifrenizi girin');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.login(email, password);
            setAuthState(response.user, response.token);
            onAuthSuccess(response.user);
        } catch (error: any) {
            Alert.alert('Giriş Hatası', error.message || 'Giriş yapılamadı');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!email || !password || !name) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.register(email, password, name);
            setAuthState(response.user, response.token);
            onAuthSuccess(response.user);
        } catch (error: any) {
            Alert.alert('Kayıt Hatası', error.message || 'Kayıt oluşturulamadı');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setName('');
    };

    return (
        <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoIcon}>💰</Text>
                        <Text style={styles.logoText}>FlowPay</Text>
                        <Text style={styles.subtitle}>
                            Finansal hedeflerinize ulaşmanın en kolay yolu
                        </Text>
                    </View>

                    <View style={styles.authCard}>
                        <Text style={styles.authTitle}>
                            {isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
                        </Text>

                        {!isLogin && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Ad Soyad</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Adınız ve soyadınız"
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                    editable={!loading}
                                />
                            </View>
                        )}

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ornek@email.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Şifre</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="En az 6 karakter"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                                editable={!loading}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.primaryButton, loading && styles.buttonDisabled]}
                            onPress={isLogin ? handleLogin : handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.primaryButtonText}>
                                    {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.switchButton}
                            onPress={toggleMode}
                            disabled={loading}
                        >
                            <Text style={styles.switchButtonText}>
                                {isLogin
                                    ? 'Hesabınız yok mu? Kayıt olun'
                                    : 'Zaten hesabınız var mı? Giriş yapın'}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.termsText}>
                            Devam ederek{' '}
                            <Text style={styles.termsLink}>Kullanım Şartlarını</Text> ve{' '}
                            <Text style={styles.termsLink}>Gizlilik Politikasını</Text> kabul
                            etmiş olursunuz.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    logoText: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        opacity: 0.9,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    authCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    authTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        backgroundColor: '#F9FAFB',
    },
    primaryButton: {
        backgroundColor: '#667eea',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    switchButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    switchButtonText: {
        fontSize: 14,
        color: '#667eea',
        fontWeight: '600',
    },
    termsText: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 24,
        lineHeight: 18,
    },
    termsLink: {
        color: '#667eea',
        fontWeight: '600',
    },
});
