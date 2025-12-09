# Play Store Yayınlama Rehberi

FlowPay uygulamasını Google Play Store'a yayınlamak için adım adım rehber.

## 📋 Ön Gereksinimler

### 1. Google Play Console Hesabı
- [Google Play Console](https://play.google.com/console) hesabı oluşturun
- 25$ tek seferlik kayıt ücreti ödeme yapın

### 2. Geliştirici Bilgileri
- Geliştirici adı
- E-posta adresi
- Website URL (opsiyonel)
- Gizlilik politikası URL (zorunlu)

### 3. Uygulama Bilgileri
- Uygulama adı: FlowPay - Akıllı Finans
- Kısa açıklama (80 karakter)
- Uzun açıklama (4000 karakter)
- Kategori: Finance
- İçerik rating: Everyone

## 🔨 Build Hazırlama

### 1. Keystore Oluşturma

```bash
cd apps/mobile/android/app
keytool -genkeypair -v -storetype PKCS12 -keystore flowpay-release.keystore -alias flowpay-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Sorulacak bilgiler:
- Keystore şifresi (güvenli bir şifre seçin)
- Ad ve soyad
- Organizasyon birimi
- Organizasyon adı
- Şehir
- Eyalet
- Ülke kodu (TR)

**ÖNEMLİ:** Keystore dosyasını ve şifresini güvenli bir yerde saklayın!

### 2. Gradle Properties Ayarı

`apps/mobile/android/gradle.properties` dosyasına ekleyin:

```properties
MYAPP_UPLOAD_STORE_FILE=flowpay-release.keystore
MYAPP_UPLOAD_KEY_ALIAS=flowpay-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=keystore-sifreniz
MYAPP_UPLOAD_KEY_PASSWORD=key-sifreniz
```

### 3. EAS Build Configuration

`apps/mobile/eas.json` dosyası zaten yapılandırılmış durumda.

### 4. Build Alma

```bash
cd apps/mobile

# EAS CLI kurulumu (ilk defa)
npm install -g eas-cli

# Expo hesabına giriş
eas login

# Proje oluşturma
eas build:configure

# Production build
eas build --platform android --profile production
```

Build tamamlandığında AAB dosyası indirilecektir.

## 📱 Play Console Kurulumu

### 1. Uygulama Oluşturma

1. [Play Console](https://play.google.com/console) 'a gidin
2. "Create app" butonuna tıklayın
3. Bilgileri doldurun:
   - App name: FlowPay - Akıllı Finans
   - Default language: Türkçe
   - App or game: App
   - Free or paid: Free
   - Declarations'ları kabul edin
4. "Create app" butonuna tıklayın

### 2. Store Listing (Mağaza Kaydı)

**App details:**
- App name: FlowPay - Akıllı Finans
- Short description:
  ```
  Para yönetimi artık kolay! Gelir-gider takibi, bütçe kontrolü ve finansal hedefler.
  ```
- Full description:
  ```
  FlowPay ile para yönetimi artık çok kolay!
  
  🎯 ÖZELLİKLER:
  • 💰 Gelir ve gider takibi
  • 📊 Görsel istatistikler ve analizler
  • 💳 Kategori bazlı harcama takibi
  • 🎯 Bütçe hedefleri belirleme
  • 📈 Finansal hedefler ve tasarruf planları
  • 🔔 Akıllı bildirimler
  • 🔒 Biyometrik güvenlik (parmak izi/yüz tanıma)
  • 🌙 Dark mode desteği
  • 📱 Kolay ve modern arayüz
  
  FlowPay, finansal hedeflerinize ulaşmanız için size yardımcı olan akıllı bir finans asistanıdır. 
  Harcamalarınızı takip edin, bütçenizi kontrol altında tutun ve geleceğiniz için tasarruf edin.
  
  Para yönetimi hiç bu kadar kolay olmamıştı!
  ```

**App icon:**
- `apps/mobile/assets/icon.png` dosyasını yükleyin (512x512 px)

**Feature graphic:**
- 1024 x 500 px boyutunda bir grafik hazırlayın

**Phone screenshots:**
`apps/mobile/assets/store/screenshots/mobile/` klasöründeki ekran görüntülerini yükleyin:
- Minimum 2, maksimum 8 adet
- 16:9 veya 9:16 aspect ratio
- PNG veya JPEG format

### 3. Content Rating

1. "Start questionnaire" butonuna tıklayın
2. Email adresinizi girin
3. Category: Finance
4. Soruları cevaplayın (tüm "No" seçeneklerini işaretleyin)
5. "Submit" butonuna tıklayın

### 4. Target Audience

1. Target age: 18 and over
2. "Next" butonuna tıklayın

### 5. App Content

**Privacy Policy:**
- URL: `https://flowpay.app/privacy` (veya GitHub Pages URL'niz)
- `PRIVACY_POLICY.md` dosyasını bir web sayfasına dönüştürün

**App access:**
- "All functionality is available to all users"

**Ads:**
- "No, my app does not contain ads"

**Data safety:**
1. "Start" butonuna tıklayın
2. "Does your app collect or share user data?"
   - Evet, data topluyoruz
3. Data types:
   - Personal info: Name, Email
   - Financial info: Transaction data, Budget data
   - App activity: In-app actions
4. Data usage:
   - App functionality
   - Analytics
5. Data security:
   - Data is encrypted in transit
   - Data is encrypted at rest
   - Users can request deletion
6. "Submit" butonuna tıklayın

### 6. Production Release

1. Sol menüden "Production" seçin
2. "Create new release" butonuna tıklayın
3. "Upload" butonuna tıklayın
4. EAS'den indirdiğiniz AAB dosyasını yükleyin
5. Release name: 1.0.0 (1)
6. Release notes:
   ```
   🎉 İlk sürüm!
   
   • Gelir ve gider takibi
   • Kategori bazlı analiz
   • Bütçe yönetimi
   • Finansal hedefler
   • Modern ve kullanıcı dostu arayüz
   • Güvenli veri saklama
   ```
7. "Next" butonuna tıklayın
8. "Review release" butonuna tıklayın
9. Tüm bilgileri kontrol edin
10. "Start rollout to Production" butonuna tıklayın

## 🔍 Review Süreci

- Google review süreci genellikle 1-7 gün sürer
- Review durumunu Play Console'dan takip edebilirsiniz
- Email ile bildirim alırsınız

## ✅ Onaylandıktan Sonra

- Uygulama Play Store'da yayına girer
- URL: `https://play.google.com/store/apps/details?id=com.flowpay.app`
- Kullanıcı yorumlarını takip edin
- Düzenli güncellemeler yayınlayın

## 🔄 Güncelleme Yayınlama

```bash
cd apps/mobile

# app.json'da version ve versionCode'u artırın
# version: "1.0.1"
# versionCode: 2

# Build alın
eas build --platform android --profile production

# Play Console'da yeni release oluşturun
# AAB dosyasını yükleyin
```

## 📊 Store Optimization (ASO)

### Keywords (Anahtar Kelimeler)
- finans takip
- para yönetimi
- bütçe planlama
- gelir gider takip
- tasarruf
- harcama takibi
- kişisel finans

### Promotional Text
```
🎯 Finansal özgürlüğe giden yolda yanınızdayız! FlowPay ile para yönetimi artık çok kolay. Hemen indirin!
```

## 🛠️ Sorun Giderme

### Build Hatası
- Keystore bilgilerini kontrol edin
- `gradle.properties` dosyasını kontrol edin
- Cache temizleyin: `cd android && ./gradlew clean`

### Upload Hatası
- AAB dosyasının imzalandığından emin olun
- Version code'un artırıldığından emin olun
- Bundle'ın max 150MB olduğundan emin olun

### Review Reddedilmesi
- Privacy policy eksiği varsa ekleyin
- Screenshots'ları güncelleyin
- Description'ı düzeltin
- Eksik permissions varsa ekleyin

## 📞 Destek

Sorun yaşarsanız:
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Expo Forums](https://forums.expo.dev)

## 🎉 Başarılar!

Play Store'da başarılar dileriz! 🚀

