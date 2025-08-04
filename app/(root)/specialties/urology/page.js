"use client";
import React, { useState } from "react";
import { getPageHeaderData } from "@/utils/navigationUtils";
import PageHeader from "@/components/layout/PageHeader";
import SpecialtySearchForm from "@/components/SpecialtySearch/SpecialtySearchForm";
import SpecialtyResults from "@/components/SpecialtySearch/SpecialtyResults";
import TrustedBy from "@/components/home/TrustedBy";
import dataService from "@/lib/dataService";
import { Info, CheckCircle, Clock, FileText, ChevronRight, MapPin, Star } from "lucide-react";
import HospitalCarousel from "@/components/SpecialtySearch/HospitalCarousel";
import ContactForm from "@/components/contact/ContactForm";

const UrologyPage = () => {
  const { title, routes } = getPageHeaderData('/specialties/urology');
  const data = dataService.getSpecialtyData('urology');

    const [searchFilters, setSearchFilters] = useState({
        name: "",
        treatment: "",
        facility: "",
        location: "",
    });

    const [isFilter, setIsFilter] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");

    const [filteredDoctors, setFilteredDoctors] = useState(urologyData.doctors);
    const [filteredHospitals, setFilteredHospitals] = useState(urologyData.hospitals);
    const [filteredTreatments, setFilteredTreatments] = useState(urologyData.treatments);

    const applyFilters = () => {
        let doctors = [...urologyData.doctors];
        let hospitals = [...urologyData.hospitals];
        let treatments = [...urologyData.treatments];

        // Apply name filter
        if (searchFilters.name) {
            doctors = doctors.filter((doctor) =>
                doctor.name.toLowerCase().includes(searchFilters.name.toLowerCase())
            );
            hospitals = hospitals.filter((hospital) =>
                hospital.name.toLowerCase().includes(searchFilters.name.toLowerCase())
            );
            treatments = treatments.filter((treatment) =>
                treatment.name.toLowerCase().includes(searchFilters.name.toLowerCase())
            );
        }

        // Apply treatment filter
        if (searchFilters.treatment) {
            doctors = doctors.filter((doctor) =>
                doctor.treatments?.includes(searchFilters.treatment)
            );
            hospitals = hospitals.filter((hospital) =>
                hospital.treatments?.includes(searchFilters.treatment)
            );
            treatments = treatments.filter((treatment) =>
                treatment.name === searchFilters.treatment
            );
        }

        // Apply facility filter
        if (searchFilters.facility) {
            hospitals = hospitals.filter((hospital) =>
                hospital.facilities?.includes(searchFilters.facility)
            );
        }

        // Apply location filter
        if (searchFilters.location) {
            doctors = doctors.filter((doctor) =>
                doctor.location.toLowerCase().includes(searchFilters.location.toLowerCase())
            );
            hospitals = hospitals.filter((hospital) =>
                hospital.location.toLowerCase().includes(searchFilters.location.toLowerCase())
            );
        }

        setFilteredDoctors(doctors);
        setFilteredHospitals(hospitals);
        setFilteredTreatments(treatments);
        setIsFilter(!isFilter);
    };

    const resetFilters = () => {
        setSearchFilters({
            name: "",
            treatment: "",
            facility: "",
            location: "",
        });
        setActiveCategory("All");
        setFilteredDoctors(urologyData.doctors);
        setFilteredHospitals(urologyData.hospitals);
        setFilteredTreatments(urologyData.treatments);
        setIsFilter(!isFilter);
    };

    return (
        <div>
            <PageHeader title={title} routes={routes} />

            {/* Overview Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Title and Keywords */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Urology Worldwide: Best Hospitals, Doctors, Options, & Cost
                                </h1>
                                <Info className="w-5 h-5 text-gray-500" />
                            </div>

                            {/* Keywords/Tags */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {urologyData.filters.treatments.slice(0, 6).map((treatment, index) => (
                                    <button
                                        key={index}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 transition-colors"
                                    >
                                        {treatment}
                                    </button>
                                ))}
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Overview Description */}
                        <div className="mb-8">
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {urologyData.overview.description}
                            </p>

                            {/* Status Indicators */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Approved by {urologyData.overview.approvedBy}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span>Update: {urologyData.overview.lastUpdated}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-500" />
                                    <span>Fact Checked</span>
                                </div>
                            </div>
                        </div>

                        {/* Best Hospitals Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Best urology hospitals worldwide
                                </h2>
                                <Info className="w-5 h-5 text-gray-500" />
                            </div>

                            {/* Hospital Carousel */}
                            <HospitalCarousel hospitals={urologyData.hospitals} />
                        </div>

                        {/* What Helps Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                What helps to find the best urology hospital?
                            </h2>
                            {/* Content will be added here */}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Content Navigation */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Content</h3>
                            <div className="space-y-2">
                                {[
                                    "Treatment overview",
                                    "Diagnosis",
                                    "Treatment Options",
                                    "Top Doctors",
                                    "Top Hospitals",
                                    "Treatment duration & cost",
                                    "FAQ's"
                                ].map((item, index) => (
                                    <button
                                        key={index}
                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left text-sm transition-colors ${index === 0
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <ChevronRight className="w-4 h-4 rotate-180" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <ContactForm
                            onSubmit={(formData) => {
                                console.log('Contact form submitted:', formData);
                                // Handle form submission here
                            }}
                        />
                    </div>
                </div>
            </div>

            <SpecialtySearchForm
                categories={urologyData.filters.categories}
                facilities={urologyData.filters.facilities}
                treatments={urologyData.filters.treatments}
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
                activeCategory={activeCategory}
                applyFilters={applyFilters}
                setActiveCategory={setActiveCategory}
                resetFilters={resetFilters}
                specialtyName={urologyData.specialty.name}
            />

            <SpecialtyResults
                doctors={filteredDoctors}
                hospitals={filteredHospitals}
                treatments={filteredTreatments}
                activeCategory={activeCategory}
                isFilter={isFilter}
                specialtyName={urologyData.specialty.name}
            />

            <TrustedBy />
        </div>
    );
};

export default UrologyPage; 