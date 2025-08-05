"use client";

import Image from 'next/image';
import React from 'react';

const HeroBannerVideo = () => {
  return (
    <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] relative z-0 overflow-hidden lg:-mt-[180px] -mt-[200px]">
      <div className="w-full relative overflow-hidden rounded-b-2xl h-full">
        <div className="relative w-full h-full">
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-b-2xl"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            style={{ zIndex: 1 }}
          >
            <source src="/Video.mp4" type="video/mp4" />
            {/* Fallback image */}
            <Image
              src="/banner.jpg"
              alt="Hero Banner Video"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </video>

          {/* Green diagonal strip with marquee text */}
          <div className="absolute bottom-3 left-0 w-full h-15 bg-[#04CE78] transform -skew-y-6 origin-bottom-left z-10">
            <div className="flex items-center h-full overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap text-white font-bold text-lg md:text-xl lg:text-2xl">
                <span>_Pre-Op Specialist</span>
                <span>_</span>
                <span>Teleconsultations</span>
                <span>_</span>
                <span>Comprehensive Treatment Plans</span>
                <span>_</span>
                <span>Medical Travel Planning</span>
                <span>_</span>
                <span>Pre-Op Specialist</span>
                <span>_</span>
                <span>Teleconsultations</span>
                <span>_</span>
                <span>Comprehensive Treatment Plans</span>
                <span>_</span>
                <span>Medical Travel Planning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerVideo;
