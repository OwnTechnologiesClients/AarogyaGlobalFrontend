"use client";
import React, { useState } from "react";
import { getPageHeaderData } from "@/utils/navigationUtils";
import PageHeader from "@/components/layout/PageHeader";
import SpecialtySearchForm from "@/components/SpecialtySearch/SpecialtySearchForm";
import SpecialtyResults from "@/components/SpecialtySearch/SpecialtyResults";
import TrustedBy from "@/components/home/TrustedBy";
import neurologyData from "@/data/specialties/neurology.json";

const NeurologyPage = () => {
  const { title, routes } = getPageHeaderData('/specialties/neurology');

  const [searchFilters, setSearchFilters] = useState({
    name: "",
    treatment: "",
    facility: "",
    location: "",
  });

  const [isFilter, setIsFilter] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const [filteredDoctors, setFilteredDoctors] = useState(neurologyData.doctors);
  const [filteredHospitals, setFilteredHospitals] = useState(neurologyData.hospitals);
  const [filteredTreatments, setFilteredTreatments] = useState(neurologyData.treatments);

  const applyFilters = () => {
    let doctors = [...neurologyData.doctors];
    let hospitals = [...neurologyData.hospitals];
    let treatments = [...neurologyData.treatments];

    // Apply name filter
    if (searchFilters.name) {
      doctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchFilters.name.toLowerCase())
      );
      hospitals = hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchFilters.name.toLowerCase())
      );
      treatments = treatments.filter((treatment) =>
        treatment.name.toLowerCase().includes(searchFilters.name.toLowerCase())
      );
    }

    // Apply treatment filter
    if (searchFilters.treatment) {
      doctors = doctors.filter((doctor) =>
        doctor.treatments?.includes(searchFilters.treatment)
      );
      hospitals = hospitals.filter((hospital) =>
        hospital.treatments?.includes(searchFilters.treatment)
      );
      treatments = treatments.filter((treatment) =>
        treatment.name === searchFilters.treatment
      );
    }

    // Apply facility filter
    if (searchFilters.facility) {
      hospitals = hospitals.filter((hospital) =>
        hospital.facilities?.includes(searchFilters.facility)
      );
    }

    // Apply location filter
    if (searchFilters.location) {
      doctors = doctors.filter((doctor) =>
        doctor.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
      hospitals = hospitals.filter((hospital) =>
        hospital.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    setFilteredDoctors(doctors);
    setFilteredHospitals(hospitals);
    setFilteredTreatments(treatments);
    setIsFilter(!isFilter);
  };

  const resetFilters = () => {
    setSearchFilters({
      name: "",
      treatment: "",
      facility: "",
      location: "",
    });
    setActiveCategory("All");
    setFilteredDoctors(neurologyData.doctors);
    setFilteredHospitals(neurologyData.hospitals);
    setFilteredTreatments(neurologyData.treatments);
    setIsFilter(!isFilter);
  };

  return (
    <div>
      <PageHeader title={title} routes={routes} />

      <SpecialtySearchForm
        categories={neurologyData.filters.categories}
        facilities={neurologyData.filters.facilities}
        treatments={neurologyData.filters.treatments}
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        activeCategory={activeCategory}
        applyFilters={applyFilters}
        setActiveCategory={setActiveCategory}
        resetFilters={resetFilters}
        specialtyName={neurologyData.specialty.name}
      />

      <SpecialtyResults
        doctors={filteredDoctors}
        hospitals={filteredHospitals}
        treatments={filteredTreatments}
        activeCategory={activeCategory}
        isFilter={isFilter}
        specialtyName={neurologyData.specialty.name}
      />

      <TrustedBy />
    </div>
  );
};

export default NeurologyPage;
