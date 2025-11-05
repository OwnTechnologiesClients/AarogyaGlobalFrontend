import React from 'react';
import dataService from '@/lib/dataService';
import HospitalDetailsClient from './HospitalDetailsClient';

export async function generateStaticParams() {
  try {
    // Fetch hospital IDs from the backend API
    const hospitals = await dataService.getAllUniqueHospitals();
    
    if (!hospitals || hospitals.length === 0) {
      console.warn('No hospitals found from API');
      return [];
    }

    // Extract hospital IDs from the API response and sanitize them
    const hospitalIds = hospitals
      .map(hospital => hospital.id)
      .filter(Boolean)
      .map(id => {
        // Convert to URL-safe format: uppercase, replace spaces with underscores, remove special chars
        return id
          .toString()
          .toUpperCase()
          .replace(/\s+/g, '_')
          .replace(/[^A-Z0-9_-]/g, '');
      });
    
    console.log('Generating static params for hospitals from API:', hospitalIds);
    console.log('Total hospitals from API:', hospitalIds.length);

    return hospitalIds.map(hospitalId => ({ hospitalId }));
  } catch (error) {
    console.error('Error fetching hospitals for static params:', error);
    return [];
  }
}

export default async function HospitalDetailsPage({ params }) {
  try {
    // Await params before using its properties (Next.js 15 requirement)
    const resolvedParams = await params;
    
    // Decode URL-encoded hospital ID and try multiple variations
    const hospitalId = decodeURIComponent(resolvedParams.hospitalId);
    
    // Try to fetch hospital with the decoded ID first, then try original
    let hospital = null;
    try {
      hospital = await dataService.getHospitalById(hospitalId);
    } catch (e) {
      // If decoded fails, try with original ID
      hospital = await dataService.getHospitalById(resolvedParams.hospitalId);
    }
    
    return <HospitalDetailsClient params={resolvedParams} hospital={hospital} />;
  } catch (error) {
    console.error('Error fetching hospital details:', error);
    const resolvedParams = await params;
    return <HospitalDetailsClient params={resolvedParams} hospital={null} />;
  }
} 