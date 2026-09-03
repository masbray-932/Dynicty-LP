const META_SCRIPT_ID = "dynicty-meta-pixel";
const META_SCRIPT_URL = "https://connect.facebook.net/en_US/fbevents.js";
const DEFAULT_DEDUPE_MS = 1200;

let initializedPixelId = "";
let trackingEnabled = false;
let lastRouteKey = "";
const recentEvents = new Map();

export const isValidMetaPixelId = (value) =>
  /^\d{5,25}$/.test(String(value ?? "").trim());

const safeDocument = () => (typeof document === "undefined" ? null : document);
const safeWindow = () => (typeof window === "undefined" ? null : window);

const createFbq = (win) => {
  if (typeof win.fbq === "function") return win.fbq;
  const fbq = function fbq() {
    fbq.callMethod
      ? fbq.callMethod.apply(fbq, arguments)
      : fbq.queue.push(arguments);
  };
  if (!win._fbq) win._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  win.fbq = fbq;
  return fbq;
};

const loadScriptOnce = () => {
  const doc = safeDocument();
  if (!doc) return null;
  const existing = doc.getElementById(META_SCRIPT_ID);
  if (existing) return existing;
  try {
    const script = doc.createElement("script");
    script.id = META_SCRIPT_ID;
    script.async = true;
    script.src = META_SCRIPT_URL;
    script.onerror = () => {
      // Ad blockers and restrictive networks are expected; never affect the UI.
    };
    (doc.head || doc.documentElement).appendChild(script);
    return script;
  } catch {
    return null;
  }
};

export const setMetaTrackingEnabled = (enabled) => {
  trackingEnabled = enabled === true;
  const win = safeWindow();
  if (typeof win?.fbq === "function" && initializedPixelId) {
    try {
      win.fbq("consent", trackingEnabled ? "grant" : "revoke");
    } catch {
      // A third-party script must never break the app.
    }
  }
};

export const initializeMetaPixel = (pixelId) => {
  const id = String(pixelId ?? "").trim();
  if (!trackingEnabled || !isValidMetaPixelId(id)) return false;
  if (initializedPixelId) return initializedPixelId === id;
  const win = safeWindow();
  if (!win) return false;
  try {
    const fbq = createFbq(win);
    loadScriptOnce();
    fbq("consent", "grant");
    fbq("init", id);
    initializedPixelId = id;
    return true;
  } catch {
    return false;
  }
};

const EVENT_FIELDS = Object.freeze({
  PageView: ["page_path", "page_title"],
  ViewContent: ["content_type", "content_name", "content_ids", "content_category", "featured"],
  Contact: ["contact_method", "source", "plan", "addon", "template", "destination_type"],
  Lead: ["form_type", "source", "selected_plan", "lead_channel"],
});

const sanitizeParams = (eventName, params = {}) => {
  const allowed = EVENT_FIELDS[eventName] || [];
  return allowed.reduce((safe, key) => {
    const value = params?.[key];
    if (value === undefined || value === null || value === "") return safe;
    if (key === "featured") safe[key] = value === true;
    else if (key === "content_ids" && Array.isArray(value)) {
      safe[key] = value.slice(0, 10).map((item) => String(item).slice(0, 100));
    } else if (typeof value === "string" || typeof value === "number") {
      safe[key] = String(value).slice(0, 160);
    }
    return safe;
  }, {});
};

const isDuplicate = (key, windowMs) => {
  const now = Date.now();
  const previous = recentEvents.get(key) || 0;
  recentEvents.set(key, now);
  return now - previous < windowMs;
};

export const trackMetaEvent = (eventName, params, options = {}) => {
  if (!trackingEnabled || !initializedPixelId || !EVENT_FIELDS[eventName]) return false;
  const win = safeWindow();
  if (typeof win?.fbq !== "function") return false;
  const safeParams = sanitizeParams(eventName, params);
  const dedupeKey = options.dedupeKey || `${eventName}:${JSON.stringify(safeParams)}`;
  if (isDuplicate(dedupeKey, options.dedupeWindowMs ?? DEFAULT_DEDUPE_MS)) return false;
  try {
    win.fbq("track", eventName, safeParams);
    return true;
  } catch {
    return false;
  }
};

export const trackMetaPageView = (routeKey, params) => {
  const key = String(routeKey || "/");
  if (key === lastRouteKey) return false;
  const sent = trackMetaEvent("PageView", params, {
    dedupeKey: `PageView:${key}`,
    dedupeWindowMs: 0,
  });
  if (sent) lastRouteKey = key;
  return sent;
};

export const trackMetaViewContent = (params) =>
  trackMetaEvent("ViewContent", params, {
    dedupeKey: `ViewContent:${params?.content_ids?.[0] || params?.content_name || "template"}`,
  });

export const trackMetaContact = (params) =>
  trackMetaEvent("Contact", params, {
    dedupeKey: `Contact:${params?.source || "cta"}:${params?.plan || params?.addon || params?.template || ""}`,
  });

export const trackMetaLead = (params) =>
  trackMetaEvent("Lead", params, {
    dedupeKey: `Lead:${params?.source || "contact-form"}:${params?.selected_plan || ""}`,
    dedupeWindowMs: 5000,
  });

export const __resetMetaPixelForTests = () => {
  initializedPixelId = "";
  trackingEnabled = false;
  lastRouteKey = "";
  recentEvents.clear();
};
