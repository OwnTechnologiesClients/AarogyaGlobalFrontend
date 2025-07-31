"use client";
import React, { useState } from 'react';
import PageHeader from "@/components/layout/PageHeader";
import PageHeadrsData from "@/data/pageHeadersData.json";
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

const HospitalDetails = () => {
  const { title, routes } = PageHeadrsData.hospitalDetails || {
    title: "Hospital Details",
    routes: [
      { label: "Home", href: "/" },
      { label: "Hospital Search", href: "/hospitalSearch" },
      { label: "Hospital Details" }
    ]
  };

  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={title} routes={routes} />

      {/* Hospital Image Gallery */}
      <HospitalImageGallery />

      {/* Navigation Tabs */}
      <HospitalNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content based on active tab */}
      {activeTab === "Overview" && <HospitalOverview />}
      {activeTab === "Specialities" && <HospitalSpecialities />}
      {activeTab === "Features" && <HospitalFeatures />}
      {activeTab === "About" && <HospitalAbout />}
      {activeTab === "Doctors" && <HospitalDoctors />}
      {activeTab === "Gallery" && <HospitalGallery />}
      {activeTab === "Reviews" && <HospitalReviews />}
      {activeTab === "Location" && <HospitalLocation />}
    </div>
  );
};

export default HospitalDetails;