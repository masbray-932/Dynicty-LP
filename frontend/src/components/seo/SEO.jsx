import React from "react";
import { Helmet } from "react-helmet-async";
import {
  SITE,
  absoluteUrl,
  getPageSeo,
  organizationSchema,
  websiteSchema,
  webPageSchema,
  breadcrumbSchema,
  SCHEMA_BUILDERS,
} from "@/constants/seo";

/**
 * <SEO /> — Landing Page SEO renderer.
 *
 * Preferred usage:
 *   <SEO pageKey="home" />           // reads everything from `constants/seo.js`
 *   <SEO pageKey="contact" />
 *
 * Overrides (used sparingly, e.g. for pages not yet in the registry):
 *   <SEO title="..." description="..." url="..." noindex />
 *
 * The component emits:
 *   - <title>, meta description, canonical
 *   - Open Graph (title/description/image/url/type/site_name/locale/image dims)
 *   - Twitter Card (card/title/description/image/site)
 *   - robots meta (noindex,nofollow when applicable)
 *   - JSON-LD: Organization + WebSite (site-wide) + WebPage + BreadcrumbList
 *              + any extra schemas declared on the page (SoftwareApplication, etc.)
 *   - Optional `extraJsonLd` passthrough for one-off schemas (kept for backward compat)
 */
const SEO = ({
  pageKey,
  title: titleProp,
  description: descProp,
  url: urlProp,
  noindex: noindexProp,
  extraJsonLd = null,
}) => {
  // Resolve base metadata from registry (falls back to `home` if key is unknown).
  const page = pageKey ? getPageSeo(pageKey) : null;

  const title = titleProp ?? page?.title ?? SITE.name;
  const description = descProp ?? page?.description ?? SITE.description;
  const canonicalPath = page?.path ?? "/";
  const canonicalUrl = urlProp ?? absoluteUrl(canonicalPath);
  const noindex = noindexProp ?? page?.noindex ?? false;

  const ogImage = absoluteUrl(SITE.ogImage);
  const twitterImage = absoluteUrl(SITE.twitterImage);

  // Build per-page schemas
  const pageWebPage = webPageSchema({
    title,
    description,
    path: canonicalPath,
  });
  const pageBreadcrumb = page?.breadcrumb?.length
    ? breadcrumbSchema(page.breadcrumb)
    : null;
  const extraSchemas =
    (page?.schemas || [])
      .map((key) => SCHEMA_BUILDERS[key]?.())
      .filter(Boolean) ?? [];

  return (
    <Helmet prioritizeSeoTags>
      {/* Base */}
      <html lang={SITE.language.toLowerCase()} />
      <title>{title}</title>
      <meta name="description" content={description} />
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
  );
};

export default SEO;
