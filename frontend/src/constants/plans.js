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

// Pricing cards (Opsi B — Segera Diumumkan) — locked per PRD v2.1 section 20.3
export const PRICING_PLANS = [
  {
    key: PLAN_KEYS.STARTER,
    name: "Starter",
    tagline: "Untuk UMKM yang baru mulai memiliki toko sendiri.",
    priceDisplay: "Segera Diumumkan",
    ctaLabel: "Pelajari Paket",
    highlighted: false,
    features: [
      "Dashboard toko",
      "Kelola kategori dan produk",
      "Kelola pesanan",
      "Kelola pelanggan",
      "Pengaturan toko dan langganan",
      "Laporan penjualan dasar",
      "Banner promosi di storefront",
      "Pengaturan pengiriman dasar (manual)",
      "Pilihan template yang tersedia",
    ],
  },
  {
    key: PLAN_KEYS.GROWTH,
    name: "Growth",
    tagline: "Untuk brand yang membutuhkan pembayaran online, promosi, branding, dan laporan lebih lengkap.",
    priceDisplay: "Segera Diumumkan",
    ctaLabel: "Pelajari Paket",
    highlighted: false, // per PRD v2.1: badge Popular OFF for v1
    features: [
      "Semua fitur Starter",
      "Voucher & kode promo",
      "Popup banner promosi",
      "Laporan penjualan lanjutan",
      "Pembayaran online (Midtrans)",
      "Kustomisasi branding lebih lengkap",
      "Optimasi SEO platform",
    ],
  },
  {
    key: PLAN_KEYS.ENTERPRISE,
    name: "Enterprise",
    tagline: "Untuk bisnis dengan kebutuhan integrasi, tim, dan operasional lanjutan.",
    priceDisplay: "Hubungi Kami",
    ctaLabel: "Hubungi Tim Dynicty",
    highlighted: false,
    features: [
      "Semua fitur Growth",
      "Integrasi Jubelio",
      "Integrasi marketplace",
      "Akses API",
      "Multi Admin (banyak pengguna)",
      "Dukungan prioritas",
    ],
  },
];

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
