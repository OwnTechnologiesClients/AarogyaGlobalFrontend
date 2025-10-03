"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import apiService from '../../lib/apiService';
import {
    Star,
    ArrowRight,
    MapPin,
    Stethoscope,
    Building
} from 'lucide-react';

const SpecialtyHospitalCard = ({ hospital }) => {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/hospitalDetails/${hospital.id}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 relative">
                <div className='h-full p-2 rounded-lg'>
                    <img
                        src={apiService.getImageUrl(hospital.displayImage || hospital.gallery?.[0]) || ''}
                        alt={`${hospital.name} image`}
                        className="w-full rounded-xl object-cover md:h-full"
                    />
                </div>
            </div>
            <div className="p-6 flex flex-col justify-between md:w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#04CE78] text-white text-md font-bold px-3 py-2 rounded-md">
                        Hospital
                    </span>
                    <div className="flex items-center text-gray-600 text-base">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                        <span>
                          {typeof hospital.rating === 'object' 
                            ? hospital.rating?.userScore || hospital.rating?.googleRating || 'N/A'
                            : hospital.rating || 'N/A'
                          }
                        </span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{hospital.name}</h3>

                <p className="text-gray-600 text-md flex items-center mb-2">
                    <MapPin className="w-6 h-6 mr-2 text-gray-500" />
                    {hospital.location}
                </p>

                {/* Specialties */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {hospital.specialties?.slice(0, 3).map((specialty, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                                {typeof specialty === 'object' ? specialty.name : specialty}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Facilities */}
                <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-2 flex items-center">
                        <Building className="w-4 h-4 mr-1 text-gray-500" />
                        Key Facilities:
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {hospital.facilities?.slice(0, 4).map((facility, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                                {facility}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={handleViewDetails}
                        className="bg-[#04CE78] hover:bg-green-600 text-white flex items-center space-x-1 sm:space-x-2 rounded-lg px-3 py-2 sm:py-3 transition-all duration-300 cursor-pointer"
                    >
                        <span className="font-semibold text-xs sm:text-sm md:text-md">View Details</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    </button>
                    <p className="text-gray-600 text-xs md:text-sm flex items-center gap-2">
                        <Stethoscope className="w-6 h-6 text-gray-500" />
                        <span>{hospital.doctorsCount || hospital.overview?.doctors || 'N/A'} Doctors</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SpecialtyHospitalCard;
