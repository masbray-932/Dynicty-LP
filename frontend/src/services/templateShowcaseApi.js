const DEFAULT_PLATFORM_API_BASE = "https://app.dynicty.com";

const trimTrailingSlash = (value) => String(value || "").trim().replace(/\/+$/, "");

const isHttpUrl = (value) => {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const PLATFORM_API_BASE =
  trimTrailingSlash(process.env.REACT_APP_PLATFORM_API_BASE) ||
  trimTrailingSlash(process.env.REACT_APP_PLATFORM_API_URL) ||
  DEFAULT_PLATFORM_API_BASE;

export const resolvePlatformAssetUrl = (value) => {
  const source = String(value || "").trim();
  if (!source) return "";
  if (isHttpUrl(source)) return source;
  if (!source.startsWith("/")) return "";
  return `${PLATFORM_API_BASE}${source}`;
};

export const sanitizeExternalUrl = (value) => {
  const source = String(value || "").trim();
  return isHttpUrl(source) ? source : "";
};

const asText = (value) => (typeof value === "string" ? value.trim() : "");

const normalizeMatchKey = (value) =>
  String(value || "")
    .toLocaleLowerCase("id-ID")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const roadmapMatchesTemplate = (roadmap, template) => {
  const roadmapKeys = [roadmap.name, roadmap.category, roadmap.categoryKey]
    .map(normalizeMatchKey)
    .filter(Boolean);
  const templateKeys = [template.name, template.category, template.slug]
    .map(normalizeMatchKey)
    .filter(Boolean);

  return roadmapKeys.some((roadmapKey) =>
    templateKeys.some(
      (templateKey) =>
        templateKey === roadmapKey ||
        templateKey.startsWith(`${roadmapKey} `) ||
        roadmapKey.startsWith(`${templateKey} `)
    )
  );
};

export const normalizePublicTemplates = (payload) => {
  if (!Array.isArray(payload)) return [];

  const seen = new Set();

  return payload.reduce((templates, item) => {
    if (!item || typeof item !== "object") return templates;

    const name = asText(item.name);
    const slug = asText(item.slug);
    if (!name || !slug) return templates;

    const identity = slug.toLocaleLowerCase("id-ID");
    if (seen.has(identity)) return templates;
    seen.add(identity);

    templates.push({
      slug,
      name,
      category: asText(item.category) || "Template Toko Online",
      shortDescription:
        asText(item.short_description) ||
        "Template toko online siap disesuaikan dengan identitas bisnis Anda.",
      thumbnailUrl: resolvePlatformAssetUrl(item.thumbnail_url),
      demoUrl: sanitizeExternalUrl(item.demo_url),
      featured: item.featured === true,
      status: "available",
      source: "api",
    });

    return templates;
  }, []);
};

export const mergeTemplatesWithRoadmap = (apiTemplates, fallbackTemplates) => {
  const available = Array.isArray(apiTemplates) ? apiTemplates : [];
  const fallback = Array.isArray(fallbackTemplates) ? fallbackTemplates : [];

  if (available.length === 0) return fallback;

  const comingSoon = fallback.filter(
    (roadmap) =>
      roadmap?.status !== "available" &&
      !available.some((template) => roadmapMatchesTemplate(roadmap || {}, template || {}))
  );

  return [...available, ...comingSoon];
};

let cachedTemplates = null;
let requestInFlight = null;

export const clearPublicTemplateCache = () => {
  cachedTemplates = null;
  requestInFlight = null;
};

export const fetchPublicTemplates = async ({ signal, fetchImpl = fetch } = {}) => {
  if (cachedTemplates) return cachedTemplates;
  if (requestInFlight) return requestInFlight;

  requestInFlight = (async () => {
    const response = await fetchImpl(`${PLATFORM_API_BASE}/api/public/templates`, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "omit",
      mode: "cors",
      cache: "default",
      signal,
    });

    if (!response.ok) throw new Error(`Template showcase request failed (${response.status})`);

    const templates = normalizePublicTemplates(await response.json());
    cachedTemplates = templates;
    return templates;
  })();

  try {
    return await requestInFlight;
  } finally {
    requestInFlight = null;
  }
};
