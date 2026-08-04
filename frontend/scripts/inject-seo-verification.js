#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const DEFAULT_PLATFORM_API_BASE = "https://app.dynicty.com";
const SETTINGS_PATH = "/api/public/landing-page-settings";
const FETCH_TIMEOUT_MS = 15000;
const MARKER_START = "<!-- dynicty:seo-verification:start -->";
const MARKER_END = "<!-- dynicty:seo-verification:end -->";

const META_DEFINITIONS = Object.freeze([
  ["google-site-verification", "google_site_verification"],
  ["msvalidate.01", "bing_site_verification"],
  ["facebook-domain-verification", "facebook_domain_verification"],
]);

const normalizeBaseUrl = (value) =>
  String(value || "").trim().replace(/\/+$/, "");

const getPlatformApiBase = (env = process.env) =>
  normalizeBaseUrl(
    env.REACT_APP_PLATFORM_API_BASE ||
      env.REACT_APP_PLATFORM_API_URL ||
      DEFAULT_PLATFORM_API_BASE
  );

const normalizeToken = (value) =>
  typeof value === "string" ? value.trim() : "";

const escapeAttribute = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const extractTokens = (settings) => {
  const seo =
    settings &&
    typeof settings === "object" &&
    settings.seo &&
    typeof settings.seo === "object" &&
    !Array.isArray(settings.seo)
      ? settings.seo
      : {};

  return Object.fromEntries(
    META_DEFINITIONS.map(([, field]) => [field, normalizeToken(seo[field])])
  );
};

const getMetaName = (tag) => {
  const match = tag.match(/\bname\s*=\s*(["'])(.*?)\1/i);
  return match ? match[2].trim().toLowerCase() : "";
};

const removeVerificationTags = (html) => {
  const verificationNames = new Set(META_DEFINITIONS.map(([name]) => name));
  const markerPattern = new RegExp(
    `(?:\\r?\\n)?[ \\t]*${MARKER_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${MARKER_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[ \\t]*(?:\\r?\\n)?`,
    "gi"
  );

  return html
    .replace(markerPattern, "\n")
    .replace(/<meta\b[^>]*>/gi, (tag) =>
      verificationNames.has(getMetaName(tag)) ? "" : tag
    );
};

const injectVerificationMeta = (html, settings) => {
  if (typeof html !== "string" || !/<\/head\s*>/i.test(html)) {
    throw new Error("Target HTML does not contain a closing </head> tag");
  }

  const cleanHtml = removeVerificationTags(html);
  const tokens = extractTokens(settings);
  const tags = META_DEFINITIONS.flatMap(([name, field]) => {
    const token = tokens[field];
    return token
      ? [`        <meta name="${name}" content="${escapeAttribute(token)}" />`]
      : [];
  });

  if (tags.length === 0) return cleanHtml;

  const block = [
    `        ${MARKER_START}`,
    ...tags,
    `        ${MARKER_END}`,
  ].join("\n");

  const closingIndent =
    cleanHtml.match(/(?:\r?\n)([ \t]*)<\/head\s*>/i)?.[1] || "";
  return cleanHtml.replace(
    /[ \t\r\n]*<\/head\s*>/i,
    `\n${block}\n${closingIndent}</head>`
  );
};

const fetchPublicSettings = async ({ baseUrl, fetchImpl = globalThis.fetch }) => {
  if (typeof fetchImpl !== "function") {
    throw new Error("This build requires Node.js 18+ with the Fetch API");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetchImpl(`${baseUrl}${SETTINGS_PATH}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Public landing-page settings returned HTTP ${response.status}`
      );
    }

    const settings = await response.json();
    if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
      throw new Error("Public landing-page settings returned an invalid payload");
    }
    return settings;
  } finally {
    clearTimeout(timer);
  }
};

const writeAtomically = async (targetPath, contents) => {
  const temporaryPath = `${targetPath}.seo-verification.tmp`;
  await fs.writeFile(temporaryPath, contents, "utf8");
  await fs.rename(temporaryPath, targetPath);
};

const main = async () => {
  const buildIndexPath = path.resolve(__dirname, "..", "build", "index.html");
  const baseUrl = getPlatformApiBase();
  const [html, settings] = await Promise.all([
    fs.readFile(buildIndexPath, "utf8"),
    fetchPublicSettings({ baseUrl }),
  ]);
  const output = injectVerificationMeta(html, settings);
  await writeAtomically(buildIndexPath, output);

  const configuredCount = Object.values(extractTokens(settings)).filter(
    Boolean
  ).length;
  console.log(
    `[seo-verification] Injected ${configuredCount} configured tag(s) into build/index.html`
  );
};

if (require.main === module) {
  main().catch((error) => {
    console.error(`[seo-verification] Build failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  META_DEFINITIONS,
  extractTokens,
  getPlatformApiBase,
  injectVerificationMeta,
  removeVerificationTags,
};
