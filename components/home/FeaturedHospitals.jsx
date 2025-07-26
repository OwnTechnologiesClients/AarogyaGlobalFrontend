"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  User,
  ArrowRight,
} from "lucide-react";
import hospitals from "@/data/featuredHospitals.json";
import WelcomeBanner from "../layout/WelcomeBanner";
import Link from "next/link";

const FeaturedHospitals = () => {
  const swiperRef = React.useRef(null);

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
      slidesPerView: 3,
      spaceBetween: 16,
    },
  };

  return (
    <section className="flex flex-col items-start px-4 md:px-8 lg:px-18 py-8 w-screen bg-white">
      <WelcomeBanner
        text="HOSPITAL DIRECTORY"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-lg mt-20 mb-5"
      />
      <div className="flex w-full justify-between items-center md:mb-28 mb-8">
        <h3 className="text-2xl md:text-4xl font-extrabold text-[#1A0142] leading-tight">
          Aarogya Global Featured Hospitals
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
              <div className="flex flex-col rounded-2xl border-2 border-[#000D4440] shadow-sm bg-white overflow-hidden h-full min-h-[580px]">
                {/* Image Section with Padding */}
                <div className="relative w-full px-5 pt-5 mb-6">
                  <div className="relative w-full h-[370px] rounded-2xl overflow-hidden">
                    <Image
                      src={hospital.image}
                      alt={hospital.name}
                      fill
                      className="object-cover rounded-2xl"
                    />
                    <span
                      className="absolute bottom-4 left-4 px-5 py-2 rounded-md text-white text-lg font-semibold"
                      style={{ background: hospital.typeColor }}
                    >
                      {hospital.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-5 pt-6 pb-10">
                  {/* Ratings */}
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={25}
                        fill="#FFC700"
                        color="#FFC700"
                        strokeWidth={0}
                      />
                    ))}
                    <span className="ml-2 text-lg text-[#555555]">
                      {hospital.ratingCount} Rating
                    </span>
                  </div>

                  {/* Hospital Name */}
                  <h3 className="text-xl font-bold text-[#1A0142] mb-6">
                    {hospital.name}
                  </h3>

                  {/* Location & Doctor Count */}
                  <div className="flex items-center gap-4 text-sm mb-6">
                    <span className="flex items-center gap-1  text-[#555555] text-lg">
                      <MapPin size={25} className="text-[#000D44]" /> {hospital.location}
                    </span>
                    <span className="flex items-center gap-1 text-[#555555] text-lg">
                      <User size={25} className="text-[#000D44]"/> {hospital.doctorCount} Doctors
                    </span>
                  </div>
 
                  <hr className="border-t-2 border-gray-200" />

                  {/* CTA Button */}
                  <div className="mt-auto pt-4">
                    <Link
                      href={hospital.cta.href}
                      className="inline-flex items-center gap-2 p-5 rounded-xl bg-[#F5F7FA] text-[#1F5FFF] font-semibold text-lg transition-all group"
                    >
                      {hospital.cta.label || "Book Today"}
                      <ArrowRight
                        size={20}
                        strokeWidth={2.2}
                        className="transition-transform duration-200  group-hover:translate-x-1"
                      />
                    </Link>
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
