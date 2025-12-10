# FlowPay - Modern Finans Takip Uygulaması

Tam özellikli, modern bir finansal takip uygulaması. Mobil (React Native), Web (React) ve Backend (Node.js) ile geliştirilmiştir.

## 🚀 Özellikler

### Temel Özellikler
- ✅ Gelir/Gider takibi
- ✅ Kategori bazlı bütçe yönetimi
- ✅ Dashboard ile özet görünüm
- ✅ Grafikler (Pie Chart, Line Chart)
- ✅ AI destekli harcama analizi
- ✅ Tekrarlayan işlemler (otomatik)
- ✅ Bildirim sistemi
- ✅ Çoklu para birimi desteği (schema hazır)

### Platformlar
- 📱 **Mobile**: React Native + Expo
- 🌐 **Web**: React + TypeScript + Vite
- 🔧 **Backend**: Node.js + Express + PostgreSQL

## 📦 Kurulum

### Backend API
```bash
cd apps/api
npm install
cp .env.example .env
# .env dosyasını düzenle
npx prisma migrate dev
npm run dev
```

### Mobile App
```bash
cd apps/mobile
npm install
npm start
```

### Web Dashboard
```bash
cd apps/web
npm install
cp .env.example .env
# .env dosyasını düzenle
npm run dev
```

## 🛠️ Teknoloji Stack

### Backend
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT Authentication
- node-cron (recurring transactions)

### Mobile
- React Native + Expo
- TypeScript
- Zustand (state management)
- React Native Chart Kit
- Axios

### Web
- React + TypeScript
- Vite
- Chart.js
- React Router
- Zustand

## 📚 Dokümantasyon

- `apps/api/API_DOCUMENTATION.md` - API endpoint'leri
- `apps/api/BACKEND_SUMMARY.md` - Backend özeti
- `apps/mobile/ANDROID_STUDIO_GUIDE.md` - Android Studio kurulumu

## 🚀 Deployment

### Backend (Railway)
```bash
# Railway CLI ile
railway login
railway init
railway up
```

### Web (Vercel)
```bash
npm run build
vercel deploy
```

## 🔐 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=development
PORT=3000
```

### Web (.env)
```
VITE_API_URL=http://localhost:3000/api
```

## 📱 Ekran Görüntüleri

- Dashboard: Bakiye, gelir/gider özeti, grafikler
- İşlemler: Tüm işlemler, arama, filtreleme
- Bütçeler: Kategori bazlı limitler, progress bar'lar
- AI Analiz: Harcama eğilimi analizi

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

MIT License

## 👨‍💻 Geliştirici

FlowPay - Modern Finans Takip Uygulaması

---

**Not**: Production kullanımı için `.env` dosyalarını güvenli bir şekilde yapılandırın ve güçlü JWT secret kullanın.
