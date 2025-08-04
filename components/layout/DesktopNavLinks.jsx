import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import navbarData from "@/data/navbarlink.json";

// Accept textColor as a prop
const DesktopNavLinks = ({ textColor = "text-white" }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1168);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track current route and set active link
  useEffect(() => {
    const currentPath = pathname;
    
    // Check for exact matches first
    const exactMatch = navbarData.navigation.find(link => 
      link.href === currentPath
    );
    
    if (exactMatch) {
      setActiveLink(exactMatch.label);
      return;
    }
    
    // Check dropdown items
    for (const link of navbarData.navigation) {
      if (link.dropdown) {
        const dropdownMatch = link.dropdown.find(item => 
          item.href === currentPath
        );
        if (dropdownMatch) {
          setActiveLink(link.label);
          return;
        }
      }
    }
    
    // If no match found, clear active link
    setActiveLink("");
  }, [pathname]);

  // Helper function to check if a link is active
  const isLinkActive = (linkLabel) => {
    return activeLink === linkLabel;
  };

  return (
    <div style={{ display: isMobileView ? "none" : "block" }}>
      <ul className="flex relative ml-4">
        {navbarData.navigation.map((link) =>
          link.dropdown ? (
            <li key={link.label} className="relative group">
              <button
                type="button"
                className={`font-medium ${textColor} hover:text-[#04CE78] px-3 py-2 transition-colors flex items-center ${
                  isLinkActive(link.label) ? "text-[#04CE78]" : ""
                }`}
              >
                {link.label}
                <span className="text-[#04CE78] text-[20px] leading-none ml-1">
                  +
                </span>
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white min-w-[200px] rounded-md shadow-lg border z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                <ul className="py-2">
                  {link.dropdown.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-100 hover:text-[#04CE78] transition-colors ${
                          pathname === item.href ? "bg-gray-100 text-[#04CE78]" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ) : (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`font-medium ${textColor} hover:text-[#04CE78] px-3 py-2 transition-colors flex items-center gap-1 ${
                  isLinkActive(link.label) ? "text-[#04CE78]" : ""
                }`}
              >
                {link.label}
                <span className="text-[#04CE78] text-[20px] leading-none ml-1">
                  +
                </span>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default DesktopNavLinks;
