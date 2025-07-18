import React from "react";
import { BadgeCheck, Mail } from "lucide-react";
import WelcomeBanner from "../layout/WelcomeBanner";
import CustomButton from "../layout/CustomButton";
import Image from "next/image";
const features = [
  {
    title: "100% Transparent Process",
  },
  {
    title: "Truly Personalized Treatment Plans",
  },
  {
    title: "India’s Largest Verified Network",
  },
];

const BeyondBookingsPayments = () => {
  return (
    <section className="w-screen bg-[#F5F7FA] overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row justify-between gap-0">
        {/* Left Side */}
        <div className="flex flex-col justify-between px-4 md:px-12 lg:px-24 py-8 lg:py-16 w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0">
          <WelcomeBanner
            text="WHY CHOOSE AAROGYA GLOBAL"
            alignment="left"
            className="text-2xl font-bold mb-4"
          />
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold text-blue-950 leading-relaxed mb-4">
            We go beyond bookings and payments
          </h2>
          {/* Subtext */}
          <p className="text-gray-600 text-base md:text-lg mb-8">
            We are the only doctor led medical travel facilitator helping you
            navigate complex healthcare decisions.
          </p>
          {/* Feature Cards */}
          <div className="flex flex-col gap-5 mb-10">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center bg-white rounded-xl shadow-sm px-4  py-6 gap-4"
              >
                <span className="flex items-center justify-center w-10 h-10  rounded-full">
                  <BadgeCheck className="w-10 h-10 fill-[#1F5FFF] text-white" />
                </span>
                <span className="font-bold text-2xl text-blue-950">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
          {/* Bottom Row: Button and Contact */}
          <div className="flex flex-col sm:flex-row gap-8 mt-16">

            <CustomButton
              text="Read More"
              textSize = "text-sm md:text-base lg:text-lg"
              iconSize={38}
              padding="px-6 py-3 md:px-8 md:py-4"
              bgColor="bg-[#1F5FFF]"
        
            />
            <div className="flex items-center gap-6">
              <span className="bg-white p-6 rounded-full">
                <Mail className="w-8 h-8 font-bold text-[#1F5FFF]" />
              </span>
              <div className="flex flex-col">
                <span className="text-gray-700 text-xl font-base leading-tight">
                  Support Email
                </span>
                <a
                  href="mailto:aarogyaglobalforyou@gmail.com"
                  className="text-blue-950 mt-2 font-semibold text-base hover:text-blue-950 transition-colors"
                >
                  aarogyaglobalforyou@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>

        
        {/* Right Side: Images */}
        <div className="relative w-full h-[480px] md:h-[670px] flex items-center justify-center overflow-hidden rounded-2xl">
          {/* Doctor Team Image (background) */}
          <Image
            src="/beyondbooking/mainImg.png"
            alt="Doctor Team"
            fill
            className="object-cover object-center"
          />
          {/* Overlaid Nurse/Patient Image */}
          <div
            className="absolute left-4 bottom-4 md:left-10 md:bottom-10 bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-white"
          >
            <Image
              src="/beyondbooking/img2.png"
              alt="Nurse with Patient"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeyondBookingsPayments;
