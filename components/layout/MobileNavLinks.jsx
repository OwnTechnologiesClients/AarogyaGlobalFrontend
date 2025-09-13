import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import navbarData from "@/data/navbarlink.json";

const MobileNavLinks = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  const toggleDropdown = (label) =>
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));

  const closeMobileMenu = () => {
    setOpenDropdowns({});
  };

  // Track current route and set active link
  useEffect(() => {
    const currentPath = pathname;

    // Check for exact matches first
    const exactMatch = navbarData.navigation.find(link =>
      link.href === currentPath || link.href === currentPath.replace(/\/$/, '') || link.href === currentPath + '/'
    );

    if (exactMatch) {
      setActiveLink(exactMatch.label);
      return;
    }

    // Check dropdown items
    for (const link of navbarData.navigation) {
      if (link.dropdown) {
        const dropdownMatch = link.dropdown.find(item =>
          item.href === currentPath || item.href === currentPath.replace(/\/$/, '') || item.href === currentPath + '/'
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
  return (
    <nav className="space-y-1">
      {navbarData.navigation.map((link) =>
        link.dropdown ? (
          <div key={link.label} className="border-b border-gray-100">
            <button
              onClick={() => toggleDropdown(link.label)}
              className="w-full flex items-center justify-between py-4 text-left font-poppins font-semibold text-[14px] leading-[20px] text-gray-900 hover:text-[#04CE78] transition-colors capitalize"
            >
              <span className={activeLink === link.label ? "text-[#04CE78]" : ""}>
                {link.label}
              </span>
              {openDropdowns[link.label] ? (
                <Minus className="w-5 h-5 text-gray-400" />
              ) : (
                <Plus className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openDropdowns[link.label] && (
              <div className="pb-4 pl-4">
                {link.dropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`block py-2 font-poppins font-semibold text-[14px] leading-[20px] transition-colors capitalize ${pathname === item.href || pathname === item.href.replace(/\/$/, '') || pathname === item.href + '/'
                      ? "text-[#04CE78]"
                      : "text-gray-600 hover:text-[#04CE78]"
                      }`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div key={link.label} className="border-b border-gray-100">
            <Link
              href={link.href}
              className={`block py-4 font-poppins font-semibold text-[14px] leading-[20px] transition-colors capitalize ${activeLink === link.label
                ? "text-[#04CE78]"
                : "text-gray-900 hover:text-[#04CE78]"
                }`}
              onClick={() => {
                closeMobileMenu();
                // Scroll to top when clicking Home link to show WELCOME section
                if (link.href === "/") {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              {link.label}
            </Link>
          </div>
        )
      )}
    </nav>
  );
};

export default MobileNavLinks;
