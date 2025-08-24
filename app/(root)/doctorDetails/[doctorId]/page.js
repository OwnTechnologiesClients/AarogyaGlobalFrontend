import React from 'react';
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import DoctorProfile from "@/components/DoctorDetails/DoctorProfile";
import RelatedSpecialists from "@/components/DoctorDetails/RelatedSpecialists";
import dataService from '@/lib/dataService';

export async function generateStaticParams() {
  // For now, return the known doctor IDs directly
  // This ensures the static paths are generated correctly
  const params = [
    { doctorId: 'DOC0001' },
    { doctorId: 'DOC0002' },
    { doctorId: 'DOC0003' },
    { doctorId: 'DOC0004' }
  ];

  console.log('generateStaticParams: Generated params:', params);
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
      <RelatedSpecialists currentDoctorId={doctor.id} />
    </>
  );
} 
