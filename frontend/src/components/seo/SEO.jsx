import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://dynicty.com";
const OG = `${SITE_URL}/brand/og-image.png`;
const TW = `${SITE_URL}/brand/twitter-card.png`;

const DEFAULT = {
  title: "Dynicty — Bangun Toko Online Sendiri untuk UMKM & Marketplace Seller",
  description:
    "Dynicty membantu UMKM dan seller marketplace di Indonesia membangun toko online profesional dengan branding sendiri, tanpa perlu memahami coding atau mengelola hosting.",
  url: SITE_URL + "/",
};

const SEO = ({
  title = DEFAULT.title,
  description = DEFAULT.description,
  url = DEFAULT.url,
  noindex = false,
  extraJsonLd = null,
}) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG} />
      <meta property="og:site_name" content="Dynicty" />
      <meta property="og:locale" content="id_ID" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={TW} />

      <meta name="theme-color" content="#05060F" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Dynicty",
          url: SITE_URL,
          logo: `${SITE_URL}/brand/dynicty-logo.png`,
          slogan: "BUILD • GROW • EMPOWER",
          description: DEFAULT.description,
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Dynicty",
          url: SITE_URL,
          inLanguage: "id-ID",
        })}
      </script>
      {extraJsonLd && (
        <script type="application/ld+json">{JSON.stringify(extraJsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
