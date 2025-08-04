"use client";
import React, { useState } from 'react';
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

const HospitalDoctors = () => {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDoctorClick = (doctorId) => {
    router.push(`/doctorDetails/${doctorId}`);
  };

  const specialties = ["All", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General Medicine", "Ophthalmology"];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      rating: 4.9,
      reviews: 245,
      experience: "15 years",
      education: "MD, Harvard Medical School",
      languages: ["English", "Spanish"],
      availability: "Mon-Fri: 9AM-5PM",
      nextAvailable: "Tomorrow 2:00 PM",
      specializations: ["Cardiac Surgery", "Interventional Cardiology", "Heart Failure"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      rating: 4.8,
      reviews: 189,
      experience: "12 years",
      education: "MD, Johns Hopkins University",
      languages: ["English", "Mandarin"],
      availability: "Mon-Wed-Fri: 10AM-4PM",
      nextAvailable: "Friday 11:00 AM",
      specializations: ["Brain Surgery", "Stroke Treatment", "Epilepsy"]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      image: "https://images.unsplash.com/photo-1594824475317-d8b5b0b0b8b0?w=300&h=300&fit=crop&crop=face",
      rating: 4.9,
      reviews: 312,
      experience: "10 years",
      education: "MD, Stanford University",
      languages: ["English", "Spanish", "French"],
      availability: "Mon-Sat: 8AM-6PM",
      nextAvailable: "Today 4:30 PM",
      specializations: ["Neonatal Care", "Child Development", "Pediatric Surgery"]
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      rating: 4.7,
      reviews: 156,
      experience: "18 years",
      education: "MD, Mayo Clinic",
      languages: ["English"],
      availability: "Tue-Thu-Sat: 9AM-3PM",
      nextAvailable: "Tuesday 10:00 AM",
      specializations: ["Joint Replacement", "Sports Medicine", "Spine Surgery"]
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      specialty: "General Medicine",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      rating: 4.6,
      reviews: 203,
      experience: "8 years",
      education: "MD, University of California",
      languages: ["English", "German"],
      availability: "Mon-Fri: 7AM-7PM",
      nextAvailable: "Today 6:00 PM",
      specializations: ["Preventive Care", "Chronic Disease Management", "Health Screenings"]
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      specialty: "Ophthalmology",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      rating: 4.8,
      reviews: 178,
      experience: "14 years",
      education: "MD, Columbia University",
      languages: ["English", "Korean"],
      availability: "Mon-Wed-Fri: 8AM-4PM",
      nextAvailable: "Wednesday 9:00 AM",
      specializations: ["Cataract Surgery", "Retinal Disorders", "LASIK"]
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Medical Team</h2>
        <p className="text-gray-600 text-lg">
          Meet our experienced doctors who are committed to providing exceptional healthcare services.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:border-transparent"
            />
          </div>

          {/* Specialty Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:border-transparent"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredDoctors.map((doctor) => (
          <div 
            key={doctor.id} 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleDoctorClick(doctor.id)}
          >
            {/* Doctor Image */}
            <div className="relative h-48 bg-gray-100">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{doctor.rating}</span>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                <p className="text-[#04CE78] font-medium">{doctor.specialty}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>{doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{doctor.reviews} reviews</span>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Award className="w-4 h-4" />
                  <span>{doctor.education}</span>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Specializations:</h4>
                <div className="flex flex-wrap gap-1">
                  {doctor.specializations.slice(0, 2).map((spec, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {spec}
                    </span>
                  ))}
                  {doctor.specializations.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{doctor.specializations.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>{doctor.availability}</span>
                </div>
                <div className="text-sm text-[#04CE78] font-medium">
                  Next available: {doctor.nextAvailable}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Languages: </span>
                  {doctor.languages.join(", ")}
                </div>
              </div>

              {/* View Details Button */}
              <button 
                className="w-full bg-[#04CE78] hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDoctorClick(doctor.id);
                }}
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No doctors found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#04CE78] to-green-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Need Help Choosing a Doctor?</h3>
        <p className="text-green-100 mb-6">Our patient coordinators can help you find the right specialist for your needs.</p>
        <button className="bg-white text-[#04CE78] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Contact Patient Services
        </button>
      </div>
    </div>
  );
};

export default HospitalDoctors;
