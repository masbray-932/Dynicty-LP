// -----------------------------------------------------------------------------
// Landing Page Settings — static fallback + shape normalization
// -----------------------------------------------------------------------------
// Contract source (canonical): GET {REACT_APP_PLATFORM_API_BASE}/api/public/landing-page-settings
// Documented in LANDING_PAGE_INTEGRATION_GUIDE.md (Platform Backend, out-of-repo).
//
// Response shape (v1):
// {
//   "contact": {
//     "whatsapp_number":            "6281234567890",
//     "whatsapp_default_message":   "Halo Dynicty, saya ...",
//     "contact_email":              "hello@dynicty.com",
//     "short_address":              "Indonesia"
//   },
//   "seo": {
//     "site_title":                 "Dynicty — ...",
//     "meta_description":           "Dynicty membantu ...",
//     "keywords":                   ["website toko online", ...],
//     "canonical_base_url":         "https://dynicty.com",
//     "og_image_url":               "https://app.dynicty.com/uploads/example-og.png",
//     "twitter_image_url":          "https://app.dynicty.com/uploads/example-twitter.png",
//     "google_site_verification":   "",
//     "bing_site_verification":     "",
//     "facebook_domain_verification": ""
//   },
//   "version":     "1",
//   "updated_at":  "2026-07-14T10:00:00Z"
// }
// -----------------------------------------------------------------------------

/**
 * Static fallback values used when the Platform API is unreachable
 * (network, CORS, 4xx/5xx, timeout). Landing Page must remain fully
 * functional using ONLY these defaults + the existing SEO registry
 * (see /src/constants/seo.js).
 */
export const LANDING_SETTINGS_FALLBACK = Object.freeze({
  contact: {
    whatsapp_number: "",
    whatsapp_default_message:
      "Halo Dynicty, saya tertarik memiliki toko online sendiri. Mohon informasinya, terima kasih.",
    contact_email: "hello@dynicty.com",
    short_address: "Indonesia",
  },
  seo: {
    site_title: "",
    meta_description: "",
    keywords: [],
    canonical_base_url: "",
    og_image_url: "",
    twitter_image_url: "",
    google_site_verification: "",
    bing_site_verification: "",
    facebook_domain_verification: "",
  },
  version: "0",
  updated_at: null,
  _source: "fallback",
});

const asString = (v) => (typeof v === "string" ? v.trim() : "");
const asStringArray = (v) =>
  Array.isArray(v)
    ? v.filter((x) => typeof x === "string" && x.trim().length > 0).map((x) => x.trim())
    : [];

/**
 * Normalize an arbitrary API response into the exact shape the app expects.
 * Missing/invalid fields silently fall back to empty strings so downstream
 * consumers can safely OR-fallback (`api.foo || registry.foo`).
 *
 * @param {any} raw   Response payload (already JSON-parsed)
 * @returns {typeof LANDING_SETTINGS_FALLBACK}
 */
export const normalizeLandingSettings = (raw) => {
  if (!raw || typeof raw !== "object") return LANDING_SETTINGS_FALLBACK;
  const c = raw.contact && typeof raw.contact === "object" ? raw.contact : {};
  const s = raw.seo && typeof raw.seo === "object" ? raw.seo : {};

  return {
    contact: {
      whatsapp_number: asString(c.whatsapp_number).replace(/[^\d+]/g, ""),
      whatsapp_default_message:
        asString(c.whatsapp_default_message) ||
        LANDING_SETTINGS_FALLBACK.contact.whatsapp_default_message,
      contact_email:
        asString(c.contact_email) || LANDING_SETTINGS_FALLBACK.contact.contact_email,
      short_address:
        asString(c.short_address) || LANDING_SETTINGS_FALLBACK.contact.short_address,
    },
    seo: {
      site_title: asString(s.site_title),
      meta_description: asString(s.meta_description),
      keywords: asStringArray(s.keywords),
      canonical_base_url: asString(s.canonical_base_url).replace(/\/+$/, ""),
      og_image_url: asString(s.og_image_url),
      twitter_image_url: asString(s.twitter_image_url),
      google_site_verification: asString(s.google_site_verification),
      bing_site_verification: asString(s.bing_site_verification),
      facebook_domain_verification: asString(s.facebook_domain_verification),
    },
    version: asString(raw.version) || "0",
    updated_at: asString(raw.updated_at) || null,
    _source: "api",
  };
};

/**
 * Build a valid `https://wa.me/{number}?text=...` URL. Returns `null` when
 * the number is empty or clearly invalid, so callers can fall back to /kontak.
 *
 * @param {string} number   E.164 digits (with or without leading '+')
 * @param {string} message  Free-text default message
 */
export const buildWhatsAppUrl = (number, message = "") => {
  const cleaned = String(number || "").replace(/[^\d]/g, "");
  if (cleaned.length < 7) return null;
  const base = `https://wa.me/${cleaned}`;
  const text = String(message || "").trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

/**
 * Build a `mailto:` URL. Returns `null` when no email address is provided.
 */
export const buildMailtoUrl = (email, subject = "") => {
  const addr = String(email || "").trim();
  if (!addr) return null;
  const s = String(subject || "").trim();
  return s ? `mailto:${addr}?subject=${encodeURIComponent(s)}` : `mailto:${addr}`;
};
