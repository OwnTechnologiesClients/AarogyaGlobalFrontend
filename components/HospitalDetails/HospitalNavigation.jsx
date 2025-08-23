"use client";
import React from 'react';

const HospitalNavigation = ({ activeTab, setActiveTab }) => {
  const navigationTabs = [
    "Overview",
    "Specialities",
    "Features",
    "About",
    "Doctors",
    "Gallery",
    // "Reviews",
    "Location"
  ];

  return (
    <div className="w-full bg-gray-50 py-4 sm:py-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-100 rounded-full p-1 sm:p-2 flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
          {navigationTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${activeTab === tab
                  ? 'bg-[#00D084] text-white shadow-sm'
                  : 'text-gray-600 hover:text-white hover:bg-[#00D084]/80 hover:shadow-md'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalNavigation;
