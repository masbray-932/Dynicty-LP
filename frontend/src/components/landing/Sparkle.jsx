import React from "react";

export const Sparkle = ({ size = 12, className = "", color = "#EAF0FF" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 0 L 11.6 7 L 20 10 L 11.6 13 L 10 20 L 8.4 13 L 0 10 L 8.4 7 Z"
      fill={color}
      opacity="0.85"
    />
  </svg>
);

export default Sparkle;
