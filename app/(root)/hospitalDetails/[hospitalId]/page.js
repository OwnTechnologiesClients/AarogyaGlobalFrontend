import React from 'react';
import dataService from '@/lib/dataService';
import HospitalDetailsClient from './HospitalDetailsClient';

export async function generateStaticParams() {
  try {
    // Fetch hospital IDs from the backend API
    const hospitals = await dataService.getAllUniqueHospitals();
    
    if (!hospitals || hospitals.length === 0) {
      console.warn('No hospitals found from API, using fallback IDs');
      // Fallback to some common hospital IDs if API fails
      const fallbackHospitals = [
        "HDEL0001",
        "HDEL0002", 
        "HDEL0003",
        "HDEL0004",
        "HCHE001",
        "HMUM001",
        "HBEN001",
        "HBEN002",
        "HCHE002"
      ];
      return fallbackHospitals.map(hospitalId => ({ hospitalId }));
    }

    // Extract hospital IDs from the API response
    const hospitalIds = hospitals.map(hospital => hospital.id).filter(Boolean);
    
    console.log('Generating static params for hospitals from API:', hospitalIds);
    console.log('Total hospitals from API:', hospitalIds.length);

    return hospitalIds.map(hospitalId => ({ hospitalId }));
  } catch (error) {
    console.error('Error fetching hospitals for static params:', error);
    
    // Fallback to some common hospital IDs if API fails
    const fallbackHospitals = [
      "HDEL0001",
      "HDEL0002",
      "HDEL0003", 
      "HDEL0004",
      "HCHE001",
      "HMUM001",
      "HBEN001",
      "HBEN002",
      "HCHE002"
    ];
    
    console.log('Using fallback hospital IDs:', fallbackHospitals);
    return fallbackHospitals.map(hospitalId => ({ hospitalId }));
  }
}

export default async function HospitalDetailsPage({ params }) {
  try {
    // Await params before using its properties (Next.js 15 requirement)
    const resolvedParams = await params;
    const hospital = await dataService.getHospitalById(resolvedParams.hospitalId);
    return <HospitalDetailsClient params={resolvedParams} hospital={hospital} />;
  } catch (error) {
    console.error('Error fetching hospital details:', error);
    const resolvedParams = await params;
    return <HospitalDetailsClient params={resolvedParams} hospital={null} />;
  }
} 