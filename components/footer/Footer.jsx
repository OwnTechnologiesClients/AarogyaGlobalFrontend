"use client";
import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaViber } from "react-icons/fa";
import Link from "next/link";
import footerData from "../../data/footer.json";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

const iconMap = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

  // Set the scroll event listener to track scroll to top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsScrollToTopVisible(true);
      } else {
        setIsScrollToTopVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <footer className="w-full bg-[#000D44] rounded-3xl text-white px-6 sm:px-10 md:px-20 py-8 md:py-16 md:mt-20 mt-8 relative">
      {!isHomePage && (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-[#E7C2D4] relative z-10 mb-32 rounded-2xl py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 shadow-lg text-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
              {/* Emergency Line */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-[#1F5FFF] w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-[#000D44]">
                    Emergency Line
                  </p>
                  <p className="text-[#000D44] text-sm md:text-base font-semibold">
                    +380 93 128 1076
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:flex h-12 items-center px-6">
                <div className="border-l border-[#000D44]/30 h-20 transform rotate-20" />
              </div>

              {/* Support Email */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-[#1F5FFF] w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-[#000D44]">
                    Support Email
                  </p>
                  <p className="text-[#000D44] text-sm md:text-base font-semibold break-all">
                    aarogyaglobalforyou@gmail.com
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:flex h-12 items-center px-6">
                <div className="border-l border-[#000D44]/30 h-20 transform rotate-20" />
              </div>

              {/* Visit Us */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-[#1F5FFF] w-12 h-12 rounded-full flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-[#000D44]">
                    Visit Us On
                  </p>
                  <p className="text-[#000D44] text-sm md:text-base font-semibold">
                    Innov8 Orchid Center India, 122001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <Image
            src={footerData.logo}
            alt="Logo"
            width={220}
            height={66}
            className="md:w-[200px] md:h-[50px] w-[150px] h-auto mb-8"
          />
          <p className="font-medium text-sm text-gray-200 mb-4 max-w-xs leading-6">
            {footerData.description}
          </p>
          <div className="flex gap-2 items-center">
            <span className="text-sm">Follow Us:</span>
            <div className="flex gap-3">
              {footerData.socials.map((social, idx) => {
                const Icon = iconMap[social.icon] || null;
                return (
                  <Link
                    key={idx}
                    href={social.url}
                    className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full border border-white/30 bg-[#FFFFFF33] hover:bg-[#2ecc71] hover:text-[#120548] transition text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon && <Icon size={22} />}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
          <div className="w-20 h-[2px] bg-[#7D7D92] rounded overflow-hidden mb-4">
            <div className="w-1/4 h-full bg-[#04CE78]" />
          </div>
          <ul className="space-y-2">
            {footerData.quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  className="hover:underline text-[#E6E6F0] text-sm leading-[1.5] cursor-pointer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">
            Useful Links
          </h3>
          <div className="w-20 h-[2px] bg-[#7D7D92] rounded overflow-hidden mb-4">
            <div className="w-1/4 h-full bg-[#04CE78]" />
          </div>
          <ul className="space-y-2">
            {footerData.usefulLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  className="hover:underline text-[#E6E6F0] text-sm leading-[1.5]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-[#E7C2D4] rounded-xl p-5 text-[#18004b] shadow-lg mx-auto w-[286px] xl:mx-0">
          <h3 className="text-lg font-bold mb-2">Get In Touch</h3>
          <div className="w-20 h-[2px] bg-[#7D7D92] rounded overflow-hidden mb-4">
            <div className="w-[55%] h-full bg-[#04CE78]" />
          </div>

          {/* Location */}
          <div className="mb-4">
            <div className="flex items-start gap-2 mb-1">
              <MapPin className="text-[#1F5FFF] w-4 h-4 mt-0.5" />
              <span className="font-semibold text-xs">Location:</span>
            </div>
            <p className="text-sm font-normal ml-6 leading-relaxed">
              {footerData.contact.location}
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <div className="flex items-start gap-2 mb-1">
              <Mail className="text-[#1F5FFF] w-4 h-4 mt-0.5" />
              <span className="font-semibold text-xs">Email:</span>
            </div>
            <a
              href={`mailto:${footerData.contact.email}`}
              className="text-sm font-normal ml-6 text-[#18004b]"
            >
              {footerData.contact.email}
            </a>
          </div>

          {/* Phone */}
          <div>
            <div className="flex items-start gap-2 mb-1">
              <Phone className="text-[#1F5FFF] w-4 h-4 mt-0.5" />
              <span className="font-semibold text-xs">Phone:</span>
            </div>
            <a
              href={`tel:${footerData.contact.phone}`}
              className="text-sm font-normal ml-6 text-[#18004b] cursor-pointer"
            >
              {footerData.contact.phone}
            </a>
          </div>
        </div>
      </div>
      {/* Telegram Floating Button */}
      <Link
        href="https://t.me/+380931281076"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed z-50 right-6 group bg-gradient-to-br from-[#0088cc] to-[#0077b3] hover:from-[#0077b3] hover:to-[#0088cc] rounded-full p-3 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1 ${isScrollToTopVisible ? 'bottom-56' : 'bottom-30'
          }`}
        style={{
          boxShadow: "0 8px 32px rgba(0,136,204,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="relative">
          <FaTelegram
            size={28}
            color="#fff"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
        </div>
      </Link>

      {/* Viber Floating Button */}
      <Link
        href="viber://chat?number=%2B380931281076"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed z-50 right-6 group bg-gradient-to-br from-[#7360f2] to-[#5a4fd8] hover:from-[#5a4fd8] hover:to-[#7360f2] rounded-full p-3 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1 ${isScrollToTopVisible ? 'bottom-44' : 'bottom-18'
          }`}
        style={{
          boxShadow: "0 8px 32px rgba(115,96,242,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="relative">
          <FaViber
            size={28}
            color="#fff"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
        </div>
      </Link>

      {/* WhatsApp Floating Button */}
      <Link
        href="https://wa.me/380931281076"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed z-50 right-6 group bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] rounded-full p-3 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1 ${isScrollToTopVisible ? 'bottom-32' : 'bottom-6'
          }`}
        style={{
          boxShadow: "0 8px 32px rgba(37,211,102,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="relative">
          <FaWhatsapp
            size={28}
            color="#fff"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
