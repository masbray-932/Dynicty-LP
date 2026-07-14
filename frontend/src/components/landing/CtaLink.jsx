import React from "react";
import { Link } from "react-router-dom";

/**
 * CtaLink — thin wrapper that auto-selects between <Link> (internal route)
 * and <a> (external URL, e.g. https://wa.me/…).
 *
 * Rationale: the CTA target is decided at runtime by the Platform Settings API
 * (WhatsApp when configured, /kontak otherwise). React Router's <Link>
 * misbehaves with absolute URLs, so a single component owns the branching.
 */
const CtaLink = React.forwardRef(function CtaLink(
  { to, children, className, testId, ariaLabel, ...rest },
  ref
) {
  const isExternal = typeof to === "string" && /^https?:\/\//i.test(to);

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-testid={testId}
        aria-label={ariaLabel}
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
      {...rest}
    >
      {children}
    </Link>
  );
});

export default CtaLink;
