import React from 'react';
import dataService from '@/lib/dataService';
import HospitalDetailsClient from './HospitalDetailsClient';

export async function generateStaticParams() {
  try {
    console.log('DataService data keys:', Object.keys(dataService.data));

    // Always ensure key hospitals are included first
    const keyHospitals = ["HDEL0001", "HDEL0002", "HDEL0003", "HDEL0004", "HCHE001", "HMUM001"];
    let result = keyHospitals.map(hospitalId => ({ hospitalId }));

    const allHospitals = [];

    // Get hospitals from all specialties
    if (dataService.data.specialties) {
      for (const specialty of Object.values(dataService.data.specialties)) {
        if (specialty.hospitals) {
          allHospitals.push(...specialty.hospitals);
        }
      }
    }

    // Add global hospitals
    if (dataService.data.globalHospitals) {
      allHospitals.push(...dataService.data.globalHospitals);
      console.log('Global hospitals added:', dataService.data.globalHospitals.map(h => ({ id: h.id, name: h.name })));
    }

    // Debug logging
    console.log('Total hospitals found:', allHospitals.length);
    console.log('Global hospitals count:', dataService.data.globalHospitals?.length || 0);

    // Deduplicate by ID and add any additional hospitals
    const seenIds = new Set(keyHospitals);

    for (const hospital of allHospitals) {
      if (hospital && hospital.id && !seenIds.has(hospital.id)) {
        seenIds.add(hospital.id);
        result.push({ hospitalId: hospital.id.toString() });
      }
    }

    console.log('Final result:', result);
    console.log('Total unique hospitals:', result.length);
    return result;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Fallback to ensure we at least generate some params
    return [
      { hospitalId: "HDEL0001" },
      { hospitalId: "HDEL0002" },
      { hospitalId: "HDEL0003" },
      { hospitalId: "HDEL0004" },
      { hospitalId: "HCHE001" },
      { hospitalId: "HMUM001" }
    ];
  }
}

export default function HospitalDetailsPage({ params }) {
  const hospital = dataService.getHospitalById(params.hospitalId);
  return <HospitalDetailsClient params={params} hospital={hospital} />;
} 