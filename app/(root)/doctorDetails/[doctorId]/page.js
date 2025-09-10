import React from 'react';
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import DoctorProfile from "@/components/DoctorDetails/DoctorProfile";

import dataService from '@/lib/dataService';

export async function generateStaticParams() {
  // For now, return the known doctor IDs directly
  // This ensures the static paths are generated correctly
  // Updated to include DOC0005 (Dr. Sukant Vijay), DOC0006 (Dr. Aman Dua), DOC0007 (Dr. Kaushal Kant Mishra), DOC0008 (Dr. Amite Pankaj Aggarwal), DOC0009 (Dr. Gurinder Bedi), and DOC0010 (Dr. Manoj Miglani)
  // Force recompilation by updating comment
  const params = [
    { doctorId: 'DOC0001' },
    { doctorId: 'DOC0002' },
    { doctorId: 'DOC0003' },
    { doctorId: 'DOC0004' },
    { doctorId: 'DOC0005' },
    { doctorId: 'DOC0006' },
    { doctorId: 'DOC0007' },
    { doctorId: 'DOC0008' },
    { doctorId: 'DOC0009' },
    { doctorId: 'DOC0010' }
  ];

  console.log('generateStaticParams: Generated params for doctors:', params);
  console.log('Total doctors in static params:', params.length);

  // Verify DOC0006, DOC0007, DOC0008, DOC0009, and DOC0010 are included
  const hasDOC0006 = params.some(p => p.doctorId === 'DOC0006');
  const hasDOC0007 = params.some(p => p.doctorId === 'DOC0007');
  const hasDOC0008 = params.some(p => p.doctorId === 'DOC0008');
  const hasDOC0009 = params.some(p => p.doctorId === 'DOC0009');
  const hasDOC0010 = params.some(p => p.doctorId === 'DOC0010');
  console.log('DOC0006 included in params:', hasDOC0006);
  console.log('DOC0007 included in params:', hasDOC0007);
  console.log('DOC0008 included in params:', hasDOC0008);
  console.log('DOC0009 included in params:', hasDOC0009);
  console.log('DOC0010 included in params:', hasDOC0010);

  if (!hasDOC0006) {
    console.error('ERROR: DOC0006 not found in static params!');
  }
  if (!hasDOC0007) {
    console.error('ERROR: DOC0007 not found in static params!');
  }
  if (!hasDOC0008) {
    console.error('ERROR: DOC0008 not found in static params!');
  }
  if (!hasDOC0009) {
    console.error('ERROR: DOC0009 not found in static params!');
  }
  if (!hasDOC0010) {
    console.error('ERROR: DOC0010 not found in static params!');
  }

  return params;
}

export default async function DoctorDetailsPage({ params }) {
  const { doctorId } = await params;
  console.log('DoctorDetailsPage: Received doctorId:', doctorId);

  const doctor = dataService.getDoctorById(doctorId);
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
} 
