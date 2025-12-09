# FlowPay Mobile - Akıllı Finans Yönetimi

FlowPay ile para yönetimi artık çok kolay! Gelir ve giderlerinizi takip edin, bütçenizi kontrol altında tutun ve finansal hedeflerinize ulaşın.

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ (LTS önerilir)
- npm veya yarn
- Expo CLI
- Android Studio (Android için)
- Xcode (iOS için, sadece macOS)

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Expo geliştirme sunucusunu başlatın:
```bash
npm start
```

3. Emülatörde veya fiziksel cihazda çalıştırın:
```bash
# Android
npm run android

# iOS (sadece macOS)
npm run ios
```

## 📱 Emülatörde Çalıştırma

### Android Emülatör

1. Android Studio'yu açın
2. AVD Manager'dan bir emülatör oluşturun (önerilen: Pixel 5, Android 13+)
3. Emülatörü başlatın
4. Terminalde `npm run android` komutunu çalıştırın

### Fiziksel Cihaz

1. USB Debugging'i aktif edin
2. Cihazı bilgisayara bağlayın
3. `npm run android` komutunu çalıştırın

## 🏗️ Build Alma

### Preview Build (Test için APK)

```bash
npm run android:preview
```

Bu komut bir APK dosyası oluşturur ve cihazınıza yükleyebilirsiniz.

### Production Build (Play Store için)

```bash
npm run android:build
```

Bu komut bir AAB (Android App Bundle) dosyası oluşturur.

## 📦 Play Store'a Yükleme

### 1. EAS ile Build Alma

```bash
# İlk defa kullanıyorsanız
npm install -g eas-cli
eas login

# Build
eas build --platform android --profile production
```

### 2. Play Console'a Yükleme

1. [Google Play Console](https://play.google.com/console) 'a gidin
2. "Create app" butonuna tıklayın
3. Uygulama bilgilerini doldurun
4. "Production" -> "Create new release"
5. AAB dosyasını yükleyin
6. Store listing bilgilerini doldurun (screenshots, description, etc.)
7. Content rating ve app content formlarını tamamlayın
8. "Review and rollout" ile yayınlayın

## 🔐 Keystore Oluşturma

Production build için keystore dosyası gereklidir:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore flowpay-release.keystore -alias flowpay-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### Gradle Properties Ayarı

`android/gradle.properties` dosyasına ekleyin:

```properties
MYAPP_UPLOAD_STORE_FILE=flowpay-release.keystore
MYAPP_UPLOAD_KEY_ALIAS=flowpay-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=your-store-password
MYAPP_UPLOAD_KEY_PASSWORD=your-key-password
```

## 📸 Screenshots

Store screenshots `assets/store/screenshots/` klasöründe bulunmaktadır:
- Dashboard
- Transactions
- Budgets
- Goals
- Achievements
- Stats
- Settings

## 🔧 Geliştirme

### Klasör Yapısı

```
apps/mobile/
├── src/
│   ├── components/     # Reusable components
│   ├── navigation/     # Navigation setup
│   ├── screens/        # Screen components
│   ├── services/       # API services
│   ├── store/          # State management (Zustand)
│   └── theme/          # Theme configuration
├── assets/             # Images, fonts, etc.
├── android/            # Android native code
└── ios/                # iOS native code
```

### State Management

Zustand kullanılmaktadır:
- `authStore.ts` - Authentication state
- `transactionStore.ts` - Transaction data
- `budgetStore.ts` - Budget data

### API Integration

API servisleri `src/services/` klasöründedir:
- `api.ts` - Base API configuration
- `transactionService.ts` - Transaction operations
- `budgetService.ts` - Budget operations
- `aiService.ts` - AI insights

## 🧪 Test

```bash
npm test
```

## 📝 Environment Variables

`.env.local` dosyası oluşturun:

```env
API_URL=http://your-api-url.com
EXPO_PUBLIC_API_URL=http://your-api-url.com
```

## 🔗 Linkler

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Google Play Console](https://play.google.com/console)

## 📄 License

MIT License - Detaylar için LICENSE dosyasına bakın.

## 📞 İletişim

- Email: support@flowpay.com
- Website: https://flowpay.app

