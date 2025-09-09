"use client";
import React, { useRef } from "react";
import Image from "next/image";
import WelcomeBanner from "../layout/WelcomeBanner";
import testimonials from "../../data/testimonials.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  const swiperRef = useRef(null);

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
  };

  return (
    <section className="flex flex-col items-start px-4 md:px-8 lg:px-18 mt-8  w-screen">
      <WelcomeBanner
        text="TESTIMONIALS"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-lg mt-10 mb-5"
      />
      <div className="flex w-full justify-between items-center md:mb-18 mb-8">
        <h3 className="text-xl md:text-3xl font-extrabold text-[#1A0142] leading-tight">
          Our Patients Say About Us
        </h3>
        <div className="flex gap-4">
          <button
            aria-label="Previous"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#1F5FFF] flex items-center justify-center text-white text-xl md:text-2xl shadow-lg hover:bg-[#4B00B4] transition-colors"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            type="button"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            aria-label="Next"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#1F5FFF] flex items-center justify-center text-white text-xl md:text-2xl shadow-lg hover:bg-[#4B00B4] transition-colors"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            type="button"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      <div className="w-full ">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          loop={true}
          breakpoints={breakpoints}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx} className="!flex !justify-center">
              <div className="w-full border border-gray-200 rounded-2xl px-6 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                {/* Header with name, role, and rating */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#04CE78] to-[#1F5FFF] rounded-full flex items-center justify-center shadow-md">
                      <span className="text-lg font-bold text-white">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1A0142]">
                        {t.name}
                      </h3>
                      <p className="text-sm text-[#555555] font-medium">
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 16 15"
                        fill="none"
                      >
                        <path
                          d="M7.524.464a.5.5 0 0 1 .952 0l1.432 4.41a.5.5 0 0 0 .476.345h4.637a.5.5 0 0 1 .294.904L11.563 8.85a.5.5 0 0 0-.181.559l1.433 4.41a.5.5 0 0 1-.77.559L8.294 11.65a.5.5 0 0 0-.588 0l-3.751 2.726a.5.5 0 0 1-.77-.56l1.433-4.41a.5.5 0 0 0-.181-.558L.685 6.123A.5.5 0 0 1 .98 5.22h4.637a.5.5 0 0 0 .476-.346z"
                          fill="#FFB703"
                        />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Testimonial text with quote icon */}
                <div className="relative">
                  <div className="absolute -top-2 -left-2 text-[#04CE78] text-2xl opacity-20">
                    "
                  </div>
                  <p className="text-[#555555] text-sm leading-relaxed pl-4">
                    {t.testimonial}
                  </p>
                </div>

                {/* Bottom quote icon */}
                <div className="flex justify-end mt-3">
                  <div className="text-[#04CE78] text-2xl opacity-20">
                    "
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
