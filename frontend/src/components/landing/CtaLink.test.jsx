import React, { act } from "react";
import { createRoot } from "react-dom/client";
import CtaLink from "./CtaLink";
import { trackMetaContact } from "@/lib/metaPixel";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
jest.mock("@/lib/metaPixel", () => ({ trackMetaContact: jest.fn() }));
jest.mock("react-router-dom", () => {
  const ReactModule = jest.requireActual("react");
  return {
    Link: ReactModule.forwardRef(({ to, children, ...props }, ref) =>
      ReactModule.createElement("a", { ref, href: to, ...props }, children)
    ),
  };
}, { virtual: true });

describe("CtaLink contact tracking", () => {
  let container;
  let root;
  beforeEach(() => {
    jest.clearAllMocks();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
  });

  it("tracks outbound WhatsApp but not the internal /kontak fallback", async () => {
    await act(async () => root.render(<CtaLink to="https://wa.me/6281234567" trackingContext={{ source: "hero" }}>WA</CtaLink>));
    container.querySelector("a").addEventListener("click", (event) => event.preventDefault());
    container.querySelector("a").click();
    expect(trackMetaContact).toHaveBeenCalledTimes(1);
    expect(trackMetaContact).toHaveBeenCalledWith(expect.objectContaining({ source: "hero", contact_method: "whatsapp" }));
    await act(async () => root.render(<CtaLink to="/kontak?src=hero">Contact</CtaLink>));
    container.querySelector("a").addEventListener("click", (event) => event.preventDefault());
    container.querySelector("a").click();
    expect(trackMetaContact).toHaveBeenCalledTimes(1);
  });
});
