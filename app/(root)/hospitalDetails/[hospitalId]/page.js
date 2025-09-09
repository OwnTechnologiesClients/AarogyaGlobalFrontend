import React from 'react';
import dataService from '@/lib/dataService';
import HospitalDetailsClient from './HospitalDetailsClient';

export async function generateStaticParams() {
  // Always return the key hospitals - this ensures they are always included
  const keyHospitals = ["HDEL0001", "HDEL0002", "HDEL0003", "HDEL0004", "HCHE001", "HMUM001", "HBEN001"];

  console.log('Generating static params for hospitals:', keyHospitals);

  // Return the key hospitals immediately - this is the most reliable approach
  const result = keyHospitals.map(hospitalId => ({ hospitalId }));
  console.log('Static params result:', result);

  return result;
}

export default function HospitalDetailsPage({ params }) {
  const hospital = dataService.getHospitalById(params.hospitalId);
  return <HospitalDetailsClient params={params} hospital={hospital} />;
} 