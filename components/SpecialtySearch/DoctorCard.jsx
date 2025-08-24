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
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-100">
            {/* Main Content */}
            <div className="flex">
                {/* Left Side - Full Height Image */}
                <div className="w-42 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0">
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
                <div className="flex-1 p-4">
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
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h3>

                    {/* Specialty */}
                    <p className="text-blue-600 font-semibold text-base mb-3">{doctor.specialty}</p>

                    {/* Location */}
                    <div className="flex items-center gap-1 mb-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-500">{doctor.location}</p>
                    </div>

                    {/* Key Stats Row */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        {doctor.hospital && (
                            <div className="flex items-center gap-1">
                                <Award className="w-4 h-4 text-purple-600" />
                                <span className="truncate max-w-[140px]">{doctor.hospital}</span>
                            </div>
                        )}
                        {doctor.experience && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-green-600" />
                                <span>{doctor.experience}</span>
                            </div>
                        )}
                    </div>

                    {/* Patients Treated */}
                    {doctor.patientsTreated && (
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="w-5 h-5 text-green-600" />
                            <span className="text-green-600 font-bold text-base">{doctor.patientsTreated}</span>
                            <span className="text-sm text-gray-500">Patients Treated</span>
                        </div>
                    )}



                    {/* Call to Action */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleViewDetails}
                            className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 font-semibold text-base"
                        >
                            <span>View Details</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
