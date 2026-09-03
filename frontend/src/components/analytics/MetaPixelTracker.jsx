import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLandingPageSettings } from "@/context/LandingPageSettingsContext";
import { useAnalyticsConsent } from "@/context/AnalyticsConsentContext";
import { initializeMetaPixel, setMetaTrackingEnabled, trackMetaPageView } from "@/lib/metaPixel";

export default function MetaPixelTracker() {
  const location = useLocation();
  const { data, loading, isFromApi } = useLandingPageSettings();
  const { hasConsent } = useAnalyticsConsent();
  const runtimeId = data?.analytics?.meta_pixel_id || "";
  const fallbackId = process.env.REACT_APP_META_PIXEL_ID || "";
  // An API response is authoritative: an explicit/missing empty runtime ID
  // disables Meta. The build-time value is only a network/config fallback.
  const pixelId = isFromApi
    ? runtimeId
    : loading ? "" : fallbackId;
  const routeKey = `${location.pathname}${location.search}`;

  useEffect(() => {
    if (!hasConsent) return;
    // Set synchronously here as well as in the provider so a persisted consent
    // choice is safe regardless of parent/child passive-effect ordering.
    setMetaTrackingEnabled(true);
    if (!initializeMetaPixel(pixelId)) return;
    trackMetaPageView(routeKey, {
      page_path: location.pathname,
      page_title: typeof document === "undefined" ? "" : document.title,
    });
  }, [hasConsent, pixelId, routeKey, location.pathname]);

  return null;
}
