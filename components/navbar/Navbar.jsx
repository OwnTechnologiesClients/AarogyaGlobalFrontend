"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  UserCircle,
  Menu as MenuIcon,
  X as CloseIcon,
  Plus,
  Minus,
} from "lucide-react";
import navLinks from "@/data/navlinks.json";
import CustomButton from "../layout/CustomButton";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (label) =>
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdowns({});
  };

  // Desktop navigation
const DesktopNavLinks = () => (
  <div className="hidden md:block">
    <ul className="flex gap-2 relative">
      {navLinks.map((link) =>
        link.dropdown ? (
          <li key={link.label} className="relative group">
            <button
              type="button"
              className="font-poppins font-semibold text-[17px] text-white hover:text-[#04CE78] px-3 py-2 transition-colors flex items-center gap-1"
            >
              {link.label}
              <span className="text-[#04CE78] text-[20px] leading-none">+</span>
            </button>

            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white min-w-[200px] rounded-md shadow-lg border z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
              <ul className="py-2">
                {link.dropdown.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-100 hover:text-[#04CE78] transition-colors"
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
              className={`font-poppins font-semibold text-[17px] text-white hover:text-[#04CE78] px-3 py-2 transition-colors flex items-center gap-1 ${
                link.highlight ? "text-[#04CE78]" : ""
              }`}
            >
              {link.label}
              <span className="text-[#04CE78] text-[20px] leading-none">+</span>
            </Link>
          </li>
        )
      )}
    </ul>
  </div>
);


  // Mobile navigation
  const MobileNavLinks = () => (
    <nav className="space-y-1">
      {navLinks.map((link) =>
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
              className={`block py-4 font-poppins font-semibold text-[14px] leading-[20px] transition-colors capitalize ${
                link.highlight
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

  return (
    <header className="px-4 py-4 w-full relative">
      <div className="flex items-center mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="relative flex-shrink-0 ">
          <Image
            src="/Logo.png"
            alt="Aarogya Global Logo"
            width={160}
            height={70}
            className="h-12 w-auto object-contain md:mb-6"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-8 ml-4 md:ml-6 lg:ml-8">
          <DesktopNavLinks />
        </nav>

        {/* Desktop Auth & CTA */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link
            href="/login"
            className="flex items-center gap-2 text-white hover:text-[#04CE78] text-[20px] font-semibold transition-colors whitespace-nowrap"
          >
            <UserCircle className="w-5 h-5" />
            Login/Register
          </Link>
          <Link href="/appointment">
            <CustomButton
              text="Make An Appointment"
              textSize="text-lg"
              iconSize={28}
              padding="px-8 py-6"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white ml-auto z-50 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <CloseIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 overflow-y-auto md:hidden">
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
