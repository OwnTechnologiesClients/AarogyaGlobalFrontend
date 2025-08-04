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

const HospitalAbout = () => {
  const milestones = [
    {
      year: "1710",
      title: "Hospital Founded",
      description: "Established as a charitable institution to serve the community"
    },
    {
      year: "1950",
      title: "First Major Expansion",
      description: "Added specialized departments and modern medical equipment"
    },
    {
      year: "1985",
      title: "Research Center",
      description: "Opened dedicated medical research and training facility"
    },
    {
      year: "2000",
      title: "Digital Transformation",
      description: "Implemented electronic health records and telemedicine"
    },
    {
      year: "2020",
      title: "International Accreditation",
      description: "Received JCI accreditation for quality and patient safety"
    }
  ];

  const achievements = [
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Excellence in Healthcare",
      description: "Recognized as the Best Hospital in the region for 5 consecutive years"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Patient Satisfaction",
      description: "Consistently maintaining 95%+ patient satisfaction scores"
    },
    {
      icon: <Globe className="w-8 h-8 text-green-500" />,
      title: "International Recognition",
      description: "JCI accredited facility with international quality standards"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      title: "Medical Innovation",
      description: "Pioneer in adopting latest medical technologies and treatments"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Our Hospital</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          For over 300 years, we have been committed to providing exceptional healthcare services to our community. 
          Our journey began in 1710 with a simple mission: to heal, comfort, and care for every patient who walks through our doors.
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#04CE78] bg-opacity-10 rounded-xl">
              <Heart className="w-8 h-8  text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To provide compassionate, high-quality healthcare services that improve the health and well-being of our patients, 
            their families, and our community through excellence in patient care, education, and research.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 bg-opacity-10 rounded-xl">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To be the leading healthcare provider in the region, recognized for our commitment to clinical excellence, 
            innovation, and patient-centered care that sets the standard for healthcare delivery.
          </p>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500 bg-opacity-10 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Our Values</h3>
          </div>
          <ul className="text-gray-600 space-y-2">
            <li>• Compassion and empathy in every interaction</li>
            <li>• Excellence in clinical care and service</li>
            <li>• Integrity and transparency in all we do</li>
            <li>• Innovation and continuous improvement</li>
            <li>• Respect for patients, families, and colleagues</li>
          </ul>
        </div>
      </div>

      {/* Hospital Timeline */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Our Journey Through Time</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#04CE78]"></div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-start gap-6">
                {/* Timeline dot */}
                <div className="relative z-10 w-16 h-16 bg-[#04CE78] rounded-full flex items-center justify-center text-white font-bold">
                  <Calendar className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-[#04CE78]">{milestone.year}</span>
                    <h4 className="text-xl font-bold text-gray-800">{milestone.title}</h4>
                  </div>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Our Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h4>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Stats */}
      <div className="bg-gradient-to-r from-[#04CE78] to-green-600 rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Hospital by Numbers</h3>
          <p className="text-green-100">Our commitment to excellence reflected in numbers</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Building2 className="w-8 h-8 mr-2" />
              <span className="text-3xl font-bold">600+</span>
            </div>
            <div className="text-green-100">Hospital Beds</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Stethoscope className="w-8 h-8 mr-2" />
              <span className="text-3xl font-bold">200+</span>
            </div>
            <div className="text-green-100">Medical Staff</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-8 h-8 mr-2" />
              <span className="text-3xl font-bold">50K+</span>
            </div>
            <div className="text-green-100">Patients Annually</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-8 h-8 mr-2" />
              <span className="text-3xl font-bold">15+</span>
            </div>
            <div className="text-green-100">Medical Specialties</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAbout;
