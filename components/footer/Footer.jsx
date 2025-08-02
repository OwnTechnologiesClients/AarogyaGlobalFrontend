"use client";
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
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

  return (
    <footer className="w-full bg-[#000D44] rounded-3xl text-white px-6 sm:px-10 md:px-20 py-10 md:py-40 md:mt-20 mt-8 relative">
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
                  <p className="text-sm md:text-base text-[#000D44]">
                    Emergency Line
                  </p>
                  <p className="text-[#000D44] text-base md:text-lg font-semibold">
                    +91 9876543212
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
                  <p className="text-sm md:text-base text-[#000D44]">
                    Support Email
                  </p>
                  <p className="text-[#000D44] text-base md:text-lg font-semibold break-all">
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
                  <p className="text-sm md:text-base text-[#000D44]">
                    Visit Us On
                  </p>
                  <p className="text-[#000D44] text-base md:text-lg font-semibold">
                    Innov8 Orchid Center India, 122001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
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
            <span className="text-lg">Follow Us:</span>
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
          <h3 className="text-white font-semibold text-xl mb-4">Quick Links</h3>
          <div className="w-24 h-[2px] bg-[#7D7D92] rounded overflow-hidden mb-6">
            <div className="w-1/4 h-full bg-[#04CE78]" />
          </div>
          <ul className="space-y-4">
            {footerData.quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  className="hover:underline text-[#E6E6F0] text-lg leading-[1.6]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">
            Useful Links
          </h3>
          <div className="w-24 h-[2px] bg-[#7D7D92] rounded overflow-hidden mb-6">
            <div className="w-1/4 h-full bg-[#04CE78]" />
          </div>
          <ul className="space-y-4">
            {footerData.usefulLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  className="hover:underline text-[#E6E6F0] text-lg leading-[1.6]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-[#E7C2D4] rounded-xl p-6 text-[#18004b] shadow-lg mx-auto w-[286px] xl:mx-0">
          <h3 className="text-xl font-bold mb-2">Get In Touch</h3>
          <div className="w-24 h-[2px] bg-[#7D7D92] rounded overflow-hidden mb-6">
            <div className="w-[55%] h-full bg-[#04CE78]" />
          </div>

          {/* Location */}
          <div className="mb-6">
            <div className="flex items-start gap-2 mb-1">
              <MapPin className="text-[#1F5FFF] w-5 h-5 mt-0.5" />
              <span className="font-semibold text-sm">Location:</span>
            </div>
            <p className="text-lg font-normal ml-7 leading-relaxed">
              {footerData.contact.location}
            </p>
          </div>

          {/* Email */}
          <div className="mb-6">
            <div className="flex items-start gap-2 mb-1">
              <Mail className="text-[#1F5FFF] w-5 h-5 mt-0.5" />
              <span className="font-semibold text-sm">Email:</span>
            </div>
            <a
              href={`mailto:${footerData.contact.email}`}
              className="text-lg font-normal ml-7 text-[#18004b]"
            >
              {footerData.contact.email}
            </a>
          </div>

          {/* Phone */}
          <div>
            <div className="flex items-start gap-2 mb-1">
              <Phone className="text-[#1F5FFF] w-5 h-5 mt-0.5" />
              <span className="font-semibold text-sm">Phone:</span>
            </div>
            <a
              href={`tel:${footerData.contact.phone}`}
              className="text-lg font-normal ml-7 text-[#18004b]"
            >
              {footerData.contact.phone}
            </a>
          </div>
        </div>
      </div>
      {/* WhatsApp Floating Button */}
      <Link
        href="https://wa.me/919922345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-8 right-6 group bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
        style={{
          boxShadow: "0 8px 32px rgba(37,211,102,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="relative">
          <FaWhatsapp
            size={32}
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
