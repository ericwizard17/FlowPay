# FlowPay - Kurulum ve Çalıştırma Rehberi

## ✅ Tamamlanan İşlemler

### 1. Mobil Uygulama (Android Studio)
- ✅ Android klasörü başarıyla oluşturuldu (`expo prebuild`)
- ✅ expo-router kaldırıldı (standart navigation kullanılıyor)
- ✅ Bağımlılıklar yüklendi
- ✅ Android Studio kurulum rehberi oluşturuldu

### 2. Web Sitesi
- ✅ Profesyonel landing page oluşturuldu
- ✅ Modern, responsive tasarım
- ✅ Animasyonlar ve etkileşimler
- ✅ Tüm özellikler (Hero, Features, Pricing, Testimonials, vb.)

## 🚀 Mobil Uygulamayı Çalıştırma

### Android Studio'da Açma

1. **Android Studio'yu açın**
2. **Open Project** seçeneğini tıklayın
3. Şu klasörü seçin: `d:\Antigravity projects\Finans Takip\apps\mobile\android`
4. Gradle sync tamamlanmasını bekleyin

### Metro Bundler'ı Başlatma

```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
npm start
```

### Uygulamayı Çalıştırma

**Yöntem 1: Android Studio'dan**
- Run > Run 'app' seçeneğini tıklayın

**Yöntem 2: Komut satırından**
```bash
npm run android
```

## 🌐 Web Sitesini Görüntüleme

Web sitesi zaten tarayıcınızda açık! Eğer tekrar açmak isterseniz:

1. Tarayıcınızda şu adresi açın:
   ```
   file:///d:/Antigravity projects/Finans Takip/apps/web/index.html
   ```

2. Veya dosyayı çift tıklayarak açın:
   ```
   d:\Antigravity projects\Finans Takip\apps\web\index.html
   ```

## 📱 Mobil Uygulama Özellikleri

- ✅ Gelir/Gider Takibi
- ✅ Bütçe Yönetimi
- ✅ Finansal Hedefler
- ✅ AI Destekli Öneriler
- ✅ Detaylı Raporlar ve Grafikler
- ✅ Güvenli Kimlik Doğrulama
- ✅ Dark Mode Desteği

## 🌟 Web Sitesi Özellikleri

- ✅ Modern, Premium Tasarım
- ✅ Tam Responsive (Mobil, Tablet, Desktop)
- ✅ Smooth Animasyonlar
- ✅ Gradient ve Glassmorphism Efektleri
- ✅ Interactive Elementler
- ✅ SEO Optimize
- ✅ Hızlı Yükleme

## 🔧 Sorun Giderme

### Gradle Build Hatası

Eğer Android Studio'da build hatası alırsanız:

```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile\android"
.\gradlew.bat clean
```

### Metro Bundler Hatası

```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
npm start -- --reset-cache
```

### Node Modules Hatası

```bash
cd "d:\Antigravity projects\Finans Takip\apps\mobile"
rm -rf node_modules
npm install --legacy-peer-deps
```

## 📂 Proje Yapısı

```
Finans Takip/
├── apps/
│   ├── mobile/              # React Native Mobil Uygulama
│   │   ├── android/         # Android Native Kod (Android Studio için)
│   │   ├── src/            # Kaynak kodlar
│   │   ├── App.tsx         # Ana uygulama
│   │   └── package.json    # Bağımlılıklar
│   │
│   ├── web/                # Web Sitesi
│   │   ├── index.html      # Ana sayfa
│   │   ├── styles.css      # Stil dosyası
│   │   └── script.js       # JavaScript
│   │
│   └── api/                # Backend API
│
└── README.md
```

## 🎯 Sonraki Adımlar

1. **Android Studio'da projeyi açın** ve emülatörde test edin
2. **Web sitesini** tarayıcınızda inceleyin
3. **Mobil uygulamayı** geliştirmeye devam edin
4. **API entegrasyonunu** tamamlayın

## 📞 Yardım

Herhangi bir sorun yaşarsanız:
- `ANDROID_STUDIO_GUIDE.md` dosyasını inceleyin
- Gradle loglarını kontrol edin
- Metro Bundler çıktısını inceleyin

---

**Not:** Mobil uygulama Android Studio'da açılmaya hazır! Web sitesi ise tamamen çalışır durumda ve tarayıcınızda görüntülenebilir.
