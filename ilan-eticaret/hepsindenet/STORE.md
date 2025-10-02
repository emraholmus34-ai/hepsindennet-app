# Mağaza Yayın Kılavuzu (Kısa)

Bu kılavuz, APK/AAB (Android) ve IPA (iOS) üretimiyle mağazalara gönderim için kısa özet sunar.

## 1) Ortak Hazırlık

- Uygulama adı, açıklama, ikonlar (512x512), ekran görüntüleri, gizlilik politikası linki.
- PWA ikonları: `public/pwa-192x192.png`, `public/pwa-512x512.png` (maskable önerilir).
- Versiyon ve paket adı: `capacitor.config.ts` içindeki `appId` benzersiz olmalı.

## 2) Android (Google Play)

1. Android Studio aç: `npx cap open android`
2. “Build > Generate Signed Bundle/APK…”
3. App Bundle (AAB) üret: Yeni veya mevcut keystore ile imzala.
4. Play Console’da uygulama oluştur, AAB yükle.
5. İçerik derecelendirme, gizlilik politikası, ekran görüntüleri doldur.
6. Yayın kanalı seç (Kapalı/Üretim) ve gönder.

## 3) iOS (Apple App Store)

1. Xcode aç: `npx cap open ios`
2. Signing & Capabilities: Takım ve Bundle Identifier ayarla.
3. Cihazda test et (Gerçek cihaz).
4. “Product > Archive” ile arşiv al ve Organizer’dan App Store Connect’e yükle.
5. App Store Connect’te metadata, gizlilik, ekran görüntüleri doldur.
6. İncelemeye gönder.

## 4) İpuçları

- Sürüm artırmayı unutmayın (Android: versionCode; iOS: CFBundleVersion).
- Gereksiz izinleri istemeyin; gizlilik açıklamalarını doğru doldurun.
- Hata takibi için basit bir “Sürüm Notu” yazın.