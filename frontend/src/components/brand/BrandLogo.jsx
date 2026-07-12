import React from "react";
import { BRAND } from "@/constants/brand";

// Official Dynicty logo — rendered as-is, never redrawn.
// If height is 0, the caller supplies a class-based height (e.g. h-9 lg:h-12).
export const BrandLogo = ({ height = 0, className = "", showAlt = true }) => {
  const style = height && height > 0 ? { height, width: "auto" } : undefined;
  return (
    <img
      src={BRAND.logo.horizontal}
      alt={showAlt ? "Dynicty" : ""}
      style={style}
      className={`select-none pointer-events-none ${className}`}
      draggable={false}
      loading="eager"
      decoding="async"
    />
  );
};

export default BrandLogo;
