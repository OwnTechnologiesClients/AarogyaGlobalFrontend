"use client";

import React, { useState } from "react";
import filters from "@/data/filters.json";
import hospitalJson from "@/data/HospitalData.json";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomButton from "../../layout/CustomButton";
import DropdownSelect from "@/components/layout/Dropdown";

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

      // Find hospital ID by name
      const hospitalData = hospitalJson.hospitals.find(h => h.name === hospital);
      
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

        {/* Main Content Area */}
        <div className="overflow-visible">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10  pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {/* Filters Section - Centered */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center">
                {getActiveFilters().map((filter) => (
                  <div
                    key={filter.label}
                   
                  >
                    <DropdownSelect
                      label={filter.label}
                      options={filter.options}
                      value={selected[filter.label] || ""}
                      onChange={(e) => {
                        setSelected((prev) => ({
                          ...prev,
                          [filter.label]: e.target.value,
                        }));
                        setValidationError(""); // Clear error when user makes a selection
                      }}
                      placeholder={filter.placeholder}
                    />
                  </div>
                ))}
              </div>
              
              {/* Validation Error */}
              {validationError && (
                <div className="w-full text-center">
                  <p className="text-red-500 text-sm font-medium">{validationError}</p>
                </div>
              )}

              {/* Action Button - Centered */}
              <div className="flex justify-center">
                <CustomButton
                  text={activeToggle === "doctors" ? "Explore Treatment" : "Explore Hospitals"}
                  bgColor="bg-[#1F5FFF]"
                  textColor="text-white"
                  hoverBgColor="bg-[#03B96A]"
                  rounded="rounded-lg"
                  padding="px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-4 w-[212px]"
                  textSize="text-sm sm:text-base lg:text-lg"
                  iconSize={18}
                  className="group hover:translate-x-1 transition-transform duration-300 "
                  onClick={handleExploreClick}
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
