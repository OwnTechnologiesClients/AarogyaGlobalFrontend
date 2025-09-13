"use client";
import { useState } from "react";
import { ChevronDown, ArrowRight, Search, Filter, X } from "lucide-react";

export default function DoctorsSearchForm({
  searchFilters,
  setSearchFilters,
  applyFilters,
  resetFilters,
  specialties,
  locations,
  hospitals,
  isLoading
}) {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

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

        {/* Mobile Filter Header - Collapsible */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#1A0142] mb-1">
                Doctor Search
              </h2>
              <p className="text-sm text-gray-600">
                Find the best doctors and specialists
              </p>
            </div>
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="flex items-center gap-2 bg-[#1F5FFF] hover:bg-[#4B00B4] text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
            >
              {isFilterExpanded ? (
                <>
                  <X size={18} />
                  <span className="text-sm font-medium">Close</span>
                </>
              ) : (
                <>
                  <Filter size={18} />
                  <span className="text-sm font-medium">Filters</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Header - Always Visible */}
        <div className="hidden md:block mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A0142] mb-2">
            Find Your Perfect Doctor
          </h2>
          <p className="text-gray-600">
            Search through our network of world-class doctors and specialists
          </p>
        </div>

        {/* Search Fields - Conditionally visible on mobile, always visible on desktop */}
        <div className={`${isFilterExpanded ? 'block' : 'hidden'} md:block`}>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6 p-2">
            <div className="col-span-1">
              <label className="block text-blue-950 font-medium text-xs xs:text-sm sm:text-base mb-1">
                Doctor Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="name"
                  placeholder="Search by doctor name"
                  value={searchFilters?.name}
                  onChange={handleOnChange}
                  className="w-full pl-10 p-2 sm:p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400 text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-blue-950 font-medium text-xs xs:text-sm sm:text-base mb-1">
                Specialty
              </label>
              <div className="relative">
                <select
                  name="specialty"
                  className="w-full p-2 sm:p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  value={searchFilters?.specialty}
                  onChange={handleOnChange}
                >
                  <option value="">All Specialties</option>
                  {specialties?.map((specialty, index) => (
                    <option value={specialty} key={index}>
                      {specialty}
                    </option>
                  ))}
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
              <div className="relative">
                <select
                  name="location"
                  className="w-full p-2 sm:p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  value={searchFilters?.location}
                  onChange={handleOnChange}
                >
                  <option value="">All Locations</option>
                  {locations?.map((location, index) => (
                    <option value={location} key={index}>
                      {location}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-blue-950 font-medium text-xs xs:text-sm sm:text-base mb-1">
                Hospital
              </label>
              <div className="relative">
                <select
                  name="hospital"
                  className="w-full p-2 sm:p-2.5 md:p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-600 text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  value={searchFilters?.hospital}
                  onChange={handleOnChange}
                >
                  <option value="">All Hospitals</option>
                  {hospitals?.map((hospital, index) => (
                    <option value={hospital} key={index}>
                      {hospital}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          {/* Search Buttons - Conditionally visible on mobile, always visible on desktop */}
          <div className={`${isFilterExpanded ? 'flex' : 'hidden'} md:flex justify-center sm:justify-end`}>
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Reset Filters
            </button>
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={applyFilters}
              disabled={isLoading}
            >
              <Search size={16} className="hidden xs:inline-block" />
              <span>{isLoading ? 'Loading...' : 'Search Doctors'}</span>
              <ArrowRight size={16} className="hidden xs:inline-block" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 