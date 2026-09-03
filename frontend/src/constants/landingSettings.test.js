import { LANDING_SETTINGS_FALLBACK, normalizeLandingSettings } from "./landingSettings";

describe("landing settings analytics contract", () => {
  it("uses an empty disabled Pixel ID when analytics is missing", () => {
    expect(normalizeLandingSettings({}).analytics).toEqual({ meta_pixel_id: "" });
    expect(LANDING_SETTINGS_FALLBACK.analytics.meta_pixel_id).toBe("");
  });

  it("accepts numeric IDs and rejects scripts, tokens, and malformed values", () => {
    expect(normalizeLandingSettings({ analytics: { meta_pixel_id: "123456789012345" } }).analytics.meta_pixel_id)
      .toBe("123456789012345");
    ["<script>alert(1)</script>", "abc123", "EAAB-access-token", {}, null].forEach((value) => {
      expect(normalizeLandingSettings({ analytics: { meta_pixel_id: value } }).analytics.meta_pixel_id).toBe("");
    });
  });
});
