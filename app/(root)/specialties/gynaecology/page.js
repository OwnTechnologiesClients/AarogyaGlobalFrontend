"use client";
import React, { useState } from "react";
import { getPageHeaderData } from "@/utils/navigationUtils";
import PageHeader from "@/components/layout/PageHeader";
import SpecialtySearchForm from "@/components/SpecialtySearch/SpecialtySearchForm";
import SpecialtyResults from "@/components/SpecialtySearch/SpecialtyResults";
import TrustedBy from "@/components/home/TrustedBy";
import dataService from "@/lib/dataService";

const GynaecologyPage = () => {
  const { title, routes } = getPageHeaderData('/specialties/gynaecology');
  const data = dataService.getSpecialtyData('gynaecology');

  // Handle case when data is not available
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Data not available</div>
      </div>
    );
  }

  const [searchFilters, setSearchFilters] = useState({
    name: "",
    treatment: "",
    facility: "",
    location: "",
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const [filteredDoctors, setFilteredDoctors] = useState(data.doctors || []);
  const [filteredHospitals, setFilteredHospitals] = useState(data.hospitals || []);
  const [filteredTreatments, setFilteredTreatments] = useState(data.treatments || []);

  const applyFilters = () => {
    let doctors = [...(data.doctors || [])];
    let hospitals = [...(data.hospitals || [])];
    let treatments = [...(data.treatments || [])];

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
  };

  const resetFilters = () => {
    setSearchFilters({
      name: "",
      treatment: "",
      facility: "",
      location: "",
    });
    setActiveCategory("All");
    setFilteredDoctors(data.doctors || []);
    setFilteredHospitals(data.hospitals || []);
    setFilteredTreatments(data.treatments || []);
  };

  return (
    <div>
      <PageHeader title={title} routes={routes} />

      <SpecialtySearchForm
        categories={data.filters.categories}
        facilities={data.filters.facilities}
        treatments={data.filters.treatments}
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

export default GynaecologyPage;
