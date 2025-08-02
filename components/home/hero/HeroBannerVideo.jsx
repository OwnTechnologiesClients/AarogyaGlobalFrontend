"use client";

import Image from 'next/image';
import React from 'react';

const HeroBannerVideo = () => {
  return (
    <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh]  relative z-0 overflow-hidden lg:-mt-[197px] -mt-[240px] ">
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
            <source src="/video.webm" type="video/webm" />
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
        </div>
      </div>
    </div>
  );
};

export default HeroBannerVideo;
