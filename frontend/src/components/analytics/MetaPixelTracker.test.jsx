import React, { StrictMode, act } from "react";
import { createRoot } from "react-dom/client";
import MetaPixelTracker from "./MetaPixelTracker";
import { __resetMetaPixelForTests } from "@/lib/metaPixel";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
jest.mock("@/context/LandingPageSettingsContext", () => ({
  useLandingPageSettings: () => ({ data: { analytics: { meta_pixel_id: "123456789012345" } }, loading: false, isFromApi: true }),
}));
jest.mock("@/context/AnalyticsConsentContext", () => ({
  useAnalyticsConsent: () => ({ hasConsent: true }),
}));
let mockLocation = { pathname: "/", search: "", hash: "" };
jest.mock("react-router-dom", () => ({
  useLocation: () => mockLocation,
}), { virtual: true });

const pageViews = () => (window.fbq?.queue || [])
  .map((args) => Array.from(args))
  .filter(([command, event]) => command === "track" && event === "PageView");

describe("MetaPixelTracker", () => {
  let root;
  let container;
  beforeEach(() => {
    mockLocation = { pathname: "/", search: "", hash: "" };
    __resetMetaPixelForTests();
    delete window.fbq;
    delete window._fbq;
    document.getElementById("dynicty-meta-pixel")?.remove();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
  });

  it("tracks initial and SPA routes once, ignores hash-only navigation, and survives StrictMode", async () => {
    await act(async () => root.render(
      <StrictMode><MetaPixelTracker /></StrictMode>
    ));
    expect(pageViews()).toHaveLength(1);
    mockLocation = { pathname: "/kontak", search: "?src=test", hash: "" };
    await act(async () => root.render(<StrictMode><MetaPixelTracker /></StrictMode>));
    expect(pageViews()).toHaveLength(2);
    mockLocation = { pathname: "/kontak", search: "?src=test", hash: "#form" };
    await act(async () => root.render(<StrictMode><MetaPixelTracker /></StrictMode>));
    expect(pageViews()).toHaveLength(2);
    expect(pageViews()[1][2]).toEqual(expect.objectContaining({ page_path: "/kontak" }));
    expect(JSON.stringify(pageViews()[1][2])).not.toContain("src=test");
  });
});
