"use client";
import React from "react";
import { TrendingUp, Shield, Zap, Users, DollarSign, Target } from "lucide-react";

const PartnershipBenefits = () => {
  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Increased Revenue",
      description: "Access to our extensive patient network and referral system to boost your practice revenue.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Maintain high standards with our quality monitoring and patient feedback systems.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Digital Integration",
      description: "Seamless integration with our digital platform for appointment management and patient records.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Patient Access",
      description: "Connect with patients from across India through our comprehensive healthcare network.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost Efficiency",
      description: "Reduce administrative overhead with our automated systems and streamlined processes.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Growth Opportunities",
      description: "Expand your practice reach and explore new specialties with our support and guidance.",
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <div className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Why Partner With Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the advantages of joining our healthcare network and how we can help 
            your practice grow while improving patient care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#04CE78] group"
            >
              <div className={`${benefit.color} rounded-full p-3 inline-flex mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#04CE78] to-[#03B868] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Practice?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join hundreds of healthcare providers who have already partnered with us 
              and are experiencing unprecedented growth.
            </p>
            <button className="bg-white text-[#04CE78] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipBenefits; 