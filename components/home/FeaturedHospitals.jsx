"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, Star, MapPin, User } from "lucide-react";
import hospitals from "@/data/featuredHospitals.json";
import WelcomeBanner from "../layout/WelcomeBanner";

const FeaturedHospitals = () => {
  const swiperRef = React.useRef(null);

  // Responsive breakpoints for Swiper
  const breakpoints = {
    640: {
      slidesPerView: 1.2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  };

  return (
    <section className="flex flex-col items-start px-4 md:px-8 lg:px-18 py-8 w-screen bg-white">
      <WelcomeBanner text="HOSPITAL DIRECTORY"
      />
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A0142] mb-8 w-full">
        Aarogya Global Featured Hospitals
      </h2>
      <div className="flex w-full justify-end items-center mb-4 gap-4">
        <button
          aria-label="Previous"
          className="w-14 h-14 rounded-full bg-[#6C2EFF] flex items-center justify-center text-white text-2xl shadow-lg hover:bg-[#4B00B4] transition-colors"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          type="button"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          aria-label="Next"
          className="w-14 h-14 rounded-full bg-[#6C2EFF] flex items-center justify-center text-white text-2xl shadow-lg hover:bg-[#4B00B4] transition-colors"
          onClick={() => swiperRef.current?.swiper.slideNext()}
          type="button"
        >
          <ChevronRight size={32} />
        </button>
      </div>
      <div className="w-full">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          breakpoints={breakpoints}
        >
          {hospitals.map((hospital, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col rounded-3xl border border-[#E5E5E5] shadow-sm bg-white p-0 overflow-hidden h-full min-h-[540px]">
                <div className="relative w-full h-[220px] md:h-[220px]">
                  <Image
                    src={hospital.image}
                    alt={hospital.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-3xl"
                  />
                  <span
                    className="absolute left-6 bottom-6 px-5 py-2 rounded-lg text-white text-lg font-medium"
                    style={{ background: hospital.typeColor }}
                  >
                    {hospital.type}
                  </span>
                </div>
                <div className="flex flex-col flex-1 px-8 pt-6 pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={22} fill="#FFC700" color="#FFC700" strokeWidth={0} />
                    ))}
                    <span className="ml-2 text-lg font-semibold text-[#1A0142]">
                      {hospital.ratingCount}+ Rating
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-2xl font-extrabold text-[#1A0142] mb-2">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center gap-4 text-[#6B6B6B] text-lg mb-6">
                    <span className="flex items-center gap-1">
                      <MapPin size={20} /> {hospital.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={20} /> {hospital.doctorCount} Doctors
                    </span>
                  </div>
                  <div className="mt-auto pt-4">
                    <a
                      href={hospital.cta.href}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white border border-[#F2F2F2] text-[#6C2EFF] font-bold text-lg shadow-md hover:bg-[#F6F6FF] transition-colors"
                    >
                      {hospital.cta.label}
                      <ChevronRight size={22} />
                    </a>
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

export default FeaturedHospitals;
