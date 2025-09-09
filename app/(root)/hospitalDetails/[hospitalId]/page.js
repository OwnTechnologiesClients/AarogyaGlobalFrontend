import React from 'react';
import dataService from '@/lib/dataService';
import HospitalDetailsClient from './HospitalDetailsClient';

export async function generateStaticParams() {
  // Always return the key hospitals - this ensures they are always included
  // Updated to include all 8 hospitals including HBEN002
  const keyHospitals = [
    "HDEL0001",
    "HDEL0002",
    "HDEL0003",
    "HDEL0004",
    "HCHE001",
    "HMUM001",
    "HBEN001",
    "HBEN002"
  ];

  console.log('Generating static params for hospitals:', keyHospitals);
  console.log('Total hospitals:', keyHospitals.length);

  // Return the key hospitals immediately - this is the most reliable approach
  const result = keyHospitals.map(hospitalId => ({ hospitalId }));
  console.log('Static params result:', result);
  console.log('Result length:', result.length);

  // Verify HBEN002 is included
  const hasHBEN002 = result.some(r => r.hospitalId === "HBEN002");
  console.log('HBEN002 included:', hasHBEN002);

  if (!hasHBEN002) {
    console.error('ERROR: HBEN002 not found in result!');
  }

  return result;
}

export default function HospitalDetailsPage({ params }) {
  const hospital = dataService.getHospitalById(params.hospitalId);
  return <HospitalDetailsClient params={params} hospital={hospital} />;
} 