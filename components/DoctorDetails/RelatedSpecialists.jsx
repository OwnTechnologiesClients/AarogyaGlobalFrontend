"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

// Dummy doctor data (from public/RelatedSpecialists/)
const doctors = [
  {
    name: "Dr. Robert Schrock",
    role: "Cardiologist",
    image: "/RelatedSpecialists/img1.png",
  },
  {
    name: "Dr. Patrick Smith",
    role: "Neurosurgery",
    image: "/RelatedSpecialists/img2.png",
  },
  {
    name: "Dr. Patrick Smith",
    role: "Neurology",
    image: "/RelatedSpecialists/img3.png",
  },
  {
    name: "Dr. Brenton Ottinger",
    role: "Dentistry",
    image: "/RelatedSpecialists/img4.png",
  },
  {
    name: "Dr. Patrick Smith",
    role: "Neurology",
    image: "/RelatedSpecialists/img3.png",
  },
  {
    name: "Dr. Brenton Ottinger",
    role: "Dentistry",
    image: "/RelatedSpecialists/img4.png",
  },
];

const RelatedSpecialists = () => {
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
    <>
      <div className="w-full h-[1px] bg-gray-400/40 rounded-full my-6" />

      <section className="overflow-hidden py-12 ">
        <div className="px-4 md:px-8 lg:px-16 mx-auto w-full max-w-screen-xl">
          {/* Title Row */}
          <div className="flex justify-between items-center mb-8 pb-4">
            <h3 className="text-2xl md:text-4xl font-extrabold text-[#000D44]">
              Related Specialists
            </h3>
            <div className="flex gap-4">
              <button
                aria-label="Previous"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1F5FFF] flex items-center justify-center text-white hover:bg-[#4B00B4] transition-colors"
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                type="button"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                aria-label="Next"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1F5FFF] flex items-center justify-center text-white hover:bg-[#4B00B4] transition-colors"
                onClick={() => swiperRef.current?.swiper.slideNext()}
                type="button"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Swiper Slider */}
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            slidesPerView={1.1}
            spaceBetween={12}
            loop={true}
            breakpoints={breakpoints}
          >
            {doctors.map((doctor, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col items-center bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-xs mx-auto mb-8">
                  {/* Image */}
                  <div className="w-full h-[180px] md:h-[220px] rounded-2xl overflow-hidden mb-4 md:mb-6">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={260}
                      height={340}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Name & Role */}
                  <div className="flex flex-col items-start w-full mt-2 md:mt-4">
                    <h4 className="text-lg md:text-xl font-extrabold text-[#000D44]">
                      {doctor.name}
                    </h4>
                    <p className="text-sm md:text-base text-[#555555]">
                      {doctor.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default RelatedSpecialists;
