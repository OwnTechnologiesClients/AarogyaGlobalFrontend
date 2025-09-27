"use client";
import React, { useState, useEffect } from "react";
import { getPageHeaderData } from "@/utils/navigationUtils";
import PageHeader from "@/components/layout/PageHeader";
import SpecialtySearchForm from "@/components/SpecialtySearch/SpecialtySearchForm";
import SpecialtyResults from "@/components/SpecialtySearch/SpecialtyResults";
import TrustedBy from "@/components/home/TrustedBy";
import dataService from "@/lib/dataService";
import apiService from "@/lib/apiService";

const CardiologyPage = () => {
  const { title, routes } = getPageHeaderData('/specialties/cardiology');
  const data = dataService.getSpecialtyData('cardiology');

  const [searchFilters, setSearchFilters] = useState({
    name: "",
    treatment: "",
    facility: "",
    location: "",
  });

  // Set activeCategory to "Treatments" by default
  const [activeCategory, setActiveCategory] = useState("Treatments");

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [filteredTreatments, setFilteredTreatments] = useState([]);

  // Load treatments from backend by category (DB uses category)
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await apiService.getTreatments({ category: "Cardiology" });
        const list = Array.isArray(res?.data) ? res.data : [];
        if (isMounted) setFilteredTreatments(list);
      } catch (e) {
        if (isMounted) setFilteredTreatments([]);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  // Handle case when data is not available
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Data not available</div>
      </div>
    );
  }

  const applyFilters = () => {
    let treatments = [...(data.treatments || [])];

    // Apply name filter
    if (searchFilters.name) {
      treatments = treatments.filter((treatment) =>
        treatment.name.toLowerCase().includes(searchFilters.name.toLowerCase())
      );
    }

    // Apply treatment filter
    if (searchFilters.treatment) {
      treatments = treatments.filter((treatment) =>
        treatment.name === searchFilters.treatment
      );
    }

    // Apply facility filter
    if (searchFilters.facility) {
      treatments = treatments.filter((treatment) =>
        treatment.facilities?.includes(searchFilters.facility)
      );
    }

    // Apply location filter
    if (searchFilters.location) {
      treatments = treatments.filter((treatment) =>
        treatment.location?.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    setFilteredTreatments(treatments);
  };

  const resetFilters = () => {
    setSearchFilters({
      name: "",
      treatment: "",
      facility: "",
      location: "",
    });
    setFilteredTreatments([]);
  };

  return (
    <div>
      <PageHeader title={title} routes={routes} />

      <SpecialtySearchForm
        categories={data.filters?.categories || []}
        facilities={data.filters?.facilities || []}
        treatments={data.filters?.treatments || []}
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        activeCategory={activeCategory}
        applyFilters={applyFilters}
        setActiveCategory={setActiveCategory}
        resetFilters={resetFilters}
        specialtyName={data.specialty.name}
      />

      <SpecialtyResults
        doctors={filteredDoctors}
        hospitals={filteredHospitals}
        treatments={filteredTreatments}
        activeCategory={activeCategory}
        specialtyName={data.specialty.name}
      />

      <TrustedBy />
    </div>
  );
};

export default CardiologyPage;
