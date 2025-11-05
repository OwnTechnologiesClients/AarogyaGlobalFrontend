"use client";
import React, { useState } from 'react';
import {
  Star,
  Calendar,
  Building2,
  Heart,
  Users,
  ArrowRight
} from 'lucide-react';
import CertificateSwiper from '../common/CertificateSwiper';
import { sendContactEmail, validateFormData } from '../../lib/emailService';
import { submitEnquiryWithBoth, validateEnquiryData } from '../../lib/enquiryService';
import PhoneInput from '../ui/PhoneInput';
import apiService from '../../lib/apiService';

const HospitalOverview = ({ hospital, location }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    message: ''
  });
  const [honeypot, setHoneypot] = useState("");
  const [startTime] = useState(Date.now());
  const [errors, setErrors] = useState({});

  // Map DB schema to overview stats
  const userScore = typeof hospital?.rating === 'object'
    ? (hospital?.rating?.userScore ?? hospital?.rating?.googleRating)
    : hospital?.rating;
  const founded = hospital?.overview?.founded;
  const patients = hospital?.overview?.patients;
  const doctorsCount = hospital?.overview?.doctors ?? hospital?.doctorsCount;

  const hospitalStats = [
    {
      icon: <Star className="w-6 h-6 text-[#04CE78]" />,
      label: (userScore !== undefined && userScore !== null && userScore !== '') ? userScore : 'N/A',
      sublabel: "UserScore"
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#04CE78]" />,
      label: founded || 'N/A',
      sublabel: "Founded"
    },
    {
      icon: <Heart className="w-6 h-6 text-[#04CE78]" />,
      label: patients || 'N/A',
      sublabel: "Patients"
    },
    {
      icon: <Users className="w-6 h-6 text-[#04CE78]" />,
      label: (doctorsCount !== undefined && doctorsCount !== null && doctorsCount !== '') ? doctorsCount : 'N/A',
      sublabel: "Doctors"
    }
  ].filter(stat => stat.label !== 'N/A'); // Filter out stats with no data

  // Build display strings from DB schema
  const sizeCapacity = hospital?.overview?.sizeAndCapacity;
  const sizeCapacityText = sizeCapacity
    ? `OT: ${sizeCapacity?.ot ?? 'N/A'}, ICU: ${sizeCapacity?.icu ?? 'N/A'}, Patient Beds: ${sizeCapacity?.patientBeds ?? 'N/A'}`
    : 'N/A';
  const clinicTypeText = Array.isArray(hospital?.overview?.clinicType) && hospital.overview.clinicType.length > 0
    ? hospital.overview.clinicType.join(', ')
    : (typeof hospital?.overview?.clinicType === 'string' ? hospital.overview.clinicType : 'N/A');
  const typeOfCareText = Array.isArray(hospital?.overview?.typeOfCare) && hospital.overview.typeOfCare.length > 0
    ? hospital.overview.typeOfCare.join(', ')
    : (typeof hospital?.overview?.typeOfCare === 'string' ? hospital.overview.typeOfCare : 'N/A');
  const ageGroupText = Array.isArray(hospital?.overview?.ageGroup) && hospital.overview.ageGroup.length > 0
    ? hospital.overview.ageGroup.join(', ')
    : (typeof hospital?.overview?.ageGroup === 'string' ? hospital.overview.ageGroup : 'N/A');
  const googleRating = typeof hospital?.rating === 'object' ? hospital?.rating?.googleRating : undefined;

  const hospitalDetails = [
    {
      icon: <Building2 className="w-5 h-5 text-gray-500" />,
      label: "Size & Capacity",
      value: sizeCapacityText
    },
    {
      icon: <Building2 className="w-5 h-5 text-gray-500" />,
      label: "Clinic Type",
      value: clinicTypeText
    },
    {
      icon: <Heart className="w-5 h-5 text-gray-500" />,
      label: "Type of Care",
      value: typeOfCareText
    },
    {
      icon: <Users className="w-5 h-5 text-gray-500" />,
      label: "Age Group",
      value: ageGroupText
    },
    {
      icon: <Star className="w-5 h-5 text-gray-500" />,
      label: "Google Rating",
      value: (googleRating !== undefined && googleRating !== null && googleRating !== '') ? `${googleRating}` : 'N/A'
    }
  ].filter(detail => detail.value !== 'N/A'); // Filter out details with no data



  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elapsedMs = Date.now() - startTime;
    if (honeypot || elapsedMs < 1500) {
      return;
    }

    // Validate form data
    const validation = validateEnquiryData(formData, ['name', 'email', 'phone']);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    
    try {
      // Use hybrid approach: send email via EmailJS AND save to backend
      const result = await submitEnquiryWithBoth(
        sendContactEmail,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          countryCode: formData.countryCode,
          message: formData.message,
        },
        formData,
        `Hospital Contact - ${hospital?.name || 'Unknown Hospital'}`,
        `Hospital - ${hospital?.name || 'Unknown'}`
      );

      // Redirect on success
      if (result.success) {
        window.location.href = '/thank-you';
      }
    } catch (err) {
      console.error('Failed to submit hospital contact form', err);
    }
  };



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Overview Content */}
        <div className="lg:w-2/3">
          {/* Overview Header */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Overview</h2>

          {/* Hospital Statistics */}
          {hospitalStats.length > 0 && (
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
          )}

          {/* Hospital Details */}
          {hospitalDetails.length > 0 && (
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
          )}

          {/* Location Information */}
          {location && (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Selected Location</h4>
              <p className="text-blue-700">{location}</p>
            </div>
          )}

          {/* Certificates Section */}
          {hospital?.accreditation && hospital.accreditation.length > 0 && (
            <CertificateSwiper
              certificates={hospital.accreditation.map(acc => ({
                name: `${acc} Accreditation`,
                logo: acc === 'JCI' ? '/CertificatesImg/bbb.png' :
                  acc === 'NABH' ? '/CertificatesImg/NABH.jpeg' :
                    acc === 'NABL' ? '/CertificatesImg/NABL.jpeg' :
                      acc === 'CAP' ? '/CertificatesImg/CAP.jpeg' : '/CertificatesImg/NABH.jpeg',
                description: acc === 'JCI' ? 'Joint Commission International' :
                  acc === 'NABH' ? 'National Accreditation Board for Hospitals' :
                    acc === 'NABL' ? 'National Accreditation Board for Testing and Calibration Laboratories' :
                      acc === 'CAP' ? 'College of American Pathologists' : acc
              }))}
              variant="minimal"
              title="Certificates & Accreditations"
              showNavigation={true}
              className="mb-8"
            />
          )}


        </div>

        {/* Right Column - Contact Form and Team Image */}
        <div className="lg:w-1/3">
          {/* Team Image with Contact CTA */}
              <div className="relative rounded-2xl overflow-hidden mb-6">
            <img
              src={apiService.getImageUrl(hospital?.displayImage || hospital?.gallery?.[0]) || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop"}
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
              {/* Honeypot field (hidden) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <PhoneInput
                  value={{ countryCode: formData.countryCode, phone: formData.phone }}
                  onChange={({ countryCode, phone }) => setFormData(prev => ({ ...prev, countryCode, phone }))}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
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
