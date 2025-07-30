"use client";
import React, { useState } from "react";
import PageHeadrsData from "@/data/pageHeadersData.json";
import PageHeader from "@/components/layout/PageHeader";
import SearchForm from "@/components/HospitalSearch/SearchForm";
import hospitalJson from "@/data/HospitalData.json";
import TrustedBy from "@/components/home/TrustedBy";
import HospitalMain from "@/components/HospitalSearch/HospitalCard";
const HospitalSearch = () => {
    
  const { title, routes } = PageHeadrsData.hospitalSearch;

  const [searchFilters, setSearchFilters] = useState({
    name: "",
    treatment: "",
    facility: "",
    location: "",
  });

  const [isFilter, setIsFilter] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const [filterHosData, setFilteredData] = useState(hospitalJson.hospitals);
  const applyFilters = () => {
    let result = [...hospitalJson.hospitals];

    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter((hospital) =>
        hospital.specialties?.includes(activeCategory)
      );
    }

    // Apply other filters
    if (searchFilters.name) {
      result = result.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchFilters.name.toLowerCase())
      );
    }

    if (searchFilters.treatment) {
      result = result.filter((hospital) =>
        hospital.treatments?.includes(searchFilters.treatment)
      );
    }

    if (searchFilters.facility) {
      result = result.filter((hospital) =>
        hospital.facilities?.includes(searchFilters.facility)
      );
    }

    if (searchFilters.location) {
      result = result.filter((hospital) =>
        hospital.location
          .toLowerCase()
          .includes(searchFilters.location.toLowerCase())
      );
    }
    setIsFilter(!isFilter);
    setFilteredData(result);
  };

  const resetFilters = () => {
    setSearchFilters({
      name: "",
      treatment: "",
      facility: "",
      location: "",
    });
    setIsFilter(!isFilter);
    setActiveCategory("All");
    setFilteredData(hospitalJson.hospitals);
  };

  return (
    <div>
      <PageHeader title={title} routes={routes} />

      <SearchForm
        categories={hospitalJson.filters.categories}
        facilities={hospitalJson.filters.facilities}
        treatments={hospitalJson.filters.treatments}
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        activeCategory={activeCategory}
        applyFilters={applyFilters}
        setActiveCategory={setActiveCategory}
        resetFilters={resetFilters}
      />
       <HospitalMain hospitals={filterHosData} isFilter={isFilter} />
       <TrustedBy />
    </div>
  );
};

export default HospitalSearch;
