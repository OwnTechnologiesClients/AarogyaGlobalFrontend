import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-sans">
      {/* Top blue strip - now responsive with centered content on small screens */}
      <div className="bg-[#020c3d] text-white text-sm py-2 px-4 flex flex-wrap justify-center md:justify-start items-center gap-2">
        <p className="text-center md:text-left">Caring Today for a Healthier Tomorrow and Forever</p>
        <div className="flex items-center gap-2 hover:underline cursor-pointer">
          <span>Find A Doctor</span>
          <span>➡️</span>
        </div>
      </div>

      {/* Logo + Contact Info - stacked on mobile, row on desktop */}
      <div className="bg-white py-4 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-4 sm:gap-6">
          {/* Logo - centered on mobile */}
          <div className="text-xl md:text-2xl sm:text-3xl font-bold text-blue-900 text-center md:text-left">
            AAROGYA <span className="text-gray-600">GLOBAL</span>
          </div>

          {/* Contact Info - responsive grid layout */}
          <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-600 min-w-[16px]" />
              <div className="md:block hidden">
                <div className="font-medium">Emergency Line</div>
                <div className="font-semibold text-blue-900">+91 9876543212</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600 min-w-[16px]" />
              <div className="md:block hidden" >
                <div className="font-medium">Support Email</div>
                <div className="font-semibold text-blue-900">support@aarogya.com</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600 min-w-[16px]" />
              <div className="md:block hidden" >
                <div className="font-medium">Visit Us On</div>
                <div className="font-semibold text-blue-900">Innov8 Orchid Center</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - with mobile menu toggle */}
      <div className="border-t border-gray-200 mb-1 bg-white shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex justify-between items-center">
          {/* Mobile menu button - hidden on desktop */}
          <button
            className="md:hidden p-2 text-blue-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Menu Links - hidden on mobile when menu is closed */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent z-10 shadow-md md:shadow-none py-3 md:py-0 px-4 md:px-0`}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm font-semibold text-blue-900">
              <a href="#" className="hover:text-green-500">Home +</a>
              <a href="#" className="hover:text-green-500">About</a>
              <a href="#" className="hover:text-green-500">Pages +</a>
              <a href="#" className="hover:text-green-500">Doctors +</a>
              <a href="#" className="text-green-500 hover:text-green-600">Hospitals +</a>
              <a href="#" className="hover:text-green-500">Blog +</a>
              <a href="#" className="hover:text-green-500">Contact</a>
            </div>
          </div>

          {/* Right Buttons - login and appointment */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="#" className="hidden sm:flex items-center gap-1 text-sm text-blue-900 font-semibold hover:text-green-500">
              <FiUser /> Login/Register
            </a>
            <button className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center gap-1 sm:gap-2 whitespace-nowrap">
              Make Appointment <span className="hidden sm:inline">➡️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;