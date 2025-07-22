"use client";
import React from "react";
import WelcomeBanner from "../layout/WelcomeBanner";
import testimonials from "../../data/testimonials.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Testimonials = () => (
  <div className="flex flex-col items-center md:mb-8 md:mt-20 mt-8 mb-4 gap-8 px-[65px]">
    <WelcomeBanner
      text="TESTIMONIALS"
      textColor="#04CE78"
      dotColor="#04CE78"
      alignment="center"
      className="text-xl"
    />
    <p className="md:text-4xl text-2xl text-blue-950 font-bold text-center">
      Our Patients Say About Us
    </p>

    {/* Responsive Card Container */}
    {testimonials.length === 0 ? (
      <div className="text-center text-gray-500 py-10">
        No testimonials available.
      </div>
    ) : (
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="w-full h-auto" // ✅ Ensure height is set
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx} className="flex items-center justify-center">
            <div className="w-full md:w-[636px] h-auto md:h-[258px] border border-black rounded-3xl p-6 md:p-4 shadow-md flex flex-col md:flex-row gap-6 bg-white">
              <img
                src={t.image}
                alt={t.name}
                className="w-full md:w-60 h-56 rounded-xl object-cover"
              />
              <div className="flex flex-col justify-between flex-1 relative">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {t.name}
                      </h3>
                      <p className="text-gray-500">{t.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg
                          key={i}
                          width="16"
                          height="15"
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
                  <p className="text-gray-600 leading-relaxed">
                    {t.testimonial}
                  </p>
                </div>
                <div className="absolute bottom-0 right-0">
                  <svg
                    width="44"
                    height="40"
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
    )}
  </div>
);

export default Testimonials;
