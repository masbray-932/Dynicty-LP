// Feature matrix — source of truth from PRD v2.1 section 20.7-20.9
// Each feature key comes from existing Feature Package Architecture.
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

  // GROWTH additions
  "marketing.voucher":       PLAN_KEYS.GROWTH,
  "marketing.popup_banner":  PLAN_KEYS.GROWTH,
  "reports.advanced":        PLAN_KEYS.GROWTH,
  "integration.midtrans":    PLAN_KEYS.GROWTH,
  "branding.platform":       PLAN_KEYS.GROWTH,
  "seo.platform":            PLAN_KEYS.GROWTH,

  // ENTERPRISE additions
  "integration.jubelio":     PLAN_KEYS.ENTERPRISE,
  "integration.marketplace": PLAN_KEYS.ENTERPRISE,
  "api.access":              PLAN_KEYS.ENTERPRISE,
  "users.multi_admin":       PLAN_KEYS.ENTERPRISE,
  "support.priority":        PLAN_KEYS.ENTERPRISE,
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
  { icon: "BarChart3", title: "Laporan penjualan",
    desc: "Pantau performa toko dengan laporan dasar hingga lanjutan.",
    keys: ["reports.basic", "reports.advanced"] },
  { icon: "Megaphone", title: "Banner promosi",
    desc: "Tampilkan banner promosi di storefront Anda.",
    keys: ["marketing.banner"] },
  { icon: "Ticket", title: "Voucher & popup promosi",
    desc: "Buat kode promo dan popup untuk campaign khusus.",
    keys: ["marketing.voucher", "marketing.popup_banner"] },
  { icon: "CreditCard", title: "Pembayaran online (Midtrans)",
    desc: "Pembayaran online melalui integrasi Midtrans tersedia pada paket yang mendukung fitur ini.",
    keys: ["integration.midtrans"] },
  { icon: "Truck", title: "Pengaturan pengiriman",
    desc: "Atur opsi pengiriman untuk pesanan toko Anda.",
    keys: ["shipping.settings"] },
  { icon: "Palette", title: "Kustomisasi branding",
    desc: "Sesuaikan tampilan storefront dengan branding Anda.",
    keys: ["branding.platform"] },
  { icon: "Search", title: "Optimasi SEO",
    desc: "Bantuan agar toko Anda lebih mudah ditemukan di mesin pencari.",
    keys: ["seo.platform"] },
  { icon: "Plug", title: "Integrasi Jubelio & marketplace",
    desc: "Sinkronkan data operasional dengan Jubelio dan marketplace.",
    keys: ["integration.jubelio", "integration.marketplace"] },
  { icon: "Code2", title: "Akses API",
    desc: "Untuk kebutuhan integrasi lanjutan dengan sistem Anda.",
    keys: ["api.access"] },
  { icon: "UserCog", title: "Multi Admin",
    desc: "Undang tim untuk mengelola toko bersama.",
    keys: ["users.multi_admin"] },
  { icon: "LifeBuoy", title: "Dukungan prioritas",
    desc: "Prioritas dukungan untuk kebutuhan lanjutan.",
    keys: ["support.priority"] },
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
    ctaLabel: "Mulai Sekarang",
    highlighted: false,
    features: [
      "Website toko online",
      "Subdomain Dynicty",
      "Kelola produk",
      "Kelola kategori",
      "Kelola pesanan",
      "Kelola pelanggan",
      "SEO dasar",
      "Payment Gateway",
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
    ctaLabel: "Mulai Sekarang",
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
    ctaLabel: "Mulai Sekarang",
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
    ctaLabel: "Hubungi Kami",
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
    ctaLabel: "Hubungi Kami",
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
    ctaLabel: "Hubungi Kami",
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
    ctaLabel: "Hubungi Kami",
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
    ctaLabel: "Hubungi Kami",
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
