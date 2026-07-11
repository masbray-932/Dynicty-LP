import React from "react";
import { Helmet } from "react-helmet-async";

const DEFAULT = {
  title: "Dynicty — Platform All-in-One untuk Bisnis Modern",
  description:
    "Bangun website e-commerce modern dengan platform SaaS white label Dynicty. Template Engine, Multi Tenant, Subscription, Deployment otomatis, dan Domain Binding dalam satu ekosistem.",
  url: "https://dynicty.com/",
  image: "https://dynicty.com/og-image.png",
};

const SEO = ({
  title = DEFAULT.title,
  description = DEFAULT.description,
  url = DEFAULT.url,
  image = DEFAULT.image,
  noindex = false,
}) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Dynicty" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Theme */}
      <meta name="theme-color" content="#05060F" />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Dynicty",
          url: "https://dynicty.com",
          logo: "https://dynicty.com/logo.svg",
          slogan: "BUILD • GROW • EMPOWER",
          description: DEFAULT.description,
          sameAs: [
            "https://instagram.com/dynicty.official",
            "https://twitter.com/dynicty",
            "https://linkedin.com/company/dynicty",
          ],
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Dynicty",
          url: "https://dynicty.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://dynicty.com/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
