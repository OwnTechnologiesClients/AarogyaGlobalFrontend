"use client";
import React from 'react';
import DoctorsSwiper from '../components/TreatmentDetails/DoctorsSwiper';
import HospitalsSwiper from '../components/TreatmentDetails/HospitalsSwiper';

const SwiperDemo = () => {
  const sampleDoctors = [
    {
      id: 1,
      name: "Dr. Steven Nissen",
      specialty: "Interventional Cardiologist",
      location: "Cleveland, Ohio, USA",
      image: "/RelatedSpecialists/img1.png",
      experience: "30+ years",
      rating: "9.9",
      patientsTreated: "50,000+",
      successRate: "98.2%",
      expertise: [
        "Interventional Cardiology",
        "Clinical Trials",
        "Preventive Cardiology",
        "Coronary Artery Disease",
        "Structural Heart Disease"
      ],
      hospital: "Cleveland Clinic",
      education: "Harvard Medical School",
      certifications: ["FACC", "FSCAI", "FESC"],
      languages: ["English", "Spanish"],
      researchPapers: "500+ publications",
      awards: ["Distinguished Scientist Award", "Top Cardiologist 2023"]
    },
    {
      id: 2,
      name: "Dr. Valentin Fuster",
      specialty: "Preventive Cardiologist",
      location: "New York, USA",
      image: "/RelatedSpecialists/img2.png",
      experience: "35+ years",
      rating: "9.8",
      patientsTreated: "45,000+",
      successRate: "97.8%",
      expertise: [
        "Preventive Cardiology",
        "Atherosclerosis",
        "Global Health",
        "Cardiovascular Imaging",
        "Clinical Research"
      ],
      hospital: "Mount Sinai Medical Center",
      education: "University of Barcelona",
      certifications: ["FACC", "FESC", "FAHA"],
      languages: ["English", "Spanish", "Catalan"],
      researchPapers: "1,000+ publications",
      awards: ["Prince of Asturias Award", "National Medal of Science"]
    },
    {
      id: 3,
      name: "Dr. Eugene Braunwald",
      specialty: "Cardiologist",
      location: "Boston, Massachusetts, USA",
      image: "/RelatedSpecialists/img3.png",
      experience: "40+ years",
      rating: "9.7",
      patientsTreated: "60,000+",
      successRate: "97.5%",
      expertise: [
        "Heart Failure",
        "Clinical Research",
        "Medical Education",
        "Cardiovascular Medicine",
        "Clinical Trials"
      ],
      hospital: "Brigham and Women's Hospital",
      education: "New York University",
      certifications: ["FACC", "FAHA", "FRCP"],
      languages: ["English", "German"],
      researchPapers: "1,200+ publications",
      awards: ["Lasker Award", "National Medal of Science"]
    }
  ];

  const sampleHospitals = [
    {
      id: 1,
      name: "Cleveland Clinic",
      location: "Cleveland, Ohio, USA",
      image: "/hospital_logos/img1.jpg",
      rating: "9.9",
      patientsPerYear: "2.8M+",
      successRate: "98.5%",
      accreditations: ["JCI", "NABH", "ISO"],
      specialties: [
        "Interventional Cardiology",
        "Heart Transplant",
        "Cardiac Surgery",
        "Electrophysiology",
        "Heart Failure"
      ],
      facilities: [
        "Advanced Cardiac Imaging",
        "Robotic Surgery",
        "Minimally Invasive Procedures",
        "Hybrid ORs",
        "3D Printing Lab"
      ],
      languages: ["English", "Spanish", "Arabic", "Hindi"],
      internationalPatients: "15,000+ annually"
    },
    {
      id: 2,
      name: "Mayo Clinic",
      location: "Rochester, Minnesota, USA",
      image: "/hospital_logos/img2.png",
      rating: "9.8",
      patientsPerYear: "1.3M+",
      successRate: "97.8%",
      accreditations: ["JCI", "NABH", "ISO", "AACN"],
      specialties: [
        "Preventive Cardiology",
        "Heart Failure",
        "Electrophysiology",
        "Structural Heart Disease",
        "Cardiac Imaging"
      ],
      facilities: [
        "3D Cardiac Imaging",
        "Advanced Monitoring",
        "Specialized ICUs",
        "Research Labs",
        "Telemedicine Center"
      ],
      languages: ["English", "Spanish", "French", "German", "Chinese"],
      internationalPatients: "12,000+ annually"
    },
    {
      id: 3,
      name: "Johns Hopkins Hospital",
      location: "Baltimore, Maryland, USA",
      image: "/hospital_logos/img3.webp",
      rating: "9.7",
      patientsPerYear: "1.1M+",
      successRate: "97.2%",
      accreditations: ["JCI", "NABH", "ISO", "AAMC"],
      specialties: [
        "Pediatric Cardiology",
        "Adult Congenital Heart Disease",
        "Cardiac Rehabilitation",
        "Preventive Cardiology",
        "Interventional Cardiology"
      ],
      facilities: [
        "Hybrid Operating Rooms",
        "Advanced Imaging",
        "Research Facilities",
        "Clinical Trials Center",
        "Innovation Hub"
      ],
      languages: ["English", "Spanish", "French", "Arabic", "Korean"],
      internationalPatients: "10,000+ annually"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Swiper Components Demo
        </h1>
        
        <div className="space-y-12">
          {/* Doctors Swiper Demo */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Top-rated Cardiologists Worldwide
            </h2>
            <DoctorsSwiper 
              doctors={sampleDoctors}
              title="Top-rated cardiologists worldwide"
            />
          </div>

          {/* Hospitals Swiper Demo */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Best Cardiology Hospitals Worldwide
            </h2>
            <HospitalsSwiper 
              hospitals={sampleHospitals}
              title="Best cardiology hospitals worldwide"
            />
          </div>

          {/* Cost Conversion Demo */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Cost Conversion Demo (EUR to INR)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Original Prices (EUR)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Cardiology consultation:</span>
                    <span className="font-bold">€200 - €500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coronary angioplasty:</span>
                    <span className="font-bold">€8,000 - €15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heart bypass surgery:</span>
                    <span className="font-bold">€20,000 - €35,000</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Converted Prices (INR)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Cardiology consultation:</span>
                    <span className="font-bold text-green-600">₹18,000 - ₹45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coronary angioplasty:</span>
                    <span className="font-bold text-green-600">₹7,20,000 - ₹13,50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heart bypass surgery:</span>
                    <span className="font-bold text-green-600">₹18,00,000 - ₹31,50,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperDemo; 