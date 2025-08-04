"use client";
import React from 'react';

const TreatmentNavigation = ({ activeTab, setActiveTab }) => {
  const navigationTabs = [
    "Overview",
    "Hospitals",
    "Doctors",
    "Diagnostic",
    "Treatments",
    "Cost",
    "FAQ"
  ];

  return (
    <div className="w-full bg-gray-50 py-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-100 rounded-full p-2 inline-flex gap-2 overflow-x-auto">
          {navigationTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeTab === tab
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

export default TreatmentNavigation; 