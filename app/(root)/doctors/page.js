"use client";

import React, { useState, useEffect } from 'react';
import Wrapper from '@/components/layout/Wrapper';
import PageHeader from '@/components/layout/PageHeader';
import DoctorsSearchForm from '@/components/Doctors/DoctorsSearchForm';
import DoctorsResults from '@/components/Doctors/DoctorsResults';
import dataService from '@/lib/dataService';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    name: '',
    specialty: '',
    location: '',
    hospital: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Get all doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const allDoctors = await dataService.getAllUniqueDoctors();
        setDoctors(allDoctors);
        setFilteredDoctors(allDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Fallback to empty array if API fails
        setDoctors([]);
        setFilteredDoctors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Apply filters
  const applyFilters = () => {
    let filtered = [...doctors];

    if (searchFilters.name) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchFilters.name.toLowerCase())
      );
    }

    if (searchFilters.specialty) {
      filtered = filtered.filter(doctor =>
        doctor.specialty.toLowerCase().includes(searchFilters.specialty.toLowerCase())
      );
    }

    if (searchFilters.location) {
      filtered = filtered.filter(doctor =>
        doctor.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    if (searchFilters.hospital) {
      filtered = filtered.filter(doctor =>
        doctor.hospital.toLowerCase().includes(searchFilters.hospital.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchFilters({
      name: '',
      specialty: '',
      location: '',
      hospital: ''
    });
    setFilteredDoctors(doctors);
  };

  // Get unique values for filter options
  const getUniqueSpecialties = () => {
    const specialties = doctors.map(doctor => doctor.specialty);
    return [...new Set(specialties)].sort();
  };

  const getUniqueLocations = () => {
    const locations = doctors.map(doctor => doctor.location);
    return [...new Set(locations)].sort();
  };

  const getUniqueHospitals = () => {
    const hospitals = doctors.map(doctor => doctor.hospital);
    return [...new Set(hospitals)].sort();
  };

  return (
    <Wrapper>
      <PageHeader
        title="All Doctors"
        routes={[
          { label: "Home", href: "/" },
          { label: "Doctors" }
        ]}
      />
      
      <div className="min-h-screen bg-gray-50 ">
        <DoctorsSearchForm
          searchFilters={searchFilters}
          setSearchFilters={setSearchFilters}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
          specialties={getUniqueSpecialties()}
          locations={getUniqueLocations()}
          hospitals={getUniqueHospitals()}
          isLoading={isLoading}
        />
        
        <DoctorsResults
          doctors={filteredDoctors}
          totalDoctors={doctors.length}
          isLoading={isLoading}
        />
      </div>
    </Wrapper>
  );
} 