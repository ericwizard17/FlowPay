import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { theme } from '../theme';

interface SettingsScreenProps {
    onLogout: () => void;
}

export default function SettingsScreen({ onLogout }: SettingsScreenProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const openPrivacyPolicy = () => {
        Linking.openURL('https://github.com/yourusername/flowpay/blob/main/PRIVACY_POLICY.md')
            .catch(() => Alert.alert('Hata', 'Gizlilik politikası açılamadı'));
    };

    const openTermsOfService = () => {
        Linking.openURL('https://github.com/yourusername/flowpay/blob/main/TERMS_OF_SERVICE.md')
            .catch(() => Alert.alert('Hata', 'Kullanım şartları açılamadı'));
    };

    const handleLogout = () => {
        Alert.alert(
            'Çıkış Yap',
            'Çıkış yapmak istediğinize emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                { text: 'Çıkış Yap', style: 'destructive', onPress: onLogout }
            ]
        );
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: isDark ? theme.colors.dark.bg : theme.colors.light.bg }]}>
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                    Hesap
                </Text>
                
                <TouchableOpacity 
                    style={[styles.item, { backgroundColor: isDark ? theme.colors.dark.card : theme.colors.light.card }]}
                    onPress={() => Alert.alert('Profil', 'Profil düzenleme yakında gelecek')}
                >
                    <Text style={[styles.itemText, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                        Profili Düzenle
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.item, { backgroundColor: isDark ? theme.colors.dark.card : theme.colors.light.card }]}
                    onPress={() => Alert.alert('Güvenlik', 'Güvenlik ayarları yakında gelecek')}
                >
                    <Text style={[styles.itemText, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                        Güvenlik Ayarları
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                    Tercihler
                </Text>
                
                <TouchableOpacity 
                    style={[styles.item, { backgroundColor: isDark ? theme.colors.dark.card : theme.colors.light.card }]}
                    onPress={() => Alert.alert('Bildirimler', 'Bildirim ayarları yakında gelecek')}
                >
                    <Text style={[styles.itemText, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                        Bildirimler
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.item, { backgroundColor: isDark ? theme.colors.dark.card : theme.colors.light.card }]}
                    onPress={() => Alert.alert('Tema', 'Tema değiştirme yakında gelecek')}
                >
                    <Text style={[styles.itemText, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                        Tema
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                    Hakkında
                </Text>
                
                <TouchableOpacity 
                    style={[styles.item, { backgroundColor: isDark ? theme.colors.dark.card : theme.colors.light.card }]}
                    onPress={openPrivacyPolicy}
                >
                    <Text style={[styles.itemText, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                        Gizlilik Politikası
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.item, { backgroundColor: isDark ? theme.colors.dark.card : theme.colors.light.card }]}
                    onPress={openTermsOfService}
                >
                    <Text style={[styles.itemText, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                        Kullanım Şartları
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.item, { backgroundColor: isDark ? theme.colors.dark.card : theme.colors.light.card }]}
                    onPress={() => Alert.alert('FlowPay', 'Versiyon 1.0.0\n© 2025 FlowPay Team')}
                >
                    <Text style={[styles.itemText, { color: isDark ? theme.colors.dark.text : theme.colors.light.text }]}>
                        Uygulama Hakkında
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity 
                    style={[styles.item, styles.logoutButton]}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={[styles.footerText, { color: isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary }]}>
                    FlowPay v1.0.0
                </Text>
                <Text style={[styles.footerText, { color: isDark ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary }]}>
                    © 2025 FlowPay Team
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    item: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    itemText: {
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#ef4444',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    footer: {
        marginTop: 32,
        marginBottom: 48,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        marginVertical: 4,
    },
});

