# Android Studio Kurulum Rehberi

## ⚠️ Gerekli Kurulumlar

### 1. Java Development Kit (JDK) 17
Android Studio için JDK 17 gereklidir.

**İndirme:**
- [Oracle JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [OpenJDK 17](https://adoptium.net/)

**Kurulum Sonrası:**
```bash
# JDK'nın kurulu olduğunu doğrulayın
java -version
```

### 2. Android Studio
**İndirme:** [Android Studio](https://developer.android.com/studio)

**Kurulum Adımları:**
1. Android Studio'yu indirin ve kurun
2. İlk açılışta "Standard" kurulum seçin
3. Android SDK'yı otomatik olarak indirecektir

### 3. Android SDK Ayarları

Android Studio'yu açtıktan sonra:
1. **File > Settings** (veya **Configure > Settings**)
2. **Appearance & Behavior > System Settings > Android SDK**
3. Şunları yükleyin:
   - ✅ Android 14.0 (API Level 34)
   - ✅ Android SDK Platform-Tools
   - ✅ Android SDK Build-Tools 34.0.0
   - ✅ Android Emulator

### 4. Ortam Değişkenleri (Environment Variables)

**Windows için:**

1. **Sistem Özellikleri** açın (Win + Pause/Break)
2. **Gelişmiş sistem ayarları** > **Ortam Değişkenleri**
3. Yeni sistem değişkenleri ekleyin:

```
ANDROID_HOME = C:\Users\[KULLANICI_ADI]\AppData\Local\Android\Sdk
JAVA_HOME = C:\Program Files\Java\jdk-17
```

4. **Path** değişkenine ekleyin:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%JAVA_HOME%\bin
```

## 🚀 Projeyi Android Studio'da Açma

### Yöntem 1: Otomatik Yapılandırma

1. **local.properties dosyası oluşturun:**

Projenin `android` klasöründe `local.properties` dosyası oluşturun:

```properties
# Android SDK konumu (kendi yolunuzu yazın)
sdk.dir=C\:\\Users\\[KULLANICI_ADI]\\AppData\\Local\\Android\\Sdk

# Alternatif yol (eğer farklı bir yere kurduysanız)
# sdk.dir=D\:\\Android\\Sdk
```

**Not:** Ters slash'leri çift yazın (`\\`)

2. **Android Studio'yu açın**
3. **Open** > `d:\Antigravity projects\Finans Takip\apps\mobile\android` klasörünü seçin
4. Gradle sync otomatik başlayacak

### Yöntem 2: Komut Satırından Kontrol

Önce Gradle'ın çalışıp çalışmadığını test edin:

```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile\android"
.\gradlew.bat --version
```

Eğer hata alırsanız, JDK yolunu manuel belirtin:

```bash
set JAVA_HOME=C:\Program Files\Java\jdk-17
.\gradlew.bat --version
```

## 🔧 Sık Karşılaşılan Sorunlar

### Sorun 1: "SDK location not found"

**Çözüm:**
`android/local.properties` dosyası oluşturun:
```properties
sdk.dir=C\:\\Users\\[KULLANICI_ADI]\\AppData\\Local\\Android\\Sdk
```

### Sorun 2: "Java version mismatch"

**Çözüm:**
JDK 17 kurulu olduğundan emin olun:
```bash
java -version
# java version "17.0.x" görmeli
```

### Sorun 3: "Gradle sync failed"

**Çözüm 1:** Cache temizle
```bash
cd android
.\gradlew.bat clean
```

**Çözüm 2:** Android Studio'da
- File > Invalidate Caches / Restart
- Restart seçin

### Sorun 4: "Android SDK not found"

**Çözüm:**
1. Android Studio > Settings > Android SDK
2. SDK Location'ı kontrol edin
3. `local.properties` dosyasını bu yola göre güncelleyin

## 📱 Uygulamayı Çalıştırma

### Adım 1: Metro Bundler'ı Başlatın

Yeni bir terminal açın:
```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
npm start
```

### Adım 2: Emülatör Başlatın

**Android Studio'dan:**
1. Tools > Device Manager
2. Create Device (eğer yoksa)
3. Bir cihaz seçin ve Play tuşuna basın

**Komut satırından:**
```bash
# Mevcut emülatörleri listele
emulator -list-avds

# Emülatör başlat
emulator -avd [EMULATOR_ADI]
```

### Adım 3: Uygulamayı Çalıştırın

**Android Studio'dan:**
- Run > Run 'app' (Shift + F10)

**Komut satırından:**
```bash
npm run android
```

## ✅ Kurulum Kontrolü

Tüm gereksinimleri kontrol edin:

```bash
# Java kontrolü
java -version

# Android SDK kontrolü
adb version

# Node.js kontrolü
node -v

# npm kontrolü
npm -v

# Expo CLI kontrolü
npx expo --version
```

## 📞 Yardım

Hala sorun yaşıyorsanız:

1. **Android Studio loglarını kontrol edin:**
   - Help > Show Log in Explorer

2. **Gradle loglarını kontrol edin:**
   ```bash
   cd android
   .\gradlew.bat assembleDebug --stacktrace
   ```

3. **Metro Bundler loglarını kontrol edin:**
   - Terminal çıktısını inceleyin

## 🎯 Hızlı Başlangıç Komutları

```bash
# 1. Bağımlılıkları yükle
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
npm install --legacy-peer-deps

# 2. Metro Bundler başlat (Terminal 1)
npm start

# 3. Android'de çalıştır (Terminal 2)
npm run android
```

## 📝 Notlar

- İlk build 5-10 dakika sürebilir
- Gradle bağımlılıkları ilk seferde indirilir
- Metro Bundler her zaman çalışır durumda olmalı
- Kod değişiklikleri otomatik yansır (Hot Reload)

---

**Başarılar! 🚀**

Herhangi bir sorun yaşarsanız, lütfen hata mesajını tam olarak paylaşın.
