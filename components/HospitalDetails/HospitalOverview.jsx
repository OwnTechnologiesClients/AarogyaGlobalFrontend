"use client";
import React, { useState } from 'react';
import {
  Star,
  Calendar,
  Building2,
  Heart,
  Users,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import CertificateSwiper from '../common/CertificateSwiper';

const HospitalOverview = ({ hospital, location }) => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const hospitalStats = [
    {
      icon: <Star className="w-6 h-6 text-[#04CE78]" />,
      label: hospital?.rating || "4.5k+ Rating",
      sublabel: "UserScore"
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#04CE78]" />,
      label: "Founded",
      sublabel: "in 2010"
    },
    {
      icon: <Heart className="w-6 h-6 text-[#04CE78]" />,
      label: "50,000+",
      sublabel: "patients"
    },
    {
      icon: <Users className="w-6 h-6 text-[#04CE78]" />,
      label: hospital?.doctorsCount || "45",
      sublabel: "doctors"
    }
  ];

  const hospitalDetails = [
    {
      icon: <Building2 className="w-5 h-5 text-gray-500" />,
      label: "Size & Capacity",
      value: "OT: 10, ICU: 5, Patient Bed: 100+"
    },
    {
      icon: <Building2 className="w-5 h-5 text-gray-500" />,
      label: "Clinic type",
      value: "Multi-Specialty"
    },
    {
      icon: <Heart className="w-5 h-5 text-gray-500" />,
      label: "Type of care",
      value: "Inpatient, Outpatient"
    },
    {
      icon: <Users className="w-5 h-5 text-gray-500" />,
      label: "Age group",
      value: "Kids, Adults"
    },
    {
      icon: <Star className="w-5 h-5 text-gray-500" />,
      label: "4.5 on Google",
      value: "The data collected based on patient reviews on Google"
    }
  ];

  const features = [
    {
      title: "Advanced Medical Technology",
      content: `${hospital?.name || "Our hospital"} is equipped with state-of-the-art medical technology and facilities to provide the best possible care to our patients.`,
      isExpanded: false
    },
    {
      title: "Expert Medical Team",
      content: `Our team of ${hospital?.doctorsCount || "45"} experienced doctors and medical professionals are dedicated to providing exceptional healthcare services.`,
      isExpanded: false
    },
    {
      title: "Comprehensive Care",
      content: `We offer a wide range of treatments including ${hospital?.treatments?.join(", ") || "General Medicine, Cardiology, Orthopedics"} to meet all your healthcare needs.`,
      isExpanded: false
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const toggleFeature = (index) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Overview Content */}
        <div className="lg:w-2/3">
          {/* Overview Header */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Overview</h2>

          {/* Hospital Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {hospitalStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3 border border-gray-200 rounded-lg p-4">
                {stat.icon}
                <div>
                  <div className="font-bold text-gray-800">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Hospital Details */}
          <div className="space-y-4 mb-8">
            {hospitalDetails.map((detail, index) => (
              <div key={index} className="flex items-start gap-3">
                {detail.icon}
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{detail.label}</div>
                  <div className="text-sm text-gray-600">{detail.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Location Information */}
          {location && (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Selected Location</h4>
              <p className="text-blue-700">{location}</p>
            </div>
          )}

          {/* Certificates Section */}
          <CertificateSwiper
            variant="minimal"
            title="Certificates & Accreditations"
            showNavigation={true}
            className="mb-8"
          />

          {/* Features & Facts */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Features & Facts</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFeature(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#04CE78] rounded-full"></div>
                      <span className="font-medium text-gray-800">{feature.title}</span>
                    </div>
                    {expandedFeature === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {expandedFeature === index && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form and Team Image */}
        <div className="lg:w-1/3">
          {/* Team Image with Contact CTA */}
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <img
              src={hospital?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop"}
              alt={`${hospital?.name || "Medical"} Team`}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-900 font-bold text-xl">{hospital?.name?.charAt(0) || "H"}</span>
                </div>
                <h4 className="font-bold text-lg mb-2">For Any Service to Contact us</h4>
                <p className="text-sm opacity-90 mb-4">If you need any help please feel free to contact us</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto">
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 mb-4">Get In Touch</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:border-transparent"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:border-transparent"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:border-transparent resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#04CE78] hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                Send Message
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalOverview;
