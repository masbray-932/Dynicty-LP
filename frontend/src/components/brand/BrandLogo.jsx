import React from "react";
import { BRAND } from "@/constants/brand";

// Official Dynicty logo — rendered as-is, never redrawn.
// Uses the transparent PNG uploaded by the brand team.
export const BrandLogo = ({ height = 32, className = "", showAlt = true }) => {
  return (
    <img
      src={BRAND.logo.horizontal}
      alt={showAlt ? "Dynicty" : ""}
      height={height}
      style={{ height, width: "auto" }}
      className={`select-none pointer-events-none ${className}`}
      draggable={false}
    />
  );
};

export default BrandLogo;
