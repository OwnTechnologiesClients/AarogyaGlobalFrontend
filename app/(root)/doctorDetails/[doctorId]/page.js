import React from 'react';
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import DoctorProfile from "@/components/DoctorDetails/DoctorProfile";
import RelatedSpecialists from "@/components/DoctorDetails/RelatedSpecialists";
import dataService from '@/lib/dataService';

export async function generateStaticParams() {
  const doctors = dataService.getAllUniqueDoctors();
  return doctors.map((doctor) => ({
    doctorId: doctor.id.toString(),
  }));
}

export default function DoctorDetailsPage({ params }) {
  const { doctorId } = params;
  const doctor = dataService.getDoctorById(parseInt(doctorId));
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
