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
              <div className="w-full  border border-black rounded-3xl px-6 py-6 shadow-md flex flex-col md:flex-row gap-6 bg-white">

                <div className="relative w-full md:w-60 h-55 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center border border-blue-200">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 font-semibold">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {t.role}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#000D44] mb-3">
                          {t.name}
                        </h3>
                        <p className="text-[#555555] text-xl">{t.role}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <svg
                            key={i}
                            width="20"
                            height="20"
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
                    <p className="text-[#555555] text-sm font-normal leading-relaxed ">
                      {t.testimonial}
                    </p>
                  </div>

                  {/* Instead of absolute, use flex self-end */}
                  <div className="flex justify-end mt-4">
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 44 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.172 5.469q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 26.539 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.923-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203m-20.625 0q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 5.914 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.922-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203"
                        fill="#2563EB"
                      />
                    </svg>
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
