"use client";
import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';

const HospitalImageGallery = ({ hospital }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Hospital images data - using hospital image as main and adding some additional images
  const hospitalImages = [
    {
      id: 1,
      url: hospital?.image || "https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=0&k=20&c=oUILskmtaPiA711DP53DFhOUvE7pfdNeEK9CfyxlGio=",
      alt: `${hospital?.name || "Hospital"} Main Building`
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&h=300&fit=crop",
      alt: "Operating Room"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
      alt: "Hospital Room"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
      alt: "Medical Equipment"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&h=300&fit=crop",
      alt: "Surgery Room"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
      alt: "Patient Care"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Image */}
        <div className="lg:w-2/3 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={hospitalImages[selectedImage].url}
              alt={hospitalImages[selectedImage].alt}
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
          <div className="grid grid-cols-2 gap-3 h-full">
            {hospitalImages.slice(1, 7).map((image, index) => (
              <div
                key={image.id}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${selectedImage === index + 1
                    ? 'ring-4 ring-[#04CE78] shadow-lg'
                    : 'hover:shadow-md hover:scale-105'
                  }`}
                onClick={() => setSelectedImage(index + 1)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-[120px] lg:h-[160px] object-cover"
                />

                {/* Show number badge on last image if there are more */}
                {index === 5 && hospitalImages.length > 6 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">+{hospitalImages.length - 6}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalImageGallery;
