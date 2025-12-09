# Android Studio'da Mobil Uygulama Çalıştırma - Kesin Gereksinimler

## 📋 Genel Bakış

Bu doküman, FlowPay mobil uygulamasının Android Studio'da sorunsuz çalışması için gereken **tüm** adımları içerir.

## ✅ Kontrol Listesi

### 1. Yazılım Gereksinimleri

#### A. Java Development Kit (JDK)
- [ ] **JDK 17** kurulu olmalı
- [ ] Kurulum yolu: `C:\Program Files\Java\jdk-17` veya benzeri
- [ ] Doğrulama komutu: `java -version`
- [ ] Beklenen çıktı: `java version "17.0.x"`

**İndirme Linkleri:**
- [Oracle JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Microsoft OpenJDK 17](https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-17)

#### B. Android Studio
- [ ] **Android Studio Hedgehog (2023.1.1)** veya daha yeni
- [ ] İndirme: [developer.android.com/studio](https://developer.android.com/studio)
- [ ] İlk kurulumda "Standard" seçeneğini seçin

#### C. Android SDK Bileşenleri
Android Studio > Settings > Android SDK'dan şunları yükleyin:

**SDK Platforms:**
- [ ] Android 14.0 (API Level 34) - **Zorunlu**
- [ ] Android 13.0 (API Level 33) - Önerilen
- [ ] Android SDK Platform-Tools

**SDK Tools:**
- [ ] Android SDK Build-Tools 34.0.0 - **Zorunlu**
- [ ] Android Emulator
- [ ] Android SDK Command-line Tools
- [ ] Google Play services

#### D. Node.js ve npm
- [ ] Node.js 18.x veya üzeri
- [ ] npm 9.x veya üzeri
- [ ] Doğrulama: `node -v` ve `npm -v`
- [ ] İndirme: [nodejs.org](https://nodejs.org/)

---

## 🔧 Ortam Değişkenleri (Environment Variables)

### Windows için Ayarlar

1. **Sistem Özellikleri** açın:
   - `Win + Pause/Break` tuşları
   - Veya: Bilgisayarım > Sağ tık > Özellikler

2. **Gelişmiş sistem ayarları** > **Ortam Değişkenleri**

3. **Sistem değişkenleri** bölümünde **Yeni** butonuna tıklayın:

#### ANDROID_HOME
```
Değişken adı: ANDROID_HOME
Değişken değeri: C:\Users\[KULLANICI_ADI]\AppData\Local\Android\Sdk
```

**Not:** `[KULLANICI_ADI]` yerine kendi Windows kullanıcı adınızı yazın.

#### JAVA_HOME
```
Değişken adı: JAVA_HOME
Değişken değeri: C:\Program Files\Java\jdk-17
```

**Not:** JDK kurulum yolunuzu kontrol edin.

4. **Path** değişkenini düzenleyin ve şunları ekleyin:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%JAVA_HOME%\bin
```

5. **Tamam** ile kaydedin ve **bilgisayarı yeniden başlatın**.

### Doğrulama

Yeni bir PowerShell/CMD açın ve şunları test edin:

```bash
# Java kontrolü
java -version
# Beklenen: java version "17.0.x"

# Android SDK kontrolü
adb version
# Beklenen: Android Debug Bridge version x.x.x

# Ortam değişkeni kontrolü
echo %ANDROID_HOME%
# Beklenen: C:\Users\...\AppData\Local\Android\Sdk

echo %JAVA_HOME%
# Beklenen: C:\Program Files\Java\jdk-17
```

---

## 📱 Proje Yapılandırması

### 1. Bağımlılıkları Yükleme

```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
npm install --legacy-peer-deps
```

**Önemli:** `--legacy-peer-deps` bayrağı zorunludur.

### 2. local.properties Dosyası Oluşturma

`apps/mobile/android/local.properties` dosyasını oluşturun:

```properties
## This file must *NOT* be checked into Version Control Systems
sdk.dir=C\:\\Users\\[KULLANICI_ADI]\\AppData\\Local\\Android\\Sdk
```

**Önemli Notlar:**
- Ters slash'leri çift yazın: `\\`
- `[KULLANICI_ADI]` yerine kendi kullanıcı adınızı yazın
- Dosya `android` klasörünün içinde olmalı

**Otomatik Oluşturma (PowerShell):**
```powershell
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
$sdkPath = "$env:LOCALAPPDATA\Android\Sdk" -replace '\\', '\\'
"sdk.dir=$sdkPath" | Out-File -FilePath "android\local.properties" -Encoding ASCII
```

### 3. Gradle Wrapper İzinleri (Opsiyonel - Linux/Mac)

Windows'ta gerekli değil, ancak diğer sistemlerde:
```bash
cd android
chmod +x gradlew
```

---

## 🚀 Android Studio'da Projeyi Açma

### Adım 1: Android Studio'yu Açın

1. Android Studio'yu başlatın
2. **Open** veya **Open an Existing Project** seçeneğini tıklayın
3. Şu klasöre gidin: `d:\Antigravity projects\Finans Takip\apps\mobile\android`
4. **android** klasörünü seçin ve **OK** butonuna tıklayın

### Adım 2: Gradle Sync

- Android Studio otomatik olarak Gradle sync başlatacak
- İlk sync 5-10 dakika sürebilir (bağımlılıklar indirilir)
- Alt kısımda "Gradle Build" sekmesinden ilerlemeyi izleyin

**Olası Hatalar ve Çözümleri:**

#### Hata: "SDK location not found"
**Çözüm:** `local.properties` dosyasını kontrol edin ve doğru yolu yazdığınızdan emin olun.

#### Hata: "Unsupported Java version"
**Çözüm:** 
1. File > Settings > Build, Execution, Deployment > Build Tools > Gradle
2. Gradle JDK: "jdk-17" seçin
3. Apply > OK

#### Hata: "Failed to install the following Android SDK packages"
**Çözüm:**
1. Tools > SDK Manager
2. Gerekli paketleri manuel olarak yükleyin
3. Gradle sync'i tekrar deneyin

### Adım 3: Build Konfigürasyonu

1. Üst menüden **Build > Make Project** seçin
2. Build tamamlanmasını bekleyin
3. Hata yoksa devam edin

---

## 📲 Emülatör Kurulumu

### Yeni Emülatör Oluşturma

1. **Tools > Device Manager** açın
2. **Create Device** butonuna tıklayın
3. Bir cihaz seçin (örn: Pixel 5)
4. System Image seçin:
   - **API Level 34 (Android 14.0)**
   - x86_64 ABI (daha hızlı)
5. **Download** butonuna tıklayın (ilk seferde)
6. İndirme tamamlandıktan sonra **Next** > **Finish**

### Emülatörü Başlatma

1. Device Manager'da oluşturduğunuz emülatörü bulun
2. ▶️ (Play) butonuna tıklayın
3. Emülatörün tamamen açılmasını bekleyin

---

## ▶️ Uygulamayı Çalıştırma

### Yöntem 1: Metro Bundler + Android Studio

**Terminal 1 - Metro Bundler:**
```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
npm start
```

Metro Bundler başladıktan sonra:

**Android Studio:**
1. Üst kısımda cihaz seçiciden emülatörünüzü seçin
2. ▶️ **Run 'app'** butonuna tıklayın (veya Shift + F10)
3. Uygulama emülatörde açılacak

### Yöntem 2: Komut Satırı

**Terminal 1 - Metro Bundler:**
```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
npm start
```

**Terminal 2 - Android Çalıştır:**
```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
npm run android
```

---

## 🔍 Sorun Giderme

### Gradle Build Başarısız

**Çözüm 1: Cache Temizleme**
```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile\android"
.\gradlew.bat clean
```

**Çözüm 2: Android Studio Cache**
1. File > Invalidate Caches / Restart
2. Invalidate and Restart seçin

**Çözüm 3: Gradle Wrapper Güncelleme**
```bash
cd android
.\gradlew.bat wrapper --gradle-version=8.3
```

### Metro Bundler Bağlantı Hatası

**Çözüm 1: Cache Temizleme**
```bash
npm start -- --reset-cache
```

**Çözüm 2: Port Değiştirme**
```bash
npm start -- --port 8082
```

**Çözüm 3: Watchman (Windows için opsiyonel)**
```bash
npm install -g watchman
```

### Emülatör Başlamıyor

**Çözüm 1: HAXM/Hyper-V Kontrolü**
- Intel: Intel HAXM kurulu olmalı
- AMD: Windows Hypervisor Platform etkin olmalı

**Çözüm 2: BIOS Ayarları**
- Virtualization Technology (VT-x/AMD-V) etkin olmalı

**Çözüm 3: Yeni Emülatör**
- Mevcut emülatörü silin
- Yeni bir emülatör oluşturun

### "Unable to load script" Hatası

**Çözüm:**
1. Metro Bundler'ın çalıştığından emin olun
2. Emülatörde uygulamayı kapatın
3. Metro Bundler'ı yeniden başlatın:
   ```bash
   npm start -- --reset-cache
   ```
4. Uygulamayı tekrar çalıştırın

### "Execution failed for task ':app:installDebug'"

**Çözüm:**
1. Emülatörün tamamen açıldığından emin olun
2. ADB'yi yeniden başlatın:
   ```bash
   adb kill-server
   adb start-server
   ```
3. Cihazı kontrol edin:
   ```bash
   adb devices
   ```

---

## ✅ Başarılı Kurulum Kontrolü

Tüm bunlar çalışıyorsa kurulum başarılıdır:

- [ ] `java -version` JDK 17 gösteriyor
- [ ] `adb version` çalışıyor
- [ ] Android Studio açılıyor
- [ ] Gradle sync başarılı
- [ ] Build başarılı
- [ ] Emülatör açılıyor
- [ ] Metro Bundler başlıyor
- [ ] Uygulama emülatörde açılıyor
- [ ] Hot reload çalışıyor (kod değişikliği yansıyor)

---

## 📞 Ek Yardım

### Log Dosyaları

**Android Studio Logs:**
- Help > Show Log in Explorer

**Gradle Logs:**
```bash
cd android
.\gradlew.bat assembleDebug --stacktrace --info
```

**Metro Bundler Logs:**
- Terminal çıktısını inceleyin

### Faydalı Komutlar

```bash
# Tüm cihazları listele
adb devices

# Logcat (canlı loglar)
adb logcat

# Uygulamayı kaldır
adb uninstall com.flowpay.app

# APK yükle
adb install app-debug.apk

# Gradle tasks listesi
cd android
.\gradlew.bat tasks
```

---

## 🎯 Özet: Minimum Gereksinimler

1. ✅ **JDK 17** kurulu ve JAVA_HOME ayarlı
2. ✅ **Android Studio** kurulu
3. ✅ **Android SDK 34** yüklü
4. ✅ **ANDROID_HOME** ortam değişkeni ayarlı
5. ✅ **Node.js 18+** kurulu
6. ✅ **local.properties** dosyası oluşturulmuş
7. ✅ **npm install --legacy-peer-deps** çalıştırılmış
8. ✅ **Emülatör** oluşturulmuş
9. ✅ **Metro Bundler** çalışıyor
10. ✅ **Gradle sync** başarılı

Bu adımların hepsi tamamlandığında, uygulama Android Studio'da sorunsuz çalışacaktır! 🎉
