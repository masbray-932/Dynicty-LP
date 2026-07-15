# plan.md — DYNICTY Landing Page Repositioning v2.1 + SEO Foundation v1 + Landing Page Settings API Integration (Part B) + Pricing Go Live v1.0 (Updated)

## 1) Objectives
- Membuat landing page resmi **dynicty.com** (public) untuk konversi lead **UMKM & seller marketplace** (Shopee/TikTok/Tokopedia/Instagram/Facebook/WhatsApp), sepenuhnya **Bahasa Indonesia**, modern-premium.
- Positioning utama (customer-facing):
  - **Punya website sendiri**
  - **Bangun brand sendiri**
  - **Punya hubungan langsung dengan pelanggan**
  - **Kurangi ketergantungan** pada komisi & biaya layanan marketplace
  - Marketplace tetap sebagai channel akuisisi (bukan musuh)
  - Filosofi: **“Marketplace membantu Anda ditemukan. Dynicty membantu brand Anda dimiliki.”**
- Kepatuhan brand: gunakan **HANYA** logo resmi Dynicty yang di-upload (tanpa redraw/rekayasa), termasuk favicon dan social preview.
- Kepatuhan privacy: **tidak mengekspos** Platform Owner Portal di landing (tidak ada login/public route, tidak ada dashboard mockup).
- CTA strategy:
  - Default: semua CTA dapat fallback ke **/kontak**.
  - **Update:** CTA dapat diarahkan oleh Platform Owner melalui **Landing Page Settings API** (mis. ke WhatsApp) tanpa deploy ulang.
- **Pricing Go Live v1.0 (baru, DONE):** mengganti placeholder/TBA menjadi **harga resmi** + add-on premium + custom web app.
- Template v1: hanya template yang benar-benar published dipasarkan. Saat ini **hanya “Sinar Telur”** = tersedia; 8 kategori lain **Segera Hadir**.
- Feature marketing harus sesuai **Feature Package Matrix existing**.
- Performance & quality: fast-loading, responsive, accessible; **tanpa framer-motion** (gunakan CSS + IntersectionObserver native).
- **SEO Foundation v1 (DONE):** fondasi SEO production-ready untuk landing page.
- **Landing Page Settings API Integration (Part B) (DONE):** Landing Page menjadi consumer endpoint publik agar **kontak + SEO homepage + verification tags** dapat dikontrol Platform Owner **tanpa coding**.

**Status Objective (per sprint v2.1 + SEO v1 + Settings API Part B + Pricing Go Live v1.0):**
- ✅ Landing page v2.1 selesai dan production-ready (13 section + /kontak + /privacy + /terms + 404).
- ✅ Copywriting & positioning sesuai PRD v2.1 (tanpa jargon teknis; tanpa klaim fiktif).
- ✅ Contact form functional (POST /api/leads/contact), tersimpan ke MongoDB.
- ✅ Template compliance: hanya “Sinar Telur” preview aktif; lainnya “Segera Hadir”.
- ✅ Brand assets: **logo horizontal resmi sudah terpasang** untuk Navbar/Mobile Drawer/Footer.
- ✅ **SEO Foundation v1 DONE:** dynamic title/description/OG/Twitter/canonical/robots/sitemap/manifest + structured data lengkap.
- ✅ **Landing Page Settings API Integration (Part B) DONE:** Landing Page mengkonsumsi `GET https://app.dynicty.com/api/public/landing-page-settings` dengan fallback aman.
- ✅ **Pricing Go Live v1.0 DONE:** paket Starter/Growth/Enterprise dengan harga resmi + Add-On Premium + Custom Web App.
- ✅ `CI=true yarn build` PASS.
- ✅ testing_agent_v3: 100% pass (SEO Foundation v1 17/17, Settings API Part B 34/34, Pricing Go Live v1.0 25/25).

---

## 2) Implementation Steps

### Phase 1 — PRD Repositioning (Planning)
> Sprint planning-only untuk menyelaraskan positioning dan menghapus klaim/fitur yang belum tersedia.

**Deliverables (DONE):**
- PRD v2.1 final: positioning UMKM+seller marketplace, hero locked, scope v1 = 13 section.
- Audit klaim & fitur: hapus semua angka/testimoni fiktif, “Coba Gratis”, “Login”, dan semua platform-owner exposure.
- Pricing rules awal: “Segera Diumumkan”, tanpa endpoint pricing publik.

**Status:** ✅ Selesai.

---

### Phase 2 — V1 App Development (Backend + Frontend)

#### 2.1 Backend (FastAPI + MongoDB)
**Implementasi aktual (DONE):**
- Leads endpoint aktif:
  - `POST /api/leads/contact` **(dipakai v2.1 via /kontak)**
  - Endpoint leads lain tetap ada namun **tidak dipakai UI v1**.
- Anti-spam MVP: honeypot field.

**Status:** ✅ Selesai.

#### 2.2 Frontend (React existing stack — v2.1 rebuild)
**Implementasi aktual (DONE):**
- Route public:
  - `/` landing page v2.1 (13 section)
  - `/kontak` halaman kontak internal
  - `/privacy`, `/terms`, `*` (404)
- Struktur 13 section sesuai scope v1.
- Privacy compliance:
  - Tidak ada `app.dynicty.com` exposure sebagai UI/platform portal.
  - Mockup hero adalah storefront.
- Animasi: framer-motion dihapus, diganti CSS + IntersectionObserver.

**Status:** ✅ Selesai.

#### 2.3 SEO & Brand Assets (v2.1 baseline)
**Implementasi aktual (DONE):**
- `react-helmet-async` dipakai.
- `robots.txt`, `sitemap.xml`, favicon set.
- Social previews: `brand/og-image.png` dan `brand/twitter-card.png`.

**Status:** ✅ Selesai.

#### 2.4 Performance & Accessibility
- Performa: mockup storefront ringan.
- A11y: semantic structure + form validation.

**Status:** ✅ Selesai.

#### 2.5 Quality Gates
- ✅ `CI=true yarn build` PASS
- ✅ testing_agent_v3 PASS

**Status:** ✅ Selesai.

#### 2.6 Navbar Official Horizontal Logo Replacement (P0)
> Menyelesaikan blocker sprint sebelumnya: mengganti logo Navbar + mobile drawer menjadi **asset horizontal resmi**.

**Implementasi aktual (DONE):**
- Aset logo horizontal resmi diproses (background dihapus, crop alpha, resize 1000×241).
- Terpasang di: `/app/frontend/public/brand/dynicty-logo.png`.
- Penyesuaian UI di `Navbar.jsx` (desktop & drawer) + subtle glow.
- Verifikasi visual via screenshot (desktop + mobile + drawer).

**Status:** ✅ Selesai — blocker P0 **RESOLVED**.

---

### Phase 3 — SEO Foundation v1 (Landing Page Only) — **COMPLETED**
> Sprint khusus landing page dynicty.com: audit, refactor minimal, future-ready untuk SEO Settings API.

**Deliverables (DONE):**
- ✅ Registry SEO terpusat: `/app/frontend/src/constants/seo.js`
- ✅ Refactor `SEO.jsx` untuk per-page meta + OG + Twitter + JSON-LD.
- ✅ Migrasi pages ke `<SEO pageKey="..." />`.
- ✅ `robots.txt`, `sitemap.xml`, `manifest.json`, `index.html` (hindari meta duplikat).
- ✅ Testing 100% (17/17), build PASS.

**Status:** ✅ Selesai.

---

### Phase 4 — Landing Page Settings API Integration (Part B) — **COMPLETED**
> Integrasi consumer-side agar Landing Page dynicty.com dikontrol Platform Owner via endpoint publik (tanpa backend changes).

#### 4.1 Requirements Recap (DONE)
- Endpoint: `GET https://app.dynicty.com/api/public/landing-page-settings`.
- Menggunakan env var: `REACT_APP_PLATFORM_API_URL`.
- Tidak fetch di setiap component → provider/hook terpusat.
- Fallback aman untuk timeout/CORS/offline/4xx/5xx.
- Integrasi Contact di seluruh CTA (Navbar, Hero, Pricing, Final CTA, Footer, Floating WA, Contact Page).
- Integrasi SEO:
  - Homepage: API override site_title/meta_description/canonical_base/og/twitter image.
  - Page lain: tetap unique title/description dari registry.
  - Verification tags render di semua halaman jika ada.

#### 4.2 Architecture (DONE)
- **Static fallback layer:** `/src/constants/landingSettings.js`
  - fallback default contact + seo
  - normalizer response API
  - helper: `buildWhatsAppUrl()` + `buildMailtoUrl()`
- **Provider / hook terpusat:** `/src/context/LandingPageSettingsContext.jsx`
  - single fetch + **timeout 5s**
  - silent fallback (tidak blocking first paint)
  - sessionStorage cache
  - hormati ETag via `If-None-Match` (jika backend mengirim ETag)
  - expose `{ data, loading, error, refresh(), isFromApi }`
- **Contact abstraction:** `/src/hooks/useContact.js`
  - `ctaHref({ paket, source })` (WA jika tersedia, fallback ke `/kontak?...`)
  - `whatsappUrl(customMessage)`
  - `mailtoUrl(subject)`
  - `hasWhatsApp`, `email`, `address`
- **CTA rendering helper:** `/src/components/landing/CtaLink.jsx`
  - auto switch `Link` (internal) vs `<a target=_blank>` (external WA)
- **Floating WhatsApp CTA:** `/src/components/landing/FloatingWhatsApp.jsx`
  - hanya render jika nomor WA tersedia
  - muncul setelah scroll (UX-friendly)

#### 4.3 Integration Points (DONE)
- App root:
  - `App.js` membungkus app dengan `LandingPageSettingsProvider`.
- SEO:
  - `SEO.jsx` merge order:
    - props → API (home only untuk title/description) → registry → SITE defaults
  - canonical base bisa override dari API
  - OG/Twitter image bisa override dari API
  - verification tags: google/bing/facebook (render hanya jika value tersedia)
  - keywords (meta) render bila API mengirim array keywords
- Contact:
  - `Navbar.jsx` CTA menjadi WA-aware (label “Chat WhatsApp” bila WA tersedia)
  - `Hero.jsx` inline CTA menggunakan WA-aware link
  - `Pricing.jsx` & `FinalCta.jsx` CTA menjadi WA-aware
  - `Footer.jsx` menampilkan WA/email/address dari API (dengan fallback)
  - `ContactPage.jsx` menampilkan “Hubungi langsung” block dari API
  - `LandingPage.jsx` mount `FloatingWhatsApp`

#### 4.4 Environment (DONE)
- `.env`:
  - ✅ Tambah `REACT_APP_PLATFORM_API_URL=https://app.dynicty.com`
  - ✅ Add `CHOKIDAR_USEPOLLING=true` + `WATCHPACK_POLLING=true` untuk mitigasi issue `ENOSPC` file watchers pada environment dev server.
  - Catatan: preview env dapat terkena CORS (expected) → fallback wajib.

#### 4.5 Testing & Verification (DONE)
- ✅ `CI=true yarn build` PASS
- ✅ testing_agent_v3 **100% PASS (34/34)** mencakup:
  - FALLBACK path (CORS/failed fetch) tetap render normal
  - SUCCESS path via mocking route (API override bekerja)
  - MOBILE behavior (floating WA)
  - CACHE behavior (sessionStorage)
  - SEO rules: home override, non-home titles tetap unique, 404 noindex

**Status:** ✅ Selesai — Landing Page kini menjadi consumer settings API tanpa backend changes.

---

### Phase 5 — Pricing Go Live v1.0 — **COMPLETED**
> Mengganti pricing placeholder “Segera Diumumkan” menjadi paket resmi Dynicty, menambah Add-On Premium, serta menambah card Custom Web App. Tanpa redesign besar (preserve UI/UX), tetap responsif, dan seluruh CTA terintegrasi dengan WhatsApp Settings API (tanpa hardcode nomor).

#### 5.1 Package Pricing (DONE)
- Paket:
  - **Starter:** Rp 599.000 / tahun
  - **Growth:** Rp 1.199.000 / tahun (**Paling Populer**) + notes custom domain
  - **Enterprise:** Rp 2.399.000 / tahun
- CTA paket: “Mulai Sekarang”
- WhatsApp message paket-specific:
  - Setiap paket punya `waMessage` dan di-encode via `encodeURIComponent`

#### 5.2 Add-On Premium Section (DONE)
- Section baru: **Add-On Premium** (di bawah Pricing)
- 5 kartu add-on:
  - Jubelio Shipping Integration — Rp 999.000 / tahun
  - WhatsApp Notification — Rp 99.000 / bulan
  - Customer Chat — Rp 99.000 / bulan
  - Loyalty Point — Rp 49.000 / bulan
  - Membership Tier — Rp 49.000 / bulan
- CTA add-on: “Hubungi Kami” (WA jika tersedia, fallback `/kontak?paket=...&src=addon`)

#### 5.3 Custom Web App (DONE)
- Card/section terpisah setelah Add-Ons:
  - Title: “Custom Web App”
  - Price: “Hubungi Kami”
  - 8 bullets solusi (Marketplace, ERP, CRM, HRIS, Booking System, Mobile App Android/iOS, Sistem Internal Perusahaan, Solusi Custom)
- WhatsApp message custom project-specific

#### 5.4 Implementation Notes (DONE)
- **No hardcoded phone numbers** — semua CTA memakai `Landing Page Settings API` (whatsapp_number).
- Fallback aman jika API gagal/CORS:
  - `/kontak?paket=Starter&src=pricing` dst.
  - add-ons: `/kontak?paket=...&src=addon`
  - custom: `/kontak?paket=Custom+Web+App&src=custom-web-app`
- UI preserved + responsive:
  - Desktop: pricing 3-col, add-ons 3-col
  - Mobile: cards stack 1-col

#### 5.5 Known Issue (Low Priority)
- Testing agent menemukan 1 issue kosmetik: **transient scroll-in reveal offset** (Starter card sesaat terlihat lebih rendah ~228px dibanding Growth/Enterprise). Tidak mempengaruhi final layout/CTA.

#### 5.6 Testing & Verification (DONE)
- ✅ `CI=true yarn build` PASS
- ✅ testing_agent_v3 **100% PASS (25/25)**
- ✅ Screenshot coverage:
  - Pricing (desktop)
  - Add-ons (desktop)
  - Custom Web App (desktop)
  - Mobile pricing/add-ons/custom

**Status:** ✅ Selesai — Pricing resmi Dynicty siap Go Live.

---

### Phase 6 — Phase 2 Features (Deferred / Pending Prioritization)
**Belum dikerjakan (menunggu prioritas user):**
- Kalkulator Penghematan (interactive) (P1)
- Newsletter: UI + integrasi endpoint (P2)
- Blog section (P2)
- Dynamic Pricing via `GET /api/public/pricing` (P2) — **catatan:** kebutuhan ini kini berubah karena pricing sudah go-live secara statis di landing. Jika ingin pricing dikelola platform tanpa deploy ulang, pertimbangkan:
  - (a) menambah field pricing ke `landing-page-settings` API, atau
  - (b) mengaktifkan endpoint pricing publik terpisah.
- Customer stories/testimoni nyata (P1) — menunggu data + izin
- Platform SEO Settings API v2 (P2) — jika ingin mengganti sebagian `seo.js` statis menjadi full-dynamic di semua page (saat ini homepage sudah bisa di-override via landing-page-settings)

**Status:** ⏳ Pending prioritas.

---

## 3) Next Actions
1. ✅ Navbar logo horizontal sudah beres dan tervalidasi screenshot.
2. ✅ SEO Foundation v1 selesai dan tervalidasi (testing_agent_v3 100%).
3. ✅ Landing Page Settings API Integration (Part B) selesai dan tervalidasi (testing_agent_v3 34/34).
4. ✅ Pricing Go Live v1.0 selesai dan tervalidasi (testing_agent_v3 25/25).
5. Tentukan prioritas Phase 6 (pilih 1):
   - **P1:** Kalkulator Penghematan (value proof tercepat)
   - **P2:** Newsletter UI + integrasi endpoint
   - **P2:** Blog section
   - **P2:** Pricing via CMS/Platform (bila ingin harga bisa berubah tanpa deploy)
6. Opsional hardening:
   - Tambah rate-limit server-side untuk `/api/leads/contact` (per IP) bila trafik meningkat.
7. Jalankan quality gate setiap iterasi:
   - ESLint
   - `CI=true yarn build`
   - testing_agent_v3
   - screenshot sanity check

---

## 4) Success Criteria
- ✅ Landing page v2.1 sesuai PRD: positioning UMKM + seller marketplace, tanpa jargon teknis.
- ✅ Hero copy locked + **storefront-only**.
- ✅ Contact form berhasil POST dan tersimpan ke MongoDB.
- ✅ Pricing Go Live v1.0:
  - ✅ Starter/Growth/Enterprise tampil dengan harga resmi + period
  - ✅ Growth punya badge “Paling Populer” + notes custom domain
  - ✅ Add-On Premium tampil (5 kartu)
  - ✅ Custom Web App tampil (8 bullets)
- ✅ Template: hanya “Sinar Telur” tersedia; kategori lain “Segera Hadir”.
- ✅ Feature section akurat mengikuti feature matrix existing + badge paket minimum.
- ✅ Tidak ada “Coba Gratis”, tidak ada login, tidak ada exposure platform portal.

**SEO Foundation v1:**
- ✅ Dynamic title/description per halaman
- ✅ Canonical benar (https://dynicty.com)
- ✅ OG + Twitter card lengkap dan konsisten
- ✅ `robots.txt` + `sitemap.xml` valid
- ✅ Structured data lengkap (Organization, WebSite, WebPage, BreadcrumbList, SoftwareApplication, FAQPage)
- ✅ 404 SEO `noindex,nofollow`
- ✅ manifest + performance baseline
- ✅ Registry SEO terpusat future-ready

**Landing Page Settings API Integration (Part B):**
- ✅ Landing Page consume `GET /api/public/landing-page-settings`
- ✅ Contact (WA/email/address) memakai API di navbar/hero/pricing/final-cta/footer/floating-wa/contact-page
- ✅ WhatsApp URL menggunakan `https://wa.me/` + `encodeURIComponent`, tidak membuat link rusak saat nomor kosong
- ✅ Homepage SEO dapat di-override via API (title/description/canonical base/og/twitter images)
- ✅ Non-home pages tetap unique title dari registry (Kontak/Privacy/Terms/404)
- ✅ Verification tags (Google/Bing/Facebook) render bila tersedia (tanpa raw HTML)
- ✅ Static fallback aman untuk CORS/timeout/4xx/5xx/offline
- ✅ Cache ringan (sessionStorage) + ETag (If-None-Match) bila tersedia
- ✅ Zero backend change

**Quality gates:**
- ✅ `CI=true yarn build` PASS
- ✅ testing_agent_v3 100% PASS
- ✅ Navbar + mobile drawer menggunakan logo horizontal resmi yang terbaca pada tema gelap.
- ✅ Pricing Go Live v1.0 verified (desktop + mobile) dengan CTA WhatsApp dinamis dan fallback aman.
