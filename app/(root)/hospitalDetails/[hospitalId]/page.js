import React from 'react';
import dataService from '@/lib/dataService';
import HospitalDetailsClient from './HospitalDetailsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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