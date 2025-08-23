"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CertificateSwiper = ({
  certificates = [],
  showNavigation = true,
  showTitle = true,
  title = "Certificates & Accreditations",
  variant = "default", // "default", "compact", "minimal"
  className = ""
}) => {
  const swiperRef = useRef(null);

  const defaultCertificates = [
    { name: "JCI Accreditation", logo: "/CertificatesImg/img3.png", description: "Joint Commission International" },
    { name: "NABH Accreditation", logo: "/CertificatesImg/img2.png", description: "National Accreditation Board for Hospitals" },
    { name: "NABL Certification", logo: "/CertificatesImg/img4.png", description: "National Accreditation Board for Testing" }
  ];

  const certificateData = certificates.length > 0 ? certificates : defaultCertificates;

  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          container: "bg-white rounded-lg shadow-sm border border-gray-100 p-4",
          card: "group text-center bg-gray-50 rounded-lg p-3 hover:shadow-md transition-all duration-300",
          image: "w-12 h-12 mx-auto mb-2 rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center",
          title: "font-medium text-gray-800 text-xs mb-1 line-clamp-1",
          description: "text-xs text-gray-500 line-clamp-1"
        };
      case "minimal":
        return {
          container: "bg-transparent",
          card: "group text-center bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100",
          image: "w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center",
          title: "font-semibold text-gray-800 text-sm mb-1 line-clamp-2",
          description: "text-xs text-gray-500 line-clamp-2"
        };
      default:
        return {
          container: "bg-white rounded-xl shadow-sm border border-gray-100 p-6",
          card: "group text-center bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100",
          image: "w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden bg-white shadow-sm flex items-center justify-center",
          title: "font-semibold text-gray-800 text-sm mb-2 line-clamp-2",
          description: "text-xs text-gray-500 line-clamp-2"
        };
    }
  };

  const styles = getVariantStyles();

  const breakpoints = {
    320: {
      slidesPerView: variant === "compact" ? 3 : 2,
      spaceBetween: 12,
    },
    640: {
      slidesPerView: variant === "compact" ? 4 : 3,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: variant === "compact" ? 5 : 4,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: variant === "compact" ? 6 : 5,
      spaceBetween: 20,
    },
  };

  return (
    <div className={`mb-8 ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {showNavigation && (
            <div className="flex gap-2 md:hidden">
              <button
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                aria-label="Previous certificates"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => swiperRef.current?.swiper.slideNext()}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                aria-label="Next certificates"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      <div className={styles.container}>
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={16}
          loop={true}
          breakpoints={breakpoints}
          className="certificates-swiper"
        >
          {certificateData.map((cert, index) => (
            <SwiperSlide key={index}>
              <div className={styles.card}>
                <div className={styles.image}>
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-[#04CE78] to-green-600 items-center justify-center text-white">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h4 className={styles.title}>{cert.name}</h4>
                  {cert.description && (
                    <p className={styles.description}>{cert.description}</p>
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

export default CertificateSwiper;
