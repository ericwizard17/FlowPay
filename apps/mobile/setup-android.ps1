# FlowPay Android Studio - Hızlı Başlangıç

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "FlowPay - Android Studio Kurulum" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# 1. Java Kontrolü
Write-Host "[1/7] Java kontrolü..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1 | Select-String "version" | Select-Object -First 1
    if ($javaVersion -match "17") {
        Write-Host "✓ Java 17 bulundu" -ForegroundColor Green
    } else {
        Write-Host "✗ Java 17 gerekli! Mevcut: $javaVersion" -ForegroundColor Red
        Write-Host "  İndirme: https://adoptium.net/" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "✗ Java bulunamadı!" -ForegroundColor Red
    Write-Host "  İndirme: https://adoptium.net/" -ForegroundColor Yellow
    exit 1
}

# 2. Android SDK Kontrolü
Write-Host "[2/7] Android SDK kontrolü..." -ForegroundColor Yellow
$sdkPath = "$env:LOCALAPPDATA\Android\Sdk"
if (Test-Path $sdkPath) {
    Write-Host "✓ Android SDK bulundu: $sdkPath" -ForegroundColor Green
    $env:ANDROID_HOME = $sdkPath
} else {
    Write-Host "✗ Android SDK bulunamadı!" -ForegroundColor Red
    Write-Host "  Android Studio'yu kurun: https://developer.android.com/studio" -ForegroundColor Yellow
    exit 1
}

# 3. Node.js Kontrolü
Write-Host "[3/7] Node.js kontrolü..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    Write-Host "✓ Node.js bulundu: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js bulunamadı!" -ForegroundColor Red
    Write-Host "  İndirme: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# 4. Proje Dizinine Git
Write-Host "[4/7] Proje dizinine geçiliyor..." -ForegroundColor Yellow
$projectPath = "d:\Antigravity projects\Finans Takip\apps\mobile"
if (Test-Path $projectPath) {
    Set-Location $projectPath
    Write-Host "✓ Proje dizini: $projectPath" -ForegroundColor Green
} else {
    Write-Host "✗ Proje dizini bulunamadı!" -ForegroundColor Red
    exit 1
}

# 5. local.properties Oluştur
Write-Host "[5/7] local.properties oluşturuluyor..." -ForegroundColor Yellow
$localPropsPath = "android\local.properties"
$sdkPathEscaped = $sdkPath -replace '\\', '\\'
"sdk.dir=$sdkPathEscaped" | Out-File -FilePath $localPropsPath -Encoding ASCII -Force
Write-Host "✓ local.properties oluşturuldu" -ForegroundColor Green

# 6. Bağımlılıkları Yükle
Write-Host "[6/7] Bağımlılıklar yükleniyor..." -ForegroundColor Yellow
Write-Host "  Bu işlem birkaç dakika sürebilir..." -ForegroundColor Gray
$installOutput = npm install --legacy-peer-deps 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Bağımlılıklar yüklendi" -ForegroundColor Green
} else {
    Write-Host "✗ Bağımlılık yükleme hatası!" -ForegroundColor Red
    Write-Host $installOutput -ForegroundColor Red
    exit 1
}

# 7. Gradle Kontrolü
Write-Host "[7/7] Gradle kontrolü..." -ForegroundColor Yellow
Set-Location "android"
$gradleOutput = .\gradlew.bat tasks 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Gradle çalışıyor" -ForegroundColor Green
} else {
    Write-Host "⚠ Gradle uyarısı (normal olabilir)" -ForegroundColor Yellow
}
Set-Location ".."

# Özet
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Kurulum Tamamlandı!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Sonraki Adımlar:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Android Studio'yu açın" -ForegroundColor White
Write-Host "   File > Open > $projectPath\android" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Metro Bundler'ı başlatın (Yeni Terminal):" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Uygulamayı çalıştırın:" -ForegroundColor White
Write-Host "   Android Studio'da Run > Run 'app'" -ForegroundColor Gray
Write-Host "   veya: npm run android" -ForegroundColor Gray
Write-Host ""
Write-Host "Detaylı bilgi: ANDROID_REQUIREMENTS.md" -ForegroundColor Cyan
Write-Host ""
