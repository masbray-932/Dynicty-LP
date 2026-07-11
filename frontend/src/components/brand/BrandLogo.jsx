import React from "react";

// Inline SVG DTY monogram inspired by the Dynicty brand guideline.
// The mark is composed of stylized D + T + Y with an orbital swoosh and a
// sparkle. Colors use the brand blue → purple gradient.
export const BrandMark = ({ size = 28, className = "" }) => {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`dyn-g-${id}`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="55%" stopColor="#6D5EF7" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id={`dyn-g2-${id}`} x1="64" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* Orbital swoosh */}
      <path
        d="M6 44 C 18 62, 46 62, 58 44"
        stroke={`url(#dyn-g-${id})`}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      {/* D letter */}
      <path
        d="M10 14 H 22 C 30 14, 34 20, 34 28 C 34 36, 30 42, 22 42 H 10 Z"
        fill={`url(#dyn-g-${id})`}
      />
      <rect x="14" y="18" width="10" height="20" rx="2" fill="#05060F" />

      {/* T bar */}
      <rect x="26" y="12" width="22" height="5" rx="1" fill="#FFFFFF" />
      <rect x="34" y="12" width="5" height="24" rx="1" fill="#FFFFFF" />

      {/* Y stroke */}
      <path
        d="M40 20 L 48 34 L 48 44"
        stroke={`url(#dyn-g2-${id})`}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M56 20 L 48 34"
        stroke={`url(#dyn-g2-${id})`}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Sparkle */}
      <path
        d="M54 10 L 55.4 13 L 58.5 14.4 L 55.4 15.8 L 54 18.8 L 52.6 15.8 L 49.5 14.4 L 52.6 13 Z"
        fill="#EAF0FF"
      />
    </svg>
  );
};

export const BrandLogo = ({ size = 28, showWordmark = true, className = "" }) => {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <BrandMark size={size} />
      {showWordmark && (
        <span
          className="font-semibold tracking-[0.14em] text-white"
          style={{
            fontFamily: "'Space Grotesk', ui-sans-serif, system-ui",
            fontSize: Math.round(size * 0.62),
          }}
        >
          DYNICTY
        </span>
      )}
    </span>
  );
};

export default BrandLogo;
