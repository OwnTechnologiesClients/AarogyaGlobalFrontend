"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const OnlineConsultationBanner = () => {
  return (
    <div className="w-full py-20 bg-white  overflow-hidden">
      <Marquee
        speed={60}
        gradient={false}
        pauseOnHover={true}
        direction="left"
        className="overflow-hidden"
      >
        <div className="flex items-center gap-6 sm:gap-12 px-4">
          {/* Repeat pattern for smooth scroll */}
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <React.Fragment key={index}>
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20">
                  <Image
                    src="/contact/heart-shape.svg"
                    alt="heart"
                    fill
                    className="object-contain"
                  />
                </div>

                <span className="text-4xl sm:text-[80px] lg:text-[110px] font-poppins outline-text whitespace-nowrap">
                  Online Consultation
                </span>

                <div className="relative w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20">
                  <Image
                    src="/contact/heart-shape.svg"
                    alt="heart"
                    fill
                    className="object-contain"
                  />
                </div>

                <span className="text-4xl sm:text-[80px] lg:text-[110px] font-poppins outline-text whitespace-nowrap">
                  Visits
                </span>
              </React.Fragment>
            ))}
        </div>
      </Marquee>
    </div>
  );
};

export default OnlineConsultationBanner;
