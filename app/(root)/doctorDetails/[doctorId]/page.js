import React from 'react';
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import DoctorProfile from "@/components/DoctorDetails/DoctorProfile";

import dataService from '@/lib/dataService';

export async function generateStaticParams() {
  // For now, return the known doctor IDs directly
  // This ensures the static paths are generated correctly
  // Updated to include DOC0005 (Dr. Sukant Vijay), DOC0006 (Dr. Aman Dua), DOC0007 (Dr. Kaushal Kant Mishra), DOC0008 (Dr. Amite Pankaj Aggarwal), DOC0009 (Dr. Gurinder Bedi), DOC0010 (Dr. Manoj Miglani), DOC0011 (Dr. Narayan Hulse), DOC0012 (Dr. Atul Mishra), DOC0013 (Dr. Dhananjay Gupta), DOC0014 (Dr. Anoop Jhurani), DOC0015 (Dr. S.K.S. Marya), DOC0016 (Dr. Ramneek Mahajan), DOC0017 (Dr. Anil Arora), DOC0018 (Dr. Pradeep B. Bhosale), DOC0019 (Dr. Sujoy Bhattacharjee), DOC0020 (Dr. Bhushan Nariani), DOC0021 (Dr. H.N. Bajaj), DOC0022 (Dr. B.S. Murthy), DOC0023 (Dr. Rakesh Mahajan), DOC0024 (Dr. L. Tomar), DOC0025 (Dr. Ishwar Bohra), and DOC0026 (Dr. Sanjay Gupta)
  // Force recompilation by updating comment - DOC0026 fix applied

  // Create params array with all doctor IDs including DOC0022, DOC0023, DOC0024, DOC0025, DOC0026, DOC0027, DOC0028, DOC0029, and DOC0030
  const doctorIds = [
    'DOC0001', 'DOC0002', 'DOC0003', 'DOC0004', 'DOC0005', 'DOC0006', 'DOC0007', 'DOC0008', 'DOC0009', 'DOC0010',
    'DOC0011', 'DOC0012', 'DOC0013', 'DOC0014', 'DOC0015', 'DOC0016', 'DOC0017', 'DOC0018', 'DOC0019', 'DOC0020',
    'DOC0021', 'DOC0022', 'DOC0023', 'DOC0024', 'DOC0025', 'DOC0026', 'DOC0027', 'DOC0028', 'DOC0029', 'DOC0030'
  ];

  const params = doctorIds.map(doctorId => ({ doctorId }));

  console.log('generateStaticParams: Generated params for doctors:', params);
  console.log('Total doctors in static params:', params.length);
  console.log('DOC0022 specifically included:', params.some(p => p.doctorId === 'DOC0022'));
  console.log('DOC0026 specifically included:', params.some(p => p.doctorId === 'DOC0026'));

  // Explicit check for DOC0022
  const doc0022Param = params.find(p => p.doctorId === 'DOC0022');
  console.log('DOC0022 param object:', doc0022Param);

  if (!doc0022Param) {
    console.error('CRITICAL ERROR: DOC0022 not found in params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
    // Force add DOC0022 if missing
    params.push({ doctorId: 'DOC0022' });
    console.log('Added DOC0022 to params:', params[params.length - 1]);
  }

  // Explicit check for DOC0026
  const doc0026Param = params.find(p => p.doctorId === 'DOC0026');
  console.log('DOC0026 param object:', doc0026Param);

  if (!doc0026Param) {
    console.error('CRITICAL ERROR: DOC0026 not found in params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
    // Force add DOC0026 if missing
    params.push({ doctorId: 'DOC0026' });
    console.log('Added DOC0026 to params:', params[params.length - 1]);
  }

  // Verify DOC0006, DOC0007, DOC0008, DOC0009, DOC0010, DOC0011, DOC0012, DOC0013, DOC0014, DOC0015, DOC0016, DOC0017, DOC0018, DOC0019, DOC0020, DOC0021, DOC0022, DOC0023, DOC0024, DOC0025, DOC0026, DOC0027, DOC0028, DOC0029, and DOC0030 are included
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
  const hasDOC0016 = params.some(p => p.doctorId === 'DOC0016');
  const hasDOC0017 = params.some(p => p.doctorId === 'DOC0017');
  const hasDOC0018 = params.some(p => p.doctorId === 'DOC0018');
  const hasDOC0019 = params.some(p => p.doctorId === 'DOC0019');
  const hasDOC0020 = params.some(p => p.doctorId === 'DOC0020');
  const hasDOC0021 = params.some(p => p.doctorId === 'DOC0021');
  const hasDOC0022 = params.some(p => p.doctorId === 'DOC0022');
  const hasDOC0023 = params.some(p => p.doctorId === 'DOC0023');
  const hasDOC0024 = params.some(p => p.doctorId === 'DOC0024');
  const hasDOC0025 = params.some(p => p.doctorId === 'DOC0025');
  const hasDOC0026 = params.some(p => p.doctorId === 'DOC0026');
  const hasDOC0027 = params.some(p => p.doctorId === 'DOC0027');
  const hasDOC0028 = params.some(p => p.doctorId === 'DOC0028');
  const hasDOC0029 = params.some(p => p.doctorId === 'DOC0029');
  const hasDOC0030 = params.some(p => p.doctorId === 'DOC0030');
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
  console.log('DOC0016 included in params:', hasDOC0016);
  console.log('DOC0017 included in params:', hasDOC0017);
  console.log('DOC0018 included in params:', hasDOC0018);
  console.log('DOC0019 included in params:', hasDOC0019);
  console.log('DOC0020 included in params:', hasDOC0020);
  console.log('DOC0021 included in params:', hasDOC0021);
  console.log('DOC0022 included in params:', hasDOC0022);
  console.log('DOC0023 included in params:', hasDOC0023);
  console.log('DOC0024 included in params:', hasDOC0024);
  console.log('DOC0025 included in params:', hasDOC0025);
  console.log('DOC0026 included in params:', hasDOC0026);
  console.log('DOC0027 included in params:', hasDOC0027);
  console.log('DOC0028 included in params:', hasDOC0028);
  console.log('DOC0029 included in params:', hasDOC0029);
  console.log('DOC0030 included in params:', hasDOC0030);

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
  if (!hasDOC0016) {
    console.error('ERROR: DOC0016 not found in static params!');
  }
  if (!hasDOC0017) {
    console.error('ERROR: DOC0017 not found in static params!');
  }
  if (!hasDOC0018) {
    console.error('ERROR: DOC0018 not found in static params!');
  }
  if (!hasDOC0019) {
    console.error('ERROR: DOC0019 not found in static params!');
  }
  if (!hasDOC0020) {
    console.error('ERROR: DOC0020 not found in static params!');
  }
  if (!hasDOC0021) {
    console.error('ERROR: DOC0021 not found in static params!');
  }
  if (!hasDOC0022) {
    console.error('ERROR: DOC0022 not found in static params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
  }
  if (!hasDOC0023) {
    console.error('ERROR: DOC0023 not found in static params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
  }
  if (!hasDOC0024) {
    console.error('ERROR: DOC0024 not found in static params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
  }
  if (!hasDOC0025) {
    console.error('ERROR: DOC0025 not found in static params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
  }
  if (!hasDOC0026) {
    console.error('ERROR: DOC0026 not found in static params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
  }
  if (!hasDOC0027) {
    console.error('ERROR: DOC0027 not found in static params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
  }
  if (!hasDOC0028) {
    console.error('ERROR: DOC0028 not found in static params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
  }
  if (!hasDOC0029) {
    console.error('ERROR: DOC0029 not found in static params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
  }
  if (!hasDOC0030) {
    console.error('ERROR: DOC0030 not found in static params!');
    console.error('Available doctor IDs:', params.map(p => p.doctorId));
  }

  // Additional verification for DOC0022
  const doc0022Index = params.findIndex(p => p.doctorId === 'DOC0022');
  console.log('DOC0022 found at index:', doc0022Index);
  console.log('DOC0022 object:', params[doc0022Index]);

  // Additional verification for DOC0026
  const doc0026Index = params.findIndex(p => p.doctorId === 'DOC0026');
  console.log('DOC0026 found at index:', doc0026Index);
  console.log('DOC0026 object:', params[doc0026Index]);

  // Additional verification for DOC0027
  const doc0027Index = params.findIndex(p => p.doctorId === 'DOC0027');
  console.log('DOC0027 found at index:', doc0027Index);
  console.log('DOC0027 object:', params[doc0027Index]);

  // Additional verification for DOC0028
  const doc0028Index = params.findIndex(p => p.doctorId === 'DOC0028');
  console.log('DOC0028 found at index:', doc0028Index);
  console.log('DOC0028 object:', params[doc0028Index]);

  // Additional verification for DOC0029
  const doc0029Index = params.findIndex(p => p.doctorId === 'DOC0029');
  console.log('DOC0029 found at index:', doc0029Index);
  console.log('DOC0029 object:', params[doc0029Index]);

  // Additional verification for DOC0030
  const doc0030Index = params.findIndex(p => p.doctorId === 'DOC0030');
  console.log('DOC0030 found at index:', doc0030Index);
  console.log('DOC0030 object:', params[doc0030Index]);

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
