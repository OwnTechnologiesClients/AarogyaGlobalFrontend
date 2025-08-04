"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import dataService from '@/lib/dataService';

const RelatedSpecialists = ({ currentDoctorId }) => {
  const router = useRouter();
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get current doctor and related doctors using dataService
    const currentDoctor = dataService.getDoctorById(currentDoctorId);
    if (currentDoctor) {
      // Get all doctors from all specialties
      const allDoctors = [];
      for (const specialty of Object.values(dataService.data.specialties)) {
        allDoctors.push(...(specialty.doctors || []));
      }
      allDoctors.push(...(dataService.data.globalDoctors || []));
      
      // Filter related doctors from the same specialty
      const related = allDoctors
        .filter(d => d.id !== currentDoctorId && d.specialty === currentDoctor.specialty)
        .slice(0, 6);

      // If no related doctors found, show all other doctors
      const doctors = related.length > 0 ? related : allDoctors.filter(d => d.id !== currentDoctorId).slice(0, 6);
      setRelatedDoctors(doctors);
    }
    setLoading(false);
  }, [currentDoctorId]);

  const swiperRef = useRef(null);

  const handleDoctorClick = (doctorId) => {
    router.push(`/doctorDetails/${doctorId}`);
  };

  // Helper function to create unique keys
  const createUniqueKey = (doctor, index) => {
    return `${doctor.id}-${doctor.name?.replace(/\s+/g, '-')}-${doctor.specialty?.replace(/\s+/g, '-')}-${index}`;
  };

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

  if (loading) {
    return (
      <div className="w-full h-[1px] bg-gray-400/40 rounded-full my-6" />
    );
  }

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
            {relatedDoctors.map((doctor, idx) => (
              <SwiperSlide key={createUniqueKey(doctor, idx)}>
                <div 
                  className="flex flex-col items-center bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-xs mx-auto mb-8 cursor-pointer"
                  onClick={() => handleDoctorClick(doctor.id)}
                >
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
                      {doctor.specialty}
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
