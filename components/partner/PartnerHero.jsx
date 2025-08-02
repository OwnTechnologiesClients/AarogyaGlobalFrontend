"use client";
import React from "react";
import { ArrowRight, Handshake, Users, Globe, Award } from "lucide-react";

const PartnerHero = () => {
  return (
    <div className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-indigo-100 mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Partner With <span className="text-[#04CE78]">Aarogya Global</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join us in revolutionizing healthcare delivery across India. Together, we can create a 
            more accessible, efficient, and patient-centric healthcare ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-[#04CE78] rounded-full p-3 inline-flex mb-4">
              <Handshake className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Active Partners</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-blue-600 rounded-full p-3 inline-flex mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">50,000+</h3>
            <p className="text-gray-600">Patients Served</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-purple-600 rounded-full p-3 inline-flex mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">25+</h3>
            <p className="text-gray-600">Cities Covered</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-orange-500 rounded-full p-3 inline-flex mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">98%</h3>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-[#04CE78] hover:bg-[#03B868] text-white font-semibold px-8 py-4 rounded-lg flex items-center gap-2 mx-auto transition-colors duration-300">
            Start Your Partnership Journey
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerHero; 