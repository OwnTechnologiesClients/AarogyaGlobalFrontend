"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Star,
    ArrowRight,
    MapPin,
    Award,
    Users,
    Clock
} from 'lucide-react';

const DoctorCard = ({ doctor }) => {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/doctorDetails/${doctor.id}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 w-full">
            {/* Main Content */}
            <div className="flex flex-col sm:flex-row w-full">
                {/* Left Side - Image */}
                <div className="w-full sm:w-28 md:w-32 lg:w-36 h-48 sm:h-auto bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0">
                    <img
                        src={doctor.image}
                        alt={`${doctor.name} image`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 items-center justify-center text-white">
                        <Award className="w-8 h-8" />
                    </div>
                </div>

                {/* Right Side - Information */}
                <div className="flex-1 p-3 sm:p-4 min-w-0">
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="bg-[#04CE78] text-white text-sm font-bold px-3 py-1.5 rounded-full">
                            Doctor
                        </span>
                        {doctor.rating && (
                            <div className="flex items-center text-gray-600 text-sm">
                                <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                                <span className="font-semibold">{doctor.rating}</span>
                            </div>
                        )}
                    </div>

                    {/* Doctor Name */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">{doctor.name}</h3>

                    {/* Specialty */}
                    <p className="text-blue-600 font-semibold text-sm sm:text-base mb-3 line-clamp-1">{doctor.specialty}</p>

                    {/* Location */}
                    <div className="flex items-center gap-1 mb-3">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="text-sm text-gray-500 line-clamp-1">{doctor.location}</p>
                    </div>

                    {/* Key Stats Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-4">
                        {doctor.hospital && (
                            <div className="flex items-center gap-1 min-w-0">
                                <Award className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                <span className="truncate">{doctor.hospital}</span>
                            </div>
                        )}
                        {doctor.experience && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="truncate">{doctor.experience}</span>
                            </div>
                        )}
                    </div>

                    {/* Patients Treated */}
                    {doctor.patientsTreated && (
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-green-600 font-bold text-sm sm:text-base">{doctor.patientsTreated}</span>
                            <span className="text-xs sm:text-sm text-gray-500">Patients Treated</span>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="flex justify-center sm:justify-end">
                        <button
                            onClick={handleViewDetails}
                            className="bg-[#04CE78] hover:bg-green-600 text-white py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 font-semibold text-xs sm:text-sm w-full sm:w-auto"
                        >
                            <span>View Details</span>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
