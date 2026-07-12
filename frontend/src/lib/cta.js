// CTA destination config — PRD v2.1 section 20.4
// Default: all CTAs go to /kontak. Structure allows swap to WhatsApp later via env.
const CTA_DESTINATION = process.env.REACT_APP_CTA_PRICING_DESTINATION || "contact";
const WA_NUMBER = process.env.REACT_APP_CTA_WHATSAPP_NUMBER || "";

export function ctaHref({ paket, source }) {
  if (CTA_DESTINATION === "whatsapp" && WA_NUMBER) {
    const msg = encodeURIComponent(
      `Halo Dynicty, saya tertarik mengetahui lebih lanjut${paket ? ` mengenai paket ${paket}` : ""}. Mohon informasinya, terima kasih.`
    );
    return `https://wa.me/${WA_NUMBER}?text=${msg}`;
  }
  // default: internal contact page with paket prefill
  const params = new URLSearchParams();
  if (paket) params.set("paket", paket);
  if (source) params.set("src", source);
  const qs = params.toString();
  return `/kontak${qs ? "?" + qs : ""}`;
}

export const CTA_DESTINATION_TYPE = CTA_DESTINATION;
