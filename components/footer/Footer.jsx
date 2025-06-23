import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
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
    <footer className="w-full bg-[#18004b] text-white px-4 py-10 md:py-16">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <img src={footerData.logo} alt="Logo" className="w-40 mb-2" />
          <p className="text-sm text-gray-200 mb-4">{footerData.description}</p>
          <div>
            <span className="font-semibold">Follow Us:</span>
            <div className="flex gap-3 mt-2">
              {footerData.socials.map((social, idx) => {
                const Icon = iconMap[social.icon] || null;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2a1760] hover:bg-[#3e1e8c] transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon && <Icon size={20} />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <div className="w-12 h-1 bg-green-400 mb-4 rounded" />
          <ul className="space-y-2">
            {footerData.quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  className="hover:underline text-gray-200 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Useful Links */}
        <div>
          <h3 className="font-bold text-lg mb-2">Useful Links</h3>
          <div className="w-12 h-1 bg-green-400 mb-4 rounded" />
          <ul className="space-y-2">
            {footerData.usefulLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  className="hover:underline text-gray-200 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <div className="bg-pink-200 bg-opacity-80 rounded-lg p-6 text-[#18004b]">
            <h3 className="font-bold text-lg mb-2 text-[#18004b]">
              Get In Touch
            </h3>
            <div className="w-12 h-1 bg-green-400 mb-4 rounded" />
            <div className="mb-4">
              <span className="font-semibold">Location:</span>
              <div className="flex items-start gap-2 mt-1">
                <span>📍</span>
                <span className="text-sm">{footerData.contact.location}</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Email:</span>
              <div className="flex items-center gap-2 mt-1">
                <span>📧</span>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="text-sm underline text-blue-700"
                >
                  {footerData.contact.email}
                </a>
              </div>
            </div>
            <div>
              <span className="font-semibold">Phone:</span>
              <div className="flex items-center gap-2 mt-1">
                <span>📞</span>
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="text-sm underline text-blue-700"
                >
                  {footerData.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
