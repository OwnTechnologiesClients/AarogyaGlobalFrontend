"use client";

import Image from 'next/image'
import React from 'react'

const HeroBannerVideo = () => {
  return (
    <div className="w-full -mt-12 md:-mt-8 relative z-0">
      <div className="w-full relative overflow-hidden rounded-b-2xl">
        <div className="relative w-full aspect-video">
          <video
            className="absolute inset-0 w-full h-full object-cover"
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
            <source src="/video.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
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
  )
}

export default HeroBannerVideo