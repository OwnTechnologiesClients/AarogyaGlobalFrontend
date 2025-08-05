import React from "react";
import { ArrowRight } from "lucide-react";

const CustomButton = ({
  text = "Click Me",
  bgColor = "bg-[#04CE78]",
  textColor = "text-white",
  hoverBgColor = "bg-green-600",
  rounded = "rounded-lg",
  padding = "px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-4",
  textSize = "text-sm sm:text-base lg:text-lg",
  iconSize = 18,
  className = "",
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        font-medium transition-all duration-300 cursor-pointer
        ${bgColor} ${textColor} ${rounded} ${padding} ${textSize} ${className}
        hover:${hoverBgColor} min-h-[44px] sm:min-h-[48px] md:min-h-[52px] lg:min-h-[56px]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation
        w-full sm:w-auto
      `}
    >
      {children || (
        <>
          <span className="truncate">{text}</span>
          <ArrowRight
            size={iconSize}
            className="transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
          />
        </>
      )}
    </button>
  );
};

export default CustomButton;
