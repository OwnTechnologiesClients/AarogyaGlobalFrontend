import React from 'react';
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import DoctorProfile from "@/components/DoctorDetails/DoctorProfile";

import dataService from '@/lib/dataService';

export async function generateStaticParams() {
  try {
    // Fetch doctor IDs from the backend API
    const doctors = await dataService.getAllUniqueDoctors();
    
    if (!doctors || doctors.length === 0) {
      console.warn('No doctors found from API');
      return [];
    }

    // Extract doctor IDs from the API response
    const doctorIds = doctors.map(doctor => doctor.id).filter(Boolean);
    
    console.log('Generating static params for doctors from API:', doctorIds);
    console.log('Total doctors from API:', doctorIds.length);

    return doctorIds.map(doctorId => ({ doctorId }));
  } catch (error) {
    console.error('Error fetching doctors for static params:', error);
    return [];
  }
}

export default async function DoctorDetailsPage({ params }) {
  const { doctorId } = await params;
  console.log('DoctorDetailsPage: Received doctorId:', doctorId);

  try {
    const doctor = await dataService.getDoctorById(doctorId);
  console.log('DoctorDetailsPage: Found doctor:', doctor ? doctor.name : 'Not found');

  const { title, routes } = getPageHeaderData('/doctorDetails');

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Doctor not found</div>
      </div>
    );
  }

  return (
    <>
      <PageHeader title={`${doctor.name} - ${doctor.specialty}`} routes={routes} />
      <DoctorProfile doctor={doctor} />
    </>
  );
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Error loading doctor details</div>
      </div>
    );
  }
} 
