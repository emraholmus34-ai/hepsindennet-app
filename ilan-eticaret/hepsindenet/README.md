# HepsindenNet

Basit anlatım: Bu proje telefon ve bilgisayarda çalışır. Web (PWA) ve hibrit (Capacitor) hazırdır.

## 1) Projeyi Çalıştır (PC)

1. Terminali aç:
   - `cd /workspace/ilan-eticaret/hepsindenet`
2. Kurulum:
   - `npm i`
3. Başlat:
   - `npm run dev`
4. Tarayıcıdan aç:
   - `http://localhost:5173`

## 2) Telefonda Hızlı Gör (PWA)

1. `npm run build` çalıştır.
2. Çıkan `dist` klasörünü yayınla:
   - Hızlı: `https://app.netlify.com/drop` sitesine `dist` klasörünü sürükle-bırak.
   - Veya Vercel/Netlify ile depodan otomatik yayınlayın.
3. Telefonla linke gir. “Ana Ekrana Ekle” yaparak uygulama gibi kullan.

Not: Uygulama PWA’dır (çevrimdışı önbellek ve kurulum desteği var).

## 3) Hiyerarşik İlan Ver Akışı

- Üst menüden “Ücretsiz İlan Ver”
  - Emlak
    - Konut veya İş Yeri alt türünü seç
    - “Satılık / Kiralık” seç
    - İlgili form sayfası açılır (Konut/İşyeri/Arsa)

## 4) Hibrit (Android/iOS) Kurulum (PC’de)

1. Bağımlılıklar:
   - `npm i @capacitor/core`
   - `npm i -D @capacitor/cli`
2. Yapı al:
   - `npm run build`
3. Senkronize et:
   - `npx cap sync`
4. Platform ekle (PC’de):
   - Android: `npx cap add android`
   - iOS: `npx cap add ios`
5. Aç:
   - Android Studio: `npx cap open android`
   - Xcode: `npx cap open ios`

Derlemeler Android Studio/Xcode içinden yapılır.

## 5) Mağazalara Hazırlık

- Uygulama adı/simgeleri: `public` klasörüne logo/simgeleri ekleyin (örn. `public/pwa-192x192.png`, `public/pwa-512x512.png`).
- PWA kurulum metni ve ikonlar yayın sonrası görülecek.
- Ayrıntılı mağaza gönderim adımları için `STORE.md` dosyasına bakınız.

## 6) Faydalı Komutlar

- Geliştirme: `npm run dev`
- Üretim yapısı: `npm run build`
- Yerel önizleme: `npm run preview`
- Capacitor senkronizasyon: `npx cap sync`

## 7) Dosya Yapısı

- `src/pages` — Sayfalar
- `src/App.tsx` — Rotalar
- `src/main.tsx` — Giriş noktası
- `vite.config.ts` — Vite + PWA ayarı
- `capacitor.config.ts` — Hibrit (Capacitor) yapılandırması