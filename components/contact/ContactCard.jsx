"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ContactCard = () => {
  return (
    <>
      <div className="px-4 sm:px-8  py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* Telephone Support */}
          <div className="bg-[#ECB2FF] rounded-2xl px-6 py-10 sm:px-10 sm:py-14 text-center flex flex-col items-center shadow-md">
            <div className="bg-white rounded-full p-4 sm:p-6 inline-flex mb-6">
              <Image
                src="/contact/phone-large.svg"
                alt="phone"
                width={56}
                height={56}
                className="w-12 sm:w-14 h-12 sm:h-14 object-contain"
              />
            </div>
            <h3 className="text-[#001033] text-lg sm:text-xl font-semibold font-poppins mb-4">
              Telephone Support
            </h3>
            <div className="text-[#001033] text-sm sm:text-base  mb-6 leading-relaxed space-y-0.5">
              Call us Mon. – Fri., 8 am – 5 pm and our representatives will help
              you make an appointment that’s convenient for you.
            </div>
            <button className="bg-[#1E40FF] cursor-pointer text-white text-sm sm:text-base font-semibold font-poppins w-full py-3 rounded-md flex  items-center justify-center gap-2">
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
          <div className="bg-[#92BDF6] rounded-2xl px-6 py-10 sm:px-10 sm:py-14 text-center flex flex-col items-center shadow-md">
            <div className="bg-white rounded-full p-6 sm:p-8 inline-flex mb-6">
              <Image
                src="/contact/video-big.svg"
                alt="video"
                width={60}
                height={60}
                className="w-14 sm:w-16 h-14 sm:h-16 object-contain"
              />
            </div>
            <h3 className="text-[#001033] text-lg sm:text-xl font-semibold font-poppins mb-4">
              Virtual Visits
            </h3>
            <div className="text-[#001033] text-sm sm:text-base  mb-6 leading-relaxed space-y-0.5">
              You can have your appointment without
              leaving your home. It’s the easiest way
              to get the care you need to stay healthy.
            </div>
            <button className="bg-[#0ACF83] cursor-pointer text-white text-sm sm:text-base font-semibold font-poppins px-6 sm:px-8 py-3 rounded-md flex items-center justify-center gap-2">
              Read More Virtual Visits
              <ArrowRight size={18} className="text-white" />
            </button>
          </div>

          {/* View Details */}
          <div className="bg-[#FEC091] rounded-2xl px-6 py-10 sm:px-10 sm:py-14 text-center flex flex-col items-center shadow-md">
            <div className="bg-white rounded-full p-6 sm:p-8 inline-flex mb-6">
              <Image
                src="/contact/user-big.svg"
                alt="appointment"
                width={60}
                height={60}
                className="w-14 sm:w-16 h-14 sm:h-16 object-contain"
              />
            </div>
            <h3 className="text-[#001033] text-lg sm:text-xl font-semibold font-poppins mb-4">
              View Details
            </h3>
            <div className="text-[#001033] text-sm sm:text-base mb-6 leading-relaxed space-y-0.5">
              Make an appointment with us at
              the nearest facility help to
             directly examine your health.
            </div>
            <button className="bg-[#1E40FF]  cursor-pointer text-white text-sm sm:text-base font-semibold font-poppins w-full py-3 rounded-md flex items-center justify-center gap-2">
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
