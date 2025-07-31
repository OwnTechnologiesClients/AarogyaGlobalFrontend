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

const HospitalSpecialities = () => {
  const specialities = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      name: "Cardiology",
      description: "Comprehensive heart care including cardiac surgery, angioplasty, and preventive cardiology",
      doctors: 12,
      rating: 4.8,
      services: ["Cardiac Surgery", "Angioplasty", "ECG", "Echocardiography"]
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      name: "Neurology",
      description: "Advanced neurological care for brain, spine, and nervous system disorders",
      doctors: 8,
      rating: 4.9,
      services: ["Brain Surgery", "Spine Surgery", "Stroke Care", "Epilepsy Treatment"]
    },
    {
      icon: <Bone className="w-8 h-8 text-blue-500" />,
      name: "Orthopedics",
      description: "Complete bone and joint care including joint replacement and sports medicine",
      doctors: 15,
      rating: 4.7,
      services: ["Joint Replacement", "Sports Medicine", "Fracture Care", "Arthroscopy"]
    },
    {
      icon: <Eye className="w-8 h-8 text-green-500" />,
      name: "Ophthalmology",
      description: "Comprehensive eye care including cataract surgery and retinal treatments",
      doctors: 6,
      rating: 4.8,
      services: ["Cataract Surgery", "Retinal Care", "LASIK", "Glaucoma Treatment"]
    },
    {
      icon: <Baby className="w-8 h-8 text-pink-500" />,
      name: "Pediatrics",
      description: "Specialized healthcare for infants, children, and adolescents",
      doctors: 10,
      rating: 4.9,
      services: ["Neonatal Care", "Pediatric Surgery", "Vaccination", "Child Development"]
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-teal-500" />,
      name: "General Medicine",
      description: "Primary healthcare and treatment for common medical conditions",
      doctors: 20,
      rating: 4.6,
      services: ["Health Checkups", "Chronic Disease Management", "Preventive Care", "Emergency Medicine"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Medical Specialities</h2>
        <p className="text-gray-600 text-lg">
          Our hospital offers comprehensive medical care across multiple specialties with experienced doctors and state-of-the-art facilities.
        </p>
      </div>

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

      {/* Statistics Section */}
      <div className="mt-12 bg-gradient-to-r from-[#04CE78] to-green-600 rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Our Medical Excellence</h3>
          <p className="text-green-100">Trusted by thousands of patients across all specialties</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">71</div>
            <div className="text-green-100 text-sm">Specialist Doctors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">15+</div>
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
