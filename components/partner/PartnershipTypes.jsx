"use client";
import React from "react";
import { Building2, User, Stethoscope, Microscope, Truck, Heart } from "lucide-react";

const PartnershipTypes = () => {
  const partnershipTypes = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Hospital Partnerships",
      description: "Partner your hospital with our network to increase patient referrals and streamline operations.",
      features: [
        "Patient referral system",
        "Digital patient management",
        "Quality monitoring",
        "Revenue optimization"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Doctor Partnerships",
      description: "Join our network of healthcare professionals and expand your patient base.",
      features: [
        "Patient booking platform",
        "Digital consultation tools",
        "Practice management",
        "Continuing education"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Clinic Partnerships",
      description: "Connect your clinic with our platform for better patient management and growth.",
      features: [
        "Appointment scheduling",
        "Patient records integration",
        "Billing automation",
        "Marketing support"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Diagnostic Centers",
      description: "Partner your diagnostic facility to provide comprehensive healthcare services.",
      features: [
        "Test booking system",
        "Report delivery",
        "Quality assurance",
        "Equipment support"
      ],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Pharmacy Partnerships",
      description: "Join our pharmacy network to provide medication delivery and consultation services.",
      features: [
        "Medicine delivery",
        "Prescription management",
        "Inventory tracking",
        "Patient counseling"
      ],
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Specialty Centers",
      description: "Partner your specialty center to offer specialized care through our network.",
      features: [
        "Specialty referrals",
        "Expert consultation",
        "Treatment planning",
        "Follow-up care"
      ],
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <div className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Partnership Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer various partnership models to suit different healthcare providers 
            and organizations. Choose the one that best fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnershipTypes.map((type, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`bg-gradient-to-r ${type.color} rounded-full p-3 inline-flex mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                {type.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {type.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {type.description}
              </p>
              <ul className="space-y-2">
                {type.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-[#04CE78] rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-gradient-to-r from-[#04CE78] to-[#03B868] text-white font-semibold py-3 rounded-lg hover:from-[#03B868] hover:to-[#02A057] transition-all duration-300">
                Learn More
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't See Your Partnership Type?
            </h3>
            <p className="text-gray-600 mb-6">
              We're always open to new partnership opportunities. Contact us to discuss 
              how we can work together to improve healthcare delivery.
            </p>
            <button className="bg-[#04CE78] hover:bg-[#03B868] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipTypes; 