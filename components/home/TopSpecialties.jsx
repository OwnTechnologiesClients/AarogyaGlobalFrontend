"use client";
import React from "react";
import specialties from "@/data/topSpecialties.json";
import {
  Bone,
  HeartPulse,
  Stethoscope,
  Brain,
  Baby,
} from "lucide-react";
import WelcomeBanner from "../layout/WelcomeBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ICON_MAP = {
  Orthopaedics: Bone,
  Cardiology: HeartPulse,
  Neurology: Brain,
  Oncology: Stethoscope,
  Gynaecology: Baby
};

const TopSpecialties = () => {
  const swiperRef = React.useRef(null);

  // Responsive breakpoints for Swiper
  const breakpoints = {
    640: {
      slidesPerView: 2.2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
  };

  return (
    <section className="flex flex-col items-start px-4 md:px-8 lg:px-18  w-screen bg-[#F5F7FA]">
      <WelcomeBanner
        text="CATEGORIES"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-xl font-semibold mt-40 mb-5"
      />
      <div className="flex w-full justify-between items-center mb-4">
        <h3 className="text-3xl md:text-5xl font-extrabold text-[#1A0142] leading-tight">
          Top Searched Specialities
        </h3>
        <div className="flex gap-4">
          <button
            aria-label="Previous"
            className="w-14 h-14 rounded-full bg-[#1F5FFF] flex items-center justify-center text-white text-2xl shadow-lg hover:bg-[#4B00B4] transition-colors"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            type="button"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            aria-label="Next"
            className="w-14 h-14 rounded-full bg-[#1F5FFF] flex items-center justify-center text-white text-2xl shadow-lg hover:bg-[#4B00B4] transition-colors"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            type="button"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      <div className="w-full rounded-3xl p-4 md:p-6">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={1.2}
          spaceBetween={16}
          loop={true}
          breakpoints={breakpoints}
          className=""
        >
          {specialties.map((spec, idx) => {
            const LucideIcon = ICON_MAP[spec.label] || Bone;
            return (
              <SwiperSlide key={idx}>
                <div
                  className=" flex flex-col items-center text-center bg-white rounded-3xl p-6 "
                >
                  <div
                    className="flex items-center justify-center rounded-full mb-6"
                    style={{
                      backgroundColor: spec.color,
                      width: 120,
                      height: 120,
                    }}
                  >
                    {spec.icon.startsWith('/') ? (
                      <img 
                        src={spec.icon} 
                        alt={spec.label}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <LucideIcon
                        size={64}
                        strokeWidth={2.8}
                        color="#1A0142"
                        className="w-[64px] h-[64px]"
                      />
                    )}
                  </div>
                  <span className="font-extrabold text-xl md:text-2xl text-[#1A0142]">
                    {spec.label}
                  </span>
                  <span className="text-[#6B6B6B] text-base md:text-lg mt-2">
                    {spec.count} Listing{spec.count > 1 ? "s" : ""}
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default TopSpecialties;
