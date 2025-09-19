"use client";
import React, { useEffect, useState } from 'react';
import PhoneInput from "../ui/PhoneInput";
import { sendConsultationEmail } from "../../lib/emailService";
import { useRouter } from 'next/navigation';

import {
    Heart,
    Share2,
    Star,
    ArrowRight,
    MapPin,
    Stethoscope,
} from 'lucide-react';

const HospitalCard = ({ hospital, onLike, onShare }) => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/hospitalDetails/${hospital.id}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Hospital Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={hospital.image}
                    alt={`${hospital.name} image`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Hospital Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#04CE78] text-white text-md font-bold px-3 py-2 rounded-md">
                        Hospital
                    </span>
                    <div className="flex items-center text-gray-600 text-base">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                        <span className="font-semibold">{hospital.rating}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">{hospital.name}</h3>

                <p className="text-gray-600 text-sm mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    {hospital.location}
                </p>

                {/* Hospital Details */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                        <Stethoscope className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium mr-2">Doctors:</span>
                        <span>{hospital.doctorsCount || 'N/A'}</span>
                    </div>

                    {hospital.specialties && hospital.specialties.length > 0 && (
                        <div className="flex items-start text-gray-600 text-sm">
                            <Heart className="w-4 h-4 mr-2 text-red-500 mt-0.5" />
                            <div>
                                <span className="font-medium mr-2">Specialties:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {hospital.specialties.slice(0, 3).map((specialty, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                    {hospital.specialties.length > 3 && (
                                        <span className="text-xs text-gray-500">
                                            +{hospital.specialties.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Facilities */}
                    <div className="flex flex-wrap gap-2">
                        {hospital.hasEmergency && (
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                                Emergency
                            </span>
                        )}
                        {hospital.hasParkade && (
                            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                                Parking
                            </span>
                        )}
                        {hospital.facilities && hospital.facilities.slice(0, 2).map((facility, index) => (
                            <span
                                key={index}
                                className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full"
                            >
                                {facility}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleCardClick}
                        className="w-full bg-[#04CE78] hover:bg-green-600 text-white flex items-center justify-center space-x-2 rounded-lg p-3 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg font-semibold"
                    >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};



const HospitalMain = ({ hospitals }) => {
    const [hospitalData, setHospitalData] = useState(hospitals);
    // Callback form state (shared for the inline CTA blocks)
    const [callbackName, setCallbackName] = useState("");
    const [callbackEmail, setCallbackEmail] = useState("");
    const [callbackPhone, setCallbackPhone] = useState({ countryCode: "", phone: "" });

    useEffect(() => {
        setHospitalData(hospitals)
    }, [hospitals])

    const handleLikeToggle = (id) => {
        setHospitalData((prevData) =>
            prevData.map((hospital) =>
                hospital.id === id ? { ...hospital, isLiked: !hospital.isLiked } : hospital
            )
        );
    };

    const handleShare = (hospitalName) => {
        alert(`Sharing ${hospitalName}!`);
    };

    // Helper function to create unique keys
    const createUniqueKey = (hospital, index) => {
        return `${hospital.id}-${hospital.name?.replace(/\s+/g, '-')}-${index}`;
    };

    return (
        <div className="mt-20">
            <section className="gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 bg-white rounded-lg border border-black-100 shadow-md mx-2 sm:mx-4 md:mx-8 lg:mx-10 my-3 sm:my-4 md:my-5">
                <div className="max-w-7xl mx-auto">
                    {hospitalData.length === 0 ? (
                        <p className="text-center text-gray-500">No hospitals found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hospitalData.map((hospital, index) => {
                                const items = [];

                                // Add hospital card
                                items.push(
                                    <HospitalCard
                                        key={createUniqueKey(hospital, index)}
                                        hospital={hospital}
                                        onLike={handleLikeToggle}
                                        onShare={handleShare}
                                    />
                                );

                                // Add CTA after every 6 hospitals (after every 2 complete columns of 3 cards)
                                // This ensures: 3 cards in first column, 3 cards in second column, then CTA
                                if ((index + 1) % 6 === 0 && index < hospitalData.length - 1) {
                                    items.push(
                                        <div key={`cta-${index}`} className="col-span-1 md:col-span-2 lg:col-span-3">
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg">
                                                <h3 className="text-xl font-bold text-gray-800 mb-4">Can't find what you are looking for?</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                                    <div>
                                                        <label htmlFor={`name-${index}`} className="block text-gray-800 text-sm font-medium mb-2">Name</label>
                                                        <input
                                                            type="text"
                                                            id={`name-${index}`}
                                                            placeholder="Type A Name"
                                                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none bg-white focus:ring-2 focus:ring-indigo-500 text-sm"
                                                            value={callbackName}
                                                            onChange={(e) => setCallbackName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-800 text-sm font-medium mb-2">Phone Number</label>
                                                        <PhoneInput
                                                            value={{ countryCode: callbackPhone.countryCode, phone: callbackPhone.phone }}
                                                            onChange={({ countryCode, phone }) => setCallbackPhone({ countryCode, phone })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor={`email-${index}`} className="block text-gray-700 text-sm font-medium mb-2">Email (Optional)</label>
                                                        <input
                                                            type="email"
                                                            id={`email-${index}`}
                                                            placeholder="Type Email"
                                                            className="w-full px-3 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                                            value={callbackEmail}
                                                            onChange={(e) => setCallbackEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={async () => {
                                                            try {
                                                                await sendConsultationEmail({
                                                                    name: callbackName,
                                                                    email: callbackEmail,
                                                                    phone: callbackPhone.phone,
                                                                    countryCode: callbackPhone.countryCode,
                                                                    specialty: '',
                                                                    hospital: '',
                                                                    message: ''
                                                                }, 'Hospitals – Callback');
                                                                if (typeof window !== 'undefined') {
                                                                    window.location.href = '/thank-you';
                                                                }
                                                            } catch (e) {
                                                                alert('Failed to submit. Please try again.');
                                                            }
                                                        }}
                                                        className="bg-[#04CE78] hover:bg-green-600 text-white py-3 px-4 font-bold text-sm rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-lg"
                                                    >
                                                        <span>Request Callback</span>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return items;
                            }).flat()}
                        </div>
                    )}
                </div>
            </section>
        </div>

    );
};

export default HospitalMain;
