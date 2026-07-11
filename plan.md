# plan.md — DYNICTY Landing Page Foundation v1.0

## 1) Objectives
- Membuat landing page resmi **dynicty.com** (public) untuk konversi lead, sepenuhnya **Bahasa Indonesia**, premium setara SaaS modern.
- Konsisten dengan **Brand Guideline DYNICTY** (logo DTY, warna navy + gradient biru→ungu, glassmorphism ringan, rounded, tagline **BUILD • GROW • EMPOWER**).
- Menyediakan core workflow marketing: **Coba Gratis / Contact / Newsletter** tersimpan ke **MongoDB** via **FastAPI**.
- Menjaga batasan: **tidak menyentuh engine/dashboard**; dashboard tetap di **app.dynicty.com**.
- SEO & performa siap produksi (OG/Twitter/meta/schema/robots/favicon), responsive + accessible, Lighthouse target 90+.

## 2) Implementation Steps

### Phase 1 — Core Workflow (No POC)
> Level aplikasi: landing page + penyimpanan lead sederhana (CRUD ringan), tanpa integrasi pihak ketiga dan tanpa auth ⇒ langsung build.

### Phase 2 — V1 App Development (Backend + Frontend)

#### 2.1 Backend (FastAPI + MongoDB)
- Tambah modul **leads** (tanpa mengganggu engine existing):
  - Mongo collections: `free_trial_leads`, `newsletter_subscriptions`, `contact_leads`.
  - Index unik: newsletter `email` (lowercased); optional untuk free-trial `email`.
- Pydantic schemas (input + response) + sanitasi:
  - `FreeTrialLeadIn {name,email,business_name,phone}`
  - `NewsletterIn {email}`
  - `ContactIn {name,email,message}`
- REST endpoints:
  - `POST /api/leads/free-trial`
  - `POST /api/leads/newsletter`
  - `POST /api/leads/contact`
  - `GET /api/leads/stats` (seed/hardcode awal; siap diganti ke real counters)
- Validasi & anti-spam MVP:
  - rate-limit sederhana berbasis IP (in-memory) **atau** honeypot field di frontend + server check.
- Admin-lite (tanpa auth, internal-only untuk dev):
  - `GET /api/leads/export` (opsional) atau endpoint list per collection dibatasi via env flag.
- Tests:
  - Pytest untuk endpoint status codes + insert + duplicate newsletter.
  - Ruff pass, Python 3.9 compatible.

#### 2.2 Frontend (React existing stack)
- Buat route public landing: `/` (dynicty.com) — **jangan** campur dengan dashboard.
- Implement struktur 11 section (single page) sesuai spec:
  1) **Sticky Navbar** + smooth scroll anchors + mobile hamburger.
  2) **Hero**: headline kuat, subheadline, CTA (Mulai Gratis, Lihat Demo), dashboard mockup (HTML/SVG), floating cards.
  3) **Trusted**: logo placeholder + counters dari `/api/leads/stats`.
  4) **Kenapa Dynicty**: cards fitur (white label, deployment otomatis, template designer, dll).
  5) **Template Showcase**: grid 9 template (Sinar Telur, Fashion, Beauty, F&B, Electronics, Home Living, Automotive, Sports, Vape) + button Preview (modal / new tab placeholder).
  6) **Cara Kerja**: 4 langkah.
  7) **Feature Showcase**: mockups desktop/tablet/phone (komponen responsif, tidak pakai screenshot).
  8) **Pricing**: Starter/Growth/Enterprise + CTA Upgrade (ke Coba Gratis).
  9) **FAQ**: accordion.
  10) **Final CTA**: “Build Your Brand Today” + Coba Gratis.
  11) **Footer**: Company/Product/Resources/Legal/Social + newsletter form.
- Komponen UI:
  - shadcn/ui (Button, Card, Dialog/Modal, Accordion, Tabs optional)
  - lucide-react icons
  - framer-motion animasi ringan (entrance, hover)
- Forms (functional):
  - **Modal “Coba Gratis”** (submit ke `/api/leads/free-trial`) + state: idle/loading/success/error.
  - **Contact/Demo request** (section atau modal) submit ke `/api/leads/contact`.
  - **Newsletter** di footer submit ke `/api/leads/newsletter`.
- Assets & brand:
  - Pakai logo/fav/app icon dari guideline; buat komponen `BrandLogo` (SVG inline) + gradient tokens.
  - Dark default; siapkan token CSS agar “light-ready” (toggle opsional di Phase 3).
- SEO:
  - react-helmet-async: title/description/canonical, OG, Twitter Card.
  - `robots.txt`, `sitemap.xml` (minimal), favicon set.
  - Schema.org JSON-LD (Organization + WebSite).
- Performance/accessibility:
  - Lazy-load sections berat/mockups, image optimization, reduce motion preference.
  - CLS rendah (reserve space), semantic HTML, aria untuk modal/accordion.
- Minimal extra routes:
  - `/privacy`, `/terms` (konten minimal, link di footer).
  - `/blog` menampilkan “Coming Soon” (sesuai navbar).

#### 2.3 Integration & Build
- Pastikan base URL API sesuai environment (dynicty.com → API origin yang sama atau proxy).
- Pastikan `app.dynicty.com` link “Login” mengarah ke dashboard (tanpa mengubah dashboard).
- Jalankan quality gate: ESLint, Ruff, Pytest, yarn build.

#### 2.4 Phase 2 User Stories (V1)
1. Sebagai visitor, saya langsung paham nilai Dynicty dari hero headline + mockup dashboard.
2. Sebagai UMKM, saya bisa scroll fitur/templates/pricing dengan navigasi sticky dan anchor yang halus.
3. Sebagai lead, saya bisa klik “Coba Gratis” dari navbar/hero/final CTA dan submit form lalu melihat konfirmasi sukses.
4. Sebagai visitor, saya bisa mengisi contact/demo request untuk dihubungi dan mendapat feedback status.
5. Sebagai pengguna mobile, saya bisa memakai hamburger menu dan semua section tetap rapi/responsif.
6. Sebagai visitor, saya bisa membuka FAQ accordion untuk menjawab keraguan sebelum mendaftar.

#### 2.5 Phase 2 Testing
- Panggil **testing_agent_v3** untuk E2E:
  - Render halaman `/` dan semua section.
  - Submit free-trial/contact/newsletter dan verifikasi tersimpan di Mongo.
  - Cek responsive breakpoints & lighthouse quick pass.

### Phase 3 — Polish & Iterations
- Light theme toggle (persist via localStorage) + refine contrast.
- Template preview page per kategori (opsional) dengan data statis.
- Admin view sederhana (protected by env var / basic auth) untuk melihat leads.
- Microcopy improvement, animation polish, add real pricing/features jika sudah final.

#### Phase 3 User Stories
1. Sebagai user, saya bisa switch dark/light mode agar nyaman di berbagai kondisi.
2. Sebagai prospect, saya bisa membuka halaman preview template yang lebih detail sebelum trial.
3. Sebagai tim internal, saya bisa melihat daftar leads tanpa akses database langsung.
4. Sebagai visitor, saya mendapat pengalaman lebih cepat lewat optimasi image/code splitting.
5. Sebagai marketer, meta/OG yang konsisten membuat share link terlihat profesional.

## 3) Next Actions
1. Audit repo struktur saat ini: lokasi React app, routing, Tailwind/shadcn readiness, FastAPI app entrypoint, Mongo client util.
2. Implement backend `leads` module + tests.
3. Implement landing page `/` + modal forms + API client.
4. Tambah SEO files (helmet, robots, sitemap, JSON-LD) + legal routes.
5. Jalankan lint/test/build; panggil testing_agent_v3 untuk validasi end-to-end.

## 4) Success Criteria
- Landing page premium sesuai guideline, lengkap 11 section, responsive (mobile/tablet/desktop).
- Form **Coba Gratis**, **Contact**, **Newsletter** berhasil POST dan tersimpan di MongoDB dengan handling error/duplicate.
- Dashboard tidak berubah; link Login menuju `app.dynicty.com`.
- SEO ready (OG/Twitter/meta/schema/robots/favicon) + build production sukses.
- Quality gate: Python 3.9, Ruff+Pytest pass, ESLint pass, `yarn build` pass, testing_agent_v3 pass.
