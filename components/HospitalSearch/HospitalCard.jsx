"use client";
import React, { useEffect, useState } from 'react';
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
        <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="md:w-1/2 relative">
                <div className='h-full p-2 rounded-lg'>

                    <img
                        src={hospital.image}
                        alt={`${hospital.name} image`}
                        className="w-full rounded-xl  object-cover md:h-full"
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
                        <span>{hospital.rating}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{hospital.name}</h3>

                <p className="text-gray-600 text-md flex items-center mb-2">
                    <MapPin className="w-6 h-6 mr-2 text-gray-500" />
                    {hospital.location}
                </p>

                <div className="flex gap-2 mb-4">
                    {hospital.hasEmergency && (
                        <span className="bg-red-100 text-red-400 text-xs font-semibold px-3 py-1 rounded-full">
                            Emergency
                        </span>
                    )}
                    {hospital.hasParkade && (
                        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                            Parking
                        </span>
                    )}
                </div>

                <div className="flex justify-between items-center">
                    <a
                        href="#"
                        className="text-indigo-600 flex items-center space-x-2 hover:text-indigo-800 bg-indigo-100 rounded-lg p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="font-semibold text-sm md:text-md">View Details</span>
                        <ArrowRight className="w-4 h-4" />
                    </a>
                    <p className="text-gray-600 text-xs md:text-sm flex items-center gap-2">
                        <Stethoscope className="w-6 h-6 text-gray-500" />
                        <span>{hospital.doctorsCount} Doctors</span>
                    </p>
                </div>
            </div>
        </div>
    );
};



const HospitalMain = ({ hospitals }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [hospitalData, setHospitalData] = useState(hospitals); // State to manage liked status
    const cardsPerPage = 2; // As per the image, two cards per row/page

    const totalPages = Math.ceil(hospitalData.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = hospitalData.slice(indexOfFirstCard, indexOfLastCard);


    useEffect(() => {
        setHospitalData(hospitals)
    }, [hospitals])

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {hospitalData.map((hospital, index) => (
                            <HospitalCard
                                key={createUniqueKey(hospital, index)}
                                hospital={hospital}
                                onLike={handleLikeToggle}
                                onShare={handleShare}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="max-w-7xl mx-auto mt-12">
                {/* "Can't find what you are looking for?" section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Can't find what you are looking for?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label htmlFor="name" className="block text-gray-800 text-lg font-medium mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Type A Name"
                                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none bg-blue-50 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-gray-800 text-lg font-medium mb-2">Phone Number</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Type A Phone Number"
                                className="w-full px-4 py-4 border border-gray-300 rounded-lg  bg-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">Email (Optional)</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Type Email"
                                className="w-full px-4 py-4 border border-gray-300 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <a
                            href="tel:+919876543210" // Replace with the actual phone number you want to call
                            className="bg-indigo-950 text-white py-4 px-4 font-bold text-lg rounded-lg hover:bg-indigo-800 transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <span>Request Callback</span>
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Hospital Cards Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {currentCards.map((hospital, index) => (
                        <HospitalCard
                            key={createUniqueKey(hospital, indexOfFirstCard + index)}
                            hospital={hospital}
                            onLike={handleLikeToggle}
                            onShare={handleShare}

                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-4 mt-12">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`text-gray-500 hover:text-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <ArrowRight className="w-5 h-5 rotate-180" /> {/* Left arrow */}
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${currentPage === i + 1
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`text-gray-500 hover:text-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <ArrowRight className="w-5 h-5" /> {/* Right arrow */}
                    </button>
                </div>
            </div>
        </section>
          </div>
   
    );
};

export default HospitalMain;
