"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  Stethoscope,
  Heart,
} from "lucide-react";
import apiService from "@/lib/apiService";
import WelcomeBanner from "../layout/WelcomeBanner";

const FeaturedHospitals = () => {
  const swiperRef = React.useRef(null);
  const router = useRouter();

  // Fetch top hospitals from backend
  const [hospitals, setHospitals] = React.useState([]);
  React.useEffect(() => {
    let isMounted = true;
    const fetchHospitals = async () => {
      try {
        const res = await apiService.getHospitals({ limit: 50 });
        const list = Array.isArray(res?.data) ? res.data : [];
        // Filter to only show active hospitals
        const activeList = list.filter(h => h.isActive !== false);
        const sorted = activeList
          .slice()
          .sort((a, b) => {
            const ratingA = typeof a.rating === 'object' ? (a.rating?.googleRating || a.rating?.userScore || 0) : (parseFloat(a.rating) || 0);
            const ratingB = typeof b.rating === 'object' ? (b.rating?.googleRating || b.rating?.userScore || 0) : (parseFloat(b.rating) || 0);
            return ratingB - ratingA;
          })
          .map(h => ({
            ...h,
            type: 'Hospital',
            typeColor: '#04CE78',
            hasEmergency: true,
            hasParkade: true,
          }));
        if (isMounted) setHospitals(sorted);
      } catch (e) {
        if (isMounted) setHospitals([]);
      }
    };
    fetchHospitals();
    return () => { isMounted = false; };
  }, []);

  const handleHospitalClick = (hospitalId) => {
    router.push(`/hospitalDetails/${hospitalId}`);
  };

  // Responsive breakpoints for Swiper - hospital search card style

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 28,
    },
  };

  return (
    <section className="flex flex-col items-start px-4 md:px-8 lg:px-18 py-6 w-screen bg-gray-50">
      <WelcomeBanner
        text="HOSPITAL DIRECTORY"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-base mt-6 mb-4"
      />
      {/* Mobile Layout - Centered */}
      <div className="flex flex-col items-center md:mb-8 mb-4 md:hidden">
        <h3 className="text-xl font-extrabold text-[#1A0142] leading-tight mb-6">
          Aarogya Global Featured Hospitals
        </h3>

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
      </div>

      {/* Desktop/Laptop Layout - Original */}
      <div className="hidden md:flex w-full justify-between items-center md:mb-8 mb-4">
        <h3 className="text-xl md:text-3xl font-extrabold text-[#1A0142] leading-tight">
          Aarogya Global Featured Hospitals
        </h3>

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
      </div>

      <div className="w-full">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={28}
          loop={true}
          breakpoints={breakpoints}
        >
          {hospitals.map((hospital, idx) => (
            <SwiperSlide key={hospital.id}>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-200 mx-2 my-4">
                {/* Hospital Image */}
                <div className="relative h-48 overflow-hidden">
                  {apiService.getImageUrl(hospital.displayImage || hospital.gallery?.[0]) ? (
                    <Image
                      src={apiService.getImageUrl(hospital.displayImage || hospital.gallery?.[0])}
                      alt={`${hospital.name} image`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </div>

                {/* Hospital Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className="text-white text-md font-bold px-3 py-2 rounded-md"
                      style={{ backgroundColor: hospital.typeColor || '#04CE78' }}
                    >
                      {hospital.type || 'Hospital'}
                    </span>
                    <div className="flex items-center text-gray-600 text-base">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="font-semibold">
                        {typeof hospital.rating === 'object' 
                          ? hospital.rating?.googleRating || hospital.rating?.userScore || 'N/A'
                          : hospital.rating || 'N/A'
                        }
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3">{hospital.name}</h3>

                  <p className="text-gray-600 text-sm mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    {hospital.location}
                  </p>

                  {/* Hospital Details */}
                  <div className="space-y-3 mb-6">
                    {/* Patients Per Year & Success Rate */}
                    <div className="flex items-center justify-between text-gray-600 text-sm">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium mr-2">Patients:</span>
                        <span>{hospital.patientsPerYear || 'N/A'}</span>
                      </div>
                      {/* <div className="text-green-600 font-semibold">
                        {hospital.successRate || 'N/A'} Success Rate
                      </div> */}
                    </div>

                    {hospital.specialties && hospital.specialties.length > 0 && (
                      <div className="flex items-start text-gray-600 text-sm">
                        <Heart className="w-4 h-4 mr-2 text-red-500 mt-0.5" />
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

                    {/* Accreditations */}
                    {hospital.accreditations && hospital.accreditations.length > 0 && (
                      <div className="flex items-start text-gray-600 text-sm">
                        <Stethoscope className="w-4 h-4 mr-2 text-purple-500 mt-0.5" />
                        <div>
                          <span className="font-medium mr-2">Accreditations:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {hospital.accreditations.slice(0, 3).map((accreditation, index) => (
                              <span
                                key={index}
                                className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                              >
                                {accreditation}
                              </span>
                            ))}
                            {hospital.accreditations.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{hospital.accreditations.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Facilities */}
                    <div className="flex flex-wrap gap-2">
                      {hospital.hasEmergency && (
                        <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                          Emergency
                        </span>
                      )}
                      {hospital.hasParkade && (
                        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                          Parking
                        </span>
                      )}
                      {hospital.facilities && hospital.facilities.slice(0, 2).map((facility, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => handleHospitalClick(hospital.id)}
                      className="w-full text-center text-indigo-600 flex items-center justify-center space-x-2 hover:text-indigo-800 bg-indigo-100 hover:bg-indigo-200 rounded-lg p-3 transition-colors duration-200 cursor-pointer"
                    >
                      <span className="font-semibold">View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* View All Button Section */}
      <div className="w-full flex justify-center items-center mt-8">
        <button
          onClick={() => router.push('/hospitalSearch')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-base rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
        >
          View All Hospitals
          <ArrowRight size={18} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
};

export default FeaturedHospitals;
