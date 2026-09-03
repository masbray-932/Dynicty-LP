import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { setMetaTrackingEnabled } from "@/lib/metaPixel";
import { setPostHogConsent } from "@/lib/posthog";

export const ANALYTICS_CONSENT_KEY = "dynicty.analytics-consent.v1";
export const CONSENT = Object.freeze({
  UNKNOWN: "unknown",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
});

const readConsent = () => {
  if (typeof window === "undefined") return CONSENT.UNKNOWN;
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === CONSENT.ACCEPTED || value === CONSENT.REJECTED
      ? value
      : CONSENT.UNKNOWN;
  } catch {
    return CONSENT.UNKNOWN;
  }
};

const AnalyticsConsentContext = createContext({
  consent: CONSENT.UNKNOWN,
  hasConsent: false,
  accept: () => {},
  reject: () => {},
});

export const AnalyticsConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(readConsent);

  useEffect(() => {
    const accepted = consent === CONSENT.ACCEPTED;
    setMetaTrackingEnabled(accepted);
    if (consent !== CONSENT.UNKNOWN) setPostHogConsent(accepted);
  }, [consent]);

  const persist = useCallback((choice) => {
    try {
      window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
    } catch {
      // Storage can be unavailable; the current-session choice still applies.
    }
    setConsent(choice);
  }, []);

  const value = useMemo(() => ({
    consent,
    hasConsent: consent === CONSENT.ACCEPTED,
    accept: () => persist(CONSENT.ACCEPTED),
    reject: () => persist(CONSENT.REJECTED),
  }), [consent, persist]);

  return (
    <AnalyticsConsentContext.Provider value={value}>
      {children}
    </AnalyticsConsentContext.Provider>
  );
};

export const useAnalyticsConsent = () => useContext(AnalyticsConsentContext);

export default AnalyticsConsentContext;
