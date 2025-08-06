"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const OnlineConsultationBanner = () => {
  return (
    <div className="w-full py-10 bg-white overflow-hidden">
      <Marquee
        speed={60}
        gradient={false}
        pauseOnHover={true}
        direction="left"
        className="overflow-hidden"
      >
        <div className="flex items-center gap-4 sm:gap-6 px-4">
          {/* Repeat pattern for smooth scroll */}
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <React.Fragment key={index}>
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12">
                  <Image
                    src="/contact/heart-shape.svg"
                    alt="heart"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl sm:text-4xl lg:text-5xl font-poppins outline-text whitespace-nowrap">
                  Online Consultation
                </span>
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 mx-6">
                  <Image
                    src="/contact/heart-shape.svg"
                    alt="heart"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl sm:text-4xl lg:text-5xl font-poppins outline-text whitespace-nowrap">
                  Teleconsultations
                </span>
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 mx-6">
                  <Image
                    src="/contact/heart-shape.svg"
                    alt="heart"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl sm:text-4xl lg:text-5xl font-poppins outline-text whitespace-nowrap">
                  Virtual Medical Visits
                </span>
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 mx-6">
                  <Image
                    src="/contact/heart-shape.svg"
                    alt="heart"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl sm:text-4xl lg:text-5xl font-poppins outline-text whitespace-nowrap">
                  Remote Healthcare
                </span>
              </React.Fragment>
            ))}
        </div>
      </Marquee>
    </div>
  );
};

export default OnlineConsultationBanner;
