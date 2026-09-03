import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { AnalyticsConsentProvider, ANALYTICS_CONSENT_KEY, useAnalyticsConsent } from "./AnalyticsConsentContext";
import { setMetaTrackingEnabled } from "@/lib/metaPixel";
import { setPostHogConsent } from "@/lib/posthog";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
jest.mock("@/lib/metaPixel", () => ({ setMetaTrackingEnabled: jest.fn() }));
jest.mock("@/lib/posthog", () => ({ setPostHogConsent: jest.fn() }));

const Probe = () => {
  const { consent, accept, reject } = useAnalyticsConsent();
  return <div data-consent={consent}><button onClick={accept}>accept</button><button onClick={reject}>reject</button></div>;
};

describe("AnalyticsConsentProvider", () => {
  let container;
  let root;
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
  });

  it("does not enable trackers without a choice", async () => {
    await act(async () => root.render(<AnalyticsConsentProvider><Probe /></AnalyticsConsentProvider>));
    expect(container.firstChild.dataset.consent).toBe("unknown");
    expect(setMetaTrackingEnabled).toHaveBeenCalledWith(false);
    expect(setPostHogConsent).not.toHaveBeenCalled();
  });

  it("persists accepted and rejected choices", async () => {
    await act(async () => root.render(<AnalyticsConsentProvider><Probe /></AnalyticsConsentProvider>));
    await act(async () => container.querySelector("button").click());
    expect(localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe("accepted");
    expect(setMetaTrackingEnabled).toHaveBeenLastCalledWith(true);
    expect(setPostHogConsent).toHaveBeenLastCalledWith(true);
    await act(async () => container.querySelectorAll("button")[1].click());
    expect(localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe("rejected");
    expect(setPostHogConsent).toHaveBeenLastCalledWith(false);
  });
});
