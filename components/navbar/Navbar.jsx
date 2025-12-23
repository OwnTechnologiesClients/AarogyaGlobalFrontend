"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calculator,
  ArrowRightIcon,
  UserCircle,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";

import CustomButton from "../layout/CustomButton";
import DesktopNavLinks from "../layout/DesktopNavLinks";
import MobileNavLinks from "../layout/MobileNavLinks";

const Navbar = ({
  textColor = "text-white",
  fontFamily = "font-poppins",
  hideLogoOnDesktop = false,
  logoSrc = "/Logo.png",
  onMobileMenuChange = () => {},
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Notify parent when mobile menu open state changes
  useEffect(() => {
    onMobileMenuChange(mobileOpen);
  }, [mobileOpen, onMobileMenuChange]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdowns({});
  };

  return (
    <header className={`px-8 py-4 w-full relative ${fontFamily}`}>
      <div className="flex items-center mx-auto w-full">
        {/* Logo - Hide above 1168px if hideLogoOnDesktop is true */}
        {(!hideLogoOnDesktop || isMobileView) && (
          <Link href="/" className="relative flex-shrink-0">
            <Image
              src={logoSrc}
              alt="Logo"
              width={120}
              height={70}
              className="h-11 2xl:h-16 w-auto object-contain"
              priority
            />
          </Link>
        )}

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center">
          <DesktopNavLinks textColor={textColor} />
        </nav>

        {/* Desktop Auth & CTA */}
        {!isMobileView && (
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6 ml-auto">
            <Link href="/contact">
              <CustomButton
                text="Make An Appointment"
                textSize="text-xs lg:text-sm xl:text-base 2xl:text-lg"
                iconSize={16}
                padding="px-2 py-1.5 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5 2xl:px-6 2xl:py-3"
              />
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobileView && (
          <button
            className={`${textColor} ml-auto z-50 p-2 cursor-pointer`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileOpen && isMobileView && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 overflow-y-auto">
            {/* Mobile header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="w-6"></div>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-600 hover:text-gray-900"
                aria-label="Close menu"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav */}
            <div className="px-6 py-4">
              <MobileNavLinks />
            </div>

            {/* Mobile Auth & CTA */}
            <div className="px-6 py-6 border-t border-gray-100 mt-auto">
              <div className="space-y-4">
                 {/* Treatment Cost Calculator Button */}
                <a
                  href="https://chatgpt.com/g/g-EURipaiWa-aarogya-global-treatment-cost-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-600 text-white text-[15px] font-semibold px-6 py-4 rounded-lg shadow-md w-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                  onClick={closeMobileMenu}
                >
                  <Calculator className="w-5 h-5" />
                  Treatment Cost Calculator
                </a>

                <Link
                  href="/contact"
                  className="bg-[#04CE78] hover:bg-[#03b86a] text-white text-[15px] font-semibold px-6 py-4 rounded-lg shadow-md w-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                  onClick={closeMobileMenu}
                >
                  Make An Appointment <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
