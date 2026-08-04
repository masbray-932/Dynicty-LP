import React, { act } from "react";
import { createRoot } from "react-dom/client";
import VerificationMetaUpdater, {
  syncVerificationMeta,
  VERIFICATION_META_FIELDS,
} from "./VerificationMetaUpdater";

describe("VerificationMetaUpdater", () => {
  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = false;
  });

  afterEach(() => {
    VERIFICATION_META_FIELDS.forEach(([name]) => {
      document.head
        .querySelectorAll(`meta[name="${name}"]`)
        .forEach((element) => element.remove());
    });
  });

  test("updates the build tag without creating a duplicate", () => {
    document.head.insertAdjacentHTML(
      "beforeend",
      '<meta name="google-site-verification" content="A">'
    );

    syncVerificationMeta(document, "google-site-verification", "B");

    const tags = document.head.querySelectorAll(
      'meta[name="google-site-verification"]'
    );
    expect(tags).toHaveLength(1);
    expect(tags[0].getAttribute("content")).toBe("B");
  });

  test("removes duplicates and removes the tag when the token is empty", () => {
    document.head.insertAdjacentHTML(
      "beforeend",
      '<meta name="msvalidate.01" content="A"><meta name="msvalidate.01" content="A">'
    );

    syncVerificationMeta(document, "msvalidate.01", "A");
    expect(
      document.head.querySelectorAll('meta[name="msvalidate.01"]')
    ).toHaveLength(1);

    syncVerificationMeta(document, "msvalidate.01", "");
    expect(
      document.head.querySelectorAll('meta[name="msvalidate.01"]')
    ).toHaveLength(0);
  });

  test("preserves the build tag until API-backed settings are available", () => {
    document.head.insertAdjacentHTML(
      "beforeend",
      '<meta name="google-site-verification" content="BUILD_TOKEN">'
    );
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => {
      root.render(<VerificationMetaUpdater seo={{}} enabled={false} />);
    });
    expect(
      document.head
        .querySelector('meta[name="google-site-verification"]')
        .getAttribute("content")
    ).toBe("BUILD_TOKEN");

    act(() => {
      root.render(
        <VerificationMetaUpdater
          seo={{ google_site_verification: "API_TOKEN" }}
          enabled
        />
      );
    });
    expect(
      document.head.querySelectorAll('meta[name="google-site-verification"]')
    ).toHaveLength(1);
    expect(
      document.head
        .querySelector('meta[name="google-site-verification"]')
        .getAttribute("content")
    ).toBe("API_TOKEN");

    act(() => root.unmount());
  });
});
