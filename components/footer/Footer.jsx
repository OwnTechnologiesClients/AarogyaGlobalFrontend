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
        <div className=" ">
          <div className="bg-[#E7C2D4] relative z-10 mb-32 rounded-2xl sm:px-6 px:-4 py-8  md:py-16 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-lg text-gray-800">
            {/* Emergency Line */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-[#1F5FFF] p-3 md:p-4 rounded-full text-white">
                <Phone className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className=" text-base md:text-lg font-normal text-[#000D44]">Emergency Line</p>
                <p className="text-[#000D44] text-sm md:text-xl font-semibold">
                  +91 9876543212
                </p>
              </div>
            </div>

            {/* Support Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-[#1F5FFF] p-3 md:p-4 rounded-full text-white">
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-base md:text-lg font-normal text-[#000D44]">Support Email</p>
                <p className="text-[#000D44] text-sm md:text-xl font-semibold">
                  support@aarogya.com
                </p>
              </div>
            </div>

            {/* Visit Us */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-[#1F5FFF] p-3 md:p-4 rounded-full text-white">
                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-base md:text-lg font-normal text-[#000D44]">Visit Us On</p>
                <p className="text-[#000D44] text-sm md:text-xl font-semibold">
                  Innov8 Orchid Center India, 122001
                </p>
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
        className="fixed z-50 bottom-8 right-8 bg-[#2ecc71] rounded-full p-3 shadow-lg hover:scale-105 transition"
        style={{ boxShadow: "0 4px 24px rgba(46,204,113,0.3)" }}
      >
        <FaWhatsapp size={40} color="#fff" />
      </Link>
    </footer>
  );
};

export default Footer;
