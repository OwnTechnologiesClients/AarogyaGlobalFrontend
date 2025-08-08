"use client";
import React from 'react';
import {
    ArrowRight,
    Clock,
    Calendar,
    DollarSign
} from 'lucide-react';

const TreatmentCard = ({ treatment }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#04CE78] text-white text-md font-bold px-3 py-2 rounded-md">
                        Treatment
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">{treatment.name}</h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {treatment.description}
                </p>

                {/* Treatment Details */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium mr-2">Duration:</span>
                        <span>{treatment.duration}</span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-green-500" />
                        <span className="font-medium mr-2">Recovery:</span>
                        <span>{treatment.recovery}</span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                        <DollarSign className="w-4 h-4 mr-2 text-orange-500" />
                        <span className="font-medium mr-2">Cost Range:</span>
                        <span className="text-green-600 font-semibold">{treatment.price}</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <a
                        href={`/treatmentDetails/${encodeURIComponent(treatment.id)}`}
                        className="w-full text-center text-indigo-600 flex items-center justify-center space-x-2 hover:text-indigo-800 bg-indigo-100 rounded-lg p-3 transition-colors duration-200 cursor-pointer"
                    >
                        <span className="font-semibold">Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TreatmentCard;
