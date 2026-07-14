import { useCallback } from "react";
import {
  buildWhatsAppUrl,
  buildMailtoUrl,
} from "@/constants/landingSettings";
import { useContactSettings } from "@/context/LandingPageSettingsContext";

/**
 * useContact — high-level, hook-based CTA helpers driven by the platform
 * settings API. All helpers are SAFE by construction: when the backing
 * value is empty or invalid they fall back to a static internal route
 * (/kontak) so nothing on the page produces a broken link.
 *
 * Usage:
 *   const { whatsappUrl, mailtoUrl, ctaHref, hasWhatsApp, email, address } = useContact();
 *   <a href={whatsappUrl("Halo, saya tertarik paket Growth")}>WhatsApp</a>
 *   <Link to={ctaHref({ paket: "Growth", source: "pricing" })}>Hubungi Kami</Link>
 */
const useContact = () => {
  const contact = useContactSettings();

  const whatsappUrl = useCallback(
    (customMessage) => {
      const msg =
        (typeof customMessage === "string" && customMessage.trim()) ||
        contact.whatsapp_default_message;
      return buildWhatsAppUrl(contact.whatsapp_number, msg);
    },
    [contact.whatsapp_number, contact.whatsapp_default_message]
  );

  const mailtoUrl = useCallback(
    (subject) => buildMailtoUrl(contact.contact_email, subject || ""),
    [contact.contact_email]
  );

  /**
   * Universal CTA href resolver.
   * - When a WhatsApp number is configured on the platform, returns a
   *   `https://wa.me/…` URL with a paket-aware message.
   * - Otherwise, returns the internal `/kontak` page with prefill params.
   */
  const ctaHref = useCallback(
    ({ paket, source } = {}) => {
      const hasWa = Boolean(contact.whatsapp_number);
      if (hasWa) {
        const text = paket
          ? `Halo Dynicty, saya tertarik dengan paket ${paket}. Mohon informasinya, terima kasih.`
          : contact.whatsapp_default_message;
        const url = buildWhatsAppUrl(contact.whatsapp_number, text);
        if (url) return url;
      }
      const params = new URLSearchParams();
      if (paket) params.set("paket", paket);
      if (source) params.set("src", source);
      const qs = params.toString();
      return `/kontak${qs ? "?" + qs : ""}`;
    },
    [contact.whatsapp_number, contact.whatsapp_default_message]
  );

  return {
    contact,
    whatsappUrl,
    mailtoUrl,
    ctaHref,
    hasWhatsApp: Boolean(contact.whatsapp_number),
    hasEmail: Boolean(contact.contact_email),
    email: contact.contact_email,
    address: contact.short_address,
    // Whether the CTA points off-site (WhatsApp) vs. internal /kontak.
    ctaIsExternal: Boolean(contact.whatsapp_number),
  };
};

export default useContact;
