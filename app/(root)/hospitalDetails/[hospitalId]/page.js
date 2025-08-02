"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
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
import hospitalJson from "@/data/HospitalData.json";

const HospitalDetails = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  
  const [hospital, setHospital] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    // Find hospital by ID
    const hospitalId = parseInt(params.hospitalId);
    const foundHospital = hospitalJson.hospitals.find(h => h.id === hospitalId);
    setHospital(foundHospital);
  }, [params.hospitalId]);

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Hospital Not Found</h1>
          <p className="text-gray-600">The requested hospital could not be found.</p>
        </div>
      </div>
    );
  }

  const title = hospital.name;
  const routes = [
    { name: "Home", href: "/" },
    { name: "Hospitals", href: "/hospitalSearch" },
    { name: hospital.name, href: "#" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={title} routes={routes} />

      {/* Hospital Image Gallery */}
      <HospitalImageGallery hospital={hospital} />

      {/* Navigation Tabs */}
      <HospitalNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content based on active tab */}
      {activeTab === "Overview" && <HospitalOverview hospital={hospital} location={location} />}
      {activeTab === "Specialities" && <HospitalSpecialities hospital={hospital} />}
      {activeTab === "Features" && <HospitalFeatures hospital={hospital} />}
      {activeTab === "About" && <HospitalAbout hospital={hospital} />}
      {activeTab === "Doctors" && <HospitalDoctors hospital={hospital} />}
      {activeTab === "Gallery" && <HospitalGallery hospital={hospital} />}
      {activeTab === "Reviews" && <HospitalReviews hospital={hospital} />}
      {activeTab === "Location" && <HospitalLocation hospital={hospital} location={location} />}
    </div>
  );
};

export default HospitalDetails; 