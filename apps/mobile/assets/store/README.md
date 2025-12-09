# FlowPay - Play Store Assets

Bu klasör Play Store yayını için gerekli tüm görselleri içerir.

## 📱 Ekran Görüntüleri

### Mobile Screenshots (screenshots/mobile/)
- Boyut: 1080x1920 px (9:16)
- Format: PNG veya JPEG
- Minimum: 2 adet
- Maksimum: 8 adet

Mevcut ekran görüntüleri:
1. **01_dashboard.png** - Ana ekran (gelir/gider özeti, grafikler)
2. **02_transactions.png** - İşlemler listesi
3. **03_budgets.png** - Bütçe yönetimi
4. **04_goals.png** - Finansal hedefler
5. **05_achievements.png** - Başarımlar
6. **06_stats.png** - İstatistikler ve analizler
7. **07_settings.png** - Ayarlar ve profil

### Tablet Screenshots (opsiyonel)
- Boyut: 2048x2732 px veya 1536x2048 px
- Format: PNG veya JPEG

## 🎨 Feature Graphic

**Gereksinimler:**
- Boyut: 1024x500 px
- Format: PNG veya JPEG
- Max dosya boyutu: 1MB
- Kullanım: Play Store'da öne çıkan gösterimde

**Öneriler:**
- App icon göster
- App adını ekle (FlowPay)
- Tagline ekle: "Akıllı Finans Yönetimi"
- Gradient arka plan (#667eea → #764ba2)
- Temel özellikleri vurgula

## 🎯 App Icon

**Ana Icon (icon.png):**
- Boyut: 512x512 px
- Format: PNG (32-bit)
- Şeffaf arka plan YOK
- Tam kare format

**Adaptive Icon (adaptive-icon.png):**
- Boyut: 1024x1024 px
- Format: PNG (32-bit)
- Safe zone: merkezi 768x768 px alanı kullan
- Arka plan rengi: #667eea

**Round Icon (opsiyonel):**
- Boyut: 512x512 px
- Format: PNG
- Yuvarlak maskeli görünüm için optimize edilmiş

## 🌟 Promotional Graphics (Opsiyonel)

### Promo Graphic
- Boyut: 180x120 px
- Format: PNG veya JPEG

### TV Banner (Android TV için)
- Boyut: 1280x720 px
- Format: PNG

## ✅ Checklist

Play Store'a yüklemeden önce kontrol edin:

- [ ] Minimum 2 ekran görüntüsü hazır
- [ ] Ekran görüntüleri doğru boyutta (1080x1920 px)
- [ ] Feature graphic hazır (1024x500 px)
- [ ] App icon hazır (512x512 px)
- [ ] Tüm görseller optimize edilmiş (dosya boyutu küçük)
- [ ] Görsellerde gerçek uygulama içeriği var
- [ ] Hiçbir görselde telif hakkı ihlali yok
- [ ] Görseller uygulama fonksiyonlarını doğru yansıtıyor

## 🎨 Tasarım Rehberi

### Renk Paleti
- Primary: #667eea (Mor-Mavi)
- Secondary: #764ba2 (Mor)
- Success: #10b981 (Yeşil)
- Danger: #ef4444 (Kırmızı)
- Warning: #f59e0b (Turuncu)
- Info: #3b82f6 (Mavi)

### Fontlar
- Primary: SF Pro / Roboto
- Numbers: Tabular numbers için mono-space

### İkonlar
- Lucide Icons (consistent icon set)
- Outline style
- 24x24 px default boyut

## 📸 Ekran Görüntüsü Alma

### Emülatörden:
```bash
# Ekran görüntüsü al
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png ./screenshot.png

# Belirli cihaz için
adb -s emulator-5554 shell screencap -p /sdcard/screenshot.png
```

### Cihazdan:
1. Power + Volume Down tuşlarına aynı anda basın
2. Veya ADB kullanın (yukarıdaki komut)

### Boyutlandırma:
```bash
# ImageMagick ile resize
convert screenshot.png -resize 1080x1920 screenshot_resized.png

# Veya online araçlar:
# - tinypng.com (compression)
# - squoosh.app (resize & compression)
```

## 🔗 Faydalı Linkler

- [Play Console Help - Graphic Assets](https://support.google.com/googleplay/android-developer/answer/9866151)
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)
- [Figma Play Store Template](https://www.figma.com/community/search?model_type=files&q=play%20store)

## 📝 Notlar

- Play Store review sürecinde görseller de değerlendirilir
- Yanıltıcı veya uygunsuz içerik kullanmayın
- Gerçek uygulama ekranları kullanın (mockup değil)
- Her ekran görüntüsü farklı bir özelliği göstermeli
- Text overlay ekleyerek özellikleri vurgulayabilirsiniz
