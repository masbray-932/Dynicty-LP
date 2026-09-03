// -----------------------------------------------------------------------------
// DYNICTY — Landing Page SEO Registry (single source of truth)
// -----------------------------------------------------------------------------
// This file is the ONLY place metadata lives. On a future sprint, replace the
// PAGES map + SITE constants with the response of `GET /api/public/seo` to make
// SEO fully dynamic through the Platform Settings API — without touching any
// page component. The SEO component reads from here.
//
// Rules:
// - Do NOT hardcode meta in a page component. Add a new key here instead.
// - `path` uses the pattern `/` prefixed absolute path from site root.
// - `noindex: true` means the page will NOT be indexed and will be excluded
//   from the sitemap.
// - Every user-facing page MUST have a corresponding key.
// -----------------------------------------------------------------------------

export const SITE = {
  name: "Dynicty",
  legalName: "Dynicty",
  tagline: "BUILD • GROW • EMPOWER",
  // Public canonical origin (no trailing slash).
  url: "https://dynicty.com",
  // Default social preview assets (relative to site origin).
  ogImage: "/brand/og-image.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterImage: "/brand/twitter-card.png",
  logo: "/brand/dynicty-logo.png",
  themeColor: "#05060F",
  locale: "id_ID",
  language: "id-ID",
  // Publisher / brand contact metadata (used in Organization schema).
  contact: {
    email: "hello@dynicty.com",
    supportEmail: "support@dynicty.com",
  },
  // Reserved for future Social Profiles — kept empty on purpose for v1.
  sameAs: [],
  // Twitter/X handle (blank until brand social launches).
  twitterSite: "",
  // Business classification.
  category: "SaaS Website Builder",
  // Description used as WebSite / Organization fallback.
  description:
    "Dynicty adalah jasa pembuatan website dan platform e-commerce siap pakai untuk membantu UMKM membangun dan mengelola toko online sendiri.",
};

// -----------------------------------------------------------------------------
// SoftwareApplication (Product) descriptor. Used by the SoftwareApplication
// JSON-LD block. When pricing goes live on the platform, only the `offer` field
// needs to be swapped to a dynamic value.
// -----------------------------------------------------------------------------
export const APPLICATION = {
  name: "Dynicty",
  category: "BusinessApplication",
  operatingSystem: "Web",
  applicationSuite: "Dynicty Platform",
  // v1: price disclosed as TBA — schema still valid with priceSpecification omitted.
  offer: null,
  featureList: [
    "Toko online dengan domain & branding sendiri",
    "Katalog produk, kategori, dan stok",
    "Manajemen pesanan & pelanggan",
    "Halaman tentang, kontak, dan promosi",
    "Integrasi pembayaran (Midtrans)",
    "Optimasi SEO dasar per toko",
    "Mobile-friendly & performa cepat",
    "Dukungan onboarding tim Dynicty",
  ],
};

// -----------------------------------------------------------------------------
// PAGES — keyed metadata. Add new pages here as they become available.
// - `title`      — final <title> value (already includes brand suffix if needed)
// - `description`— max ~160 chars, page-unique
// - `path`       — absolute path from origin ("/" for home)
// - `noindex`    — optional; excludes from sitemap and adds robots meta
// - `breadcrumb` — ordered list of [{name, path}] from Home to current page
// - `schemas`    — optional array of extra schema keys to include on this page
//                  (e.g. ["SoftwareApplication"])
// -----------------------------------------------------------------------------
export const PAGES = {
  home: {
    path: "/",
    title:
      "Dynicty — Jasa Pembuatan Website & Platform E-commerce untuk UMKM",
    description:
      "Dynicty menyediakan jasa pembuatan website dan platform e-commerce untuk UMKM. Bangun toko online sendiri dengan pengelolaan produk, pembayaran, pengiriman, dan branding profesional.",
    breadcrumb: [{ name: "Home", path: "/" }],
    schemas: ["SoftwareApplication"],
  },
  contact: {
    path: "/kontak",
    title: "Hubungi Kami — Dynicty",
    description:
      "Diskusikan paket, template, dan proses onboarding Dynicty. Tim kami membantu UMKM dan seller marketplace memulai toko online sendiri.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Hubungi Kami", path: "/kontak" },
    ],
  },
  privacy: {
    path: "/privacy",
    title: "Kebijakan Privasi — Dynicty",
    description:
      "Pelajari bagaimana Dynicty mengumpulkan, menggunakan, dan melindungi data Anda saat menggunakan situs dan layanan kami.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Kebijakan Privasi", path: "/privacy" },
    ],
  },
  terms: {
    path: "/terms",
    title: "Syarat & Ketentuan — Dynicty",
    description:
      "Syarat dan ketentuan penggunaan layanan Dynicty untuk pemilik brand, UMKM, dan seller marketplace di Indonesia.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Syarat & Ketentuan", path: "/terms" },
    ],
  },
  notFound: {
    path: "/404",
    title: "Halaman Tidak Ditemukan — Dynicty",
    description:
      "Halaman yang Anda cari tidak tersedia. Kembali ke beranda Dynicty untuk melanjutkan penelusuran.",
    noindex: true,
    breadcrumb: [{ name: "Home", path: "/" }],
  },
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
const trimTrailing = (u) => (u.endsWith("/") && u.length > 1 ? u.slice(0, -1) : u);

export const absoluteUrl = (path = "/") => {
  const base = trimTrailing(SITE.url);
  if (!path) return `${base}/`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

export const getPageSeo = (pageKey) => {
  const page = PAGES[pageKey];
  if (!page) {
    // Fallback to home defaults if key is unknown (safe default).
    return { ...PAGES.home, key: "home" };
  }
  return { ...page, key: pageKey };
};

// -----------------------------------------------------------------------------
// JSON-LD schema builders (schema.org)
// -----------------------------------------------------------------------------
export const SCHEMA_IDS = Object.freeze({
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
});

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": SCHEMA_IDS.organization,
  name: SITE.name,
  legalName: SITE.legalName,
  url: absoluteUrl("/"),
  logo: absoluteUrl(SITE.logo),
  slogan: SITE.tagline,
  description: SITE.description,
  email: SITE.contact.email,
  ...(SITE.sameAs.length > 0 ? { sameAs: SITE.sameAs } : {}),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SCHEMA_IDS.website,
  name: SITE.name,
  url: absoluteUrl("/"),
  inLanguage: SITE.language,
  description: SITE.description,
  publisher: {
    "@id": SCHEMA_IDS.organization,
  },
});

export const webPageSchema = (page) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: page.title,
  description: page.description,
  url: absoluteUrl(page.path),
  inLanguage: SITE.language,
  isPartOf: {
    "@id": SCHEMA_IDS.website,
  },
  primaryImageOfPage: absoluteUrl(SITE.ogImage),
});

export const breadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const softwareApplicationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APPLICATION.name,
    applicationCategory: APPLICATION.category,
    operatingSystem: APPLICATION.operatingSystem,
    applicationSuite: APPLICATION.applicationSuite,
    url: SITE.url,
    image: absoluteUrl(SITE.ogImage),
    description: SITE.description,
    publisher: {
      "@id": SCHEMA_IDS.organization,
    },
    featureList: APPLICATION.featureList,
  };
  if (APPLICATION.offer) {
    schema.offers = {
      "@type": "Offer",
      price: APPLICATION.offer.price,
      priceCurrency: APPLICATION.offer.currency || "IDR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/kontak"),
    };
  }
  return schema;
};

// Registry lookup for extra schema keys declared on a page.
export const SCHEMA_BUILDERS = {
  SoftwareApplication: softwareApplicationSchema,
};

// -----------------------------------------------------------------------------
// Sitemap builder — enumerates only indexable pages. Useful for future sprint
// where sitemap.xml gets dynamically generated from a backend endpoint.
// -----------------------------------------------------------------------------
export const getIndexablePages = () =>
  Object.entries(PAGES)
    .filter(([, page]) => !page.noindex)
    .map(([key, page]) => ({ key, ...page }));

export default {
  SITE,
  SCHEMA_IDS,
  APPLICATION,
  PAGES,
  absoluteUrl,
  getPageSeo,
  organizationSchema,
  websiteSchema,
  webPageSchema,
  breadcrumbSchema,
  softwareApplicationSchema,
  SCHEMA_BUILDERS,
  getIndexablePages,
};
