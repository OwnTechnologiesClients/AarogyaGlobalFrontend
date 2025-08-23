"use client";
import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';

const HospitalImageGallery = ({ hospital }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Hospital images data - using hospital gallery images or fallback to placeholder
  const hospitalImages = hospital?.gallery && hospital.gallery.length > 0
    ? hospital.gallery.map((url, index) => ({
      id: index + 1,
      url: url,
      alt: `${hospital?.name || "Hospital"} Image ${index + 1}`
    }))
    : [
      {
        id: 1,
        url: hospital?.image || "https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=0&k=20&c=oUILskmtaPiA711DP53DFhOUvE7pfdNeEK9CfyxlGio=",
        alt: `${hospital?.name || "Hospital"} Main Building`
      }
    ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Image */}
        <div className="lg:w-2/3 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={hospitalImages[selectedImage]?.url || hospitalImages[0]?.url}
              alt={hospitalImages[selectedImage]?.alt || hospitalImages[0]?.alt}
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />

            {/* Rating Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-bold text-gray-800">{hospital?.rating || "4.5k+ Rating"}</span>
            </div>

            {/* Location Badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">{hospital?.location || "Delhi, INDIA"}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="lg:w-1/3">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Gallery ({hospitalImages.length} images)</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 h-full content-start">
            {hospitalImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${selectedImage === index
                  ? 'ring-4 ring-[#04CE78] shadow-lg'
                  : 'hover:shadow-md hover:scale-105'
                  }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-[120px] lg:h-[160px] object-cover"
                />
                {/* Show selection indicator */}
                {selectedImage === index && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#04CE78] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
                {/* Show image number */}
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalImageGallery;
