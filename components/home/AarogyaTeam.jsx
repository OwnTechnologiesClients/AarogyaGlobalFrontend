"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import WelcomeBanner from "../layout/WelcomeBanner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import teamData from "../../data/aarogyateam.json";

const AarogyaTeam = () => {
  const swiperRef = useRef(null);

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
      slidesPerView: 4,
      spaceBetween: 16,
    },
  };

  return (
    <section className="flex flex-col items-start px-4 md:px-8 lg:px-18 mt-40  w-screen bg-[#F5F7FA]">
      <WelcomeBanner
        text="AAROGYA TEAM"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-xl font-semibold mt-40 mb-5"
      />
      <div className="flex w-full justify-between items-center md:mb-28 mb-8">
        <h3 className="text-xl md:text-5xl font-extrabold text-[#1A0142] leading-tight">
          Founding Team / Directors
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

      <div className="w-full px-10 mb-20">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={1.1}
          spaceBetween={12}
          loop={true}
          breakpoints={breakpoints}
        >
          {teamData.map((member, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center  bg-white rounded-3xl p-6 h-auto md:h-[538px] mx-auto ">
                {/* Image Container */}
                <div className="w-full h-[180px] md:h-[300px] rounded-2xl overflow-hidden mb-4 md:mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={267}
                    height={350}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-start w-full mt-2 md:mt-6">
                  <h3 className="text-base md:text-3xl mb-6 font-bold text-[#1A0142]">
                    {member.name}
                  </h3>
                  <p className="text-sm md:text-xl text-[#555555]">
                    {member.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AarogyaTeam;
