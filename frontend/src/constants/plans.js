// Feature matrix — customer-facing source of truth for the published packages.
// Keep this aligned with PRICING_PLANS so package badges never contradict pricing.
export const PLAN_KEYS = { STARTER: "starter", GROWTH: "growth", ENTERPRISE: "enterprise" };

export const PLAN_LABEL = {
  [PLAN_KEYS.STARTER]: "Starter",
  [PLAN_KEYS.GROWTH]: "Growth",
  [PLAN_KEYS.ENTERPRISE]: "Enterprise",
};

// Minimum plan level for each feature key.
// Order: starter < growth < enterprise (visitor sees badge = minimum plan that unlocks it)
export const FEATURE_MATRIX = {
  // STARTER features (base)
  "core.dashboard":       PLAN_KEYS.STARTER,
  "core.categories":      PLAN_KEYS.STARTER,
  "core.products":        PLAN_KEYS.STARTER,
  "core.orders":          PLAN_KEYS.STARTER,
  "core.customers":       PLAN_KEYS.STARTER,
  "core.settings":        PLAN_KEYS.STARTER,
  "core.subscription":    PLAN_KEYS.STARTER,
  "reports.basic":        PLAN_KEYS.STARTER,
  "marketing.banner":     PLAN_KEYS.STARTER,
  "shipping.settings":    PLAN_KEYS.STARTER,
  "integration.midtrans": PLAN_KEYS.STARTER,
  "seo.basic":            PLAN_KEYS.STARTER,

  // GROWTH additions
  "marketing.voucher":       PLAN_KEYS.GROWTH,
  "marketing.popup_banner":  PLAN_KEYS.GROWTH,
  "reports.advanced":        PLAN_KEYS.GROWTH,
  "reports.export":          PLAN_KEYS.GROWTH,
  "branding.platform":       PLAN_KEYS.GROWTH,
  "notifications.browser":   PLAN_KEYS.GROWTH,
  "support.priority":        PLAN_KEYS.GROWTH,

  // ENTERPRISE additions
  "users.multi_admin":       PLAN_KEYS.ENTERPRISE,
  "notifications.pwa":       PLAN_KEYS.ENTERPRISE,
  "features.early_access":   PLAN_KEYS.ENTERPRISE,
};

// Customer-facing copy for feature grid (Section Fitur)
// Each feature: icon key (lucide), title (Bahasa), desc, feature key(s) it maps to.
export const FEATURE_CARDS = [
  { icon: "LayoutDashboard", title: "Dashboard toko",
    desc: "Ringkasan performa toko dan aktivitas terbaru.",
    keys: ["core.dashboard"] },
  { icon: "Package", title: "Kelola produk",
    desc: "Tambah, edit, dan kategorisasi produk dengan mudah.",
    keys: ["core.products", "core.categories"] },
  { icon: "ShoppingBag", title: "Kelola pesanan",
    desc: "Terima dan proses pesanan dari satu dashboard.",
    keys: ["core.orders"] },
  { icon: "Users", title: "Kelola pelanggan",
    desc: "Simpan data pelanggan untuk komunikasi jangka panjang.",
    keys: ["core.customers"] },
  { icon: "BarChart3", title: "Laporan penjualan dasar",
    desc: "Pantau ringkasan performa dan aktivitas penjualan toko Anda.",
    keys: ["reports.basic"] },
  { icon: "Megaphone", title: "Banner promosi",
    desc: "Tampilkan banner promosi di storefront Anda.",
    keys: ["marketing.banner"] },
  { icon: "CreditCard", title: "Pembayaran online (Midtrans)",
    desc: "Terima pembayaran online melalui payment gateway yang terintegrasi.",
    keys: ["integration.midtrans"] },
  { icon: "Truck", title: "Pengaturan pengiriman",
    desc: "Atur opsi pengiriman untuk pesanan toko Anda.",
    keys: ["shipping.settings"] },
  { icon: "Palette", title: "Kustomisasi branding",
    desc: "Sesuaikan tampilan storefront dengan branding Anda.",
    keys: ["branding.platform"] },
  { icon: "Search", title: "SEO dasar",
    desc: "Fondasi SEO agar halaman toko lebih mudah dikenali mesin pencari.",
    keys: ["seo.basic"] },
  { icon: "FileSpreadsheet", title: "Laporan lanjutan & Export Excel",
    desc: "Analisis performa lebih detail dan ekspor data untuk operasional bisnis.",
    keys: ["reports.advanced", "reports.export"] },
  { icon: "Bell", title: "Browser Notification",
    desc: "Dapatkan notifikasi aktivitas toko melalui browser.",
    keys: ["notifications.browser"] },
  { icon: "UserCog", title: "Multi Admin",
    desc: "Undang tim untuk mengelola toko bersama.",
    keys: ["users.multi_admin"] },
  { icon: "LifeBuoy", title: "Dukungan prioritas",
    desc: "Dapatkan prioritas bantuan mulai dari paket Growth.",
    keys: ["support.priority"] },
  { icon: "BellRing", title: "PWA Push Notification",
    desc: "Notifikasi push untuk pengalaman aplikasi yang lebih lengkap.",
    keys: ["notifications.pwa"] },
];

// Return minimum plan required for a card (highest requirement wins across its keys)
export function minPlanForCard(card) {
  const order = { starter: 0, growth: 1, enterprise: 2 };
  let max = PLAN_KEYS.STARTER;
  for (const k of card.keys) {
    const p = FEATURE_MATRIX[k];
    if (p && order[p] > order[max]) max = p;
  }
  return max;
}

// Pricing cards — Go Live v1.0 (paket resmi Dynicty).
// Setiap paket menyertakan waMessage untuk CTA WhatsApp yang paket-aware.
export const PRICING_PLANS = [
  {
    key: PLAN_KEYS.STARTER,
    name: "Starter",
    tagline: "Cocok untuk UMKM yang baru memulai toko online.",
    priceDisplay: "Rp 599.000",
    pricePeriod: "/ tahun",
    ctaLabel: "Konsultasikan Paket Starter",
    highlighted: false,
    features: [
      "Website toko online",
      "Subdomain Dynicty",
      "Kelola produk",
      "Kelola kategori",
      "Kelola pesanan",
      "Kelola pelanggan",
      "SEO dasar",
      "Payment Gateway (Midtrans)",
      "Shipping dasar",
      "Mobile responsive",
    ],
    waMessage:
      "Halo Admin Dynicty,\n\nSaya tertarik dengan paket Starter Dynicty.\n\nMohon informasi lebih lanjut.",
  },
  {
    key: PLAN_KEYS.GROWTH,
    name: "Growth",
    tagline:
      "Untuk bisnis yang sedang berkembang dan membutuhkan identitas brand sendiri.",
    priceDisplay: "Rp 1.199.000",
    pricePeriod: "/ tahun",
    ctaLabel: "Konsultasikan Paket Growth",
    highlighted: true, // paket paling populer di antara ketiganya
    features: [
      "Semua fitur Starter",
      "Custom Domain Support",
      "Advanced Reports",
      "Export Excel",
      "Browser Notification",
      "Prioritas Support",
    ],
    notes: "Custom domain didukung. Biaya domain ditanggung pelanggan.",
    waMessage:
      "Halo Admin Dynicty,\n\nSaya tertarik dengan paket Growth Dynicty.\n\nMohon informasi lebih lanjut.",
  },
  {
    key: PLAN_KEYS.ENTERPRISE,
    name: "Enterprise",
    tagline:
      "Solusi lengkap untuk bisnis yang membutuhkan fitur premium dan operasional lebih besar.",
    priceDisplay: "Rp 2.399.000",
    pricePeriod: "/ tahun",
    ctaLabel: "Konsultasikan Paket Enterprise",
    highlighted: false,
    features: [
      "Semua fitur Growth",
      "Gratis Domain .COM/.ID Tahun Pertama",
      "Multi Admin",
      "PWA Push Notification",
      "Prioritas Support Tertinggi",
      "Early Access Features",
    ],
    waMessage:
      "Halo Admin Dynicty,\n\nSaya tertarik dengan paket Enterprise Dynicty.\n\nMohon informasi lebih lanjut.",
  },
];

// -----------------------------------------------------------------------------
// Add-On Premium — fitur tambahan opsional (Go Live v1.0)
// -----------------------------------------------------------------------------
export const ADDON_ITEMS = [
  {
    key: "jubelio-shipping",
    name: "Jubelio Shipping Integration",
    priceDisplay: "Rp 999.000",
    pricePeriod: "/ tahun",
    features: [
      "Auto cek ongkir",
      "Auto generate AWB",
      "Tracking otomatis",
      "Cancel AWB",
      "Multi courier",
    ],
    ctaLabel: "Tanyakan Add-on",
    waMessage:
      "Halo Admin Dynicty,\n\nSaya tertarik dengan add-on Jubelio Shipping Integration.\n\nMohon informasi lebih lanjut.",
  },
  {
    key: "whatsapp-notification",
    name: "WhatsApp Notification",
    priceDisplay: "Rp 99.000",
    pricePeriod: "/ bulan",
    features: [
      "Order masuk",
      "Pembayaran berhasil",
      "Pesanan dikirim",
    ],
    ctaLabel: "Tanyakan Add-on",
    waMessage:
      "Halo Admin Dynicty,\n\nSaya tertarik dengan add-on WhatsApp Notification.\n\nMohon informasi lebih lanjut.",
  },
  {
    key: "customer-chat",
    name: "Customer Chat",
    priceDisplay: "Rp 99.000",
    pricePeriod: "/ bulan",
    features: [
      "Chat Customer ↔ Seller",
      "Riwayat percakapan",
      "Notifikasi pesan baru",
    ],
    ctaLabel: "Tanyakan Add-on",
    waMessage:
      "Halo Admin Dynicty,\n\nSaya tertarik dengan add-on Customer Chat.\n\nMohon informasi lebih lanjut.",
  },
  {
    key: "loyalty-point",
    name: "Loyalty Point",
    priceDisplay: "Rp 49.000",
    pricePeriod: "/ bulan",
    features: [
      "Point pelanggan",
      "Reward pembelian",
      "Program loyalitas",
    ],
    ctaLabel: "Tanyakan Add-on",
    waMessage:
      "Halo Admin Dynicty,\n\nSaya tertarik dengan add-on Loyalty Point.\n\nMohon informasi lebih lanjut.",
  },
  {
    key: "membership-tier",
    name: "Membership Tier",
    priceDisplay: "Rp 49.000",
    pricePeriod: "/ bulan",
    features: [
      "Silver",
      "Gold",
      "Platinum",
      "Benefit pelanggan",
    ],
    ctaLabel: "Tanyakan Add-on",
    waMessage:
      "Halo Admin Dynicty,\n\nSaya tertarik dengan add-on Membership Tier.\n\nMohon informasi lebih lanjut.",
  },
];

// -----------------------------------------------------------------------------
// Custom Web App — solusi custom, priced on request.
// -----------------------------------------------------------------------------
export const CUSTOM_WEB_APP = {
  title: "Custom Web App",
  priceDisplay: "Hubungi Kami",
  description:
    "Kami membantu membangun solusi digital custom seperti Marketplace, ERP, CRM, HRIS, Booking System, hingga Mobile App Android/iOS sesuai kebutuhan bisnis Anda.",
  bullets: [
    "Marketplace",
    "ERP",
    "CRM",
    "HRIS",
    "Booking System",
    "Mobile App Android/iOS",
    "Sistem Internal Perusahaan",
    "Solusi Custom Sesuai Kebutuhan",
  ],
  ctaLabel: "Hubungi Kami",
  waMessage:
    "Halo Admin Dynicty,\n\nSaya tertarik membuat aplikasi atau sistem custom.\n\nBisakah saya berkonsultasi lebih lanjut mengenai kebutuhan proyek saya?",
};

// Templates — only Sinar Telur is published. Rest = Segera Hadir.
export const TEMPLATES_LIST = [
  { name: "Sinar Telur", category: "Retail & E-Commerce", categoryKey: "retail", status: "available", accent: "amber" },
  { name: "Fashion",         category: "Fashion",             categoryKey: "fashion",   status: "coming",    accent: "pink" },
  { name: "Beauty & Health", category: "Beauty & Health",     categoryKey: "beauty",    status: "coming",    accent: "rose" },
  { name: "Food & Beverage", category: "Food & Beverage",     categoryKey: "fnb",       status: "coming",    accent: "amber" },
  { name: "Automotive",      category: "Automotive",          categoryKey: "auto",      status: "coming",    accent: "red" },
  { name: "Home & Living",   category: "Home & Living",       categoryKey: "home",      status: "coming",    accent: "emerald" },
  { name: "Electronics",     category: "Electronics",         categoryKey: "electronics",status: "coming",   accent: "sky" },
  { name: "Sports",          category: "Sports",              categoryKey: "sports",    status: "coming",    accent: "lime" },
  { name: "Vape",            category: "Vape",                categoryKey: "vape",      status: "coming",    accent: "violet" },
];
