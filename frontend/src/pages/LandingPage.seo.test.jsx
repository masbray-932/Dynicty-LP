import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "@/pages/LandingPage";
jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}), { virtual: true });
jest.mock("@/context/LandingPageSettingsContext", () => {
  const { LANDING_SETTINGS_FALLBACK } = require("@/constants/landingSettings");
  return {
    useLandingPageSettings: () => ({
      data: LANDING_SETTINGS_FALLBACK,
      isFromApi: false,
    }),
    useContactSettings: () => LANDING_SETTINGS_FALLBACK.contact,
  };
});

describe("Dynicty homepage SEO foundation", () => {
  let container;
  let root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    jest.restoreAllMocks();
    document.head.innerHTML = "";
  });

  it("renders one H1 and one effective set of homepage SEO tags", async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    await act(async () => root.render(
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <LandingPage />
        </QueryClientProvider>
      </HelmetProvider>
    ));

    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent.replace(/\s+/g, " ").trim()).toBe(
      "Jasa Pembuatan Website E-commerce untuk UMKM"
    );
    expect(document.title).toBe(
      "Dynicty — Jasa Pembuatan Website & Platform E-commerce untuk UMKM"
    );

    const descriptions = document.head.querySelectorAll('meta[name="description"]');
    const canonicals = document.head.querySelectorAll('link[rel="canonical"]');
    const robots = document.head.querySelectorAll('meta[name="robots"]');
    const jsonLdScripts = [
      ...document.querySelectorAll('script[type="application/ld+json"]'),
    ];
    const schemas = jsonLdScripts.map((script) => JSON.parse(script.textContent));
    const websiteSchemas = schemas.filter((schema) => schema["@type"] === "WebSite");
    const organizationSchemas = schemas.filter(
      (schema) => schema["@type"] === "Organization"
    );

    expect(descriptions).toHaveLength(1);
    expect(descriptions[0].getAttribute("content")).toBe(
      "Dynicty menyediakan jasa pembuatan website dan platform e-commerce untuk UMKM. Bangun toko online sendiri dengan pengelolaan produk, pembayaran, pengiriman, dan branding profesional."
    );
    expect(canonicals).toHaveLength(1);
    expect(canonicals[0].getAttribute("href")).toBe("https://dynicty.com/");
    expect(robots).toHaveLength(1);
    expect(robots[0].getAttribute("content")).toBe(
      "index, follow, max-image-preview:large"
    );
    expect(websiteSchemas).toHaveLength(1);
    expect(websiteSchemas[0]).toEqual(expect.objectContaining({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://dynicty.com/#website",
      name: "Dynicty",
      url: "https://dynicty.com/",
      publisher: { "@id": "https://dynicty.com/#organization" },
    }));
    expect(organizationSchemas).toHaveLength(1);
    expect(organizationSchemas[0]).toEqual(expect.objectContaining({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://dynicty.com/#organization",
      name: "Dynicty",
      url: "https://dynicty.com/",
      logo: "https://dynicty.com/brand/dynicty-logo.png",
    }));
    expect(organizationSchemas[0]).not.toHaveProperty("sameAs");
    expect(schemas.every((schema) => JSON.parse(JSON.stringify(schema)))).toBe(true);
  });
});
