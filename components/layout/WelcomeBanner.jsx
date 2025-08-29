import React from "react";

const WelcomeBanner = ({
  text = "WELCOME TO AAROGYA GLOBAL",
  textColor = "#04CE78",
  dotColor = "#04CE78",
  alignment = "center", // options: 'left', 'center', 'right'
  className = ""
}) => {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`flex items-center gap-2 ${alignmentClasses[alignment]} ${className}`}>
      <span style={{ backgroundColor: dotColor }} className="w-3 h-3 2xl:w-4 2xl:h-4 rounded-full"></span>
      <p style={{ color: textColor }} className="font-medium text-sm lg:text-base 2xl:text-3xl">{text}</p>
      <span style={{ backgroundColor: dotColor }} className="w-3 h-3 2xl:w-4 2xl:h-4 rounded-full"></span>
    </div>
  );
};

export default WelcomeBanner;
