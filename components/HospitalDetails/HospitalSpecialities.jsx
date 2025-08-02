"use client";
import React from 'react';
import { 
  Heart, 
  Brain, 
  Bone, 
  Eye, 
  Baby, 
  Stethoscope,
  Users,
  ArrowRight,
  Star
} from 'lucide-react';

const HospitalSpecialities = ({ hospital }) => {
  // Map treatments to specialties with icons
  const getSpecialtyIcon = (treatment) => {
    const iconMap = {
      "Cardiology": <Heart className="w-8 h-8 text-red-500" />,
      "Neurology": <Brain className="w-8 h-8 text-purple-500" />,
      "Orthopedics": <Bone className="w-8 h-8 text-blue-500" />,
      "Ophthalmology": <Eye className="w-8 h-8 text-green-500" />,
      "Pediatrics": <Baby className="w-8 h-8 text-pink-500" />,
      "General Medicine": <Stethoscope className="w-8 h-8 text-teal-500" />,
      "Dermatology": <Stethoscope className="w-8 h-8 text-orange-500" />,
      "Dental Care": <Stethoscope className="w-8 h-8 text-cyan-500" />,
      "Neurosurgery": <Brain className="w-8 h-8 text-indigo-500" />,
      "Physical Therapy": <Bone className="w-8 h-8 text-emerald-500" />
    };
    return iconMap[treatment] || <Stethoscope className="w-8 h-8 text-gray-500" />;
  };

  const getSpecialtyDescription = (treatment) => {
    const descriptionMap = {
      "Cardiology": "Comprehensive heart care including cardiac surgery, angioplasty, and preventive cardiology",
      "Neurology": "Advanced neurological care for brain, spine, and nervous system disorders",
      "Orthopedics": "Complete bone and joint care including joint replacement and sports medicine",
      "Ophthalmology": "Comprehensive eye care including cataract surgery and retinal treatments",
      "Pediatrics": "Specialized healthcare for infants, children, and adolescents",
      "General Medicine": "Primary healthcare and treatment for common medical conditions",
      "Dermatology": "Comprehensive skin care and treatment for various dermatological conditions",
      "Dental Care": "Complete dental care including preventive, restorative, and cosmetic dentistry",
      "Neurosurgery": "Advanced surgical treatment for brain and nervous system disorders",
      "Physical Therapy": "Rehabilitation and physical therapy services for injury recovery"
    };
    return descriptionMap[treatment] || "Specialized medical care and treatment services";
  };

  // Create specialties from hospital treatments
  const specialities = hospital?.treatments?.map(treatment => ({
    icon: getSpecialtyIcon(treatment),
    name: treatment,
    description: getSpecialtyDescription(treatment),
    doctors: Math.floor(Math.random() * 15) + 5, // Random number for demo
    rating: (4.5 + Math.random() * 0.5).toFixed(1), // Random rating between 4.5-5.0
    services: [treatment, "Consultation", "Treatment", "Follow-up"]
  })) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Medical Specialities</h2>
        <p className="text-gray-600 text-lg">
          {hospital?.name || "Our hospital"} offers comprehensive medical care across multiple specialties with experienced doctors and state-of-the-art facilities.
        </p>
      </div>

      {specialities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialities.map((specialty, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  {specialty.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{specialty.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{specialty.rating}</span>
                    <span>•</span>
                    <Users className="w-4 h-4" />
                    <span>{specialty.doctors} Doctors</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {specialty.description}
              </p>

              {/* Services */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Key Services:</h4>
                <div className="flex flex-wrap gap-2">
                  {specialty.services.map((service, serviceIndex) => (
                    <span 
                      key={serviceIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-[#04CE78] hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                View Doctors
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No specialties information available for this hospital.</p>
        </div>
      )}

      {/* Statistics Section */}
      <div className="mt-12 bg-gradient-to-r from-[#04CE78] to-green-600 rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Our Medical Excellence</h3>
          <p className="text-green-100">Trusted by thousands of patients across all specialties</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{hospital?.doctorsCount || "45"}</div>
            <div className="text-green-100 text-sm">Specialist Doctors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{specialities.length || "5"}+</div>
            <div className="text-green-100 text-sm">Medical Specialties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">50,000+</div>
            <div className="text-green-100 text-sm">Patients Treated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">4.8</div>
            <div className="text-green-100 text-sm">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSpecialities;
