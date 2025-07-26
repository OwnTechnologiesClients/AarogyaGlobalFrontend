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
      <div className="w-full flex flex-col lg:flex-row justify-between 2xl:gap-0 gap-14 px-6 xl:px-12 2xl:px-24 xl:py-12 2xl:py-24">
        {/* Left Side */}
        <div className="flex flex-col justify-start w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0 space-y-6">
          {/* Top Banner */}
          <WelcomeBanner
            text="WHY CHOOSE AAROGYA GLOBAL"
            alignment="left"
            className="text-lg mb-3"
          />

          {/* Main Heading */}
          <h3 className="text-2xl md:text-4xl font-extrabold  text-[#1A0142] leading-tight">
            We go beyond bookings and payments
          </h3>

          {/* Subtext */}
          <p className="text-[#555555] text-base md:text-sm max-w-lg leading-6">
            With a focus on compassionate and personalized treatment we strive
            to create a welcoming environment where patients feel valued
            respected and well informed about their health
          </p>

          {/* Feature Cards */}
          <div className="flex flex-col gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center bg-white rounded-xl shadow-sm px-5 py-6 gap-4"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full">
                  <BadgeCheck className="w-10 h-10 fill-[#1F5FFF] text-white" />
                </span>
                <span className="font-medium text-base md:text-lg text-[#000D44]">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>

          {/* CTA + Support Email */}
          <div className="flex flex-col sm:flex-row gap-8 pt-8">
            <CustomButton
              text="Read More"
              textSize="text-sm md:text-base "
              iconSize={20}
              padding="px-6 py-3 "
              bgColor="bg-[#1F5FFF]"
            />
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="bg-white p-4 rounded-full">
                <Mail className="w-5 h-5 md:w-8 md:h-8 text-[#1F5FFF]" />
              </span>
              <div className="flex flex-col">
                <span className="text-gray-700 text-sm  font-medium leading-tight">
                  Support Email
                </span>
                <a
                  href="mailto:aarogyaglobalforyou@gmail.com"
                  className="text-blue-950 mt-1 font-semibold text-base hover:text-blue-800 transition"
                >
                  aarogyaglobalforyou@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="relative w-full lg:w-1/2 h-[420px] md:h-[600px] lg:h-[670px] mt-12 lg:mt-0">
          {/* Background Image */}
          <Image
            src="/beyondbooking/mainImg.png"
            alt="Doctor Team"
            fill
            className="object-cover object-center rounded-3xl"
          />
          {/* Overlay Image */}
          <div className="absolute  hidden lg:block bottom-4 left-[-30px] md:bottom-24 bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white w-[220px] h-[140px] md:w-[300px] md:h-[200px]">
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
