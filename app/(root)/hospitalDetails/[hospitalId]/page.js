"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import HospitalImageGallery from "@/components/HospitalDetails/HospitalImageGallery";
import HospitalNavigation from "@/components/HospitalDetails/HospitalNavigation";
import HospitalOverview from "@/components/HospitalDetails/HospitalOverview";
import HospitalSpecialities from "@/components/HospitalDetails/HospitalSpecialities";
import HospitalFeatures from "@/components/HospitalDetails/HospitalFeatures";
import HospitalAbout from "@/components/HospitalDetails/HospitalAbout";
import HospitalDoctors from "@/components/HospitalDetails/HospitalDoctors";
import HospitalGallery from "@/components/HospitalDetails/HospitalGallery";
import HospitalReviews from "@/components/HospitalDetails/HospitalReviews";
import HospitalLocation from "@/components/HospitalDetails/HospitalLocation";
import dataService from '@/lib/dataService';

const HospitalDetails = () => {
  const params = useParams();
  const { hospitalId } = params;
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    // Find the hospital by ID using dataService
    const foundHospital = dataService.getHospitalById(parseInt(hospitalId));
    setHospital(foundHospital);
    setLoading(false);
  }, [hospitalId]);

  // Create custom routes for this specific hospital
  const routes = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Hospitals",
      href: "/hospitalSearch"
    },
    {
      label: hospital?.name || "Hospital Details"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Hospital not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={hospital.name} routes={routes} />

      {/* Hospital Image Gallery */}
      <HospitalImageGallery hospital={hospital} />

      {/* Navigation Tabs */}
      <HospitalNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content based on active tab */}
      {activeTab === "Overview" && <HospitalOverview hospital={hospital} />}
      {activeTab === "Specialities" && <HospitalSpecialities hospital={hospital} />}
      {activeTab === "Features" && <HospitalFeatures hospital={hospital} />}
      {activeTab === "About" && <HospitalAbout hospital={hospital} />}
      {activeTab === "Doctors" && <HospitalDoctors hospital={hospital} />}
      {activeTab === "Gallery" && <HospitalGallery hospital={hospital} />}
      {activeTab === "Reviews" && <HospitalReviews hospital={hospital} />}
      {activeTab === "Location" && <HospitalLocation hospital={hospital} />}
    </div>
  );
};

export default HospitalDetails; 