import {
  PLATFORM_API_BASE,
  clearPublicTemplateCache,
  fetchPublicTemplates,
  mergeTemplatesWithRoadmap,
  normalizePublicTemplates,
  resolvePlatformAssetUrl,
  sanitizeExternalUrl,
} from "./templateShowcaseApi";

describe("templateShowcaseApi", () => {
  beforeEach(() => clearPublicTemplateCache());

  it("resolves relative thumbnails against the platform API domain", () => {
    expect(resolvePlatformAssetUrl("/brand/egg-thumb.jpg")).toBe(
      `${PLATFORM_API_BASE}/brand/egg-thumb.jpg`
    );
    expect(resolvePlatformAssetUrl("https://cdn.example.com/thumb.jpg")).toBe(
      "https://cdn.example.com/thumb.jpg"
    );
    expect(resolvePlatformAssetUrl("javascript:alert(1)")).toBe("");
  });

  it("only accepts safe HTTP(S) demo links", () => {
    expect(sanitizeExternalUrl("https://demo.dynicty.com/")).toBe(
      "https://demo.dynicty.com/"
    );
    expect(sanitizeExternalUrl("javascript:alert(1)")).toBe("");
  });

  it("normalizes, filters, and deduplicates public templates", () => {
    expect(
      normalizePublicTemplates([
        {
          slug: "egg-store-premium",
          name: "Toko Telur Premium",
          category: "Retail & Ecommerce",
          short_description: "Toko online siap pakai",
          thumbnail_url: "/brand/egg.jpg",
          demo_url: "https://demo.dynicty.com/",
          featured: true,
        },
        { slug: "egg-store-premium", name: "Duplikat" },
        null,
        {},
      ])
    ).toEqual([
      expect.objectContaining({
        slug: "egg-store-premium",
        name: "Toko Telur Premium",
        featured: true,
        status: "available",
        source: "api",
      }),
    ]);
  });

  it("returns an empty list for malformed payloads", () => {
    expect(normalizePublicTemplates(null)).toEqual([]);
    expect(normalizePublicTemplates({ items: [] })).toEqual([]);
  });

  it("keeps API templates first and removes matching roadmap duplicates", () => {
    const available = [
      { slug: "fashion-store", name: "Fashion Store", category: "Fashion" },
    ];
    const roadmap = [
      { name: "Sinar Telur", status: "available", categoryKey: "retail" },
      { name: "Fashion", status: "coming", categoryKey: "fashion" },
      { name: "Sports", status: "coming", categoryKey: "sports" },
    ];

    expect(mergeTemplatesWithRoadmap(available, roadmap)).toEqual([
      available[0],
      roadmap[2],
    ]);
  });

  it("fetches once and reuses the successful in-memory result", async () => {
    const fetchImpl = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ slug: "fashion", name: "Fashion" }],
    });

    await fetchPublicTemplates({ fetchImpl });
    await fetchPublicTemplates({ fetchImpl });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
