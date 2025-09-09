import React from 'react';
import dataService from '@/lib/dataService';
import HospitalDetailsClient from './HospitalDetailsClient';

export async function generateStaticParams() {
  // Always return the key hospitals - this ensures they are always included
  // Updated to include all 9 hospitals including HCHE002
  const keyHospitals = [
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

  console.log('Generating static params for hospitals:', keyHospitals);
  console.log('Total hospitals:', keyHospitals.length);

  // Return the key hospitals immediately - this is the most reliable approach
  const result = keyHospitals.map(hospitalId => ({ hospitalId }));
  console.log('Static params result:', result);
  console.log('Result length:', result.length);

  // Verify all hospitals are included
  const hasHDEL0001 = result.some(r => r.hospitalId === "HDEL0001");
  const hasHDEL0002 = result.some(r => r.hospitalId === "HDEL0002");
  const hasHDEL0003 = result.some(r => r.hospitalId === "HDEL0003");
  const hasHDEL0004 = result.some(r => r.hospitalId === "HDEL0004");
  const hasHCHE001 = result.some(r => r.hospitalId === "HCHE001");
  const hasHMUM001 = result.some(r => r.hospitalId === "HMUM001");
  const hasHBEN001 = result.some(r => r.hospitalId === "HBEN001");
  const hasHBEN002 = result.some(r => r.hospitalId === "HBEN002");
  const hasHCHE002 = result.some(r => r.hospitalId === "HCHE002");

  console.log('Hospital verification:');
  console.log('HDEL0001 included:', hasHDEL0001);
  console.log('HDEL0002 included:', hasHDEL0002);
  console.log('HDEL0003 included:', hasHDEL0003);
  console.log('HDEL0004 included:', hasHDEL0004);
  console.log('HCHE001 included:', hasHCHE001);
  console.log('HMUM001 included:', hasHMUM001);
  console.log('HBEN001 included:', hasHBEN001);
  console.log('HBEN002 included:', hasHBEN002);
  console.log('HCHE002 included:', hasHCHE002);

  if (!hasHCHE002) {
    console.error('ERROR: HCHE002 not found in result!');
  }

  return result;
}

export default function HospitalDetailsPage({ params }) {
  const hospital = dataService.getHospitalById(params.hospitalId);
  return <HospitalDetailsClient params={params} hospital={hospital} />;
} 