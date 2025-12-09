import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Modal,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthScreenProps {
    onAuthSuccess: (user: any) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpStep, setOtpStep] = useState(false);

    const handleGoogleSignIn = async () => {
        // In production, use @react-native-google-signin/google-signin
        const mockUser = {
            uid: 'google_' + Date.now(),
            email: 'user@gmail.com',
            displayName: 'Demo User',
            photoURL: null,
            provider: 'google',
        };

        await AsyncStorage.setItem('currentUser', JSON.stringify(mockUser));
        await AsyncStorage.setItem('isAuthenticated', 'true');
        onAuthSuccess(mockUser);
    };

    const handleAppleSignIn = async () => {
        // In production, use @invertase/react-native-apple-authentication
        const mockUser = {
            uid: 'apple_' + Date.now(),
            email: 'user@icloud.com',
            displayName: 'Demo User',
            photoURL: null,
            provider: 'apple',
        };

        await AsyncStorage.setItem('currentUser', JSON.stringify(mockUser));
        await AsyncStorage.setItem('isAuthenticated', 'true');
        onAuthSuccess(mockUser);
    };

    const sendOTP = () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            Alert.alert('Hata', 'Lütfen geçerli bir telefon numarası girin');
            return;
        }

        // In production, send OTP via Firebase or SMS service
        setOtpStep(true);
        Alert.alert('Başarılı', `${phoneNumber} numarasına kod gönderildi`);
    };

    const verifyOTP = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            Alert.alert('Hata', 'Lütfen 6 haneli kodu girin');
            return;
        }

        // In production, verify with backend
        const mockUser = {
            uid: 'phone_' + Date.now(),
            email: null,
            displayName: phoneNumber,
            photoURL: null,
            provider: 'phone',
        };

        await AsyncStorage.setItem('currentUser', JSON.stringify(mockUser));
        await AsyncStorage.setItem('isAuthenticated', 'true');
        setPhoneModalVisible(false);
        onAuthSuccess(mockUser);
    };

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-verify when all 6 digits entered
        if (newOtp.every(digit => digit.length === 1)) {
            setTimeout(() => verifyOTP(), 300);
        }
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
                >
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoIcon}>💰</Text>
                        <Text style={styles.logoText}>Finans Takip</Text>
                        <Text style={styles.subtitle}>
                            Finansal hedeflerinize ulaşmanın en kolay yolu
                        </Text>
                    </View>

                    <View style={styles.authCard}>
                        <TouchableOpacity
                            style={[styles.authButton, styles.googleButton]}
                            onPress={handleGoogleSignIn}
                        >
                            <Text style={styles.authButtonText}>🔍 Google ile Devam Et</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.authButton, styles.appleButton]}
                            onPress={handleAppleSignIn}
                        >
                            <Text style={[styles.authButtonText, styles.appleButtonText]}>
                                Apple ile Devam Et
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.authButton, styles.phoneButton]}
                            onPress={() => setPhoneModalVisible(true)}
                        >
                            <Text style={styles.authButtonText}>
                                📱 Telefon Numarası ile Devam Et
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

            {/* Phone Auth Modal */}
            <Modal
                visible={phoneModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setPhoneModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Telefon ile Giriş</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setPhoneModalVisible(false);
                                    setOtpStep(false);
                                    setOtp(['', '', '', '', '', '']);
                                }}
                            >
                                <Text style={styles.modalClose}>×</Text>
                            </TouchableOpacity>
                        </View>

                        {!otpStep ? (
                            <View>
                                <Text style={styles.inputLabel}>Telefon Numaranız</Text>
                                <TextInput
                                    style={styles.phoneInput}
                                    placeholder="+90 5XX XXX XX XX"
                                    keyboardType="phone-pad"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    maxLength={17}
                                />
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={sendOTP}
                                >
                                    <Text style={styles.primaryButtonText}>Kod Gönder</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <Text style={styles.otpInfo}>
                                    {phoneNumber} numarasına gönderilen 6 haneli kodu girin
                                </Text>
                                <View style={styles.otpContainer}>
                                    {otp.map((digit, index) => (
                                        <TextInput
                                            key={index}
                                            style={styles.otpInput}
                                            maxLength={1}
                                            keyboardType="number-pad"
                                            value={digit}
                                            onChangeText={(value) => handleOtpChange(value, index)}
                                        />
                                    ))}
                                </View>
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={verifyOTP}
                                >
                                    <Text style={styles.primaryButtonText}>Doğrula</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={sendOTP} style={styles.resendButton}>
                                    <Text style={styles.resendText}>
                                        Kod gelmedi mi? <Text style={styles.resendLink}>Tekrar Gönder</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
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
    authButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 2,
    },
    googleButton: {
        borderColor: '#DB4437',
        backgroundColor: '#FFFFFF',
    },
    appleButton: {
        borderColor: '#000000',
        backgroundColor: '#000000',
    },
    phoneButton: {
        borderColor: '#10B981',
        backgroundColor: '#FFFFFF',
    },
    authButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    appleButtonText: {
        color: '#FFFFFF',
    },
    termsText: {
        fontSize: 13,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 20,
    },
    termsLink: {
        color: '#667eea',
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 32,
        width: '90%',
        maxWidth: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    modalClose: {
        fontSize: 32,
        color: '#6B7280',
        fontWeight: '300',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    phoneInput: {
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        marginBottom: 20,
    },
    primaryButton: {
        backgroundColor: '#667eea',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    otpInfo: {
        textAlign: 'center',
        color: '#6B7280',
        marginBottom: 24,
        fontSize: 14,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    otpInput: {
        width: 48,
        height: 56,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
    },
    resendButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    resendText: {
        fontSize: 14,
        color: '#6B7280',
    },
    resendLink: {
        color: '#667eea',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});
