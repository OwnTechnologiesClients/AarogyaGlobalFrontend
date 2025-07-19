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

    <section className="w-full flex flex-col items-center py-8 md:py-12">
      <h4 className="text-gray-600 font-bold mb-8 md:mb-12 text-center text-lg md:text-xl lg:text-2xl tracking-wider uppercase">
        TRUSTED BY MORE THAN{" "}
        <CountUp
          end={100}
          duration={2}
          className="font-bold text-blue-600"
          enableScrollSpy
          scrollSpyOnce
        />
        + COMPANIES WORLDWIDE
      </h4>

      <div className="w-full overflow-hidden">
        <Marquee
          gradient={false}
          speed={60}
          pauseOnHover={true}
          className="py-4"
        >
          {/* Duplicate logos for seamless continuous scrolling */}
          {[...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="mx-3 md:mx-4 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`Trusted company logo ${(idx % logos.length) + 1}`}
                className="h-10 md:h-14 lg:h-28 object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>

);

export default TrustedBy;
