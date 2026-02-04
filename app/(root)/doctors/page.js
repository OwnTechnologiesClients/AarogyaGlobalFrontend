"use client";

import React, { useState, useEffect } from 'react';
import Wrapper from '@/components/layout/Wrapper';
import PageHeader from '@/components/layout/PageHeader';
import DoctorsSearchForm from '@/components/Doctors/DoctorsSearchForm';
import DoctorsResults from '@/components/Doctors/DoctorsResults';
import dataService from '@/lib/dataService';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, totalPages: 1 });
  const [searchFilters, setSearchFilters] = useState({
    name: '',
    category: '',
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
        const res = await dataService.getDoctorsPaginated({ 
          page: 1, 
          limit: 6,
          search: searchFilters.name || undefined,
          category: searchFilters.category || undefined,
          specialty: searchFilters.specialty || undefined,
          location: searchFilters.location || undefined
        });
        setDoctors(res.data);
        setPagination(res.pagination);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Fallback to empty array if API fails
        setDoctors([]);
        setPagination({ page: 1, limit: 6, total: 0, totalPages: 1 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Apply filters (server-side)
  const applyFilters = async () => {
    setIsLoading(true);
    try {
      const res = await dataService.getDoctorsPaginated({ 
        page: 1, 
        limit: 6,
        search: searchFilters.name || undefined,
        category: searchFilters.category || undefined,
        specialty: searchFilters.specialty || undefined,
        location: searchFilters.location || undefined
      });
      setDoctors(res.data);
      setPagination(res.pagination);
    } catch (e) {
      setDoctors([]);
      setPagination({ page: 1, limit: 6, total: 0, totalPages: 1 });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset filters
  const resetFilters = async () => {
    setSearchFilters({
      name: '',
      category: '',
      specialty: '',
      location: '',
      hospital: ''
    });
    setIsLoading(true);
    try {
      const res = await dataService.getDoctorsPaginated({ page: 1, limit: 6 });
      setDoctors(res.data);
      setPagination(res.pagination);
    } finally {
      setIsLoading(false);
    }
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
          categories={['Cardiology', 'Orthopaedics', 'Neurology', 'Oncology']}
          specialties={getUniqueSpecialties()}
          locations={getUniqueLocations()}
          hospitals={getUniqueHospitals()}
          isLoading={isLoading}
        />
        
        <DoctorsResults
          doctors={doctors}
          totalDoctors={pagination.total}
          isLoading={isLoading}
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={async (nextPage) => {
            if (nextPage < 1 || nextPage > pagination.totalPages) return;
            setIsLoading(true);
            try {
              const res = await dataService.getDoctorsPaginated({ 
                page: nextPage, 
                limit: pagination.limit,
                search: searchFilters.name || undefined,
                category: searchFilters.category || undefined,
                specialty: searchFilters.specialty || undefined,
                location: searchFilters.location || undefined
              });
              setDoctors(res.data);
              setPagination(res.pagination);
            } finally {
              setIsLoading(false);
            }
          }}
        />
      </div>
    </Wrapper>
  );
} 