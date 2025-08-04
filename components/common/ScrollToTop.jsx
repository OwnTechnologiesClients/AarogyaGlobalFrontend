"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Set the scroll event listener
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed z-50 bottom-32 right-6 flex flex-col items-center gap-3">
          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-gradient-to-br from-[#04CE78] to-[#00A854] hover:from-[#00A854] hover:to-[#04CE78] rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
            style={{ 
              boxShadow: "0 8px 32px rgba(4,206,120,0.3)",
              backdropFilter: "blur(10px)"
            }}
            aria-label="Scroll to top"
          >
            {/* Medical Cross Icon */}
            <div className="relative">
              <Plus 
                size={28} 
                color="#fff" 
                className="transform rotate-45 transition-transform duration-300 group-hover:rotate-0" 
              />
            </div>
            
            {/* Pulse Animation Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
            
            {/* Hover Tooltip */}
            <div className={`absolute bottom-full right-0 mb-3 px-3 py-2 bg-[#1A0142] text-white text-sm rounded-lg shadow-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} whitespace-nowrap`}>
              Back to Top
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1A0142]"></div>
            </div>
          </button>
          
          {/* Decorative Medical Line */}
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#04CE78] to-transparent rounded-full"></div>
        </div>
      )}
    </>
  );
};

export default ScrollToTop; 