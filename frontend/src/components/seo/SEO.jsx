import React from "react";
import { Helmet } from "react-helmet-async";
import {
  SITE,
  SCHEMA_IDS,
  absoluteUrl,
  getPageSeo,
  organizationSchema,
  websiteSchema,
  webPageSchema,
  breadcrumbSchema,
  SCHEMA_BUILDERS,
} from "@/constants/seo";
import { useLandingPageSettings } from "@/context/LandingPageSettingsContext";
import VerificationMetaUpdater from "@/components/seo/VerificationMetaUpdater";

/**
 * <SEO /> — Landing Page SEO renderer.
 *
 * Merge order (highest priority first):
 *   1. Explicit props (title / description / url / noindex)
 *   2. Platform Settings API
 *      • api.seo.canonical_base_url    → SITE.url (canonical base for ALL pages)
 *      • api.seo.og_image_url          → OG image (all pages, unless a page provides its own)
 *      • api.seo.twitter_image_url     → Twitter image (all pages)
 *   3. Static registry  →  /src/constants/seo.js (page-specific, safe fallback)
 *   4. SITE defaults
 *
 * Verification tags & keywords (from the API) render on ALL indexable pages.
 * The 404 page always renders `noindex, nofollow` regardless of settings.
 */
const SEO = ({
  pageKey,
  title: titleProp,
  description: descProp,
  url: urlProp,
  noindex: noindexProp,
  extraJsonLd = null,
}) => {
  const { data: landingSettings, isFromApi } = useLandingPageSettings();
  const apiSeo = landingSettings?.seo || {};

  const page = pageKey ? getPageSeo(pageKey) : null;
  const isHome = page?.key === "home";

  // Canonical base — API can override the origin used to build canonical URLs.
  const canonicalOrigin =
    (apiSeo.canonical_base_url && apiSeo.canonical_base_url.replace(/\/+$/, "")) ||
    SITE.url;
  const buildCanonical = (path) => {
    const p = path || "/";
    if (/^https?:\/\//i.test(p)) return p;
    return `${canonicalOrigin}${p.startsWith("/") ? p : `/${p}`}`;
  };

  // Keep page title and description in the static registry so an outdated
  // runtime response cannot create conflicting homepage metadata.
  const registryTitle = page?.title ?? SITE.name;
  const registryDesc = page?.description ?? SITE.description;
  const title = titleProp ?? registryTitle;
  const description = descProp ?? registryDesc;

  const canonicalPath = page?.path ?? "/";
  const canonicalUrl = urlProp ?? buildCanonical(canonicalPath);
  const noindex = noindexProp ?? page?.noindex ?? false;

  // Social preview images — API-controlled with static fallback.
  const ogImage = apiSeo.og_image_url || absoluteUrl(SITE.ogImage);
  const twitterImage =
    apiSeo.twitter_image_url || apiSeo.og_image_url || absoluteUrl(SITE.twitterImage);

  // Structured data — WebPage links to the single primary WebSite entity.
  const pageWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: SITE.language,
    isPartOf: {
      "@id": SCHEMA_IDS.website,
    },
    primaryImageOfPage: ogImage,
  };
  // Reuse the shared builder for anything but WebPage so behaviour stays
  // consistent when we later swap organization details via API.
  void webPageSchema; // keep import — used by tests to import from same module

  const pageBreadcrumb = page?.breadcrumb?.length
    ? breadcrumbSchema(page.breadcrumb)
    : null;
  const extraSchemas =
    (page?.schemas || [])
      .map((key) => SCHEMA_BUILDERS[key]?.())
      .filter(Boolean) ?? [];

  const keywordsList =
    Array.isArray(apiSeo.keywords) && apiSeo.keywords.length > 0
      ? apiSeo.keywords.join(", ")
      : null;

  return (
    <>
      <VerificationMetaUpdater seo={apiSeo} enabled={isFromApi} />
      <Helmet prioritizeSeoTags>
      {/* Base */}
      <html lang={SITE.language.toLowerCase()} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsList ? <meta name="keywords" content={keywordsList} /> : null}
      <link rel="canonical" href={canonicalUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      {/* Theme + PWA */}
      <meta name="theme-color" content={SITE.themeColor} />
      <meta name="application-name" content={SITE.name} />
      <meta name="apple-mobile-web-app-title" content={SITE.name} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content={String(SITE.ogImageWidth)} />
      <meta property="og:image:height" content={String(SITE.ogImageHeight)} />
      <meta property="og:image:alt" content={`${SITE.name} — ${SITE.tagline}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content={`${SITE.name} — ${SITE.tagline}`} />
      {SITE.twitterSite ? (
        <meta name="twitter:site" content={SITE.twitterSite} />
      ) : null}

      {/* JSON-LD — Site-wide */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema())}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema())}
      </script>

      {/* JSON-LD — Per-page */}
      <script type="application/ld+json">{JSON.stringify(pageWebPage)}</script>
      {pageBreadcrumb ? (
        <script type="application/ld+json">
          {JSON.stringify(pageBreadcrumb)}
        </script>
      ) : null}
      {extraSchemas.map((schema, i) => (
        <script key={`page-schema-${i}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Optional one-off extra JSON-LD (kept for backward compatibility) */}
      {extraJsonLd ? (
        <script type="application/ld+json">
          {JSON.stringify(extraJsonLd)}
        </script>
      ) : null}
      </Helmet>
    </>
  );
};

export default SEO;
