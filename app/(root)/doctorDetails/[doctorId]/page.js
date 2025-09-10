import React from 'react';
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import DoctorProfile from "@/components/DoctorDetails/DoctorProfile";

import dataService from '@/lib/dataService';

export async function generateStaticParams() {
  // For now, return the known doctor IDs directly
  // This ensures the static paths are generated correctly
  // Updated to include DOC0005 (Dr. Sukant Vijay), DOC0006 (Dr. Aman Dua), DOC0007 (Dr. Kaushal Kant Mishra), DOC0008 (Dr. Amite Pankaj Aggarwal), DOC0009 (Dr. Gurinder Bedi), DOC0010 (Dr. Manoj Miglani), DOC0011 (Dr. Narayan Hulse), DOC0012 (Dr. Atul Mishra), DOC0013 (Dr. Dhananjay Gupta), DOC0014 (Dr. Anoop Jhurani), and DOC0015 (Dr. S.K.S. Marya)
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
    { doctorId: 'DOC0010' },
    { doctorId: 'DOC0011' },
    { doctorId: 'DOC0012' },
    { doctorId: 'DOC0013' },
    { doctorId: 'DOC0014' },
    { doctorId: 'DOC0015' }
  ];

  console.log('generateStaticParams: Generated params for doctors:', params);
  console.log('Total doctors in static params:', params.length);

  // Verify DOC0006, DOC0007, DOC0008, DOC0009, DOC0010, DOC0011, DOC0012, DOC0013, DOC0014, and DOC0015 are included
  const hasDOC0006 = params.some(p => p.doctorId === 'DOC0006');
  const hasDOC0007 = params.some(p => p.doctorId === 'DOC0007');
  const hasDOC0008 = params.some(p => p.doctorId === 'DOC0008');
  const hasDOC0009 = params.some(p => p.doctorId === 'DOC0009');
  const hasDOC0010 = params.some(p => p.doctorId === 'DOC0010');
  const hasDOC0011 = params.some(p => p.doctorId === 'DOC0011');
  const hasDOC0012 = params.some(p => p.doctorId === 'DOC0012');
  const hasDOC0013 = params.some(p => p.doctorId === 'DOC0013');
  const hasDOC0014 = params.some(p => p.doctorId === 'DOC0014');
  const hasDOC0015 = params.some(p => p.doctorId === 'DOC0015');
  console.log('DOC0006 included in params:', hasDOC0006);
  console.log('DOC0007 included in params:', hasDOC0007);
  console.log('DOC0008 included in params:', hasDOC0008);
  console.log('DOC0009 included in params:', hasDOC0009);
  console.log('DOC0010 included in params:', hasDOC0010);
  console.log('DOC0011 included in params:', hasDOC0011);
  console.log('DOC0012 included in params:', hasDOC0012);
  console.log('DOC0013 included in params:', hasDOC0013);
  console.log('DOC0014 included in params:', hasDOC0014);
  console.log('DOC0015 included in params:', hasDOC0015);

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
  if (!hasDOC0011) {
    console.error('ERROR: DOC0011 not found in static params!');
  }
  if (!hasDOC0012) {
    console.error('ERROR: DOC0012 not found in static params!');
  }
  if (!hasDOC0013) {
    console.error('ERROR: DOC0013 not found in static params!');
  }
  if (!hasDOC0014) {
    console.error('ERROR: DOC0014 not found in static params!');
  }
  if (!hasDOC0015) {
    console.error('ERROR: DOC0015 not found in static params!');
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
