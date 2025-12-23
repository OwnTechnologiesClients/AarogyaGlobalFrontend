"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  UserCircle,
  Menu as MenuIcon,
  X as CloseIcon,
  LogOut,
  User,
  Calculator,
} from "lucide-react";

import CustomButton from "../layout/CustomButton";
import DesktopNavLinks from "../layout/DesktopNavLinks";
import MobileNavLinks from "../layout/MobileNavLinks";
import { useAuth } from "@/context/AuthContext";

const Navbar = ({
  textColor = "text-white",
  fontFamily = "font-poppins",
  hideLogoOnDesktop = false,
  logoSrc = "/Logo.png",
  onMobileMenuChange = () => {},
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isMobileView, setIsMobileView] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

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
              className="h-8 lg:h-9 xl:h-10 2xl:h-12 w-auto object-contain"
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
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-4 ml-auto">
            {isAuthenticated ? (
              <>
                <Link href="/contact">
                  <CustomButton
                    text="Make An Appointment"
                    textSize="text-xs lg:text-xs xl:text-sm 2xl:text-sm"
                    iconSize={14}
                    padding="px-2 py-1.5 lg:px-2 lg:py-1.5 xl:px-3 xl:py-2 2xl:px-4 2xl:py-2.5"
                  />
                </Link>
                
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className={`flex items-center gap-2 ${textColor} hover:opacity-80 transition-opacity`}
                  >
                    {user?.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    ) : (
                      <UserCircle className="w-10 h-10" />
                    )}
                    <span className="font-medium text-xs xl:text-sm hidden lg:block">
                      {user?.displayName}
                    </span>
                  </button>

                  {showUserDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowUserDropdown(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">
                            {user?.displayName}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {user?.email || user?.phoneNumber}
                          </p>
                        </div>
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setShowUserDropdown(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/contact">
                  <CustomButton
                    text="Make An Appointment"
                    textSize="text-xs lg:text-xs xl:text-sm 2xl:text-sm"
                    iconSize={14}
                    padding="px-2 py-1.5 lg:px-2 lg:py-1.5 xl:px-3 xl:py-2 2xl:px-4 2xl:py-2.5"
                  />
                </Link>
                <Link
                  href="/login"
                  className={`flex items-center gap-1 ${textColor} hover:opacity-80 transition-opacity font-medium text-xs xl:text-sm`}
                >
                  <UserCircle className="w-6 h-6" />
                  <span>Login</span>
                </Link>
              </>
            )}
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
              <div className="space-y-3">
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

                {isAuthenticated ? (
                  <>
                    {/* User Info */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName}
                          className="w-12 h-12 rounded-full border-2 border-gray-200"
                        />
                      ) : (
                        <UserCircle className="w-12 h-12 text-gray-400" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.displayName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email || user?.phoneNumber}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <Link
                      href="/contact"
                      className="bg-[#04CE78] hover:bg-[#03b86a] text-white text-[15px] font-semibold px-6 py-4 rounded-lg shadow-md w-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      Make An Appointment <ArrowRightIcon className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="flex items-center justify-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full font-medium"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/contact"
                      className="bg-[#04CE78] hover:bg-[#03b86a] text-white text-[15px] font-semibold px-6 py-4 rounded-lg shadow-md w-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      Make An Appointment <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-all cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      <UserCircle className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
