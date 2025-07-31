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
  CheckCircle
} from 'lucide-react';
import CertificateSwiper from '../common/CertificateSwiper';

const HospitalFeatures = () => {
  const facilities = [
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
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: "24/7 Emergency",
      description: "Emergency services available round the clock"
    },
    {
      icon: <Phone className="w-6 h-6 text-red-500" />,
      title: "Ambulance Service",
      description: "Emergency ambulance service with trained paramedics"
    },
    {
      icon: <Utensils className="w-6 h-6 text-yellow-500" />,
      title: "Patient Meals",
      description: "Nutritious meals prepared by certified dietitians"
    },
    {
      icon: <Bed className="w-6 h-6 text-indigo-500" />,
      title: "Private Rooms",
      description: "Comfortable private rooms with modern amenities"
    }
  ];

  const medicalEquipment = [
    {
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      name: "MRI Scanner",
      description: "3 Tesla MRI for detailed imaging",
      availability: "Available 24/7"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      name: "Cardiac Cath Lab",
      description: "State-of-the-art cardiac catheterization laboratory",
      availability: "Emergency & Scheduled"
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-green-600" />,
      name: "ICU Ventilators",
      description: "Advanced life support systems",
      availability: "30 Units Available"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      name: "CT Scanner",
      description: "128-slice CT scanner for rapid diagnosis",
      availability: "Available 24/7"
    }
  ];



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Hospital Features & Facilities</h2>
        <p className="text-gray-600 text-lg">
          Experience world-class healthcare with our modern facilities and advanced medical equipment.
        </p>
      </div>

      {/* General Facilities */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">General Facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
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
        variant="default"
        title="Certifications & Accreditations"
        showNavigation={true}
        className="mb-12"
      />

      {/* Special Features */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">What Makes Us Special</h3>
          <p className="text-blue-100">Advanced healthcare features for better patient experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h4 className="font-bold mb-2">Patient-Centered Care</h4>
            <p className="text-blue-100 text-sm">Personalized treatment plans focused on patient comfort and recovery</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h4 className="font-bold mb-2">Latest Technology</h4>
            <p className="text-blue-100 text-sm">Cutting-edge medical equipment and digital health solutions</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
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
