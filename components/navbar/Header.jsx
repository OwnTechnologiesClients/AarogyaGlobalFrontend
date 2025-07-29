"use client";

import { PhoneCall, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";

function Header() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1168);
    };

    // Initial check
    handleResize();

    // Listener
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="font-poppins w-full bg-white">
      {/* Hide this entire top section on mobile view */}
      {!isMobileView && (
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-5 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logoforheader.png"
              alt="Aarogya Global Logo"
              width={200}
              height={80}
              className="h-auto w-[120px] sm:w-[140px] md:w-[180px] object-contain"
              priority
            />
          </Link>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-8 text-sm text-[#555]">
            <div className="flex items-center gap-4">
              <PhoneCall className="text-blue-600" />
              <div className="flex flex-col gap-2">
                <p className="font-medium">Emergency Line</p>
                <p className="font-semibold text-[#000D44]">+91 9876543212</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-blue-600" />
              <div className="flex flex-col gap-2">
                <p className="font-medium">Support Email</p>
                <p className="font-semibold text-[#000D44]">
                  support@aarogya.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-600" />
              <div className="flex flex-col gap-2">
                <p className="font-medium">Visit Us On</p>
                <p className="font-semibold text-[#000D44]">
                  Innov8 Orchid Center
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Always visible Navbar */}
      <Navbar
        textColor="text-[#000D44]"
        fontFamily="font-poppins"
        hideLogoOnDesktop={true}
        logoSrc="/logoforheader.png"
      />
    </header>
  );
}

export default Header;
