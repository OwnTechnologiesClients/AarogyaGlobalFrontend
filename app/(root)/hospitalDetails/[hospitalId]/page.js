import React from 'react';
import dataService from '@/lib/dataService';
import HospitalDetailsClient from './HospitalDetailsClient';

export async function generateStaticParams() {
  try {
    console.log('DataService data keys:', Object.keys(dataService.data));
    console.log('Global hospitals data:', dataService.data.globalHospitals);

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
    console.log('First few hospitals:', allHospitals.slice(0, 3).map(h => ({ id: h.id, name: h.name })));
    console.log('All hospital IDs:', allHospitals.map(h => h.id));

    // Deduplicate by ID (keep the first occurrence)
    const uniqueHospitals = [];
    const seenIds = new Set();

    for (const hospital of allHospitals) {
      if (hospital && hospital.id && !seenIds.has(hospital.id)) {
        seenIds.add(hospital.id);
        uniqueHospitals.push(hospital);
      }
    }

    console.log('Unique hospitals count:', uniqueHospitals.length);
    console.log('Unique hospital IDs:', uniqueHospitals.slice(0, 5).map(h => h.id));

    let result = uniqueHospitals.map((hospital) => ({
      hospitalId: hospital.id.toString(),
    }));

    // Ensure key hospitals are included
    const keyHospitals = ["HDEL0001", "HDEL0002", "HDEL0003", "HDEL0004", "HCHE001"];
    for (const hospitalId of keyHospitals) {
      if (!result.some(r => r.hospitalId === hospitalId)) {
        result.unshift({ hospitalId });
        console.log(`Added ${hospitalId} to result`);
      }
    }

    console.log('Final result:', result);
    return result;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Fallback to ensure we at least generate some params
    return [
      { hospitalId: "HDEL0001" },
      { hospitalId: "HDEL0002" },
      { hospitalId: "HDEL0003" },
      { hospitalId: "HDEL0004" },
      { hospitalId: "HCHE001" }
    ];
  }
}

export default function HospitalDetailsPage({ params }) {
  const hospital = dataService.getHospitalById(params.hospitalId);
  return <HospitalDetailsClient params={params} hospital={hospital} />;
} 