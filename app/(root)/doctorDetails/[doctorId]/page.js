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

    // Extract doctor IDs from the API response and sanitize them
    const doctorIds = doctors
      .map(doctor => doctor.id)
      .filter(Boolean)
      .map(id => {
        // Convert to URL-safe format: uppercase, replace spaces with underscores, remove special chars
        return id
          .toString()
          .toUpperCase()
          .replace(/\s+/g, '_')
          .replace(/[^A-Z0-9_-]/g, '');
      });
    
    console.log('Generating static params for doctors from API:', doctorIds);
    console.log('Total doctors from API:', doctorIds.length);

    return doctorIds.map(doctorId => ({ doctorId }));
  } catch (error) {
    console.error('Error fetching doctors for static params:', error);
    return [];
  }
}

export default async function DoctorDetailsPage({ params }) {
  try {
    const resolvedParams = await params;
    const doctorId = decodeURIComponent(resolvedParams.doctorId);
    console.log('DoctorDetailsPage: Received doctorId:', doctorId);

    let doctor = null;
    try {
      // Try with decoded ID first
      doctor = await dataService.getDoctorById(doctorId);
    } catch (e) {
      // Fallback: try with original (potentially URL-encoded) ID
      doctor = await dataService.getDoctorById(resolvedParams.doctorId);
    }
    
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
