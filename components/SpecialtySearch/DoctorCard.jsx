"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Star,
    ArrowRight,
    MapPin,
    Stethoscope,
    Clock,
    Award
} from 'lucide-react';

const DoctorCard = ({ doctor }) => {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/doctorDetails/${doctor.id}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="md:w-1/3 relative">
                <div className='h-full p-2 rounded-lg'>
                    <img
                        src={doctor.image}
                        alt={`${doctor.name} image`}
                        className="w-full rounded-xl object-cover md:h-full"
                    />
                </div>
            </div>
            <div className="p-6 flex flex-col justify-between md:w-2/3">
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#04CE78] text-white text-md font-bold px-3 py-2 rounded-md">
                        Doctor
                    </span>
                    <div className="flex items-center text-gray-600 text-base">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                        <span>{doctor.rating}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h3>

                <p className="text-blue-600 font-semibold text-md mb-2">
                    {doctor.specialty}
                </p>

                <p className="text-gray-600 text-md flex items-center mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                    {doctor.location}
                </p>

                <p className="text-gray-600 text-md flex items-center mb-2">
                    <Stethoscope className="w-5 h-5 mr-2 text-gray-500" />
                    {doctor.hospital}
                </p>

                <p className="text-gray-600 text-md flex items-center mb-4">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    {doctor.experience} experience
                </p>

                {/* Treatments */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {doctor.treatments?.slice(0, 3).map((treatment, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                                {treatment}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-green-600">
                            {doctor.surgeries || doctor.surgeriesCount || '500+'}
                        </span>
                        <span className="text-xs text-gray-500">Surgeries</span>
                    </div>
                    <button
                        onClick={handleViewDetails}
                        className="text-indigo-600 flex items-center space-x-2 hover:text-indigo-800 bg-indigo-100 rounded-lg p-2 cursor-pointer"
                    >
                        <span className="font-semibold text-sm md:text-md">View Details</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
