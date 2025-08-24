"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Star,
    ArrowRight,
    MapPin,
    Stethoscope,
    Clock,
    Award,
    Users,
    GraduationCap,
    Languages,
    BookOpen,
    Trophy
} from 'lucide-react';

const DoctorCard = ({ doctor }) => {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/doctorDetails/${doctor.id}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100">
            {/* Header with Image and Basic Info */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm flex items-center justify-center flex-shrink-0">
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
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <span className="bg-[#04CE78] text-white text-xs font-bold px-3 py-1 rounded-full">
                                Doctor
                            </span>
                            {doctor.rating && (
                                <div className="flex items-center text-gray-600 text-sm">
                                    <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                                    <span className="font-semibold">{doctor.rating}</span>
                                </div>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{doctor.name}</h3>
                        <p className="text-blue-600 font-semibold text-md mb-2">{doctor.specialty}</p>
                        <div className="flex items-center gap-1 mb-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-500">{doctor.location}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="px-6 py-4 bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                    {doctor.experience && (
                        <div className="flex items-center gap-2 text-sm">
                            <Award className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700 font-medium">{doctor.experience}</span>
                        </div>
                    )}
                    {doctor.patientsTreated && (
                        <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-700 font-medium">{doctor.patientsTreated}</span>
                        </div>
                    )}
                    {doctor.successRate && (
                        <div className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 text-yellow-600" />
                            <span className="text-gray-700 font-medium">{doctor.successRate}</span>
                        </div>
                    )}
                    {doctor.hospital && (
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-purple-600" />
                            <span className="text-gray-700 font-medium line-clamp-1">{doctor.hospital}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed Information */}
            <div className="p-6 space-y-4">
                {/* Education */}
                {doctor.education && (
                    <div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                            <GraduationCap className="w-4 h-4 text-indigo-600" />
                            <span className="font-medium text-gray-700">Education</span>
                        </div>
                        <p className="text-sm text-gray-600">{doctor.education}</p>
                    </div>
                )}

                {/* Certifications */}
                {doctor.certifications && doctor.certifications.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                            <Award className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-gray-700">Certifications</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {doctor.certifications.map((cert, index) => (
                                <span
                                    key={index}
                                    className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                                >
                                    {cert}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {doctor.languages && doctor.languages.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                            <Languages className="w-4 h-4 text-orange-600" />
                            <span className="font-medium text-gray-700">Languages</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {doctor.languages.slice(0, 3).map((lang, idx) => (
                                <span key={idx} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                    {lang}
                                </span>
                            ))}
                            {doctor.languages.length > 3 && (
                                <span className="text-xs text-gray-500">+{doctor.languages.length - 3} more</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Research and Awards */}
                <div className="grid grid-cols-2 gap-4">
                    {doctor.researchPapers && (
                        <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700 line-clamp-1">{doctor.researchPapers}</span>
                        </div>
                    )}
                    {doctor.awards && doctor.awards.length > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                            <Trophy className="w-4 h-4 text-yellow-600" />
                            <span className="text-gray-700 line-clamp-1">{doctor.awards[0]}</span>
                        </div>
                    )}
                </div>

                {/* Expertise/Treatments */}
                {doctor.expertise && doctor.expertise.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                            <Stethoscope className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-gray-700">Expertise</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {doctor.expertise.slice(0, 4).map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                            {doctor.expertise.length > 4 && (
                                <span className="text-xs text-gray-500">+{doctor.expertise.length - 4} more</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="pt-4 border-t border-gray-100">
                    <button
                        onClick={handleViewDetails}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold"
                    >
                        <span>View Full Profile</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
