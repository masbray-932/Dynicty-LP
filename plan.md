# plan.md — DYNICTY Landing Page Foundation v1.0 (Updated)

## 1) Objectives
- Membuat landing page resmi **dynicty.com** (public) untuk konversi lead, sepenuhnya **Bahasa Indonesia**, premium setara SaaS modern.
- Konsisten dengan **Brand Guideline DYNICTY** (logo DTY/wordmark DYNICTY, warna navy + gradient biru→ungu, glassmorphism ringan, rounded, tagline **BUILD • GROW • EMPOWER**).
- Menyediakan core workflow marketing yang **fungsi penuh**: **Coba Gratis / Newsletter / Contact** tersimpan ke **MongoDB** via **FastAPI**.
- Menjaga batasan: **tidak menyentuh engine/dashboard**; dashboard tetap di **app.dynicty.com** (landing page terpisah).
- SEO & performa siap produksi (OG/Twitter/meta/schema/robots/sitemap/favicon), responsive + accessible, Lighthouse target 90+.

**Status Objective (per sprint ini):**
- ✅ Landing page v1 selesai dan production-ready.
- ✅ Forms fungsional dan persist ke MongoDB.
- ✅ SEO ready (Helmet, robots, sitemap, JSON-LD, favicon).
- ✅ testing_agent_v3: 100% pass (backend 9/9, frontend 10/10).

---

## 2) Implementation Steps

### Phase 1 — Core Workflow (No POC)
> Level aplikasi: landing page + penyimpanan lead sederhana (CRUD ringan), tanpa integrasi pihak ketiga dan tanpa auth ⇒ langsung build.

**Status:** ✅ Selesai.

---

### Phase 2 — V1 App Development (Backend + Frontend)

#### 2.1 Backend (FastAPI + MongoDB)
**Implementasi aktual (DONE):**
- Modul **leads** ditambahkan tanpa mengganggu engine existing.
- Mongo collections:
  - `free_trial_leads`
  - `newsletter_subscriptions` (index unik pada `email`)
  - `contact_leads`
- Index:
  - `newsletter_subscriptions.email` unique
  - index tambahan untuk `free_trial_leads.email` dan `contact_leads.created_at`
- Pydantic schemas + validasi:
  - Free Trial: `{nama, email, bisnis, telepon, paket?, honeypot?}`
  - Newsletter: `{email, honeypot?}`
  - Contact: `{nama, email, pesan, honeypot?}`
  - Phone regex validation dan email normalization (lowercase)
- REST endpoints (aktif):
  - `POST /api/leads/free-trial`
  - `POST /api/leads/newsletter` (duplicate email → 200 dengan pesan “sudah terdaftar”)
  - `POST /api/leads/contact`
  - `GET /api/leads/stats` (seed baseline + dynamic dari counts)
  - `GET /api/health`
- Anti-spam MVP:
  - Honeypot field di backend: jika terisi → request diterima tapi discard (silent).

**Testing (DONE):**
- testing_agent_v3 memverifikasi:
  - Valid payload → 200 dan tersimpan
  - Invalid payload → 422
  - Duplicate newsletter → 200 + message “sudah terdaftar”

**Status:** ✅ Selesai.

#### 2.2 Frontend (React existing stack)
**Implementasi aktual (DONE):**
- Route public landing: `/` dengan single-page layout (tanpa campur dashboard).
- Implement struktur 11 section sesuai spec:
  1) **Sticky Navbar** + smooth scroll anchors + mobile drawer (Sheet)
  2) **Hero**: headline kuat, subheadline, 2 CTA, dashboard mockup (HTML/SVG), floating cards
  3) **Trusted**: partner logo placeholders + counters dari `/api/leads/stats`
  4) **Kenapa Dynicty**: feature cards modern
  5) **Template Showcase**: grid 9 template categories dengan preview (SVG/CSS lightweight)
  6) **Cara Kerja**: 4 langkah
  7) **Feature Showcase**: mockups desktop/tablet/phone
  8) **Pricing**: Starter/Growth/Enterprise + highlight “Paling Populer” untuk Growth
  9) **FAQ**: accordion
  10) **Final CTA**: “Build Your Brand Today” + CTA trial
  11) **Footer**: multi-column + newsletter form
- Forms (functional):
  - Modal “Coba Gratis 14 Hari” → `POST /api/leads/free-trial` (state idle/loading/success)
  - Newsletter footer + Blog page subscribe → `POST /api/leads/newsletter`
  - Contact lead endpoint tersedia (backend), namun UI utama yang dipakai saat ini fokus pada trial + newsletter.
- Branding:
  - Komponen `BrandLogo` (SVG inline DTY monogram + wordmark)
  - Dark mode default dipaksa (brand-first) dengan token CSS “light-ready”
- Animasi:
  - framer-motion untuk entrance/hover ringan + floating cards

**Status:** ✅ Selesai.

#### 2.3 SEO
**Implementasi aktual (DONE):**
- `react-helmet-async` untuk title/description/canonical
- OG tags + Twitter card
- JSON-LD schema:
  - Organization
  - WebSite
- `robots.txt` + `sitemap.xml`
- Favicon embedded SVG (sementara) sudah ada di `public/index.html`

**Status:** ✅ Selesai.

#### 2.4 Minimal extra routes
**Implementasi aktual (DONE):**
- `/privacy` — minimal
- `/terms` — minimal
- `/blog` — Coming Soon + subscribe
- `/login` — halaman info + link ke `https://app.dynicty.com`
- `*` — NotFound

**Status:** ✅ Selesai.

#### 2.5 Performance & Accessibility
- Performa:
  - Menghindari screenshot berat: mockup dashboard/templating menggunakan SVG/CSS.
  - Reduce-motion respected (animasi floating non-krusial berhenti saat prefers-reduced-motion).
- A11y:
  - Modal/Accordion memakai komponen Radix (shadcn).
  - **testing_agent_v3** mencatat 1 warning LOW: “DialogContent aria-describedby”.
    - Catatan: `DialogDescription` sudah dipasang di modal; warning dinilai false-positive/benign.

**Status:** ✅ Selesai.

---

### Phase 3 — Polish & Iterations
**Tujuan Phase 3:** iterasi berbasis feedback bisnis/marketing + polish UI/SEO/performance.

#### 3.1 UI/UX Polish
- Light theme toggle (persist via localStorage) + refine contrast (optional, sesuai prioritas).
- Microcopy improvement (headline, pricing disclaimers, CTA).
- Tambah section “Contact/Sales” yang eksplisit (opsional) atau tombol “Hubungi Sales” yang mengarah ke form contact.

#### 3.2 Template Preview (Optional)
- Halaman preview template per kategori (statis) dengan showcase lebih detail.
- Jika nanti ada aset real template, ganti SVG preview → WebP (lazy-loaded).

#### 3.3 Leads Admin-lite (Optional)
- Admin view sederhana untuk melihat leads tanpa akses database langsung.
  - Aman: dilindungi env flag atau basic auth.
  - Endpoint export/list internal-only.

#### 3.4 Hardening SEO & Analytics (Optional)
- OG image real (`/og-image.png`) dan `/logo.svg` di public.
- Sitemap automation (kalau blog sudah real).
- Event tracking (CTA clicks, trial submissions) jika dibutuhkan.

**Status:** ⏳ Belum mulai (menunggu feedback/prioritas).

---

## 3) Next Actions
1. ✅ Kumpulkan feedback dari stakeholder (copy, pricing, template naming, CTA behavior).
2. (Optional) Implement **Contact UI** yang memanfaatkan endpoint `POST /api/leads/contact` (jika ingin dipakai di landing, bukan hanya tersedia di backend).
3. (Optional) Tambahkan aset SEO produksi: `og-image.png`, `logo.svg`, favicon set final (file-based), dan perbaikan meta jika diperlukan.
4. (Optional) Light mode toggle + QA visual.
5. Jalankan quality gate setiap iterasi: ESLint, Ruff, Pytest, `yarn build`, testing_agent_v3 jika ada perubahan signifikan.

---

## 4) Success Criteria
- ✅ Landing page premium sesuai guideline, lengkap 11 section, responsive (mobile/tablet/desktop).
- ✅ Form **Coba Gratis** dan **Newsletter** berhasil POST dan tersimpan di MongoDB, termasuk handling duplicate.
- ✅ Endpoint **Contact** tersedia dan teruji via API; UI bisa ditambahkan sesuai prioritas.
- ✅ Dashboard tidak berubah; link Login menuju `app.dynicty.com`.
- ✅ SEO ready (OG/Twitter/meta/schema/robots/sitemap/favicon) + build production sukses.
- ✅ Quality gate: Python 3.9 compatible, backend endpoints OK, `yarn build` OK, testing_agent_v3 pass 100%.
