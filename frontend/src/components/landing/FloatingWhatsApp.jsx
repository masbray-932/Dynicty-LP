import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import useContact from "@/hooks/useContact";
import { trackMetaContact } from "@/lib/metaPixel";

/**
 * FloatingWhatsApp
 * ----------------
 * Fixed floating action button anchored to the bottom-right corner. Only
 * renders when the Platform Settings API returns a valid WhatsApp number
 * (otherwise the CTA has no destination and would degrade UX).
 *
 * Behaviour:
 *   • Hidden until the visitor scrolls past ~40% of the viewport height
 *     — keeps the hero pristine and avoids competing with the primary CTA.
 *   • Uses the API-provided default message; per-context override supported.
 *   • Opens in a new tab with `rel="noopener noreferrer"`.
 */
const FloatingWhatsApp = ({ message }) => {
  const { hasWhatsApp, whatsappUrl } = useContact();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasWhatsApp) return undefined;
    const threshold = Math.round(window.innerHeight * 0.4);
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasWhatsApp]);

  if (!hasWhatsApp) return null;

  const href = whatsappUrl(message);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp-button"
      aria-label="Konsultasi gratis via WhatsApp"
      onClick={() => trackMetaContact({ contact_method: "whatsapp", destination_type: "outbound", source: "floating-whatsapp" })}
      className={[
        "fixed bottom-6 right-6 z-50 group",
        "inline-flex items-center gap-2.5 pl-3.5 pr-4 py-3 rounded-full",
        "bg-[#25D366] text-white shadow-[0_16px_40px_-8px_rgba(37,211,102,0.55)]",
        "hover:shadow-[0_20px_50px_-8px_rgba(37,211,102,0.75)]",
        "hover:scale-[1.03] active:scale-[0.98]",
        "transition-transform duration-200",
        "border border-white/10 backdrop-blur",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
      style={{ transitionProperty: "transform, opacity, box-shadow" }}
    >
      <span
        aria-hidden
        className="relative flex h-6 w-6 items-center justify-center"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-white/25 opacity-70 animate-ping" />
        <MessageCircle className="relative h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="hidden sm:inline text-sm font-semibold tracking-tight">Konsultasi via WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsApp;
