import React from "react";
import { ArrowRight } from "lucide-react";

const CustomButton = ({
  text = "Click Me",
  bgColor = "bg-[#04CE78]",
  textColor = "text-white",
  hoverBgColor = "bg-green-600",
  rounded = "rounded-lg", // options: rounded-md, rounded-lg, etc.
  padding = "px-6 py-3 md:px-8 md:py-4", // default: mobile padding smaller, desktop bigger
  textSize = "text-sm md:text-base lg:text-lg", // responsive text
  iconSize = 20,
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 
        font-medium transition-all duration-300
        ${bgColor} ${textColor} ${rounded} ${padding} ${textSize} ${className}
        group hover:${hoverBgColor}
      `}
    >
      {text}
      <ArrowRight
        size={iconSize}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );
};

export default CustomButton;
