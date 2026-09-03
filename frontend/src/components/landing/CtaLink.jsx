import React from "react";
import { Link } from "react-router-dom";
import { trackMetaContact } from "@/lib/metaPixel";

const isWhatsAppUrl = (value) => {
  try {
    const host = new URL(value).hostname.toLowerCase();
    return host === "wa.me" || host === "api.whatsapp.com" || host === "web.whatsapp.com";
  } catch {
    return false;
  }
};

/**
 * CtaLink — thin wrapper that auto-selects between <Link> (internal route)
 * and <a> (external URL, e.g. https://wa.me/…).
 *
 * Rationale: the CTA target is decided at runtime by the Platform Settings API
 * (WhatsApp when configured, /kontak otherwise). React Router's <Link>
 * misbehaves with absolute URLs, so a single component owns the branching.
 */
const CtaLink = React.forwardRef(function CtaLink(
  { to, children, className, testId, ariaLabel, trackingContext, onClick, ...rest },
  ref
) {
  const isExternal = typeof to === "string" && /^https?:\/\//i.test(to);

  if (isExternal) {
    const handleClick = (event) => {
      if (isWhatsAppUrl(to)) {
        trackMetaContact({
          contact_method: "whatsapp",
          destination_type: "outbound",
          ...trackingContext,
        });
      }
      onClick?.(event);
    };
    return (
      <a
        ref={ref}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-testid={testId}
        aria-label={ariaLabel}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      to={to || "/kontak"}
      className={className}
      data-testid={testId}
      aria-label={ariaLabel}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Link>
  );
});

export default CtaLink;
