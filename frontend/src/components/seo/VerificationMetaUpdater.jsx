import { useEffect } from "react";

export const VERIFICATION_META_FIELDS = Object.freeze([
  ["google-site-verification", "google_site_verification"],
  ["msvalidate.01", "bing_site_verification"],
  ["facebook-domain-verification", "facebook_domain_verification"],
]);

const normalizeToken = (value) =>
  typeof value === "string" ? value.trim() : "";

/**
 * Update the build-injected verification tag in place and remove duplicates.
 * This deliberately owns only the three verification tags; Helmet continues
 * to own all other page metadata.
 */
export const syncVerificationMeta = (documentRef, name, value) => {
  if (!documentRef?.head) return;

  const token = normalizeToken(value);
  const selector = `meta[name="${name}"]`;
  const existing = Array.from(documentRef.head.querySelectorAll(selector));

  if (!token) {
    existing.forEach((element) => element.remove());
    return;
  }

  const meta = existing.shift() || documentRef.createElement("meta");
  meta.setAttribute("name", name);
  meta.setAttribute("content", token);
  meta.setAttribute("data-dynicty-seo-verification", "runtime");

  if (!meta.parentNode) documentRef.head.appendChild(meta);
  existing.forEach((element) => element.remove());
};

const VerificationMetaUpdater = ({ seo = {}, enabled = true }) => {
  const googleToken = seo?.google_site_verification;
  const bingToken = seo?.bing_site_verification;
  const facebookToken = seo?.facebook_domain_verification;

  useEffect(() => {
    // Keep the raw build tags intact while settings are still loading or when
    // the runtime request fails. A confirmed API/cache payload may then update
    // or remove them deterministically.
    if (!enabled || typeof document === "undefined") return;

    syncVerificationMeta(document, "google-site-verification", googleToken);
    syncVerificationMeta(document, "msvalidate.01", bingToken);
    syncVerificationMeta(
      document,
      "facebook-domain-verification",
      facebookToken
    );
  }, [enabled, googleToken, bingToken, facebookToken]);

  return null;
};

export default VerificationMetaUpdater;
