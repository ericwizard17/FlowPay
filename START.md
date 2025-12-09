# 🚀 FlowPay - Hızlı Başlangıç

Bu rehber ile FlowPay uygulamasını 5 dakikada çalıştırabilirsiniz!

## ⚡ Hızlı Başlangıç (Emülatörde)

### 1. Gerekli Yazılımlar Kurulu mu?

Kontrol edin:
```bash
node --version    # v18+ olmalı
npm --version     # v9+ olmalı
adb --version     # Android SDK yüklü olmalı
```

Eksik varsa: [EMULATOR_GUIDE.md](./EMULATOR_GUIDE.md) dosyasına bakın.

### 2. Projeyi Hazırlayın

```bash
# Proje dizinine gidin
cd "D:\Antigravity projects\Finans Takip"

# Bağımlılıkları yükleyin (sadece ilk defa)
npm run setup
```

### 3. Android Emülatörü Başlatın

**Yöntem 1: Android Studio'dan**
- Android Studio'yu açın
- More Actions → Virtual Device Manager
- ▶ Play butonuna tıklayın

**Yöntem 2: Komut satırından**
```bash
# Emülatörleri listeleyin
emulator -list-avds

# Emülatörü başlatın
emulator -avd Pixel_5_API_33
```

### 4. Uygulamayı Çalıştırın

```bash
# Yöntem 1: Root dizinden
npm run mobile:android

# Yöntem 2: Mobile dizinden
cd apps/mobile
npm run android
```

### 5. Başarılı! 🎉

Uygulama emülatörde açılacak. İlk açılış 1-2 dakika sürebilir.

## 📱 Fiziksel Cihazda Çalıştırma

### 1. USB Debugging Aktif Edin

Android cihazda:
1. **Ayarlar** → **Telefon Hakkında**
2. **Yapı Numarası**na 7 kez tıklayın (Geliştirici modu aktif olur)
3. **Ayarlar** → **Geliştirici Seçenekleri**
4. **USB Debugging**'i açın

### 2. Cihazı Bağlayın

```bash
# Cihazı USB ile bağlayın
# Cihazda "USB debugging'e izin ver" iznini verin

# Kontrol edin
adb devices
# List of devices attached
# ABC123XYZ    device
```

### 3. Uygulamayı Çalıştırın

```bash
cd apps/mobile
npm run android
```

## 🔧 Sorun Giderme

### "command not found: adb"

Android SDK kurulu değil veya PATH'e eklenmemiş.

**Çözüm:**
1. Android Studio'yu kurun
2. Environment Variables'a ekleyin:
   - `ANDROID_HOME`: `C:\Users\[USERNAME]\AppData\Local\Android\Sdk`
   - PATH'e ekleyin: `%ANDROID_HOME%\platform-tools`
3. Terminali yeniden başlatın

### "No devices/emulators found"

Emülatör veya cihaz bağlı değil.

**Çözüm:**
```bash
# Emülatör başlat
emulator -avd Pixel_5_API_33

# Veya cihazı kontrol et
adb devices
```

### "Port 8081 already in use"

Metro bundler zaten çalışıyor.

**Çözüm:**
```bash
# İşlemi kapat
taskkill /F /IM node.exe

# Veya farklı port kullan
npx expo start --port 8082
```

### "Expo Go app crashed"

Cache sorunu olabilir.

**Çözüm:**
```bash
cd apps/mobile
npx expo start -c    # Cache temizle ve başlat
```

### Build Hatası

**Çözüm:**
```bash
cd apps/mobile
rm -rf node_modules
npm install
npm run android
```

## 💡 Faydalı Komutlar

```bash
# Metro bundler'ı başlat
cd apps/mobile
npm start

# Cache temizleyerek başlat
npm start -- -c

# QR code ile başlat
npm start

# Android
npm run android

# Developer menu (emülatörde)
# Ctrl+M veya Cmd+M

# Reload
# Double R tuşu

# Logları göster
adb logcat *:S ReactNative:V ReactNativeJS:V
```

## 📚 Detaylı Rehberler

İhtiyacınıza göre ilgili rehbere göz atın:

- 📱 **Emülatör Kurulumu**: [EMULATOR_GUIDE.md](./EMULATOR_GUIDE.md)
- 🏪 **Play Store Yayınlama**: [PLAY_STORE_GUIDE.md](./PLAY_STORE_GUIDE.md)
- 🚀 **Deployment**: [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md)
- 📖 **Genel Bilgiler**: [README.md](./README.md)

## 🎯 Özellik Testleri

Uygulamayı çalıştırdıktan sonra test edin:

- [ ] ✅ Login/Register
- [ ] 💰 Gelir ekleme
- [ ] 💳 Gider ekleme
- [ ] 📊 Dashboard görüntüleme
- [ ] 💵 Bütçe oluşturma
- [ ] 🎯 Hedef oluşturma
- [ ] 📈 İstatistikler
- [ ] ⚙️ Ayarlar
- [ ] 🔒 Logout

## 🆘 Yardım

Sorun yaşıyorsanız:

1. **EMULATOR_GUIDE.md** - Detaylı sorun giderme
2. **GitHub Issues** - Bug raporu
3. **Email**: support@flowpay.app

## 🎊 Başarılar!

Artık FlowPay uygulamasını çalıştırabilirsiniz. İyi geliştirmeler!

---

**FlowPay Team** | Version 1.0.0

