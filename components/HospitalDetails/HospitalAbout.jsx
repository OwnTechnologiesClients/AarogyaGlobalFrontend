"use client";
import React from 'react';
import {
  Calendar,
  Award,
  Users,
  Heart,
  Target,
  Eye,
  Building2,
  Stethoscope,
  Globe,
  TrendingUp
} from 'lucide-react';

const HospitalAbout = ({ hospital }) => {



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About {hospital?.name || 'Our Hospital'}</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Fortis Healthcare Limited is a leading integrated healthcare delivery service provider in India. The healthcare verticals of the company primarily comprise hospitals, diagnostics, and day care specialty facilities. Currently, the company operates 33 healthcare facilities (including JVs and O&M facilities) across 11 states. The Company's network comprises over 5,700 operational beds (including O&M beds) and 400 diagnostics labs.
        </p>
      </div>

      {/* Mission, Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#04CE78] bg-opacity-10 rounded-xl">
              <Heart className="w-8 h-8 text-[#04CE78]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To be a globally respected healthcare organisation known for Clinical Excellence and Distinctive Patient Care.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 bg-opacity-10 rounded-xl">
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To create a world-class integrated healthcare delivery system in India, entailing the finest medical skills combined with compassionate patient care.
          </p>
        </div>
      </div>










    </div>
  );
};

export default HospitalAbout;
