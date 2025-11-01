"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, MapPin, Heart, Stethoscope, ArrowRight } from 'lucide-react';
import apiService from '../../lib/apiService';
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

  // If no hospitals are available, show a message instead of the swiper
  if (!hospitals || hospitals.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-gray-500 text-lg mb-2">
            No specific hospitals are currently mapped to this treatment
          </div>
          <p className="text-gray-400 text-sm">
            We're working on connecting you with the best hospitals. Please contact us for hospital recommendations.
          </p>
        </div>
      </div>
    );
  }

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
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                {/* Hospital Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={apiService.getImageUrl(hospital.displayImage || hospital.gallery?.[0]) || ''}
                    alt={`${hospital.name} image`}
                    className="w-full h-full object-cover"
                  />
                  {/* Rating Overlay */}
                  {hospital.rating && (
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-800">
                        {typeof hospital.rating === 'object'
                          ? (hospital.rating.googleRating ?? hospital.rating.userScore ?? 'N/A')
                          : (hospital.rating ?? 'N/A')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Hospital Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{hospital.name}</h3>

                  <p className="text-gray-600 text-sm mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    {hospital.location}
                  </p>

                  {/* Hospital Details */}
                  <div className="space-y-3 mb-6 flex-1">
                    {hospital.specialties && hospital.specialties.length > 0 && (
                      <div className="flex items-start text-gray-600 text-sm">
                        <div>
                          <span className="font-medium mr-2">Specialties:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {hospital.specialties.slice(0, 3).map((specialty, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                              >
                                {typeof specialty === 'object' ? specialty.name : specialty}
                              </span>
                            ))}
                            {hospital.specialties.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{hospital.specialties.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Facilities */}
                    {hospital.hospitalFeatures && hospital.hospitalFeatures.length > 0 && (
                      <div className="flex items-start text-gray-600 text-sm">
                        <div>
                          <span className="font-medium mr-2">Facilities:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {hospital.hospitalFeatures.slice(0, 2).map((feature, index) => (
                              <span
                                key={index}
                                className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full"
                              >
                                {typeof feature === 'object' ? feature.name : feature}
                              </span>
                            ))}
                            {hospital.hospitalFeatures.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{hospital.hospitalFeatures.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* View Details Button */}
                  <div className="mt-auto">
                    <Link
                      href={`/hospitalDetails/${hospital.id}`}
                      className="w-full bg-[#04CE78] hover:bg-green-600 text-white flex items-center justify-center space-x-2 rounded-lg p-3 transition-all duration-300 cursor-pointer font-semibold"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
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