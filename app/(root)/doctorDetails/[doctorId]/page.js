"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import DoctorProfile from "@/components/DoctorDetails/DoctorProfile";
import RelatedSpecialists from "@/components/DoctorDetails/RelatedSpecialists";
import dataService from '@/lib/dataService';

const DoctorDetails = () => {
  const params = useParams();
  const { doctorId } = params;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the doctor by ID using dataService
    const foundDoctor = dataService.getDoctorById(parseInt(doctorId));
    setDoctor(foundDoctor);
    setLoading(false);
  }, [doctorId]);

  const { title, routes } = getPageHeaderData('/doctorDetails');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

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
};
export default DoctorDetails; 
