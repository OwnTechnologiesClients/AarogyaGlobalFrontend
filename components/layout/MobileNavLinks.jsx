import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import navbarData from "@/data/navbarlink.json";

const MobileNavLinks = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const toggleDropdown = (label) =>
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdowns({});
  };
  return (
    <nav className="space-y-1">
      {navbarData.navigation.map((link) =>
        link.dropdown ? (
          <div key={link.label} className="border-b border-gray-100">
            <button
              onClick={() => toggleDropdown(link.label)}
              className="w-full flex items-center justify-between py-4 text-left font-poppins font-semibold text-[14px] leading-[20px] text-gray-900 hover:text-[#04CE78] transition-colors capitalize"
            >
              <span className={link.highlight ? "text-[#04CE78]" : ""}>
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
                    className="block py-2 font-poppins font-semibold text-[14px] leading-[20px] text-gray-600 hover:text-[#04CE78] transition-colors capitalize"
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
              className={`block py-4 font-poppins font-semibold text-[14px] leading-[20px] transition-colors capitalize ${link.highlight
                ? "text-[#04CE78]"
                : "text-gray-900 hover:text-[#04CE78]"
                }`}
              onClick={closeMobileMenu}
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
