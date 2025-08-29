"use client";
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Award, Users, GraduationCap, Languages, BookOpen, Trophy } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const DoctorsSwiper = ({ doctors = [], title = "Top-rated cardiologists worldwide" }) => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };

  const totalSlides = Math.ceil(doctors.length / 2);
  const showNavigation = doctors.length > 2;

  // If no doctors are available, show a message instead of the swiper
  if (!doctors || doctors.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-gray-500 text-lg mb-2">
            No specific doctors are currently mapped to this treatment
          </div>
          <p className="text-gray-400 text-sm">
            We're working on connecting you with the best specialists. Please contact us for doctor recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {showNavigation && (
          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600"
              aria-label="Previous doctors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600"
              aria-label="Next doctors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={24}
          loop={true}
          navigation={false}
          onSlideChange={handleSlideChange}
          allowTouchMove={true}
          breakpoints={breakpoints}
          className="doctors-swiper"
        >
          {doctors.map((doctor, index) => (
            <SwiperSlide key={doctor.id || index}>
              <div className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                {/* Header with Image and Basic Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 items-center justify-center text-white">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{doctor.name}</h4>
                    <p className="text-xs text-blue-600 font-medium mb-1">{doctor.specialty}</p>
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{doctor.location}</p>
                    </div>
                    {doctor.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-semibold text-gray-800">{doctor.rating}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {doctor.experience && (
                    <div className="flex items-center gap-2 text-xs">
                      <Award className="w-3 h-3 text-green-600" />
                      <span className="text-gray-700">{doctor.experience}</span>
                    </div>
                  )}
                  {doctor.patientsTreated && (
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="w-3 h-3 text-blue-600" />
                      <span className="text-gray-700">{doctor.patientsTreated}</span>
                    </div>
                  )}
                  {doctor.successRate && (
                    <div className="flex items-center gap-2 text-xs">
                      <Star className="w-3 h-3 text-yellow-600" />
                      <span className="text-gray-700">{doctor.successRate}</span>
                    </div>
                  )}
                  {doctor.hospital && (
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="w-3 h-3 text-purple-600" />
                      <span className="text-gray-700 line-clamp-1">{doctor.hospital}</span>
                    </div>
                  )}
                </div>

                {/* Education and Certifications */}
                {doctor.education && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <GraduationCap className="w-3 h-3 text-indigo-600" />
                      <span className="font-medium text-gray-700">Education</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {Array.isArray(doctor.education) ? (
                        doctor.education.slice(0, 2).map((edu, idx) => (
                          <div key={idx} className="line-clamp-1">
                            {typeof edu === 'object' && edu.institution ?
                              `${edu.institution} - ${edu.degree}` :
                              String(edu)
                            }
                          </div>
                        ))
                      ) : (
                        <div className="line-clamp-1">{String(doctor.education)}</div>
                      )}
                      {Array.isArray(doctor.education) && doctor.education.length > 2 && (
                        <div className="text-gray-500 text-xs">+{doctor.education.length - 2} more</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {doctor.languages && doctor.languages.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <Languages className="w-3 h-3 text-orange-600" />
                      <span className="font-medium text-gray-700">Languages</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.slice(0, 3).map((lang, idx) => (
                        <span key={idx} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                          {lang}
                        </span>
                      ))}
                      {doctor.languages.length > 3 && (
                        <span className="text-xs text-gray-500">+{doctor.languages.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Research and Awards */}
                <div className="grid grid-cols-2 gap-3">
                  {doctor.researchPapers && (
                    <div className="flex items-center gap-2 text-xs">
                      <BookOpen className="w-3 h-3 text-green-600" />
                      <span className="text-gray-700 line-clamp-1">{doctor.researchPapers}</span>
                    </div>
                  )}
                  {doctor.awards && doctor.awards.length > 0 && (
                    <div className="flex items-center gap-2 text-xs">
                      <Trophy className="w-3 h-3 text-yellow-600" />
                      <span className="text-gray-700 line-clamp-1">{doctor.awards[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DoctorsSwiper; 