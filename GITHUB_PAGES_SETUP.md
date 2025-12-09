# 🌐 GitHub Pages Kurulum Rehberi

FlowPay projesini GitHub Pages ile yayınlamak için adım adım rehber.

## 📋 Ön Hazırlık

### 1. GitHub Repository Oluşturma

```bash
# Git repository başlat (eğer yoksa)
cd "D:\Antigravity projects\Finans Takip"
git init

# Remote ekle
git remote add origin https://github.com/KULLANICI_ADINIZ/flowpay.git

# Dosyaları ekle
git add .
git commit -m "feat: initial commit - FlowPay v1.0.0"

# Push et
git branch -M main
git push -u origin main
```

### 2. GitHub Repository Ayarları

1. GitHub'da repository'nize gidin
2. **Settings** → **Pages**
3. **Source** → **Deploy from a branch**
4. **Branch** → `main` / `root` seçin
5. **Save** butonuna tıklayın

### 3. URL'leri Güncelleme

**index.html** dosyasında aşağıdaki URL'leri güncelleyin:

```html
<!-- Line 13-15 -->
<meta property="og:url" content="https://KULLANICI_ADINIZ.github.io/flowpay/">
<meta property="og:image" content="https://KULLANICI_ADINIZ.github.io/flowpay/apps/mobile/assets/icon.png">

<!-- Line 18-21 -->
<meta property="twitter:url" content="https://KULLANICI_ADINIZ.github.io/flowpay/">
<meta property="twitter:image" content="https://KULLANICI_ADINIZ.github.io/flowpay/apps/mobile/assets/icon.png">

<!-- Play Store Link (Line ~620) -->
<a href="https://play.google.com/store/apps/details?id=com.flowpay.app" class="store-button">

<!-- GitHub Links -->
<a href="https://github.com/KULLANICI_ADINIZ/flowpay" class="btn btn-secondary">

<!-- Footer Links -->
<a href="https://github.com/KULLANICI_ADINIZ/flowpay">GitHub Repo</a>
```

## 🚀 Yayınlama

### 1. Commit ve Push

```bash
# Değişiklikleri kaydet
git add .
git commit -m "docs: update GitHub Pages configuration"
git push
```

### 2. GitHub Pages Build

- GitHub otomatik olarak sayfayı build edecek
- 1-2 dakika içinde site yayına girecek
- URL: `https://KULLANICI_ADINIZ.github.io/flowpay/`

### 3. Kontrol

- Browser'da URL'i açın
- Tüm linkler çalışıyor mu kontrol edin
- Mobile responsive test edin

## 🎨 Özelleştirme

### Renk Teması

**index.html** içinde CSS variables bölümünü düzenleyin:

```css
:root {
    --primary: #667eea;      /* Ana renk */
    --secondary: #764ba2;    /* İkincil renk */
    --success: #10b981;      /* Başarı rengi */
    --danger: #ef4444;       /* Hata rengi */
    --warning: #f59e0b;      /* Uyarı rengi */
    --info: #3b82f6;         /* Bilgi rengi */
}
```

### Logo ve Favicons

1. **Favicon** eklemek için `index.html` head bölümüne:
```html
<link rel="icon" type="image/png" href="apps/mobile/assets/favicon.png">
<link rel="apple-touch-icon" href="apps/mobile/assets/icon.png">
```

2. **Logo** değiştirmek için:
```html
<!-- Line ~97 -->
<div class="logo">
    <img src="your-logo.png" alt="FlowPay" style="height: 40px;">
    FlowPay
</div>
```

### Google Analytics

1. Google Analytics hesabı oluşturun
2. Tracking ID alın
3. **_config.yml** dosyasına ekleyin:
```yml
google_analytics: UA-XXXXXXXXX-X
```

4. **index.html** head bölümüne ekleyin:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXXX-X');
</script>
```

## 📱 Custom Domain (Opsiyonel)

### Domain Satın Alma

1. Domain satın alın (örn: flowpay.app)
2. DNS ayarlarına gidin

### DNS Ayarları

GitHub IP adreslerini A record olarak ekleyin:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

CNAME record ekleyin:
```
www  →  KULLANICI_ADINIZ.github.io
```

### GitHub Ayarları

1. Repository → **Settings** → **Pages**
2. **Custom domain** → `flowpay.app` girin
3. **Enforce HTTPS** aktif edin
4. **Save**

### CNAME Dosyası

Proje root'una `CNAME` dosyası oluşturun:
```
flowpay.app
```

```bash
git add CNAME
git commit -m "docs: add custom domain"
git push
```

## 🔧 Sorun Giderme

### Site Görünmüyor

1. **Build durumunu kontrol edin:**
   - Repository → **Actions** tab
   - "pages build and deployment" workflow'unu kontrol edin

2. **Branch kontrol edin:**
   - Settings → Pages → Source doğru branch mi?

3. **Dosya yollarını kontrol edin:**
   - Tüm linkler relative mi?
   - `apps/mobile/assets/...` yolları doğru mu?

### 404 Hatası

1. **index.html** dosyası root'ta mı?
2. GitHub Pages build tamamlandı mı? (Actions tab)
3. URL'de typo var mı?

### Görseller Görünmüyor

1. Görsel yolları doğru mu kontrol edin
2. Görseller Git'e commit edildi mi?
3. Browser cache temizleyin (Ctrl+Shift+R)

### CSS Yüklenmiyor

1. CSS inline olduğu için bu sorun olmamalı
2. Browser console'da hata var mı kontrol edin

## 📊 SEO Optimizasyonu

### 1. Meta Tags

**index.html** içinde zaten mevcut:
- Title
- Description
- Keywords
- Open Graph tags
- Twitter Card tags

### 2. Sitemap Ekleme

`sitemap.xml` oluşturun:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://KULLANICI_ADINIZ.github.io/flowpay/</loc>
    <lastmod>2025-12-09</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://KULLANICI_ADINIZ.github.io/flowpay/PRIVACY_POLICY.html</loc>
    <lastmod>2025-12-09</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 3. robots.txt

`robots.txt` oluşturun:
```
User-agent: *
Allow: /
Sitemap: https://KULLANICI_ADINIZ.github.io/flowpay/sitemap.xml
```

### 4. Google Search Console

1. [Google Search Console](https://search.google.com/search-console)
2. Property ekle
3. Ownership doğrula
4. Sitemap submit et

## 📈 Analytics ve Monitoring

### Google Analytics

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Microsoft Clarity (Ücretsiz)

```html
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "XXXXXXXXXX");
</script>
```

## 🔗 Privacy Policy ve Terms Hosting

### GitHub Pages ile Markdown

1. **PRIVACY_POLICY.md** ve **TERMS_OF_SERVICE.md** zaten mevcut
2. GitHub otomatik olarak render edecek
3. URL'ler:
   - `https://KULLANICI_ADINIZ.github.io/flowpay/PRIVACY_POLICY`
   - `https://KULLANICI_ADINIZ.github.io/flowpay/TERMS_OF_SERVICE`

### HTML Versiyonları (Opsiyonel)

Markdown dosyalarını HTML'e çevirin:

```bash
# Pandoc ile (kurulu ise)
pandoc PRIVACY_POLICY.md -o privacy.html
pandoc TERMS_OF_SERVICE.md -o terms.html
```

## 📱 Play Store Integration

### Privacy Policy URL

Play Console'da kullanılacak URL:
```
https://KULLANICI_ADINIZ.github.io/flowpay/PRIVACY_POLICY
```

### App Website URL

Play Console'da kullanılacak URL:
```
https://KULLANICI_ADINIZ.github.io/flowpay/
```

## ✅ Checklist

Yayınlamadan önce kontrol edin:

- [ ] GitHub repository oluşturuldu
- [ ] GitHub Pages aktif edildi
- [ ] index.html içinde tüm URL'ler güncellendi
- [ ] Görseller commit edildi ve görünüyor
- [ ] Tüm linkler çalışıyor
- [ ] Mobile responsive test edildi
- [ ] SEO meta tags kontrol edildi
- [ ] Privacy Policy erişilebilir
- [ ] Terms of Service erişilebilir
- [ ] Google Analytics eklendi (opsiyonel)
- [ ] Custom domain yapılandırıldı (opsiyonel)
- [ ] Sitemap eklendi
- [ ] robots.txt eklendi
- [ ] Google Search Console'a eklendi

## 🎉 Tamamlandı!

GitHub Pages siteniz artık yayında! 

**Site URL'niz:** `https://KULLANICI_ADINIZ.github.io/flowpay/`

### Sonraki Adımlar

1. Social media'da paylaşın
2. Play Store'da website URL olarak ekleyin
3. README.md'de badge ekleyin:

```markdown
[![Website](https://img.shields.io/badge/Website-Live-success)](https://KULLANICI_ADINIZ.github.io/flowpay/)
[![Play Store](https://img.shields.io/badge/Play%20Store-Download-blue)](https://play.google.com/store/apps/details?id=com.flowpay.app)
```

## 📞 Destek

Sorun yaşarsanız:
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Jekyll Docs](https://jekyllrb.com/docs/)
- [GitHub Issues](https://github.com/KULLANICI_ADINIZ/flowpay/issues)

---

**FlowPay Team** | Version 1.0.0 | Aralık 2025

