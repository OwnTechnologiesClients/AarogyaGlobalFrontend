"use client";
import React from 'react';
import {
  Heart,
  Eye,
  Phone,
  Clock
} from 'lucide-react';

const HospitalAbout = ({ hospital }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About {hospital?.name || 'Our Hospital'}</h2>
        <div className="text-gray-600 text-lg leading-relaxed space-y-8">
          {hospital?.about?.description ? (
            <div dangerouslySetInnerHTML={{
              __html: String(hospital.about.description)
                .replace(/\n\n/g, '</p><p class="mb-6">')
                .replace(/•/g, '<br/>•')
                .replace(/^/, '<p class="mb-6">')
                .replace(/$/, '</p>')
            }} />
          ) : (
            <p className="text-gray-600 text-lg leading-relaxed">
              Our hospital is committed to providing world-class healthcare services with advanced medical technology and compassionate care.
            </p>
          )}
        </div>
      </div>

      {/* Mission, Vision */}
      {(hospital?.about?.mission || hospital?.about?.vision) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          {hospital?.about?.mission && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#04CE78] bg-opacity-10 rounded-xl">
                  <Heart className="w-8 h-8 text-[#04CE78]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {hospital.about.mission}
              </p>
            </div>
          )}

          {/* Vision */}
          {hospital?.about?.vision && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500 bg-opacity-10 rounded-xl">
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {hospital.about.vision}
              </p>
            </div>
          )}
        </div>
      )}



      {/* Emergency Support & OPD Hours */}
      {/* <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 text-white mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Emergency Support</h3>
            <p className="text-red-100 mb-4">{hospital?.emergencySupport || "24/7 Emergency Support Available"}</p>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
                <span>Contact Information</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">OPD Hours</h3>
            <p className="text-red-100 mb-4">{hospital?.opdHours || "OPD Hours: 9 AM - 8 PM"}</p>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Monday - Saturday</span>
            </div>
          </div>
        </div>
      </div> */}


    </div>
  );
};

export default HospitalAbout;
