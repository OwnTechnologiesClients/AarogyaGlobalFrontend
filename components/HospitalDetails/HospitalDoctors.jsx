"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Star,
  Calendar,
  Clock,
  MapPin,
  Award,
  GraduationCap,
  Stethoscope,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import apiService from '../../lib/apiService';
import dataService from '@/lib/dataService';

const HospitalDoctors = ({ hospital }) => {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hospital) {
      // Use only the doctors that are specifically associated with this hospital
      let hospitalDoctors = [];

      if (hospital.doctors && hospital.doctors.length > 0) {
        // Use the hospital's own doctors array
        hospitalDoctors = hospital.doctors;
      } else {
        // If no doctors are assigned to this hospital, show empty state
        hospitalDoctors = [];
      }

      setDoctors(hospitalDoctors);
    }
    setLoading(false);
  }, [hospital]);

  const handleDoctorClick = (doctorId) => {
    router.push(`/doctorDetails/${doctorId}`);
  };

  // Get unique specialties from the hospital's doctors
  const specialties = ["All", ...new Set(doctors.map(doctor => doctor.specialty).filter(Boolean))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
    const matchesSearch = searchTerm === "" ||
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  // Helper function to create unique keys
  const createUniqueKey = (doctor, index) => {
    return `${doctor.id}-${doctor.name?.replace(/\s+/g, '-')}-${doctor.specialty?.replace(/\s+/g, '-')}-${index}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading doctors...</div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Expert Doctors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our team of highly qualified and experienced medical professionals dedicated to providing exceptional care.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8">
              <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Doctors Available</h3>
              <p className="text-gray-500 text-lg mb-4">
                We're currently updating our doctor profiles for {hospital?.name || 'this hospital'}.
              </p>
              <p className="text-gray-400 text-sm">
                Please check back soon or contact us for more information about available specialists.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={createUniqueKey(doctor, index)}
                className="bg-white rounded-xl shadow-lg"
              >
                {/* Doctor Image */}
                <div className="relative h-64 rounded-t-xl overflow-hidden">
                  <img
                    src={apiService.getImageUrl(doctor.image) || '/doctor.jpg'}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{doctor.rating}</span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {doctor.specialty}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{doctor.location}</span>
                    </div>
                    {(() => {
                      const hospitalName = doctor?.customHospitalName || doctor?.hospitalId?.name || doctor?.hospital?.name || doctor?.hospitalName || doctor?.hospital || '';
                      return hospitalName ? (
                        <div className="flex items-center text-gray-600">
                          <Stethoscope className="w-4 h-4 mr-2" />
                          <span className="text-sm">{hospitalName}</span>
                        </div>
                      ) : null;
                    })()}
                  </div>

                  {/* CTA */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDoctorClick(doctor.id)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDoctors;
