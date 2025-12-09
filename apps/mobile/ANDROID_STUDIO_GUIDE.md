# FlowPay Mobile - Android Studio Kurulum Rehberi

## Android Studio'da Projeyi Açma

1. **Android Studio'yu açın**
2. **"Open an Existing Project"** seçeneğini tıklayın
3. Bu klasöre gidin: `d:\Antigravity projects\Finans Takip\apps\mobile\android`
4. **android** klasörünü seçin ve **OK** butonuna tıklayın

## Gereksinimler

- Android Studio Arctic Fox veya daha yeni
- JDK 17 veya daha yeni
- Android SDK 34
- Node.js 18 veya daha yeni

## İlk Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
npm install --legacy-peer-deps
```

### 2. Metro Bundler'ı Başlatın

Yeni bir terminal açın ve şu komutu çalıştırın:

```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
npm start
```

### 3. Android Studio'da Build

1. Android Studio'da projeyi açın
2. **Build > Make Project** seçeneğini tıklayın
3. Gradle sync tamamlanmasını bekleyin

### 4. Uygulamayı Çalıştırın

**Seçenek 1: Android Studio'dan**
- Android Studio'da **Run > Run 'app'** seçeneğini tıklayın
- Emülatör veya fiziksel cihaz seçin

**Seçenek 2: Komut Satırından**
```bash
npm run android
```

## Sorun Giderme

### Gradle Sync Hatası

Eğer Gradle sync hatası alırsanız:

1. **File > Invalidate Caches / Restart** seçeneğini kullanın
2. Android Studio'yu yeniden başlatın
3. Projeyi tekrar açın

### Metro Bundler Bağlantı Hatası

Eğer Metro Bundler'a bağlanamıyorsanız:

```bash
# Metro cache'i temizleyin
npm start -- --reset-cache
```

### Build Hatası

Eğer build hatası alırsanız:

```bash
# Android build klasörünü temizleyin
cd android
./gradlew clean
cd ..

# Node modules'i yeniden yükleyin
rm -rf node_modules
npm install --legacy-peer-deps
```

## Önemli Notlar

- **Metro Bundler her zaman çalışıyor olmalı**: Uygulamayı çalıştırmadan önce `npm start` komutunu çalıştırın
- **Hot Reload**: Kod değişiklikleriniz otomatik olarak uygulamaya yansıyacaktır
- **Debug Modu**: Varsayılan olarak debug modunda çalışır

## Üretim Build'i

APK oluşturmak için:

```bash
cd android
./gradlew assembleRelease
```

APK dosyası şu konumda oluşturulacaktır:
`android/app/build/outputs/apk/release/app-release.apk`

## Daha Fazla Bilgi

- [React Native Dokümantasyonu](https://reactnative.dev/docs/getting-started)
- [Expo Dokümantasyonu](https://docs.expo.dev/)
- [Android Studio Rehberi](https://developer.android.com/studio/intro)
