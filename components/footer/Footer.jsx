import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import footerData from '../../data/footer.json';

const iconMap = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#000D44] rounded-2xl text-white px-16 py-10 md:py-40 relative">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <img src={footerData.logo} alt="Logo" className="w-48 mb-2" />
          <p className="text-base text-gray-200 mb-4 max-w-xs">{footerData.description}</p>
          <div>
            <span className="font-semibold">Follow Us:</span>
            <div className="flex gap-3 mt-2">
              {footerData.socials.map((social, idx) => {
                const Icon = iconMap[social.icon] || null;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-[#2ecc71] hover:text-[#120548] transition text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon && <Icon size={22} />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-2xl mb-2">Quick Links</h3>
          <div className="w-16 h-1 bg-green-400 mb-4 rounded" />
          <ul className="space-y-3">
            {footerData.quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  className="hover:underline text-gray-200 text-base"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Useful Links */}
        <div>
          <h3 className="font-bold text-2xl mb-2">Useful Links</h3>
          <div className="w-16 h-1 bg-green-400 mb-4 rounded" />
          <ul className="space-y-3">
            {footerData.usefulLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  className="hover:underline text-gray-200 text-base"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Info */}
        <div className="flex justify-end">
          <div className="bg-pink-200 bg-opacity-90 rounded-xl p-11 text-[#18004b] w-full max-w-xs shadow-lg">
            <h3 className="font-bold text-2xl mb-2 text-[#18004b]">Get In Touch</h3>
            <div className="w-16 h-1 bg-green-400 mb-4 rounded" />
            <div className="mb-6">
              <span className="font-semibold">Location:</span>
              <div className="flex items-start gap-2 mt-1">
                <span className="text-lg">📍</span>
                <span className="text-base">{footerData.contact.location}</span>
              </div>
            </div>
            <div className="mb-6">
              <span className="font-semibold">Email:</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg">📧</span>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="text-base underline text-blue-700"
                >
                  {footerData.contact.email}
                </a>
              </div>
            </div>
            <div>
              <span className="font-semibold">Phone:</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg">📞</span>
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="text-base underline text-blue-700"
                >
                  {footerData.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919922345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-8 right-8 bg-[#2ecc71] rounded-full p-3 shadow-lg hover:scale-105 transition"
        style={{ boxShadow: '0 4px 24px rgba(46,204,113,0.3)' }}
      >
        <FaWhatsapp size={40} color="#fff" />
      </a>
    </footer>
  );
};

export default Footer;
