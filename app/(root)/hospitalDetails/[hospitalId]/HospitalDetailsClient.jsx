"use client";
import React, { useState, useEffect } from 'react';
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import HospitalImageGallery from "@/components/HospitalDetails/HospitalImageGallery";
import HospitalNavigation from "@/components/HospitalDetails/HospitalNavigation";
import HospitalOverview from "@/components/HospitalDetails/HospitalOverview";
import HospitalSpecialities from "@/components/HospitalDetails/HospitalSpecialities";
import HospitalFeatures from "@/components/HospitalDetails/HospitalFeatures";
import HospitalAbout from "@/components/HospitalDetails/HospitalAbout";
import HospitalDoctors from "@/components/HospitalDetails/HospitalDoctors";
import HospitalReviews from "@/components/HospitalDetails/HospitalReviews";
import HospitalLocation from "@/components/HospitalDetails/HospitalLocation";
import dataService from '@/lib/dataService';

export default function HospitalDetailsClient({ params, hospital: initialHospital }) {
    const { hospitalId } = params;
    const [hospital, setHospital] = useState(initialHospital);
    const [activeTab, setActiveTab] = useState("Overview");

    useEffect(() => {
        if (!initialHospital) {
            (async () => {
                try {
                    const foundHospital = await dataService.getHospitalById(hospitalId);
                    setHospital(foundHospital);
                } catch (e) {
                    console.error('Failed to fetch hospital on client', e);
                    setHospital(null);
                }
            })();
        }
    }, [hospitalId, initialHospital]);

    // Create custom routes for this specific hospital
    const routes = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "Hospitals",
            href: "/hospitalSearch/"
        },
        {
            label: hospital?.name || "Hospital Details"
        }
    ];

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
            {activeTab === "Location" && <HospitalLocation hospital={hospital} />}
        </div>
    );
} 