# 🚀 GitHub'a Yayınlama - Hızlı Rehber

FlowPay projesini GitHub'a yayınlamak için hızlı adımlar.

## ⚡ Hızlı Başlangıç (5 Dakika)

### 1. GitHub Repository Oluştur

1. [GitHub](https://github.com) 'a git
2. **New Repository** butonuna tıkla
3. Repository name: `flowpay`
4. Description: `FlowPay - Akıllı Finans Yönetimi | Para yönetimi mobil uygulaması`
5. **Public** seç
6. **Create repository**

### 2. Lokal Repository Hazırla

```bash
# Proje dizinine git
cd "D:\Antigravity projects\Finans Takip"

# Git başlat (eğer yoksa)
git init

# Dosyaları ekle
git add .

# İlk commit
git commit -m "feat: initial commit - FlowPay v1.0.0

✨ Features:
- Mobile app (React Native + Expo)
- Backend API (Express + Prisma)
- Android build configuration
- Comprehensive documentation
- GitHub Pages website

📱 Ready for Play Store deployment
🌐 GitHub Pages enabled
📝 5000+ lines of documentation"

# Branch adını main yap
git branch -M main
```

### 3. GitHub'a Push

```bash
# Remote ekle (KULLANICI_ADINIZI değiştirin!)
git remote add origin https://github.com/KULLANICI_ADINIZ/flowpay.git

# Push et
git push -u origin main
```

### 4. GitHub Pages Aktif Et

1. Repository → **Settings**
2. Sol menüden **Pages**
3. **Source** → **Deploy from a branch**
4. **Branch** → `main` / `root` seçin
5. **Save**

⏱️ 1-2 dakika bekleyin, siteniz yayında olacak!

**Site URL:** `https://KULLANICI_ADINIZ.github.io/flowpay/`

## 📝 Sonraki Adımlar

### 1. URL'leri Güncelle

**index.html** dosyasında aşağıdakileri değiştir:
- `yourusername` → Gerçek GitHub kullanıcı adınız
- `https://yourusername.github.io/flowpay/` → Gerçek site URL'niz

**README.md** dosyasında:
- `yourusername` → Gerçek GitHub kullanıcı adınız

```bash
# Değişiklikleri kaydet
git add .
git commit -m "docs: update URLs with actual GitHub username"
git push
```

### 2. Repository Settings

#### Topics Ekle
Repository ana sayfasında ⚙️ (Settings yanındaki) → **Add topics**:
- `react-native`
- `expo`
- `finance`
- `budget`
- `mobile-app`
- `android`
- `typescript`
- `fintech`

#### About Bölümü
Repository ana sayfasında **About** → ⚙️:
- Website: `https://KULLANICI_ADINIZ.github.io/flowpay/`
- Description: `💰 FlowPay - Akıllı Finans Yönetimi | Para yönetimi mobil uygulaması`
- Topics: Yukarıdaki topics'leri ekle

#### Social Preview
Settings → General → Social preview:
- `apps/mobile/assets/icon.png` yükle (veya özel bir banner oluştur)

### 3. README Badge'lerini Güncelle

README.md'de badge URL'lerini düzelt:

```markdown
[![Website](https://img.shields.io/badge/Website-Live-success)](https://KULLANICI_ADINIZ.github.io/flowpay/)
[![Play Store](https://img.shields.io/badge/Play%20Store-Coming%20Soon-blue)](https://play.google.com/store/apps/details?id=com.flowpay.app)
```

### 4. Privacy Policy URL'leri

**apps/mobile/src/screens/SettingsScreen.tsx** dosyasında:
```typescript
const openPrivacyPolicy = () => {
    Linking.openURL('https://KULLANICI_ADINIZ.github.io/flowpay/PRIVACY_POLICY')
        .catch(() => Alert.alert('Hata', 'Gizlilik politikası açılamadı'));
};

const openTermsOfService = () => {
    Linking.openURL('https://KULLANICI_ADINIZ.github.io/flowpay/TERMS_OF_SERVICE')
        .catch(() => Alert.alert('Hata', 'Kullanım şartları açılamadı'));
};
```

```bash
git add .
git commit -m "feat: update privacy policy URLs with GitHub Pages"
git push
```

## 📋 Proje Yapısı Kontrolü

Yayınlamadan önce bu dosyaların mevcut olduğundan emin olun:

### Root Dosyaları
- ✅ `index.html` - GitHub Pages ana sayfa
- ✅ `_config.yml` - Jekyll yapılandırması
- ✅ `README.md` - Proje dokümantasyonu
- ✅ `LICENSE` - MIT lisansı
- ✅ `PRIVACY_POLICY.md` - Gizlilik politikası
- ✅ `TERMS_OF_SERVICE.md` - Kullanım şartları
- ✅ `.gitignore` - Git ignore dosyası

### Rehber Dosyaları
- ✅ `START.md` - Hızlı başlangıç
- ✅ `EMULATOR_GUIDE.md` - Emülatör kurulumu
- ✅ `PLAY_STORE_GUIDE.md` - Play Store yayınlama
- ✅ `DEPLOYMENT_READY.md` - Deployment özeti
- ✅ `OPTIMIZATION_REPORT.md` - Optimizasyon raporu
- ✅ `GITHUB_PAGES_SETUP.md` - GitHub Pages rehberi
- ✅ `GITHUB_PUBLISH.md` - Bu dosya

### Mobile App
- ✅ `apps/mobile/` - React Native uygulaması
- ✅ `apps/mobile/android/` - Android native kod
- ✅ `apps/mobile/assets/` - Görseller ve assets
- ✅ `apps/mobile/src/` - Kaynak kod

### Backend (Opsiyonel)
- ✅ `apps/api/` - Backend API
- ✅ `apps/api/prisma/` - Database schema

## 🎨 Repository Customization

### 1. README Badges

Daha fazla badge ekleyebilirsiniz:

```markdown
![React Native](https://img.shields.io/badge/React%20Native-0.73-blue)
![Expo](https://img.shields.io/badge/Expo-50-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
```

### 2. GitHub Actions (CI/CD)

`.github/workflows/ci.yml` oluştur:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: cd apps/mobile && npm install
    
    - name: Run tests
      run: cd apps/mobile && npm test
    
    - name: Run linter
      run: cd apps/mobile && npm run lint
```

### 3. Issue Templates

`.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug report
about: Bir hata bildirin
title: '[BUG] '
labels: bug
assignees: ''
---

**Hata Açıklaması**
Hatanın açık ve net bir açıklaması.

**Nasıl Tekrarlanır**
1. '...' git
2. '...' tıkla
3. '...' yap
4. Hatayı gör

**Beklenen Davranış**
Ne olmasını bekliyordunuz.

**Ekran Görüntüleri**
Varsa ekran görüntüleri ekleyin.

**Cihaz (lütfen doldurun):**
 - Cihaz: [örn. Samsung Galaxy S21]
 - OS: [örn. Android 13]
 - App Version: [örn. 1.0.0]
```

### 4. Contributing Guidelines

`CONTRIBUTING.md`:

```markdown
# Katkıda Bulunma Rehberi

FlowPay'e katkıda bulunmak istediğiniz için teşekkürler!

## Nasıl Katkıda Bulunabilirim?

1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Commit Message Formatı

Conventional Commits formatı kullanıyoruz:

- `feat:` - Yeni özellik
- `fix:` - Bug düzeltmesi
- `docs:` - Dokümantasyon
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `test:` - Test ekleme
- `chore:` - Diğer değişiklikler

## Code Style

- ESLint kurallarına uyun
- Prettier ile format edin
- TypeScript kullanın
- Test yazın
```

## 🔒 Güvenlik

### Sensitive Files

`.gitignore` dosyası zaten şunları içeriyor:
- ✅ `.env` files
- ✅ `*.keystore` (debug.keystore hariç)
- ✅ `android-service-account.json`
- ✅ `node_modules/`

### GitHub Secrets (EAS Build için)

Repository → Settings → Secrets and variables → Actions:

1. **EXPO_TOKEN**
   - EAS CLI login token
   - `eas whoami` ile alabilirsiniz

2. **ANDROID_KEYSTORE** (Base64 encoded)
```bash
base64 flowpay-release.keystore > keystore.base64
```

3. **KEYSTORE_PASSWORD**
4. **KEY_PASSWORD**

## 📊 Analytics

### GitHub Insights

Repository → **Insights** sekmesinden:
- Traffic (Visitor stats)
- Commits
- Contributors
- Community
- Dependency graph

### Star Tracking

Repository star'larını takip edin ve teşekkür edin! 🌟

## 🌍 Open Source Best Practices

### 1. Issue Management

- Issues'ları düzenli kontrol edin
- Label'lar kullanın (bug, enhancement, question)
- Milestone'lar oluşturun

### 2. Pull Request Review

- PR'ları hızlıca review edin
- Constructive feedback verin
- Merge etmeden önce test edin

### 3. Community

- Discussions aktif edin (Settings → Features)
- Wiki oluşturun
- Code of Conduct ekleyin

### 4. Documentation

- README'yi güncel tutun
- CHANGELOG.md'yi güncelleyin
- API dokümantasyonu ekleyin (gelecekte)

## 🎉 Paylaşım

Repository yayında! Şimdi paylaşın:

### Social Media

**Twitter:**
```
🚀 FlowPay açık kaynak olarak yayında! 

💰 Akıllı finans yönetimi
📱 React Native + Expo
🔒 Güvenli ve privacy-first
📊 Detaylı analiz ve raporlama

⭐ Star'lamayı unutmayın!
🔗 https://github.com/KULLANICI_ADINIZ/flowpay

#ReactNative #Expo #OpenSource #FinTech #MobileApp
```

**LinkedIn:**
```
FlowPay projesini açık kaynak olarak yayınladım! 🎉

Para yönetimi mobil uygulaması:
✅ React Native + Expo
✅ TypeScript
✅ Modern architecture
✅ Comprehensive documentation
✅ Play Store ready

GitHub: https://github.com/KULLANICI_ADINIZ/flowpay
Website: https://KULLANICI_ADINIZ.github.io/flowpay/

#MobileDevelopment #ReactNative #OpenSource
```

### Reddit

- r/reactnative
- r/reactjs
- r/opensource
- r/programming

### Dev.to / Hashnode

Blog yazısı yazın:
- "Building FlowPay: Open Source Finance Management App"
- "From Idea to Play Store: FlowPay Journey"
- "React Native Best Practices: FlowPay Case Study"

## ✅ Final Checklist

Yayınlamadan önce son kontrol:

- [ ] Git repository oluşturuldu
- [ ] Tüm dosyalar commit edildi
- [ ] GitHub'a push edildi
- [ ] GitHub Pages aktif edildi
- [ ] URL'ler güncellendi
- [ ] Topics eklendi
- [ ] About bölümü dolduruldu
- [ ] LICENSE dosyası mevcut
- [ ] README.md güncel
- [ ] PRIVACY_POLICY.md erişilebilir
- [ ] TERMS_OF_SERVICE.md erişilebilir
- [ ] .gitignore kontrol edildi
- [ ] Sensitive files commit edilmedi
- [ ] Website açılıyor ve çalışıyor
- [ ] Tüm linkler çalışıyor
- [ ] Mobile responsive
- [ ] SEO meta tags mevcut

## 🚀 Sonraki Adımlar

1. **Community Building**
   - Star sayısını artırın
   - Contributors kazanın
   - Issue'ları çözün

2. **Marketing**
   - Social media paylaşımı
   - Blog yazıları
   - Reddit, HackerNews, ProductHunt

3. **Development**
   - Play Store'a yayınlayın
   - Beta test programı başlatın
   - User feedback toplayın

4. **Documentation**
   - Video tutorials
   - API documentation
   - Contribution guidelines

## 📞 Yardım

Sorularınız için:
- 📖 [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)
- 📖 [GitHub Docs](https://docs.github.com)
- 💬 [GitHub Discussions](https://github.com/KULLANICI_ADINIZ/flowpay/discussions)

---

**🎊 Tebrikler!** FlowPay artık açık kaynak! 

Made with ❤️ by FlowPay Team

