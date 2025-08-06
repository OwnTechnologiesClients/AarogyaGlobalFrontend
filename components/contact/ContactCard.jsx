"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ContactCard = () => {
  return (
    <>
      <div className="px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Telephone Support */}
          <div className="bg-[#ECB2FF] rounded-2xl px-4 py-6 sm:px-6 sm:py-8 text-center flex flex-col items-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="bg-white rounded-full p-3 sm:p-4 inline-flex mb-4">
              <Image
                src="/contact/phone-large.svg"
                alt="phone"
                width={40}
                height={40}
                className="w-8 sm:w-10 h-8 sm:h-10 object-contain"
              />
            </div>
            <h3 className="text-[#001033] text-base sm:text-lg font-semibold font-poppins mb-3">
              Telephone Support
            </h3>
            <div className="text-[#001033] text-xs sm:text-sm mb-4 leading-relaxed space-y-0.5">
              Call us Mon. – Fri., 8 am – 5 pm and our representatives will help
              you make an appointment that's convenient for you.
            </div>
            <button className="bg-[#1E40FF] cursor-pointer text-white text-xs sm:text-sm font-semibold font-poppins w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-[#1a39e6] transition-colors duration-300">
              Call Support: +91 9876565678
              <Image
                src="/contact/phone-large.svg"
                alt="call"
                width={16}
                height={16}
                className="w-4 h-4 invert brightness-0 object-contain"
              />
            </button>
          </div>

          {/* Virtual Visits */}
          <div className="bg-[#92BDF6] rounded-2xl px-4 py-6 sm:px-6 sm:py-8 text-center flex flex-col items-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="bg-white rounded-full p-3 sm:p-4 inline-flex mb-4">
              <Image
                src="/contact/video-big.svg"
                alt="video"
                width={40}
                height={40}
                className="w-8 sm:w-10 h-8 sm:h-10 object-contain"
              />
            </div>
            <h3 className="text-[#001033] text-base sm:text-lg font-semibold font-poppins mb-3">
              Virtual Visits
            </h3>
            <div className="text-[#001033] text-xs sm:text-sm mb-4 leading-relaxed space-y-0.5">
              You can have your appointment without
              leaving your home. It's the easiest way
              to get the care you need to stay healthy.
            </div>
            <button className="bg-[#0ACF83] cursor-pointer text-white text-xs sm:text-sm font-semibold font-poppins px-4 sm:px-6 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-[#09b574] transition-colors duration-300">
              Read More Virtual Visits
              <ArrowRight size={18} className="text-white" />
            </button>
          </div>

          {/* View Details */}
          <div className="bg-[#FEC091] rounded-2xl px-4 py-6 sm:px-6 sm:py-8 text-center flex flex-col items-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="bg-white rounded-full p-3 sm:p-4 inline-flex mb-4">
              <Image
                src="/contact/user-big.svg"
                alt="appointment"
                width={40}
                height={40}
                className="w-8 sm:w-10 h-8 sm:h-10 object-contain"
              />
            </div>
            <h3 className="text-[#001033] text-base sm:text-lg font-semibold font-poppins mb-3">
              View Details
            </h3>
            <div className="text-[#001033] text-xs sm:text-sm mb-4 leading-relaxed space-y-0.5">
              Make an appointment with us at
              the nearest facility help to
              directly examine your health.
            </div>
            <button className="bg-[#1E40FF] cursor-pointer text-white text-xs sm:text-sm font-semibold font-poppins w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-[#1a39e6] transition-colors duration-300">
              View Details
              <ArrowRight size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
