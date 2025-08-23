import React from 'react';
import dataService from '@/lib/dataService';
import HospitalDetailsClient from './HospitalDetailsClient';

export async function generateStaticParams() {
  const allHospitals = [];

  // Get hospitals from all specialties
  for (const specialty of Object.values(dataService.data.specialties)) {
    allHospitals.push(...(specialty.hospitals || []));
  }

  // Add global hospitals
  allHospitals.push(...(dataService.data.globalHospitals || []));

  // Deduplicate by ID (keep the first occurrence)
  const uniqueHospitals = [];
  const seenIds = new Set();

  for (const hospital of allHospitals) {
    if (!seenIds.has(hospital.id)) {
      seenIds.add(hospital.id);
      uniqueHospitals.push(hospital);
    }
  }

  return uniqueHospitals.slice(0, 15).map((hospital) => ({
    hospitalId: hospital.id.toString(),
  }));
}

export default function HospitalDetailsPage({ params }) {
  const hospital = dataService.getHospitalById(parseInt(params.hospitalId));
  return <HospitalDetailsClient params={params} hospital={hospital} />;
} 