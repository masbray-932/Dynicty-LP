# plan.md — DYNICTY Landing Page Repositioning v2.1 (Updated)

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
- Kepatuhan privacy: **tidak mengekspos** Platform Owner Portal (tidak ada `app.dynicty.com`, tidak ada login, tidak ada UI/platform owner dashboard, tidak ada data internal/tenant management).
- CTA strategy v1: **tanpa free trial / public registration**. Semua CTA mengarah ke **/kontak** (contact page internal) yang submit ke backend.
- Pricing v1: **tidak hardcode** angka harga (menghindari asumsi). Tampilkan “Segera Diumumkan” untuk Starter/Growth dan “Hubungi Kami” untuk Enterprise.
- Template v1: hanya template yang benar-benar published dipasarkan. Saat ini **hanya “Sinar Telur”** = tersedia; 8 kategori lain **Segera Hadir** dengan tombol preview disabled.
- Feature marketing harus sesuai **Feature Package Matrix existing**; setiap feature di section fitur wajib memiliki badge paket minimum: Starter / Growth / Enterprise.
- Performance & quality: fast-loading, responsive, accessible, SEO dasar siap produksi; **tanpa framer-motion** (gunakan CSS + IntersectionObserver native) demi ringan dan sesuai dependency policy.

**Status Objective (per sprint v2.1):**
- ✅ Landing page v2.1 selesai dan production-ready (13 section + /kontak + /privacy + /terms + 404).
- ✅ Copywriting & positioning sudah sesuai PRD v2.1 (tanpa jargon teknis; tanpa klaim fiktif).
- ✅ Semua CTA → /kontak, contact form functional, tersimpan ke MongoDB.
- ✅ Pricing “Segera Diumumkan” (tanpa angka) + CTA “Pelajari Paket/Hubungi Tim Dynicty” → /kontak.
- ✅ Template compliance: hanya “Sinar Telur” preview aktif; lainnya “Segera Hadir”.
- ✅ Feature matrix akurat + badge paket minimum di setiap feature card.
- ✅ Brand assets: **logo horizontal resmi sudah terpasang untuk Navbar/Mobile Drawer/Footer**.
- ✅ testing_agent_v3: 100% pass (backend 11/11, frontend 26/26). `CI=true yarn build` PASS.

---

## 2) Implementation Steps

### Phase 1 — PRD Repositioning (Planning)
> Sprint planning-only untuk menyelaraskan positioning dan menghapus klaim/fitur yang belum tersedia.

**Deliverables (DONE):**
- PRD v2.1 final: positioning UMKM+seller marketplace, hero locked, scope v1 = 13 section.
- Audit klaim & fitur: hapus semua angka/testimoni fiktif, “Coba Gratis”, “Login”, dan semua platform-owner exposure.
- Pricing rules: Opsi B “Segera Diumumkan”, tanpa endpoint pricing publik.

**Status:** ✅ Selesai.

---

### Phase 2 — V1 App Development (Backend + Frontend)

#### 2.1 Backend (FastAPI + MongoDB)
**Implementasi aktual (DONE):**
- Modul leads tetap tersedia tanpa mengganggu engine existing.
- Mongo collections:
  - `free_trial_leads`
  - `newsletter_subscriptions` (unique index `email`)
  - `contact_leads`
- Index:
  - `newsletter_subscriptions.email` unique
  - index tambahan untuk `free_trial_leads.email` dan `contact_leads.created_at`
- Pydantic schemas + validasi:
  - Free Trial: `{nama, email, bisnis, telepon, paket?, honeypot?}`
  - Newsletter: `{email, honeypot?}`
  - Contact: `{nama, email, pesan, honeypot?}`
- REST endpoints (aktif):
  - `POST /api/leads/contact` **(dipakai v2.1 via /kontak)**
  - `POST /api/leads/free-trial` (tetap ada untuk Phase 2; **tidak dipakai UI v1**)
  - `POST /api/leads/newsletter` (tetap ada untuk Phase 2; **tidak dipakai UI v1**)
  - `GET /api/leads/stats` (tetap ada; **tidak dipakai UI v1**)
  - `GET /api/health`
- Anti-spam MVP:
  - Honeypot field di backend: jika terisi → request diterima tapi discard (silent).

**Catatan kepatuhan v2.1:**
- Tidak membuat endpoint pricing publik (`GET /api/public/pricing`) sesuai keputusan.

**Testing (DONE):**
- testing_agent_v3 memverifikasi contact endpoint: valid→200, invalid→422, honeypot→silent discard.

**Status:** ✅ Selesai.

#### 2.2 Frontend (React existing stack — v2.1 rebuild)
**Implementasi aktual (DONE):**
- Route public:
  - `/` landing page v2.1 (13 section)
  - `/kontak` halaman kontak internal (form → `POST /api/leads/contact`)
  - `/privacy`, `/terms`, `*` (404)
- **Sitemap v1** sesuai PRD v2.1: hanya `/`, `/kontak`, `/privacy`, `/terms`.
- Struktur 13 section (sesuai scope v1):
  1) Sticky Navbar (logo resmi + menu anchors + CTA “Hubungi Kami” → /kontak)
  2) Hero locked copy + **storefront tenant mockup** (bukan dashboard)
  3) Masalah seller marketplace
  4) Paradigma: marketplace + website sendiri
  5) Solusi Dynicty (3 pilar)
  6) Cara Kerja (4 langkah)
  7) Template Showcase (Sinar Telur tersedia; lainnya Segera Hadir)
  8) Feature section business-first + badge paket minimum (Starter/Growth/Enterprise)
  9) Perbandingan marketplace-only vs marketplace + Dynicty + disclaimer payment gateway
  10) Pricing: Starter/Growth “Segera Diumumkan”, Enterprise “Hubungi Kami”, Popular badge OFF
  11) FAQ (8 item)
  12) Final CTA “Hubungi Kami” → /kontak
  13) Footer (tanpa social icons, tanpa newsletter)
- Copy compliance:
  - Tidak ada “Coba Gratis”, tidak ada angka fiktif/testimoni fiktif.
  - Tidak menjelekkan marketplace; fokus kolaboratif.
- Privacy compliance:
  - Tidak ada `app.dynicty.com`, tidak ada login route/button.
  - Tidak ada screenshot/platform owner dashboard.
- Animasi:
  - **framer-motion dihapus**, diganti `IntersectionObserver` native + CSS transitions + `prefers-reduced-motion`.

**Status:** ✅ Selesai.

#### 2.3 SEO & Brand Assets
**Implementasi aktual (DONE):**
- `react-helmet-async` untuk title/description/canonical, OG, Twitter card.
- JSON-LD:
  - Organization
  - WebSite
  - FAQPage (inline di section FAQ)
- `robots.txt` + `sitemap.xml` disesuaikan untuk v1 routes.
- Brand assets:
  - App icon resmi dipakai untuk favicon set.
  - Social previews: `brand/og-image.png` dan `brand/twitter-card.png` dibuat dari logo resmi (tanpa modifikasi logo; hanya compositing di canvas).

**Status:** ✅ Selesai.

#### 2.4 Performance & Accessibility
- Performa:
  - Storefront mockup dibuat dengan SVG/HTML ringan.
  - Animasi minimal berbasis CSS + IO; reduce-motion respected.
- A11y:
  - Semantic structure, form validation + aria-invalid untuk input error.

**Status:** ✅ Selesai.

#### 2.5 Quality Gates
- ✅ `CI=true yarn build` PASS
- ✅ testing_agent_v3 PASS 100% (backend 11/11, frontend 26/26)
- ✅ Privacy audit: tidak ada referensi `app.dynicty.com`, login, atau “Coba Gratis” pada UI publik.
- ESLint: clean untuk code landing; peringatan hanya dari komponen shadcn pre-existing.

**Status:** ✅ Selesai.

#### 2.6 Navbar Official Horizontal Logo Replacement (P0)
> Menyelesaikan blocker sprint sebelumnya: mengganti logo Navbar + mobile drawer menjadi **asset horizontal resmi**.

**Implementasi aktual (DONE):**
- Aset logo horizontal resmi (icon DTY + wordmark **DYNICTY** + tagline **BUILD • GROW • EMPOWER**) diproses:
  - Background dihapus (tetap mempertahankan warna/visual asli).
  - Crop berdasarkan area alpha yang terlihat.
  - Resize final menjadi **1000×241**.
  - Rasio aspek ~**4.15:1**.
- File yang dipakai aplikasi:
  - ✅ Terpasang di: `/app/frontend/public/brand/dynicty-logo.png`
  - (Logo stacked sebelumnya tidak lagi dipakai di path tersebut.)
- Penyesuaian UI di `Navbar.jsx`:
  - Desktop: `h-11 md:h-12 lg:h-[52px]` (w-auto, object-contain)
  - Mobile navbar: tetap mengikuti komponen Navbar dengan height di atas
  - Mobile drawer: `h-14`
  - Tambahan subtle glow: `drop-shadow` ungu untuk menjaga keterbacaan di background gelap.
- Verifikasi visual (DONE):
  - Desktop viewport **1920×800**: logo terbaca jelas.
  - Mobile viewport **390×800** + drawer terbuka: logo terbaca jelas.

**Testing (DONE):**
- ✅ Screenshot test: desktop + mobile + drawer
- ✅ Build: `CI=true yarn build` PASS

**Status:** ✅ Selesai — blocker P0 **RESOLVED**.

---

### Phase 3 — Phase 2 Features (Deferred / Pending Prioritization)
**Belum dikerjakan (menunggu prioritas user):**
- Kalkulator Penghematan (interactive)
- Newsletter: UI + integrasi endpoint + double-opt (opsional)
- Blog section
- Dynamic Pricing via `GET /api/public/pricing` (menggantikan “Segera Diumumkan” saat harga resmi tersedia)
- Customer stories/testimoni nyata (menunggu data + izin)

**Status:** ⏳ Pending prioritas.

---

## 3) Next Actions
1. ✅ Navbar logo horizontal sudah beres dan tervalidasi screenshot.
2. Tentukan prioritas Phase 2 (pilih 1):
   - **P1:** Kalkulator Penghematan (paling berdampak untuk value proof)
   - **P2:** Newsletter UI + integrasi endpoint
   - **P2:** Blog section
   - **P2:** Dynamic Pricing endpoint + UI (butuh harga resmi)
3. (Opsional) Tambahkan rate-limit server-side yang lebih kuat untuk `/api/leads/contact` (mis. per IP) jika dibutuhkan.
4. Jalankan quality gate setiap iterasi: ESLint, `CI=true yarn build`, testing_agent_v3, screenshot sanity check untuk navbar/hero.

---

## 4) Success Criteria
- ✅ Landing page v2.1 sesuai PRD: positioning UMKM + seller marketplace, tanpa jargon teknis.
- ✅ Hero copy locked + **storefront-only** (tidak ada platform owner dashboard).
- ✅ Semua CTA mengarah ke **/kontak**; contact form berhasil POST dan tersimpan ke MongoDB.
- ✅ Pricing: “Segera Diumumkan” (Starter/Growth) dan “Hubungi Kami” (Enterprise), tanpa hardcode angka.
- ✅ Template: hanya “Sinar Telur” tersedia; kategori lain “Segera Hadir” dengan preview disabled.
- ✅ Feature section akurat mengikuti feature matrix existing + badge paket minimum.
- ✅ Tidak ada “Coba Gratis”, tidak ada login, tidak ada `app.dynicty.com`, tidak ada data internal.
- ✅ SEO dasar siap produksi (OG/Twitter/meta/schema/robots/sitemap/favicon) + build production sukses.
- ✅ Quality gate: `CI=true yarn build` PASS, testing_agent_v3 100% pass.
- ✅ **Navbar + mobile drawer menggunakan logo horizontal resmi yang terbaca pada tema gelap.**
