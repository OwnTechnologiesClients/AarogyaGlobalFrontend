"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Building2, User, Stethoscope, Microscope, Truck, Heart, Briefcase, Plane, Shield } from "lucide-react";
import PhoneInput from "../ui/PhoneInput";
import { sendPartnerEmail, validateFormData } from "../../lib/emailService";
import { submitEnquiryWithBoth, validateEnquiryData } from "../../lib/enquiryService";

const PartnerForm = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    countryCode: "+91",
    organizationType: "",
    services: [],
    location: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [startTime] = useState(Date.now());

  const organizationTypes = [
    { value: "hospital", label: "Hospital", icon: <Building2 className="w-5 h-5" /> },
    { value: "clinic", label: "Clinic", icon: <Stethoscope className="w-5 h-5" /> },
    { value: "diagnostic", label: "Diagnostic Center", icon: <Microscope className="w-5 h-5" /> },
    { value: "pharmacy", label: "Pharmacy", icon: <Truck className="w-5 h-5" /> },
    { value: "specialty", label: "Specialty Center", icon: <Heart className="w-5 h-5" /> },
    { value: "individual", label: "Individual Doctor", icon: <User className="w-5 h-5" /> },
    { value: "individual_freelance", label: "Individual/Freelance", icon: <User className="w-5 h-5" /> },
    { value: "business_owner", label: "Business Owner", icon: <Briefcase className="w-5 h-5" /> },
    { value: "travel_agent", label: "Travel Agent", icon: <Plane className="w-5 h-5" /> },
    { value: "insurance_agent", label: "Insurance Agent", icon: <Shield className="w-5 h-5" /> }
  ];

  const serviceOptions = [
    "General Medicine",
    "Cardiology",
    "Neurology",
    "Orthopaedics",
    "Gynaecology",
    "Oncology",
    "Urology",
    "Diagnostic Services",
    "Pharmacy Services",
    "Emergency Care",
    "Surgery",
    "Rehabilitation"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const validateForm = () => {
    const validation = validateFormData(formData, [
      'organizationName', 
      'contactPerson', 
      'email', 
      'phone', 
      'organizationType', 
      'location'
    ]);
    
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bot checks: honeypot and minimum fill time (1.5s)
    const elapsedMs = Date.now() - startTime;
    if (honeypot || elapsedMs < 1500) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      // Find the full label for organization type
      const selectedOrgType = organizationTypes.find(type => type.value === formData.organizationType);
      const orgTypeLabel = selectedOrgType ? selectedOrgType.label : formData.organizationType;
      
      // Use hybrid approach: send email via EmailJS AND save to backend
      const result = await submitEnquiryWithBoth(
        sendPartnerEmail,
        {
          organizationName: formData.organizationName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          countryCode: formData.countryCode,
          organizationType: orgTypeLabel,
          services: formData.services,
          location: formData.location,
          message: formData.message,
        },
        {
          ...formData,
          organizationType: orgTypeLabel,
          subject: 'Partnership Inquiry'
        },
        'Partnership Inquiry',
        'Partnership'
      );

      setIsSubmitting(false);
      
      // Redirect on success
      if (result.success) {
        window.location.href = '/thank-you';
      }
    } catch (err) {
      setIsSubmitting(false);
      console.error('Failed to submit partner form', err);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="w-16 h-16 bg-[#04CE78] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your interest in partnering with Aarogya Global. Our team will review
              your application and contact you within 2-3 business days.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-[#04CE78] hover:bg-[#03B868] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Apply for Partnership
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fill out the form below to start your partnership journey with Aarogya Global.
            Our team will review your application and get back to you within 2-3 business days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-10 shadow-lg h-fit">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#04CE78] rounded-full p-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 break-all text-sm leading-relaxed">aarogyaglobalforyou@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#04CE78] rounded-full p-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+380 93 128 1076</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#04CE78] rounded-full p-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      Aarogya Global Headquarters<br />
                      Mumbai, Maharashtra
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden from users) */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#04CE78] focus:border-transparent ${errors.organizationName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="Enter organization name"
                    />
                    {errors.organizationName && (
                      <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#04CE78] focus:border-transparent ${errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="Enter contact person name"
                    />
                    {errors.contactPerson && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#04CE78] focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <PhoneInput
                      value={{ countryCode: formData.countryCode, phone: formData.phone }}
                      onChange={({ countryCode, phone }) => setFormData(prev => ({ ...prev, countryCode, phone }))}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization Type *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {organizationTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${formData.organizationType === type.value
                          ? 'border-[#04CE78] bg-[#04CE78]/10'
                          : 'border-gray-300 hover:border-[#04CE78]'
                          }`}
                      >
                        <input
                          type="radio"
                          name="organizationType"
                          value={type.value}
                          checked={formData.organizationType === type.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="text-[#04CE78]">{type.icon}</div>
                        <span className="text-sm font-medium">{type.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.organizationType && (
                    <p className="text-red-500 text-sm mt-1">{errors.organizationType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Services Offered
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {serviceOptions.map((service) => (
                      <label
                        key={service}
                        className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-[#04CE78] transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 text-[#04CE78] border-gray-300 rounded focus:ring-[#04CE78]"
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#04CE78] focus:border-transparent ${errors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter city and state"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04CE78] focus:border-transparent"
                    placeholder="Tell us more about your organization and partnership goals..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#04CE78] hover:bg-[#03B868] disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerForm; 