"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dataService from "@/lib/dataService";
import { Bone, HeartPulse, Stethoscope, Brain, Baby } from "lucide-react";
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
  Gynaecology: Baby,
};

const TopSpecialties = () => {
  const swiperRef = React.useRef(null);
  const [isClient, setIsClient] = useState(false);
  const specialties = dataService.getAllSpecialties();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Responsive breakpoints for Swiper
  const breakpoints = {
    320: {
      slidesPerView: 1.1,
      spaceBetween: 12,
    },
    640: {
      slidesPerView: 2.2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
  };

  const renderSpecialtyCard = (spec, idx, isSwiper = true) => {
    const LucideIcon = ICON_MAP[spec.label] || Bone;
    const CardWrapper = isSwiper ? SwiperSlide : "div";

    return (
      <CardWrapper key={idx}>
        <Link href={`/specialties/${spec.slug}`}>
          <div className="flex flex-col items-center text-center bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer w-full max-w-xs mx-auto mb-8 h-[320px]">
            <div
              className="flex items-center justify-center rounded-full mb-4 md:mb-6 flex-shrink-0"
              style={{
                backgroundColor: spec.color,
                width: 120,
                height: 120,
              }}
            >
              {spec.icon.startsWith("/") ? (
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
            <div className="flex flex-col items-center w-full flex-1 justify-between min-h-0">
              <div className="w-full">
                <h4 className="text-lg md:text-xl font-extrabold text-[#1A0142] w-full text-center mb-2">
                  {spec.label}
                </h4>
                {/* <p className="text-sm md:text-base text-[#6B6B6B] mb-2 w-full text-center">
                  {spec.count} Listing{spec.count > 1 ? "s" : ""}
                </p> */}
                <p className="text-sm md:text-base text-[#04CE78] font-medium w-full text-center line-clamp-3 leading-relaxed">
                  {spec.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </CardWrapper>
    );
  };

  return (
    <section className="flex flex-col items-start px-4 md:px-8 lg:px-18 w-screen pt-32 pb-16 bg-[#F5F7FA]">
      <WelcomeBanner
        text="CATEGORIES"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-lg"
      />
      <div className="flex w-full justify-between items-center mb-4">
        <h3 className="text-xl md:text-3xl font-extrabold text-[#1A0142] leading-tight">
          Top Searched Specialities
        </h3>
        {isClient && (
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
        )}
      </div>

      <div className="w-full rounded-3xl p-4 md:p-6">
        {isClient ? (
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            slidesPerView={1.1}
            spaceBetween={12}
            loop={true}
            breakpoints={breakpoints}
            className=""
          >
            {specialties.map((spec, idx) =>
              renderSpecialtyCard(spec, idx, true)
            )}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {specialties.map((spec, idx) =>
              renderSpecialtyCard(spec, idx, false)
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopSpecialties;
