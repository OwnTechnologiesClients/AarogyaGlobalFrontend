"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  UserCircle,
  MenuIcon,
  X as CloseIcon,
  Plus,
  Minus,
} from "lucide-react";
import navLinks from "@/data/navlinks.json";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (label) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdowns({});
  };

  return (
      <header className="px-4 md:px-14 py-4 md:py-6 w-full bg-transparent relative">

        <div className="flex items-center mx-auto">
          {/* Logo */}
          <Link href="/" className="z-50 flex-shrink-0 relative">
            <Image
              src="/Logo.png"
              alt="Aarogya Global Logo"
              width={149}
              height={39}
              className="h-auto w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 ml-2">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-2">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <NavigationMenuItem key={link.label}>
                      <NavigationMenuTrigger
                        className={`text-white bg-transparent hover:bg-transparent hover:text-[#04CE78]
                          focus:text-[#04CE78] data-[state=open]:text-[#04CE78] px-3 py-2 text-[15px] font-medium`}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white min-w-[200px] rounded-md shadow-lg border z-50">
                        <ul className="py-2">
                          {link.dropdown.map((item) => (
                            <li key={item.label}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href}
                                  className="block px-4 py-3 text-[14px] font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                >
                                  {item.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.label}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className={`px-3 py-2 text-[15px] font-medium transition-colors rounded text-white
                            hover:text-[#04CE78] focus:text-[#04CE78] ${
                              link.highlight ? "text-[#04CE78]" : ""
                            }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop Auth & CTA */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0 ml-auto">
            <Link
              href="/login"
              className="flex items-center gap-2 text-white hover:text-[#04CE78] text-[14px] font-medium transition-colors whitespace-nowrap"
            >
              <UserCircle className="w-5 h-5" />
              Login/Register
            </Link>
            <Button
              asChild
              className="bg-[#04CE78] hover:bg-[#03b86a] text-white text-[14px] font-semibold px-5 py-2.5 h-auto rounded-lg shadow-md whitespace-nowrap"
            >
              <Link href="/appointment" className="flex items-center gap-2">
                Make An Appointment <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white z-50 p-2 ml-auto relative"
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
            <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 overflow-y-auto">
              {/* Mobile Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="w-6"></div> {/* Spacer */}
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  aria-label="Close menu"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="px-6 py-4">
                <nav className="space-y-1">
                  {navLinks.map((link) =>
                    link.dropdown ? (
                      <div key={link.label} className="border-b border-gray-100">
                        <button
                          onClick={() => toggleDropdown(link.label)}
                          className="w-full flex items-center justify-between py-4 text-left text-[16px] font-medium text-gray-900 hover:text-[#04CE78] transition-colors"
                        >
                          <span className={link.highlight ? "text-[#04CE78]" : ""}>{link.label}</span>
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
                                className="block py-2 text-[15px] font-normal text-gray-600 hover:text-[#04CE78] transition-colors"
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
                          className={`block py-4 text-[16px] font-medium transition-colors ${
                            link.highlight ? "text-[#04CE78]" : "text-gray-900 hover:text-[#04CE78]"
                          }`}
                          onClick={closeMobileMenu}
                        >
                          {link.label}
                        </Link>
                      </div>
                    )
                  )}
                </nav>
              </div>

              {/* Mobile Auth Section */}
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
                  <Button
                    asChild
                    className="bg-[#04CE78] hover:bg-[#03b86a] text-white text-[15px] font-semibold px-6 py-4 h-auto rounded-lg shadow-md w-full"
                  >
                    <Link
                      href="/appointment"
                      className="flex items-center justify-center gap-2"
                      onClick={closeMobileMenu}
                    >
                      Make An Appointment <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
  );
};

export default Navbar;
