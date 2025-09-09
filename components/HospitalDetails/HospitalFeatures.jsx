"use client";
import React from 'react';
import {
  Wifi,
  Car,
  Coffee,
  Shield,
  Clock,
  Phone,
  Utensils,
  Bed,
  Zap,
  Heart,
  Stethoscope,
  Activity,
  CheckCircle,
  Brain
} from 'lucide-react';
import CertificateSwiper from '../common/CertificateSwiper';

const HospitalFeatures = ({ hospital }) => {
  // Map facilities to icons
  const getFacilityIcon = (facility) => {
    const iconMap = {
      "Pharmacy": <Stethoscope className="w-6 h-6 text-blue-500" />,
      "ICU": <Heart className="w-6 h-6 text-red-500" />,
      "Operation Theater": <Activity className="w-6 h-6 text-green-500" />,
      "Cafeteria": <Coffee className="w-6 h-6 text-brown-500" />,
      "MRI": <Zap className="w-6 h-6 text-purple-500" />,
      "CT Scan": <Activity className="w-6 h-6 text-indigo-500" />,
      "Emergency Ward": <Phone className="w-6 h-6 text-red-500" />,
      "Dental Clinic": <Stethoscope className="w-6 h-6 text-cyan-500" />,
      "Skin Care Center": <Shield className="w-6 h-6 text-pink-500" />,
      "Waiting Lounge": <Bed className="w-6 h-6 text-orange-500" />,
      "Lab": <Activity className="w-6 h-6 text-blue-500" />,
      "Cardiac ICU": <Heart className="w-6 h-6 text-red-500" />,
      "Cath Lab": <Heart className="w-6 h-6 text-red-500" />,
      "Rehabilitation": <Stethoscope className="w-6 h-6 text-green-500" />,
      "Neurology Ward": <Brain className="w-6 h-6 text-purple-500" />,
      "Physiotherapy": <Stethoscope className="w-6 h-6 text-blue-500" />,
      "Dental Chair": <Stethoscope className="w-6 h-6 text-cyan-500" />,
      "X-Ray": <Activity className="w-6 h-6 text-gray-500" />,
      "Sterilization": <Shield className="w-6 h-6 text-green-500" />,
      "Dermatology Clinic": <Shield className="w-6 h-6 text-pink-500" />,
      "Laser Center": <Zap className="w-6 h-6 text-yellow-500" />,
      "Cosmetic Surgery": <Stethoscope className="w-6 h-6 text-purple-500" />
    };
    return iconMap[facility] || <Stethoscope className="w-6 h-6 text-gray-500" />;
  };

  const getFacilityDescription = (facility) => {
    const descriptionMap = {
      "Pharmacy": "24/7 pharmacy with prescription and over-the-counter medications",
      "ICU": "Intensive Care Unit with advanced life support systems",
      "Operation Theater": "State-of-the-art operating rooms with modern surgical equipment",
      "Cafeteria": "24/7 cafeteria with healthy meal options for patients and visitors",
      "MRI": "Advanced MRI scanning facility for detailed medical imaging",
      "CT Scan": "High-resolution CT scanning for accurate diagnosis",
      "Emergency Ward": "24/7 emergency services with trained medical staff",
      "Dental Clinic": "Comprehensive dental care with modern dental equipment",
      "Skin Care Center": "Specialized dermatological treatments and skin care",
      "Waiting Lounge": "Comfortable waiting areas for patients and families",
      "Lab": "Modern laboratory for accurate diagnostic testing",
      "Cardiac ICU": "Specialized intensive care for cardiac patients",
      "Cath Lab": "Cardiac catheterization laboratory for heart procedures",
      "Rehabilitation": "Physical therapy and rehabilitation services",
      "Neurology Ward": "Specialized care for neurological conditions",
      "Physiotherapy": "Physical therapy and rehabilitation treatments",
      "Dental Chair": "Modern dental equipment for comprehensive oral care",
      "X-Ray": "Digital X-ray imaging for diagnostic purposes",
      "Sterilization": "Advanced sterilization equipment for medical instruments",
      "Dermatology Clinic": "Specialized skin care and dermatological treatments",
      "Laser Center": "Advanced laser treatments for various medical conditions",
      "Cosmetic Surgery": "Cosmetic and reconstructive surgical procedures"
    };
    return descriptionMap[facility] || "Modern medical facility for patient care";
  };

  // Create facilities from hospital data
  const facilities = hospital?.facilities?.map(facility => ({
    icon: getFacilityIcon(facility),
    title: facility,
    description: getFacilityDescription(facility)
  })) || [];

  // Default facilities if none available
  const defaultFacilities = [
    {
      icon: <Wifi className="w-6 h-6 text-blue-500" />,
      title: "Free WiFi",
      description: "High-speed internet access throughout the hospital"
    },
    {
      icon: <Car className="w-6 h-6 text-green-500" />,
      title: "Free Parking",
      description: "Ample parking space for patients and visitors"
    },
    {
      icon: <Coffee className="w-6 h-6 text-brown-500" />,
      title: "Cafeteria",
      description: "24/7 cafeteria with healthy meal options"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Security",
      description: "Round-the-clock security for patient safety"
    }
  ];

  const displayFacilities = facilities.length > 0 ? facilities : defaultFacilities;

  // Dynamically create medical equipment from hospital treatments
  const getMedicalEquipment = () => {
    if (!hospital?.treatments) return [];

    const equipment = [];
    let isInEquipmentSection = false;

    for (const treatment of hospital.treatments) {
      if (treatment === "Advanced Medical Equipment:") {
        isInEquipmentSection = true;
        continue;
      }

      if (isInEquipmentSection) {
        // Map equipment names to icons and descriptions
        let icon = <Activity className="w-8 h-8 text-blue-600" />;
        let description = "Advanced medical equipment for patient care";
        let availability = "Available 24/7";

        if (treatment.toLowerCase().includes("ecmo")) {
          icon = <Heart className="w-8 h-8 text-red-600" />;
          description = "Extracorporeal Membrane Oxygenation for critical care";
          availability = "Emergency & ICU";
        } else if (treatment.toLowerCase().includes("mri")) {
          icon = <Activity className="w-8 h-8 text-blue-600" />;
          description = "3 Tesla MRI for detailed imaging";
          availability = "Available 24/7";
        } else if (treatment.toLowerCase().includes("cardiac") || treatment.toLowerCase().includes("cath lab")) {
          icon = <Heart className="w-8 h-8 text-red-600" />;
          description = "State-of-the-art cardiac catheterization laboratory";
          availability = "Emergency & Scheduled";
        }

        equipment.push({
          icon,
          name: treatment,
          description,
          availability
        });
      }
    }

    return equipment;
  };

  const medicalEquipment = getMedicalEquipment();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Hospital Features & Facilities</h2>
        <p className="text-gray-600 text-lg">
          {hospital?.name || "Our hospital"} offers world-class healthcare with modern facilities and advanced medical equipment.
        </p>
      </div>

      {/* General Facilities */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayFacilities.map((facility, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3">
                {facility.icon}
                <h4 className="font-semibold text-gray-800">{facility.title}</h4>
              </div>
              <p className="text-gray-600 text-sm">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Equipment */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Advanced Medical Equipment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medicalEquipment.map((equipment, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  {equipment.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{equipment.name}</h4>
                  <p className="text-gray-600 mb-3">{equipment.description}</p>
                  <div className="inline-flex items-center px-3 py-1 bg-[#04CE78] bg-opacity-10 text-[#04CE78] rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {equipment.availability}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Certifications & Accreditations */}
      <CertificateSwiper
        certificates={hospital?.accreditation?.map(acc => ({
          name: `${acc} Accreditation`,
          logo: acc === 'JCI' ? '/CertificatesImg/img3.png' :
            acc === 'NABH' ? '/CertificatesImg/img2.png' :
              acc === 'NABL' ? '/CertificatesImg/img4.png' : '/CertificatesImg/img1.png',
          description: acc === 'JCI' ? 'Joint Commission International' :
            acc === 'NABH' ? 'National Accreditation Board for Hospitals' :
              acc === 'NABL' ? 'National Accreditation Board for Testing' : acc
        })) || []}
        variant="default"
        title="Certifications & Accreditations"
        showNavigation={true}
        className="mb-12"
      />

      {/* Special Features */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">What Makes {hospital?.name || "Us"} Special</h3>
          <p className="text-blue-100">Advanced healthcare features for better patient experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h4 className="font-bold mb-2">Patient-Centered Care</h4>
            <p className="text-blue-100 text-sm">Personalized treatment plans focused on patient comfort and recovery</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h4 className="font-bold mb-2">Latest Technology</h4>
            <p className="text-blue-100 text-sm">Cutting-edge medical equipment and digital health solutions</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h4 className="font-bold mb-2">Safety First</h4>
            <p className="text-blue-100 text-sm">Strict safety protocols and infection control measures</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalFeatures;
