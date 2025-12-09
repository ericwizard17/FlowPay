# FlowPay API - Backend Setup Guide

## 📋 Gereksinimler

- Node.js 18 veya üzeri
- PostgreSQL veya SQLite database
- npm veya yarn

## 🚀 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
cd apps/api
npm install
```

### 2. Environment Variables Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/flowpay"
# veya SQLite için:
# DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="your-super-secret-key-change-this"

# App
NODE_ENV="development"
PORT="3000"

# CORS
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:19006"
```

### 3. Database Kurulumu

#### PostgreSQL Kullanıyorsanız:

```bash
# Database oluşturun
createdb flowpay

# Prisma schema'yı güncelleyin (zaten PostgreSQL)
# prisma/schema.prisma dosyasında datasource db provider = "postgresql"
```

#### SQLite Kullanıyorsanız:

`prisma/schema.prisma` dosyasını düzenleyin:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

### 4. Database Migration

```bash
# Prisma Client oluştur
npm run db:generate

# Migration çalıştır
npm run db:migrate

# (Opsiyonel) Seed data ekle
npm run db:seed
```

### 5. Sunucuyu Başlatın

#### Development Mode:
```bash
npm run dev
```

#### Production Build:
```bash
npm run build
npm start
```

## 📚 Kullanılabilir Komutlar

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Production server
npm start

# Prisma Client oluştur
npm run db:generate

# Migration oluştur ve çalıştır
npm run db:migrate

# Database'i schema ile senkronize et (development)
npm run db:push

# Seed data ekle
npm run db:seed

# Prisma Studio (database GUI)
npm run db:studio
```

## 🗄️ Database Schema

### User
- id (UUID)
- email (String, unique)
- passwordHash (String)
- name (String)
- createdAt (DateTime)
- updatedAt (DateTime)

### Transaction
- id (UUID)
- userId (UUID, foreign key)
- amount (Float) - Pozitif: Gelir, Negatif: Gider
- category (String)
- note (String, optional)
- date (DateTime)
- createdAt (DateTime)

### Budget
- id (UUID)
- userId (UUID, foreign key)
- category (String)
- limitAmount (Float)
- month (String) - Format: "YYYY-MM"
- createdAt (DateTime)
- updatedAt (DateTime)

## 🔐 Authentication

API şu anda basit `user-id` header kullanıyor. Production'da JWT token kullanılmalı:

```javascript
// Request header
headers: {
  'user-id': 'user-uuid-here'
}
```

JWT implementasyonu için `src/middleware/auth.ts` hazır durumda.

## 📡 API Endpoints

Detaylı API dokümantasyonu için: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Ana Endpoint'ler:

- **Auth**: `/api/auth/*`
  - POST `/register` - Kullanıcı kaydı
  - POST `/login` - Giriş
  - GET `/me` - Kullanıcı bilgisi

- **Transactions**: `/api/transactions/*`
  - GET `/` - Tüm işlemler
  - GET `/:id` - Tek işlem
  - POST `/` - Yeni işlem
  - PUT `/:id` - İşlem güncelle
  - DELETE `/:id` - İşlem sil
  - GET `/stats/summary` - İstatistikler

- **Budgets**: `/api/budgets/*`
  - GET `/` - Tüm bütçeler
  - GET `/:id` - Tek bütçe
  - POST `/` - Yeni bütçe
  - PUT `/:id` - Bütçe güncelle
  - DELETE `/:id` - Bütçe sil

- **Dashboard**: `/api/dashboard/*`
  - GET `/stats` - Dashboard istatistikleri

- **AI**: `/api/ai/*`
  - GET `/analysis` - AI analizi

## 🧪 Test

### Health Check
```bash
curl http://localhost:3000/health
```

### Kullanıcı Kaydı
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### İşlem Oluşturma
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID" \
  -d '{
    "amount": -50,
    "category": "Market",
    "note": "Grocery shopping"
  }'
```

## 🔧 Troubleshooting

### Port zaten kullanımda
```bash
# Windows'ta portu kontrol et
netstat -ano | findstr :3000

# Farklı port kullan
PORT=3001 npm run dev
```

### Database bağlantı hatası
- DATABASE_URL'in doğru olduğundan emin olun
- PostgreSQL/SQLite'ın çalıştığından emin olun
- Migration'ları çalıştırdığınızdan emin olun

### Prisma Client hatası
```bash
# Prisma Client'ı yeniden oluştur
npm run db:generate
```

## 📦 Deployment

### Vercel
1. Vercel hesabı oluşturun
2. PostgreSQL database (Supabase, Neon, vb.) ayarlayın
3. Environment variables ekleyin
4. Deploy edin

### Railway
1. Railway hesabı oluşturun
2. PostgreSQL plugin ekleyin
3. Environment variables otomatik ayarlanır
4. Deploy edin

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎯 Gelecek Özellikler

- [ ] JWT Authentication tam implementasyonu
- [ ] Rate limiting
- [ ] API versioning
- [ ] Swagger/OpenAPI documentation
- [ ] WebSocket support (real-time updates)
- [ ] File upload (receipts, invoices)
- [ ] Export/Import (CSV, Excel)
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] OAuth integration (Google, Facebook)

## 📝 Notlar

- Development'ta `tsx watch` kullanılıyor (hot reload)
- Production'da TypeScript build edilip Node.js ile çalıştırılıyor
- Prisma Studio ile database'i görsel olarak yönetebilirsiniz: `npm run db:studio`
- Error handling merkezi olarak yapılıyor
- Validation Zod ile yapılıyor
- CORS yapılandırması `.env` dosyasından kontrol ediliyor

## 🆘 Yardım

Sorun yaşıyorsanız:
1. [API Documentation](./API_DOCUMENTATION.md) dosyasını kontrol edin
2. Console log'larını kontrol edin
3. Database bağlantısını test edin
4. Environment variables'ları kontrol edin

---

© 2024 FlowPay. Tüm hakları saklıdır.
