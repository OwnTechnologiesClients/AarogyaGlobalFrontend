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
      console.warn('No doctors found from API, using fallback IDs');
      // Fallback to some common doctor IDs if API fails
      const fallbackDoctors = [
    'DOC0001', 'DOC0002', 'DOC0003', 'DOC0004', 'DOC0005', 'DOC0006', 'DOC0007', 'DOC0008', 'DOC0009', 'DOC0010',
    'DOC0011', 'DOC0012', 'DOC0013', 'DOC0014', 'DOC0015', 'DOC0016', 'DOC0017', 'DOC0018', 'DOC0019', 'DOC0020',
    'DOC0021', 'DOC0022', 'DOC0023', 'DOC0024', 'DOC0025', 'DOC0026', 'DOC0027', 'DOC0028', 'DOC0029', 'DOC0030'
  ];
      return fallbackDoctors.map(doctorId => ({ doctorId }));
    }

    // Extract doctor IDs from the API response
    const doctorIds = doctors.map(doctor => doctor.id).filter(Boolean);
    
    console.log('Generating static params for doctors from API:', doctorIds);
    console.log('Total doctors from API:', doctorIds.length);

    return doctorIds.map(doctorId => ({ doctorId }));
  } catch (error) {
    console.error('Error fetching doctors for static params:', error);
    
    // Fallback to some common doctor IDs if API fails
    const fallbackDoctors = [
      'DOC0001', 'DOC0002', 'DOC0003', 'DOC0004', 'DOC0005', 'DOC0006', 'DOC0007', 'DOC0008', 'DOC0009', 'DOC0010',
      'DOC0011', 'DOC0012', 'DOC0013', 'DOC0014', 'DOC0015', 'DOC0016', 'DOC0017', 'DOC0018', 'DOC0019', 'DOC0020',
      'DOC0021', 'DOC0022', 'DOC0023', 'DOC0024', 'DOC0025', 'DOC0026', 'DOC0027', 'DOC0028', 'DOC0029', 'DOC0030'
    ];
    
    console.log('Using fallback doctor IDs:', fallbackDoctors);
    return fallbackDoctors.map(doctorId => ({ doctorId }));
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
