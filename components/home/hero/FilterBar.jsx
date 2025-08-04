"use client";

import React, { useState } from "react";
import filters from "@/data/filters.json";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomButton from "../../layout/CustomButton";
import DropdownSelect from "@/components/layout/Dropdown";
import dataService from '@/lib/dataService';

const FilterBar = () => {
  const [activeToggle, setActiveToggle] = useState(filters.toggles[0].value);
  const [selected, setSelected] = useState({});
  const [validationError, setValidationError] = useState("");
  const router = useRouter();

  // Get filters based on active toggle
  const getActiveFilters = () => {
    if (activeToggle === "doctors") {
      return filters.filters.filter(filter => filter.label !== "Hospital");
    } else if (activeToggle === "hospitals") {
      return filters.filters.filter(filter => filter.label !== "Treatment");
    }
    return filters.filters;
  };

  // Handle explore button click
  const handleExploreClick = () => {
    if (activeToggle === "doctors") {
      const location = selected["Location"];
      const treatment = selected["Treatment"];
      
      if (!location || !treatment) {
        setValidationError("Please select both Location and Treatment");
        return;
      }
      
      setValidationError("");

      // Map treatment names to URL-friendly names
      const treatmentMap = {
        "Cardiology": "cardiology",
        "Orthopedics": "orthopaedics", 
        "Neurology": "neurology",
        "Oncology": "oncology",
        "Urology": "urology",
        "Gynaecology": "gynaecology"
      };

      const treatmentSlug = treatmentMap[treatment];
      
      // Navigate to specialty page
      router.push(`/specialties/${treatmentSlug}?location=${encodeURIComponent(location)}`);
      
    } else if (activeToggle === "hospitals") {
      const location = selected["Location"];
      const hospital = selected["Hospital"];
      
      if (!location || !hospital) {
        setValidationError("Please select both Location and Hospital");
        return;
      }
      
      setValidationError("");

      // Find hospital ID by name using dataService
      const allHospitals = [];
      for (const specialty of Object.values(dataService.data.specialties)) {
        allHospitals.push(...(specialty.hospitals || []));
      }
      allHospitals.push(...(dataService.data.globalHospitals || []));
      
      const hospitalData = allHospitals.find(h => h.name === hospital);
      
      if (hospitalData) {
        // Navigate to hospital details page
        router.push(`/hospitalDetails/${hospitalData.id}?location=${encodeURIComponent(location)}`);
      } else {
        setValidationError("Selected hospital not found");
      }
    }
  };

  return (
    <div className="w-full flex justify-center relative z-10 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 mb-[50px] sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
      {/* Main Filter Container */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 w-full max-w-[1400px] relative z-10 shadow-lg">
        {/* Toggle Buttons - Enhanced responsive positioning */}
        <div className="absolute -top-6 sm:-top-8 md:-top-10 lg:-top-12 xl:-top-14 left-1/2 transform -translate-x-1/2 z-[5] w-full max-w-fit px-2 sm:px-3 md:px-4">
          <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 bg-white rounded-lg md:rounded-xl p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-5  justify-center border border-gray-100 shadow-md">
            {filters.toggles.map((toggle) => (
              <button
                key={toggle.value}
                className={`px-2.5 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 xl:py-3.5 rounded-md font-semibold transition-all duration-200 text-xs sm:text-sm md:text-base focus:outline-none whitespace-nowrap min-w-fit
              ${
                activeToggle === toggle.value
                  ? "bg-[#04CE78] text-white shadow-md border border-transparent"
                  : "bg-white text-[#000D44] hover:bg-gray-50 border-2 border-[#000D44]"
              }`}
                onClick={() => {
                  setActiveToggle(toggle.value);
                  setValidationError(""); // Clear error when toggle changes
                  setSelected({}); // Clear selections when toggle changes
                }}
                type="button"
              >
                {toggle.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Content */}
        <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-14 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {getActiveFilters().map((filter) => (
              <DropdownSelect
                key={filter.label}
                label={filter.label}
                options={filter.options}
                value={selected[filter.label] || ""}
                onChange={(value) => {
                  setSelected(prev => ({ ...prev, [filter.label]: value }));
                  setValidationError(""); // Clear error when selection changes
                }}
              />
            ))}
          </div>

          {/* Validation Error */}
          {validationError && (
            <div className="text-red-500 text-sm text-center mb-4">
              {validationError}
            </div>
          )}

          {/* Explore Button */}
          <div className="flex justify-center">
            <CustomButton
              onClick={handleExploreClick}
              className="bg-[#04CE78] hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2"
            >
              Explore
              <ArrowRightIcon className="w-5 h-5" />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
