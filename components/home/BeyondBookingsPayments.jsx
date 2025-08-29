import React from "react";
import { BadgeCheck, Mail } from "lucide-react";
import WelcomeBanner from "../layout/WelcomeBanner";
import CustomButton from "../layout/CustomButton";
import Image from "next/image";
import Link from "next/link";

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
      <div className="w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 px-6 xl:px-12 2xl:px-24 pt-16 pb-32">
        {/* Left Side */}
        <div className="flex flex-col justify-start w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0 space-y-4">
          {/* Top Banner */}
          <WelcomeBanner
            text="WHY CHOOSE AAROGYA GLOBAL"
            alignment="left"
            className="text-base"
          />

          {/* Main Heading */}
          <h3 className="text-xl md:text-3xl font-extrabold text-[#1A0142] leading-tight">
            We go beyond bookings and payments
          </h3>

          {/* Subtext */}
          <p className="text-[#555555] text-sm md:text-base max-w-lg leading-6">
            With a focus on compassionate and personalized treatment we strive
            to create a welcoming environment where patients feel valued
            respected and well informed about their health
          </p>

          {/* Feature Cards */}
          <div className="flex flex-col gap-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center bg-white rounded-lg shadow-sm px-4 py-4 gap-3"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full">
                  <BadgeCheck className="w-8 h-8 fill-[#1F5FFF] text-white" />
                </span>
                <span className="font-medium text-sm md:text-base text-[#000D44]">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>

          {/* CTA + Support Email */}
          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <Link href="/about">
              <CustomButton
                text="Read More"
                textSize="text-sm md:text-base "
                iconSize={20}
                padding="px-6 py-3 "
                bgColor="bg-[#1F5FFF]"
                className="cursor-pointer"
              />
            </Link>

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
        <div className="relative w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[550px] mt-6 lg:mt-0">
          {/* Background Image */}
          <Image
            src="/beyondbooking/why-choose-aarogya-global-1.jpg"
            alt="Why Choose Aarogya Global"
            fill
            className="object-cover object-center rounded-2xl"
          />
          {/* Overlay Image */}
          <div className="absolute hidden lg:block bottom-3 left-[-20px] bg-white rounded-xl overflow-hidden shadow-lg border-3 border-white w-[180px] h-[120px] md:w-[220px] md:h-[140px]">
            <Image
              src="/beyondbooking/why-choose-aarogya-global-2.jpg"
              alt="Why Choose Aarogya Global"
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
