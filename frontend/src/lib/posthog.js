const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY ||
  "phc_xAvL2Iq4tFmANRE7kzbKwaSqp1HJjN7x48s3vr0CMjs";
const POSTHOG_HOST = "https://us.i.posthog.com";
let initialized = false;

// Consent-aware equivalent of the previous inline PostHog bootstrap.
export const initializePostHog = () => {
  if (initialized || typeof window === "undefined" || typeof document === "undefined" || !POSTHOG_KEY) {
    return initialized;
  }
  try {
    const posthog = window.posthog || [];
    if (!posthog.__SV) {
      posthog._i = posthog._i || [];
      posthog.init = function init(key, config, name) {
        const instance = name ? (posthog[name] = []) : posthog;
        const methods = "capture identify reset opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing startSessionRecording stopSessionRecording".split(" ");
        methods.forEach((method) => {
          instance[method] = function queuedMethod() {
            instance.push([method, ...arguments]);
          };
        });
        const script = document.createElement("script");
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src = `${config.api_host.replace(".i.posthog.com", "-assets.i.posthog.com")}/static/array.js`;
        script.onerror = () => {};
        (document.head || document.documentElement).appendChild(script);
        posthog._i.push([key, config, name]);
      };
      posthog.__SV = 1;
      window.posthog = posthog;
    }
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
      session_recording: { recordCrossOriginIframes: true, capturePerformance: false },
      autocapture: true,
      capture_pageview: true,
      persistence: "localStorage+cookie",
    });
    initialized = true;
    return true;
  } catch {
    return false;
  }
};

export const setPostHogConsent = (accepted) => {
  if (typeof window === "undefined") return;
  try {
    if (accepted) {
      if (!initializePostHog()) return;
      window.posthog?.opt_in_capturing?.();
      window.posthog?.startSessionRecording?.();
    } else if (initialized) {
      window.posthog?.opt_out_capturing?.();
      window.posthog?.stopSessionRecording?.();
    }
  } catch {
    // Analytics availability must never affect the landing page.
  }
};

export const __resetPostHogForTests = () => {
  initialized = false;
};
