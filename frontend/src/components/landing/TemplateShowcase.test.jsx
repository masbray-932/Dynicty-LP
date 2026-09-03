import React, { act } from "react";
import { createRoot } from "react-dom/client";
import TemplateShowcase from "./TemplateShowcase";
import { fetchPublicTemplates } from "@/services/templateShowcaseApi";
import { trackMetaViewContent } from "@/lib/metaPixel";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock(
  "react-router-dom",
  () => {
    const ReactModule = jest.requireActual("react");
    return {
      Link: ReactModule.forwardRef(({ to, children, ...props }, ref) =>
        ReactModule.createElement("a", { ref, href: to, ...props }, children)
      ),
    };
  },
  { virtual: true }
);

jest.mock("@/services/templateShowcaseApi", () => ({
  ...jest.requireActual("@/services/templateShowcaseApi"),
  fetchPublicTemplates: jest.fn(),
}));

jest.mock("@/hooks/useInView", () => ({
  useRevealClass: () => ({ ref: null, style: {}, className: "" }),
}));

jest.mock("@/lib/metaPixel", () => ({
  trackMetaViewContent: jest.fn(),
  trackMetaContact: jest.fn(),
}));

const flushRender = async (promise) => {
  fetchPublicTemplates.mockReturnValueOnce(promise);
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(<TemplateShowcase />);
    await Promise.resolve();
    await Promise.resolve();
  });

  return { container, root };
};

describe("TemplateShowcase", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("renders stable skeleton cards while the API is loading", async () => {
    const { container, root } = await flushRender(new Promise(() => {}));
    expect(container.querySelectorAll('[data-testid="template-skeleton"]')).toHaveLength(6);
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
    await act(async () => root.unmount());
  });

  it("renders API templates first with secure demo and contact CTAs", async () => {
    const { container, root } = await flushRender(
      Promise.resolve([
        {
          slug: "fashion-store",
          name: "Fashion Store",
          category: "Fashion",
          shortDescription: "Template fashion siap pakai",
          thumbnailUrl: "https://cdn.example.com/fashion.jpg",
          demoUrl: "https://demo.example.com/",
          featured: true,
          status: "available",
          source: "api",
        },
        {
          slug: "electronics-store",
          name: "Electronics Store",
          category: "Electronics",
          shortDescription: "Template elektronik siap pakai",
          thumbnailUrl: "",
          demoUrl: "",
          featured: false,
          status: "available",
          source: "api",
        },
      ])
    );

    expect(container.textContent).toContain("Fashion Store");
    expect(container.textContent).toContain("Template Unggulan");
    expect(container.textContent).toContain("Lihat Demo");
    expect(container.textContent).toContain("Tanyakan Template");
    expect(container.textContent.match(/Fashion Store/g)).toHaveLength(1);
    expect(container.textContent.match(/Electronics Store/g)).toHaveLength(1);

    const demo = container.querySelector('a[href="https://demo.example.com/"]');
    expect(demo?.getAttribute("target")).toBe("_blank");
    expect(demo?.getAttribute("rel")).toBe("noopener noreferrer");
    demo.click();
    expect(trackMetaViewContent).toHaveBeenCalledTimes(1);
    expect(trackMetaViewContent).toHaveBeenCalledWith(expect.objectContaining({
      content_type: "template",
      content_name: "Fashion Store",
      content_ids: ["fashion-store"],
    }));
    await act(async () => root.unmount());
  });

  it("falls back to the existing cards when the API fails", async () => {
    const { container, root } = await flushRender(Promise.reject(new Error("offline")));
    expect(container.textContent).toContain("Sinar Telur");
    expect(container.textContent).toContain("Fashion");
    expect(container.querySelector('[aria-busy="false"]')).not.toBeNull();
    expect(container.querySelectorAll('[data-testid="template-skeleton"]')).toHaveLength(0);
    await act(async () => root.unmount());
  });
});
