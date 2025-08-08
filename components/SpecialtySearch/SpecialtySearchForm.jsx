"use client";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function SpecialtySearchForm({
  categories,
  treatments,
  facilities,
  searchFilters,
  setSearchFilters,
  setActiveCategory,
  activeCategory,
  applyFilters,
  resetFilters,
  specialtyName
}) {
  const handleOnChange = (e) => {
    setSearchFilters((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="mt-20">
      <div className="gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 bg-white rounded-lg border border-black-100 shadow-md mx-2 sm:mx-4 md:mx-8 lg:mx-10 my-3 sm:my-4 md:my-5">
        
        {/* Specialty Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A0142] mb-2">
            {specialtyName} Search
          </h2>
          <p className="text-gray-600">
            Find the best {specialtyName.toLowerCase()} treatments
          </p>
        </div>

        {/* Search Fields - responsive grid layout */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6 p-2">
          <div className="col-span-1">
            <label className="block text-blue-950 font-medium text-xs xs:text-sm sm:text-base mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Type Name"
              value={searchFilters?.name}
              onChange={handleOnChange}
              className="w-full p-2 sm:p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400 text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-blue-950 font-medium text-xs xs:text-sm sm:text-base mb-1">
              Treatment
            </label>
            <div className="relative">
              <select
                name="treatment"
                className="w-full p-2 sm:p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={searchFilters?.treatment}
                onChange={handleOnChange}
              >
                <option>Select Treatment</option>
                {treatments?.map((ele, index) => {
                  return (
                    <option value={ele} key={index}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              <ChevronDown
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-blue-950 font-medium text-xs xs:text-sm sm:text-base mb-1">
              Facility
            </label>
            <div className="relative">
              <select
                name="facility"
                className="w-full p-2 sm:p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={searchFilters?.facility}
                onChange={handleOnChange}
              >
                <option>Select Facility</option>
                {facilities?.map((ele, index) => {
                  return (
                    <option value={ele} key={index}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              <ChevronDown
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-blue-950 font-medium text-xs xs:text-sm sm:text-base mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="City Name"
              value={searchFilters?.location}
              onChange={handleOnChange}
              className="w-full p-2 sm:p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400 text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Search Button - full width on mobile, right-aligned on larger screens */}
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={resetFilters}
            className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Reset Filters
          </button>
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-colors duration-200 active:scale-95"
            onClick={applyFilters}
          >
            <span>Search Now</span>
            <ArrowRight size={16} className="hidden xs:inline-block" />
          </button>
        </div>
      </div>
    </div>
  );
}
