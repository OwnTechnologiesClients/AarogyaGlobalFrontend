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
    <section className="flex flex-col items-start px-4 md:px-8 lg:px-18 md:py-20 py-8 w-screen bg-[#F5F7FA]">
      <WelcomeBanner
        text="AAROGYA TEAM"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-xl font-semibold"
      />
      <div className="flex w-full justify-between items-center md:mb-28 mb-8 ">
        <h3 className="text-xl md:text-5xl font-extrabold text-[#1A0142] leading-tight">
          Founding Team / Directors
        </h3>
        <div className="flex gap-4">
          <button
            aria-label="Previous"
            className="md:w-14 md:h-14 rounded-full bg-[#1F5FFF] flex items-center justify-center text-white md:text-2xl shadow-lg hover:bg-[#4B00B4] transition-colors"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            type="button"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            aria-label="Next"
            className="md:w-14 md:h-14 rounded-full bg-[#1F5FFF] flex items-center justify-center text-white md:text-2xl shadow-lg hover:bg-[#4B00B4] transition-colors"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            type="button"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
      <div className="w-full">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          breakpoints={breakpoints}
        >
          {teamData.map((member, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center  bg-white rounded-3xl  md:p-6 h-[230px] w-[230px] md:h-[445px] md:w-[330px]">
                <div className=" md:w-[280px] md:h-[248px] w-[200px] h-[200px] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={267}
                    height={241}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col items-start md:mt-6">
                  <h3 className="text-2xl font-bold text-[#1A0142] ">
                    {member.name}
                  </h3>
                  <p className="text-base text-gray-500 ">{member.role}</p>
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
