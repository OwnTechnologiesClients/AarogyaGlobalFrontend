import React from "react";

const CircleButton = ({ onClick, children, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className="
      w-14 h-14 rounded-full
      bg-[#6C00FF] text-white
      flex items-center justify-center
      shadow-lg
      transition
      hover:bg-[#7D26FF] active:bg-[#4B0099]
      focus:outline-none focus:ring-2 focus:ring-[#6C00FF]
    "
  >
    {children}
  </button>
);

export default CircleButton; 