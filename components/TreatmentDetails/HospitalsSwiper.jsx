"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, MapPin, Award, Users, CheckCircle, Globe, Shield, ExternalLink } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const HospitalsSwiper = ({ hospitals = [], title = "Best cardiology hospitals worldwide" }) => {
  const swiperRef = useRef(null);

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

  return (
    <div className="mb-8">
      {/* Mobile Layout - Centered */}
      <div className="flex flex-col items-center mb-6 md:hidden">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="flex gap-3">
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="w-12 h-12 rounded-full border-2 border-[#1F5FFF] hover:border-[#4B00B4] bg-white hover:bg-[#1F5FFF] flex items-center justify-center text-[#1F5FFF] hover:text-white shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Previous hospitals"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="w-12 h-12 rounded-full border-2 border-[#1F5FFF] hover:border-[#4B00B4] bg-white hover:bg-[#1F5FFF] flex items-center justify-center text-[#1F5FFF] hover:text-white shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Next hospitals"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop/Laptop Layout - Original */}
      <div className="hidden md:flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="flex gap-3">
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="w-12 h-12 rounded-full border-2 border-[#1F5FFF] hover:border-[#4B00B4] bg-white hover:bg-[#1F5FFF] flex items-center justify-center text-[#1F5FFF] hover:text-white shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Previous hospitals"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="w-12 h-12 rounded-full border-2 border-[#1F5FFF] hover:border-[#4B00B4] bg-white hover:bg-[#1F5FFF] flex items-center justify-center text-[#1F5FFF] hover:text-white shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Next hospitals"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={24}
          loop={true}
          breakpoints={breakpoints}
          className="hospitals-swiper"
        >
          {hospitals.map((hospital, index) => (
            <SwiperSlide key={hospital.id || index}>
              <div className="group bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border border-gray-100 h-full flex flex-col">
                <div className="relative">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 items-center justify-center text-white">
                    <Award className="w-12 h-12" />
                  </div>
                  {hospital.rating && (
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-semibold text-gray-800">{hospital.rating}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">{hospital.name}</h4>
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500">{hospital.location}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {hospital.patientsPerYear && (
                      <div className="flex items-center gap-2 text-xs">
                        <Users className="w-3 h-3 text-blue-600" />
                        <span className="text-gray-700">{hospital.patientsPerYear}</span>
                      </div>
                    )}
                    {hospital.successRate && (
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="text-gray-700">{hospital.successRate}</span>
                      </div>
                    )}
                    {hospital.internationalPatients && (
                      <div className="flex items-center gap-2 text-xs">
                        <Globe className="w-3 h-3 text-purple-600" />
                        <span className="text-gray-700 line-clamp-1">{hospital.internationalPatients}</span>
                      </div>
                    )}
                    {hospital.accreditations && hospital.accreditations.length > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <Shield className="w-3 h-3 text-indigo-600" />
                        <span className="text-gray-700">{hospital.accreditations.length} accreditations</span>
                      </div>
                    )}
                  </div>

                  {/* Languages */}
                  {hospital.languages && hospital.languages.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 font-medium mb-1">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {hospital.languages.slice(0, 3).map((lang, idx) => (
                          <span key={idx} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            {lang}
                          </span>
                        ))}
                        {hospital.languages.length > 3 && (
                          <span className="text-xs text-gray-500">+{hospital.languages.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Specialties */}
                  {hospital.specialties && hospital.specialties.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 font-medium mb-1">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.slice(0, 3).map((specialty, idx) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                        {hospital.specialties.length > 3 && (
                          <span className="text-xs text-gray-500">+{hospital.specialties.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Facilities */}
                  {hospital.facilities && hospital.facilities.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 font-medium mb-1">Facilities:</p>
                      <div className="flex flex-wrap gap-1">
                        {hospital.facilities.slice(0, 2).map((facility, idx) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {facility}
                          </span>
                        ))}
                        {hospital.facilities.length > 2 && (
                          <span className="text-xs text-gray-500">+{hospital.facilities.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <div className="mt-auto pt-3">
                    <Link
                      href={`/hospitalDetails/${hospital.id}`}
                      className="w-full bg-[#04CE78] hover:bg-green-600 text-white text-xs font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HospitalsSwiper; 