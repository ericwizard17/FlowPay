# Android Emülatör Kurulum ve Çalıştırma Rehberi

FlowPay uygulamasını Android emülatörde çalıştırmak için detaylı rehber.

## 📋 Gereksinimler

### Sistem Gereksinimleri
- Windows 10/11 (64-bit)
- Minimum 8GB RAM (16GB önerilir)
- Minimum 10GB boş disk alanı
- Intel/AMD işlemci (Virtualization desteği)

### Yazılım Gereksinimleri
- Node.js 18+ (LTS)
- Java Development Kit (JDK) 17
- Android Studio
- Git

## 🔧 Kurulum Adımları

### 1. Node.js Kurulumu

1. [Node.js İndirme Sayfası](https://nodejs.org/)
2. LTS versiyonunu indirin (v18.x veya v20.x)
3. Kurulumu tamamlayın
4. Kontrol edin:
```bash
node --version
npm --version
```

### 2. Java JDK Kurulumu

1. [Oracle JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) indirin
2. Kurulumu tamamlayın
3. Environment Variables ayarı:
   - `JAVA_HOME`: `C:\Program Files\Java\jdk-17`
   - Path'e ekleyin: `%JAVA_HOME%\bin`
4. Kontrol edin:
```bash
java --version
```

### 3. Android Studio Kurulumu

1. [Android Studio İndirme](https://developer.android.com/studio)
2. Kurulumu başlatın
3. "Standard" installation seçin
4. Android SDK, Android SDK Platform, Android Virtual Device seçili olmalı
5. Kurulumu tamamlayın

### 4. Android SDK Yapılandırması

1. Android Studio'yu açın
2. More Actions -> SDK Manager
3. SDK Platforms sekmesinde:
   - ✅ Android 13.0 (Tiramisu) - API Level 33
   - ✅ Android 14.0 (UpsideDownCake) - API Level 34
4. SDK Tools sekmesinde:
   - ✅ Android SDK Build-Tools
   - ✅ Android SDK Command-line Tools
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools
   - ✅ Intel x86 Emulator Accelerator (HAXM installer)
5. "Apply" butonuna tıklayın

### 5. Environment Variables (Windows)

System Properties -> Advanced -> Environment Variables:

**Yeni System Variables:**
- `ANDROID_HOME`: `C:\Users\[KULLANICI_ADINIZ]\AppData\Local\Android\Sdk`

**Path'e Ekleyin:**
- `%ANDROID_HOME%\platform-tools`
- `%ANDROID_HOME%\tools`
- `%ANDROID_HOME%\tools\bin`
- `%ANDROID_HOME%\emulator`

**Kontrol:**
```bash
adb --version
emulator -version
```

### 6. HAXM Kurulumu (Intel İşlemciler için)

```bash
cd %ANDROID_HOME%\extras\intel\Hardware_Accelerated_Execution_Manager
intelhaxm-android.exe
```

AMD işlemci kullanıyorsanız:
1. BIOS'ta AMD-V'yi aktif edin
2. Windows'ta Hyper-V'yi aktif edin

## 📱 Android Virtual Device (AVD) Oluşturma

### 1. AVD Manager'ı Açın

Android Studio -> More Actions -> Virtual Device Manager

### 2. Yeni Cihaz Oluşturun

1. "Create Device" butonuna tıklayın
2. Hardware seçimi:
   - **Önerilen:** Pixel 5 (6.0", 1080x2340, 440 dpi)
   - **Alternatif:** Pixel 4, Pixel 6
3. "Next" butonuna tıklayın

### 3. System Image Seçimi

1. "Tiramisu" (API Level 33) sekmesini seçin
2. **Önerilen:** "S" (x86_64, Google APIs)
3. "Download" butonuna tıklayın (ilk defa)
4. "Next" butonuna tıklayın

### 4. AVD Yapılandırması

1. AVD Name: "Pixel_5_API_33"
2. Startup orientation: Portrait
3. Advanced Settings:
   - RAM: 2048 MB (2GB)
   - VM heap: 256 MB
   - Internal Storage: 2048 MB (2GB)
   - SD card: 512 MB
4. "Finish" butonuna tıklayın

## 🚀 Uygulamayı Çalıştırma

### 1. Projeyi Hazırlayın

```bash
# Projeyi klonlayın (eğer yapmadıysanız)
cd "D:\Antigravity projects\Finans Takip"

# Bağımlılıkları yükleyin
npm run setup

# Veya sadece mobile için
cd apps/mobile
npm install
```

### 2. Emülatörü Başlatın

**Yöntem 1: Android Studio'dan**
1. Virtual Device Manager'ı açın
2. Oluşturduğunuz cihazın yanındaki ▶ (Play) butonuna tıklayın

**Yöntem 2: Komut satırından**
```bash
emulator -avd Pixel_5_API_33
```

**Yöntem 3: Liste görerek**
```bash
# Tüm AVD'leri listele
emulator -list-avds

# Seçtiğiniz AVD'yi başlat
emulator -avd [AVD_ADI]
```

### 3. Uygulamayı Başlatın

**Terminal 1 - Expo Dev Server:**
```bash
cd "D:\Antigravity projects\Finans Takip\apps\mobile"
npm start
```

**Terminal 2 - Android Build:**
```bash
cd "D:\Antigravity projects\Finans Takip\apps\mobile"
npm run android
```

**Veya tek komutla:**
```bash
cd "D:\Antigravity projects\Finans Takip"
npm run mobile:android
```

## 🔍 Sorun Giderme

### Emülatör Başlamıyor

**1. HAXM Hatası:**
```bash
# HAXM kurulu mu kontrol et
sc query intelhaxm

# Kurulu değilse tekrar kur
cd %ANDROID_HOME%\extras\intel\Hardware_Accelerated_Execution_Manager
intelhaxm-android.exe
```

**2. Virtualization Kapalı:**
- BIOS'a girin (genellikle F2, F10, Delete tuşları)
- Intel VT-x veya AMD-V'yi aktif edin
- Bilgisayarı yeniden başlatın

**3. Hyper-V Çakışması:**
```bash
# PowerShell'i Admin olarak açın
bcdedit /set hypervisorlaunchtype off
# Yeniden başlatın
```

### ADB Device Bulunamıyor

```bash
# ADB'yi yeniden başlat
adb kill-server
adb start-server

# Cihazları listele
adb devices
```

### Emülatör Yavaş Çalışıyor

1. AVD RAM'ini artırın (4GB)
2. Graphics: Hardware - GLES 2.0
3. Multi-Core CPU: 4 cores
4. Arka plandaki uygulamaları kapatın

### Port Çakışması

```bash
# 8081 portunu kullanan işlemi bul
netstat -ano | findstr :8081

# İşlemi kapat
taskkill /PID [PID_NUMARASI] /F

# Expo'yu farklı portta başlat
npx expo start --port 8082
```

### Build Hatası - SDK Bulunamadı

`android/local.properties` dosyası oluşturun:
```properties
sdk.dir=C:\\Users\\[KULLANICI_ADINIZ]\\AppData\\Local\\Android\\Sdk
```

### Gradle Build Hatası

```bash
cd apps/mobile/android
./gradlew clean
cd ..
npm run android
```

### Metro Bundler Hatası

```bash
# Cache temizle
npx expo start -c

# Node modules temizle
cd apps/mobile
rm -rf node_modules
npm install
```

## 🎯 Performans İpuçları

### Emülatör Hızlandırma
1. Snapshot kaydetme aktif edin
2. Cold boot yerine Quick boot kullanın
3. RAM'i optimize edin
4. Gereksiz sensörleri devre dışı bırakın

### Geliştirme İpuçları
1. Fast Refresh aktif tutun
2. Hot Reload kullanın
3. Developer Menu: Ctrl+M (Windows) veya Cmd+M (Mac)
4. Chrome DevTools ile debug: Shake device -> Debug

## 📱 Fiziksel Cihazda Çalıştırma

### 1. USB Debugging Aktif Etme

Android cihazda:
1. Settings -> About phone
2. "Build number"a 7 kez tıklayın (Developer mode)
3. Settings -> System -> Developer options
4. USB debugging'i aktif edin

### 2. Cihazı Bağlama

1. USB ile bilgisayara bağlayın
2. "Allow USB debugging" iznini verin
3. Kontrol edin:
```bash
adb devices
```

### 3. Uygulamayı Çalıştırma

```bash
npm run android
```

## 🔗 Faydalı Komutlar

```bash
# Tüm AVD'leri listele
emulator -list-avds

# Emülatörü başlat
emulator -avd Pixel_5_API_33

# Bağlı cihazları listele
adb devices

# Logları göster
adb logcat

# Uygulamayı kaldır
adb uninstall com.flowpay.app

# APK yükle
adb install app-release.apk

# Ekran görüntüsü al
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Video kaydı al (max 3 dakika)
adb shell screenrecord /sdcard/demo.mp4
adb pull /sdcard/demo.mp4
```

## 📚 Ek Kaynaklar

- [Android Developer Docs](https://developer.android.com/studio/run/emulator)
- [React Native Setup](https://reactnative.dev/docs/environment-setup)
- [Expo Documentation](https://docs.expo.dev)
- [ADB Commands](https://developer.android.com/studio/command-line/adb)

## 🎉 Başarılar!

Artık FlowPay uygulamasını Android emülatörde çalıştırabilirsiniz! 🚀

