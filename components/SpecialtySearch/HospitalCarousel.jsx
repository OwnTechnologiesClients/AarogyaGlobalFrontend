import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import apiService from '../../lib/apiService';

const HospitalCarousel = ({ hospitals }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === hospitals.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? hospitals.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div className="flex gap-4 overflow-hidden">
                {hospitals.map((hospital, index) => (
                    <div
                        key={hospital.id}
                        className={`flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ${index === currentIndex ? 'transform scale-105' : ''
                            }`}
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`
                        }}
                    >
                        <div className="relative">
                            {apiService.getImageUrl(hospital.displayImage || hospital.gallery?.[0]) ? (
                                <img
                                    src={apiService.getImageUrl(hospital.displayImage || hospital.gallery?.[0])}
                                    alt={hospital.name}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">No image</span>
                                </div>
                            )}
                            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm font-semibold text-green-600 flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                {typeof hospital.rating === 'object' 
                                  ? hospital.rating?.userScore || hospital.rating?.googleRating || 'N/A'
                                  : hospital.rating || 'N/A'
                                }
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                                {hospital.name}
                            </h3>
                            <div className="flex items-center gap-1 text-gray-600 text-sm">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{hospital.location}</span>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                                {hospital.doctorsCount || hospital.overview?.doctors || 'N/A'} doctors • {hospital.specialties?.slice(0, 2).map(s => typeof s === 'object' ? s.name : s).join(', ') || 'N/A'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
            >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
            >
                <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {hospitals.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex
                            ? 'bg-green-500 scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HospitalCarousel; 