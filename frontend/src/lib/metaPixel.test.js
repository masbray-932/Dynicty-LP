import {
  __resetMetaPixelForTests,
  initializeMetaPixel,
  isValidMetaPixelId,
  setMetaTrackingEnabled,
  trackMetaContact,
  trackMetaEvent,
} from "./metaPixel";

const calls = () => (window.fbq?.queue || []).map((args) => Array.from(args));

describe("metaPixel", () => {
  beforeEach(() => {
    __resetMetaPixelForTests();
    delete window.fbq;
    delete window._fbq;
    document.getElementById("dynicty-meta-pixel")?.remove();
  });

  it("rejects empty and invalid IDs and accepts numeric IDs", () => {
    expect(isValidMetaPixelId("")).toBe(false);
    expect(isValidMetaPixelId("123<script>")).toBe(false);
    expect(isValidMetaPixelId("123456789012345")).toBe(true);
  });

  it("does not load before consent and initializes/loads only once after consent", () => {
    expect(initializeMetaPixel("123456789012345")).toBe(false);
    expect(document.querySelectorAll("#dynicty-meta-pixel")).toHaveLength(0);
    setMetaTrackingEnabled(true);
    expect(initializeMetaPixel("123456789012345")).toBe(true);
    expect(initializeMetaPixel("123456789012345")).toBe(true);
    expect(document.querySelectorAll("#dynicty-meta-pixel")).toHaveLength(1);
    expect(calls().filter(([command]) => command === "init")).toHaveLength(1);
  });

  it("does not load for rejected consent", () => {
    setMetaTrackingEnabled(false);
    expect(initializeMetaPixel("123456789012345")).toBe(false);
    expect(document.querySelector("#dynicty-meta-pixel")).toBeNull();
  });

  it("deduplicates rapid conversions and strips non-allowlisted PII", () => {
    setMetaTrackingEnabled(true);
    initializeMetaPixel("123456789012345");
    const unsafe = { source: "hero", email: "person@example.com", phone: "62812", message: "secret" };
    expect(trackMetaContact(unsafe)).toBe(true);
    expect(trackMetaContact(unsafe)).toBe(false);
    const contact = calls().find(([, event]) => event === "Contact");
    expect(contact[2]).toEqual({ source: "hero" });
    expect(JSON.stringify(contact[2])).not.toMatch(/person|62812|secret/);
  });

  it("ignores unsupported events and survives a blocked script", () => {
    setMetaTrackingEnabled(true);
    const append = document.head.appendChild;
    document.head.appendChild = () => { throw new Error("blocked"); };
    expect(() => initializeMetaPixel("123456789012345")).not.toThrow();
    document.head.appendChild = append;
    expect(trackMetaEvent("Purchase", { value: 10 })).toBe(false);
  });
});
