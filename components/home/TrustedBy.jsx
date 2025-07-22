"use client";

import React from "react";
import CountUp from "react-countup";

import Marquee from "react-fast-marquee";

const logos = [
  "/hospital_logos/img1.jpg",
  "/hospital_logos/img2.png",
  "/hospital_logos/img3.webp",
  "/hospital_logos/img4.webp",
  "/hospital_logos/img5.webp",
  "/hospital_logos/img6.webp",
  "/hospital_logos/img7.webp",
  "/hospital_logos/img8.jpg",
];

const TrustedBy = () => (
  <section className="w-full flex flex-col items-center py-8 md:py-12 mt-10">
    <h4 className="text-[#000D44] font-bold mb-8 md:mb-12 text-center text-lg md:text-xl lg:text-2xl tracking-wider uppercase">
      TRUSTED BY{" "}
      <CountUp
        end={50}
        duration={2}
        className="font-bold text-blue-600"
        enableScrollSpy
        scrollSpyOnce
      />
      + INTERNATIONAL RECOGNIZED HOSPITAL PARTNER
    </h4>

    <div className="w-full overflow-hidden">
      <Marquee gradient={false} speed={60} pauseOnHover={true} className="py-6">
        {[...logos, ...logos].map((logo, idx) => (
          <div
            key={idx}
            className="mx-8 flex items-center justify-center min-w-[180px]"
          >
            <img
              src={logo}
              alt={`Hospital logo ${idx + 1}`}
              className="h-14 md:h-20 lg:h-24 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </Marquee>
    </div>
  </section>
);

export default TrustedBy;
