import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  LANDING_SETTINGS_FALLBACK,
  normalizeLandingSettings,
} from "@/constants/landingSettings";

// -----------------------------------------------------------------------------
// LandingPageSettingsContext
// -----------------------------------------------------------------------------
// Single fetcher for GET /api/public/landing-page-settings hosted on the
// Platform API (REACT_APP_PLATFORM_API_URL). The response controls:
//   • Contact info (WhatsApp/email/address) surfaced on Navbar, Hero, Pricing,
//     Footer, Contact Page, Floating WhatsApp.
//   • SEO overrides (homepage title/description, OG/Twitter images,
//     canonical base, verification tags) merged with the static registry.
//
// Design principles:
//   1. NEVER blocks first paint — the app renders with static fallback while
//      the request is in flight.
//   2. Fails silently — timeout / CORS / network / 4xx / 5xx all fall back to
//      the static defaults; error is recorded but not surfaced to users.
//   3. Cached — the successful payload is stored in sessionStorage so
//      hard reloads within a session use the last known good copy while
//      revalidating in the background.
//   4. Uses ETag / If-None-Match when the backend returns one (opt-in via
//      response headers).
// -----------------------------------------------------------------------------

const STORAGE_KEY = "dynicty.landing-settings.v1";
const ETAG_KEY = "dynicty.landing-settings.etag.v1";
const FETCH_TIMEOUT_MS = 5000;

const PLATFORM_API_URL =
  (process.env.REACT_APP_PLATFORM_API_URL || "").replace(/\/+$/, "") || null;

const readCache = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return normalizeLandingSettings(parsed);
  } catch {
    return null;
  }
};

const writeCache = (normalized, etag) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    if (etag) sessionStorage.setItem(ETAG_KEY, etag);
  } catch {
    /* private mode / quota — safe to ignore */
  }
};

const readEtag = () => {
  try {
    return sessionStorage.getItem(ETAG_KEY) || "";
  } catch {
    return "";
  }
};

const LandingPageSettingsContext = createContext({
  data: LANDING_SETTINGS_FALLBACK,
  loading: false,
  error: null,
  refresh: () => Promise.resolve(),
  isFromApi: false,
});

/**
 * Wrap the app to expose landing-page settings via context.
 */
export const LandingPageSettingsProvider = ({ children }) => {
  const cached = useMemo(() => readCache(), []);
  const [data, setData] = useState(cached || LANDING_SETTINGS_FALLBACK);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inFlight = useRef(null);

  const fetchSettings = useCallback(async () => {
    if (!PLATFORM_API_URL) {
      // No Platform API configured — remain on static fallback.
      setError(null);
      return LANDING_SETTINGS_FALLBACK;
    }
    if (inFlight.current) return inFlight.current;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    setLoading(true);
    const previousEtag = readEtag();

    const run = (async () => {
      try {
        const headers = { Accept: "application/json" };
        if (previousEtag) headers["If-None-Match"] = previousEtag;

        const res = await fetch(
          `${PLATFORM_API_URL}/api/public/landing-page-settings`,
          { method: "GET", headers, mode: "cors", credentials: "omit", signal: controller.signal }
        );

        // 304 — cache is still fresh. Keep current state.
        if (res.status === 304) {
          setError(null);
          return readCache();
        }

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const etag = res.headers.get("ETag") || "";
        const raw = await res.json();
        const normalized = normalizeLandingSettings(raw);
        writeCache(normalized, etag);
        setData(normalized);
        setError(null);
        return normalized;
      } catch (e) {
        // Silent fallback: keep whatever we already had (cached or fallback).
        setError({
          name: e?.name || "Error",
          message: e?.message || "Failed to fetch landing-page settings",
        });
        return null;
      } finally {
        clearTimeout(timer);
        setLoading(false);
        inFlight.current = null;
      }
    })();

    inFlight.current = run;
    return run;
  }, []);

  // Initial fetch on mount.
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const value = useMemo(
    () => ({
      data,
      loading,
      error,
      refresh: fetchSettings,
      isFromApi: data?._source === "api",
    }),
    [data, loading, error, fetchSettings]
  );

  return (
    <LandingPageSettingsContext.Provider value={value}>
      {children}
    </LandingPageSettingsContext.Provider>
  );
};

/**
 * Hook — returns { data, loading, error, refresh, isFromApi }.
 * `data` is ALWAYS a fully-normalized shape (never null / undefined).
 */
export const useLandingPageSettings = () =>
  useContext(LandingPageSettingsContext);

/**
 * Convenience hook — returns only the `contact` slice.
 */
export const useContactSettings = () => {
  const { data } = useLandingPageSettings();
  return data.contact;
};

/**
 * Convenience hook — returns only the `seo` slice.
 */
export const useSeoSettings = () => {
  const { data } = useLandingPageSettings();
  return data.seo;
};

export default LandingPageSettingsContext;
