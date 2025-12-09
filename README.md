# FlowPay - Akıllı Finans Yönetimi 💰

![FlowPay Banner](https://img.shields.io/badge/FlowPay-Akıllı%20Finans-667eea?style=for-the-badge)
![React Native](https://img.shields.io/badge/React%20Native-0.73-61dafb?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-50.0-000020?style=for-the-badge&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?style=for-the-badge&logo=typescript)

FlowPay ile gelir ve giderlerinizi kolayca takip edin, akıllı bütçeler oluşturun ve finansal hedeflerinize ulaşın. Yapay zeka destekli önerilerle paranızı daha iyi yönetin.

## ✨ Özellikler

### 📱 Mobil Uygulama
- ✅ **Gelir/Gider Takibi** - Tüm finansal işlemlerinizi kolayca kaydedin
- ✅ **Akıllı Kategorileme** - Otomatik kategori önerileri
- ✅ **Bütçe Yönetimi** - Kategorilere göre bütçe oluşturun ve takip edin
- ✅ **Finansal Hedefler** - Hedeflerinizi belirleyin ve ilerlemenizi görün
- ✅ **AI Önerileri** - Yapay zeka destekli tasarruf önerileri
- ✅ **Detaylı Raporlar** - Grafikler ve analizlerle finansal durumunuzu görün
- ✅ **Dark Mode** - Göz dostu karanlık tema
- ✅ **Güvenli Kimlik Doğrulama** - Biyometrik giriş desteği
- ✅ **Offline Çalışma** - İnternet olmadan da kullanabilirsiniz

### 🌐 Web Uygulaması
- ✅ **Tam İşlevsel Finans Takibi** - Tarayıcıda çalışan gerçek uygulama
- ✅ **Dashboard** - Gelir, gider, bakiye ve tasarruf özeti
- ✅ **İşlem Yönetimi** - Gelir ve gider ekleme, listeleme, filtreleme
- ✅ **Bütçe Takibi** - Kategorilere göre bütçe oluşturma ve takip
- ✅ **Hedef Belirleme** - Finansal hedefler ve ilerleme takibi
- ✅ **Grafikler ve Raporlar** - Chart.js ile görsel analizler
- ✅ **LocalStorage** - Veriler tarayıcıda saklanır
- ✅ **Responsive Tasarım** - Mobil ve desktop uyumlu
- ✅ **Modern UI** - Gradient, animasyonlar ve premium tasarım

### 🌐 Web Sitesi (Landing Page)
- ✅ **Modern Premium Tasarım** - Gradient ve glassmorphism efektleri
- ✅ **Tam Responsive** - Mobil, tablet ve desktop uyumlu
- ✅ **Smooth Animasyonlar** - Profesyonel geçişler ve efektler
- ✅ **SEO Optimize** - Arama motorları için optimize edilmiş
- ✅ **Gizlilik Politikası** - KVKK ve GDPR uyumlu

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18 veya üzeri
- npm veya yarn
- Android Studio (Android geliştirme için)
- Expo CLI

### Kurulum

1. **Repoyu klonlayın**
```bash
git clone https://github.com/ericwizard17/FlowPay.git
cd FlowPay
```

2. **Mobil uygulama bağımlılıklarını yükleyin**
```bash
cd apps/mobile
npm install --legacy-peer-deps
```

3. **Metro Bundler'ı başlatın**
```bash
npm start
```

4. **Uygulamayı çalıştırın**

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

### Android Studio'da Açma

1. Android Studio'yu açın
2. "Open Project" seçeneğini tıklayın
3. `apps/mobile/android` klasörünü seçin
4. Gradle sync tamamlanmasını bekleyin
5. Run > Run 'app' ile uygulamayı çalıştırın

Detaylı kurulum için: [ANDROID_STUDIO_GUIDE.md](apps/mobile/ANDROID_STUDIO_GUIDE.md)

### Web Uygulamasını Kullanma

**Ücretsiz ve tam işlevsel finans takip uygulaması:**

1. Tarayıcınızda `apps/web/app.html` dosyasını açın
2. Veya [buradan canlı demo](https://ericwizard17.github.io/FlowPay/apps/web/app.html)'yu deneyin
3. Tüm veriler tarayıcınızda (localStorage) saklanır
4. İnternet bağlantısı gerektirmez

**Özellikler:**
- ✅ Gelir/Gider ekleme ve listeleme
- ✅ Bütçe oluşturma ve takip
- ✅ Finansal hedefler belirleme
- ✅ Grafikler ve raporlar
- ✅ Filtreleme ve arama

### Web Sitesini Görüntüleme

Landing page için `apps/web/index.html` dosyasını tarayıcınızda açın.

## 📂 Proje Yapısı

```
FlowPay/
├── apps/
│   ├── mobile/              # React Native Mobil Uygulama
│   │   ├── android/         # Android Native Kod
│   │   ├── src/
│   │   │   ├── components/  # Yeniden kullanılabilir bileşenler
│   │   │   ├── screens/     # Uygulama ekranları
│   │   │   ├── navigation/  # Navigasyon yapısı
│   │   │   ├── services/    # API ve servisler
│   │   │   ├── store/       # State yönetimi (Zustand)
│   │   │   └── theme/       # Tema ve stiller
│   │   ├── App.tsx          # Ana uygulama
│   │   └── package.json
│   │
│   ├── web/                 # Web Sitesi & Uygulama
│   │   ├── index.html       # Landing page
│   │   ├── app.html         # Web uygulaması
│   │   ├── privacy.html     # Gizlilik politikası
│   │   ├── app-styles.css   # Uygulama stilleri
│   │   └── app-script.js    # Uygulama JavaScript
│   │
│   └── api/                 # Backend API ✅ TAMAMLANDI
│       ├── src/
│       │   ├── middleware/  # Auth, validation, error handling
│       │   ├── routes/      # API endpoints
│       │   ├── schemas/     # Zod validation schemas
│       │   └── index.ts     # Ana server
│       ├── prisma/
│       │   ├── schema.prisma # Database schema
│       │   └── seed.ts      # Seed data
│       ├── API_DOCUMENTATION.md
│       ├── README.md
│       └── package.json
│
├── KURULUM_REHBERI.md       # Detaylı kurulum rehberi
└── README.md                # Bu dosya
```

## 🛠️ Teknolojiler

### Mobil Uygulama
- **React Native** - Cross-platform mobil geliştirme
- **Expo** - Geliştirme ve build araçları
- **TypeScript** - Tip güvenli kod
- **React Navigation** - Navigasyon yönetimi
- **Zustand** - State yönetimi
- **React Query** - Veri yönetimi
- **Axios** - HTTP istekleri
- **date-fns** - Tarih işlemleri

### Backend API ✅
- **Node.js & Express** - Server framework
- **TypeScript** - Tip güvenliği
- **Prisma ORM** - Database yönetimi
- **PostgreSQL/SQLite** - Database
- **JWT** - Authentication
- **Zod** - Validation
- **bcrypt** - Password hashing

### Web Sitesi
- **HTML5** - Semantik yapı
- **CSS3** - Modern stil ve animasyonlar
- **Vanilla JavaScript** - Hafif ve hızlı
- **Inter Font** - Modern tipografi

## 📱 Ekran Görüntüleri

### Mobil Uygulama
- Dashboard - Finansal özet
- Transactions - İşlem listesi
- Budgets - Bütçe yönetimi
- Goals - Hedef takibi
- Profile - Kullanıcı profili

### Web Sitesi
- Hero Section - Etkileyici giriş
- Features - Özellikler
- Pricing - Fiyatlandırma planları
- Testimonials - Kullanıcı yorumları

## 🔒 Güvenlik

- **AES-256 Şifreleme** - Tüm veriler şifreli
- **HTTPS/TLS** - Güvenli veri iletimi
- **Biyometrik Kimlik Doğrulama** - Parmak izi ve yüz tanıma
- **Yerel Veri Saklama** - Hassas veriler cihazda
- **KVKK ve GDPR Uyumlu** - Veri gizliliği standartları

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. Bu repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

- **E-posta:** support@flowpay.app
- **Web:** www.flowpay.app
- **GitHub:** [@ericwizard17](https://github.com/ericwizard17)

## 🙏 Teşekkürler

FlowPay'i kullandığınız için teşekkür ederiz! Finansal özgürlüğünüze giden yolda size yardımcı olmaktan mutluluk duyuyoruz.

---

**Not:** Bu proje aktif geliştirme aşamasındadır. Önerileriniz ve geri bildirimleriniz bizim için çok değerli!

## 📈 Yol Haritası

- [x] **Backend API geliştirmesi** ✅ TAMAMLANDI
  - [x] Authentication & JWT
  - [x] Transaction CRUD
  - [x] Budget Management
  - [x] Dashboard Analytics
  - [x] Reports & Export
  - [x] Category Management
- [ ] Cloud senkronizasyon
- [ ] iOS uygulaması
- [ ] Web dashboard (React)
- [ ] Çoklu para birimi desteği
- [ ] Fatura tarama (OCR)
- [ ] Yatırım takibi
- [ ] Aile bütçe paylaşımı

## ⭐ Yıldız Verin!

Bu projeyi beğendiyseniz, lütfen bir yıldız verin! ⭐

---

© 2024 FlowPay. Tüm hakları saklıdır.
