"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
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
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1168);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdowns({});
  };

  return (
    <header className={`px-4 py-4 w-full relative ${fontFamily}`}>
      <div className="flex items-center mx-auto w-full">
        {/* Logo - Hide above 1168px if hideLogoOnDesktop is true */}
        {(!hideLogoOnDesktop || isMobileView) && (
          <Link href="/" className="relative flex-shrink-0">
            <Image
              src={logoSrc}
              alt="Logo"
              width={120}
              height={70}
              className="h-8 w-auto object-contain"
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
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <Link
              href="/login"
              className={`flex items-center gap-2 ${textColor} hover:text-[#04CE78] font-semibold transition-colors whitespace-nowrap`}
            >
              <UserCircle className="w-6 h-6" />
            </Link>

            <Link href="/appointment">
              <CustomButton
                text="Make An Appointment"
                textSize="text-sm"
                iconSize={28}
                padding="px-3 py-2"
              />
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobileView && (
          <button
            className={`${textColor} ml-auto z-50 p-2`}
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
                <Link
                  href="/login"
                  className="flex items-center gap-3 py-3 text-[16px] font-medium text-gray-900 hover:text-[#04CE78] transition-colors"
                  onClick={closeMobileMenu}
                >
                  <UserCircle className="w-5 h-5" />
                  Login/Register
                </Link>
                <Link
                  href="/appointment"
                  className="bg-[#04CE78] hover:bg-[#03b86a] text-white text-[15px] font-semibold px-6 py-4 rounded-lg shadow-md w-full flex items-center justify-center gap-2 transition-all"
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
