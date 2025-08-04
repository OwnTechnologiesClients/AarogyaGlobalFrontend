"use client";
import React, { useState, useEffect } from "react";
import { getPageHeaderData } from "@/utils/navigationUtils";
import PageHeader from "@/components/layout/PageHeader";
import SearchForm from "@/components/HospitalSearch/SearchForm";
import TrustedBy from "@/components/home/TrustedBy";
import HospitalMain from "@/components/HospitalSearch/HospitalCard";
import dataService from '@/lib/dataService';

const HospitalSearch = () => {
  const { title, routes } = getPageHeaderData('/hospitalSearch');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all hospitals from all specialties and global hospitals
    const allHospitals = [];
    for (const specialty of Object.values(dataService.data.specialties)) {
      allHospitals.push(...(specialty.hospitals || []));
    }
    allHospitals.push(...(dataService.data.globalHospitals || []));
    setHospitals(allHospitals);
    setLoading(false);
  }, []);

  const [searchFilters, setSearchFilters] = useState({
    name: "",
    treatment: "",
    facility: "",
    location: "",
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const [filterHosData, setFilteredData] = useState(hospitals);

  useEffect(() => {
    setFilteredData(hospitals);
  }, [hospitals]);

  const applyFilters = () => {
    let result = [...hospitals];

    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter((hospital) =>
        hospital.specialties?.some(specialty => 
          specialty.toLowerCase().includes(activeCategory.toLowerCase())
        )
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
        hospital.treatments?.some(treatment => 
          treatment.toLowerCase().includes(searchFilters.treatment.toLowerCase())
        )
      );
    }

    if (searchFilters.facility) {
      result = result.filter((hospital) =>
        hospital.facilities?.some(facility => 
          facility.toLowerCase().includes(searchFilters.facility.toLowerCase())
        )
      );
    }

    if (searchFilters.location) {
      result = result.filter((hospital) =>
        hospital.location
          .toLowerCase()
          .includes(searchFilters.location.toLowerCase())
      );
    }
    setFilteredData(result);
  };

  const resetFilters = () => {
    setSearchFilters({
      name: "",
      treatment: "",
      facility: "",
      location: "",
    });
    setActiveCategory("All");
    setFilteredData(hospitals);
  };

  // Get filters from the first specialty (assuming they're similar across specialties)
  const getFilters = () => {
    const firstSpecialty = Object.values(dataService.data.specialties)[0];
    return firstSpecialty?.filters || {
      categories: ["All", "Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
      facilities: ["ICU", "Emergency", "Pharmacy", "Laboratory"],
      treatments: ["General Medicine", "Surgery", "Cardiology", "Neurology"]
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading hospitals...</div>
      </div>
    );
  }

  const filters = getFilters();

  return (
    <div>
      <PageHeader title={title} routes={routes} />

      <SearchForm
        categories={filters.categories}
        facilities={filters.facilities}
        treatments={filters.treatments}
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        activeCategory={activeCategory}
        applyFilters={applyFilters}
        setActiveCategory={setActiveCategory}
        resetFilters={resetFilters}
      />
      <HospitalMain hospitals={filterHosData} />
      <TrustedBy />
    </div>
  );
};

export default HospitalSearch;
