import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import footerData from "../../data/footer.json";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

const iconMap = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#000D44] rounded-3xl text-white px-16 py-10 md:py-40 md:mt-20 mt-8 relative">
      <div className=" flex justify-between flex-col md:flex-row  gap-6">
        {/* Logo & Description */}
        <div className="flex flex-col gap-6">
          <Image
            src={footerData.logo}
            alt="Logo"
            width={220}
            height={66}
            className="md:w-[255px] md:h-[66px] w-[150px] h-auto mb-8"
          />
          <p className="font-medium text-xl text-gray-200 mb-8 max-w-md">
            {footerData.description}
          </p>
          <div className="flex gap-4 items-center">
            <span className=" text-xl">Follow Us:</span>
            <div className="flex gap-3 ">
              {footerData.socials.map((social, idx) => {
                const Icon = iconMap[social.icon] || null;
                return (
                  <Link
                    key={idx}
                    href={social.url}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-[#FFFFFF33] hover:bg-[#2ecc71] hover:text-[#120548] transition text-white"
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
          <h3 className="text-white font-semibold text-[25px] mb-4">
            Quick Links
          </h3>

          {/* Line: green part + gray line */}
          <div className="w-24 h-[2px] bg-[#7D7D92] rounded overflow-hidden mb-6">
            <div className="w-1/4 h-full bg-[#04CE78]" />
          </div>

          {/* List */}
          <ul className="space-y-4">
            {footerData.quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  className="hover:underline text-[#E6E6F0] text-[20px] leading-[1.6]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white font-semibold text-[25px] mb-4">
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
                  className="hover:underline text-[#E6E6F0] text-[20px] leading-[1.6]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Info */}
        <div className="flex justify-end">
          <div className="bg-[#E7C2D4] rounded-xl px-8 py-16 text-[#18004b] w-full max-w-xs shadow-lg">
            {/* Heading */}
            <h3 className="text-[20px] font-bold mb-2">Get In Touch</h3>

            {/* Divider Line */}
            <div className="w-24 h-[2px] bg-[#7D7D92] rounded overflow-hidden mb-6">
              <div className="w-[55%] h-full bg-[#04CE78]" />
            </div>

            {/* Location */}
            <div className="mb-6">
              <div className="flex items-start gap-2 mb-1">
                <MapPin className="text-[#1F5FFF]  w-5 h-5 mt-0.5" />
                <span className="font-semibold text-lg">Location:</span>
              </div>
              <p className="text-[18px] font-normal ml-7 leading-relaxed">
                {footerData.contact.location}
              </p>
            </div>

            {/* Email */}
            <div className="mb-6">
              <div className="flex items-start gap-2 mb-1">
                <Mail className="text-[#1F5FFF]  w-5 h-5 mt-0.5" />
                <span className="font-semibold text-lg">Email:</span>
              </div>
              <a
                href={`mailto:${footerData.contact.email}`}
                className="text-[18px] font-normal ml-7 text-[#18004b]"
              >
                {footerData.contact.email}
              </a>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-start gap-2 mb-1">
                <Phone className="text-[#1F5FFF]  w-5 h-5 mt-0.5" />
                <span className="font-semibold text-lg">Phone:</span>
              </div>
              <a
                href={`tel:${footerData.contact.phone}`}
                className="text-[18px] font-normal ml-7 text-[#18004b]"
              >
                {footerData.contact.phone}
              </a>
            </div>
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
