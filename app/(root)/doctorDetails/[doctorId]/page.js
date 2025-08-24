import React from 'react';
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import DoctorProfile from "@/components/DoctorDetails/DoctorProfile";
import RelatedSpecialists from "@/components/DoctorDetails/RelatedSpecialists";
import dataService from '@/lib/dataService';

export async function generateStaticParams() {
  const doctors = dataService.getAllUniqueDoctors();
  return doctors.map((doctor) => ({
    doctorId: doctor.id,
  }));
}

export default async function DoctorDetailsPage({ params }) {
  const { doctorId } = await params;
  const doctor = dataService.getDoctorById(doctorId);
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
