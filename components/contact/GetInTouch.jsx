"use client";
import React, { useState } from "react";
import WelcomeBanner from "../layout/WelcomeBanner";
import { Send, User, Mail, Phone, Stethoscope, MapPin, MessageSquare } from "lucide-react";
import PhoneInput from "../ui/PhoneInput";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    specialty: "",
    hospital: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [startTime] = useState(Date.now());

  const specialties = [
    'Select Medical Specialty',
    'Cardiology',
    'Orthopaedics',
    'Oncology',
    'Neurology',
    'Gynaecology',
    'Urology',
    'General Medicine',
    'Other'
  ];

  const hospitals = [
    'Select Preferred Hospital',
    'Fortis Memorial Research Institute',
    'Medanta The Medicity',
    'Max Super Speciality Hospital',
    'Artemis Hospital',
    'Apollo Hospital',
    'Kokilaben Dhirubhai Ambani Hospital',
    'Manipal Hospital',
    'Narayana Health City',
    'Gleneagles Global Health City'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elapsedMs = Date.now() - startTime;
    if (honeypot || elapsedMs < 1500) {
      return;
    }
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/thank-you?source=get-in-touch';
    }
  };

  if (isSubmitted) {
    return (
      <section className="flex flex-col items-center md:mb-16 md:mt-16 mb-8 mt-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-2xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#1A0142] mb-4">
            Thank You for Your Message!
          </h3>
          <p className="text-lg text-[#0B0757] mb-6">
            We've received your inquiry and our medical team will get back to you within 24 hours.
          </p>
          <p className="text-sm text-gray-600">
            Redirecting back to form...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center md:mb-16 md:mt-16 mb-8 mt-8">
      <WelcomeBanner
        text="Get In Touch"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-lg mb-7 "
      />
      <h3 className=" text-center text-2xl md:text-4xl font-extrabold text-[#1A0142] leading-tight mb-7">
        Don't Hesitate To Contact Us
      </h3>

      <div className="w-full px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          {/* Contact Form (with shadow + white background) */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-2xl p-6 md:p-8">
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
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#0B0757]">
                    <User className="w-4 h-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#04CE78] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#0B0757]">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#04CE78] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#0B0757]">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </label>
                <PhoneInput
                  value={{ countryCode: formData.countryCode, phone: formData.phone }}
                  onChange={({ countryCode, phone }) => setFormData(prev => ({ ...prev, countryCode, phone }))}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Specialty Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#0B0757]">
                    <Stethoscope className="w-4 h-4" />
                    Medical Specialty
                  </label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#04CE78] focus:border-transparent transition-all duration-200"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hospital Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#0B0757]">
                    <MapPin className="w-4 h-4" />
                    Preferred Hospital
                  </label>
                  <select
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#04CE78] focus:border-transparent transition-all duration-200"
                  >
                    {hospitals.map((hospital) => (
                      <option key={hospital} value={hospital}>
                        {hospital}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#0B0757]">
                  <MessageSquare className="w-4 h-4" />
                  Additional Requirements
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#04CE78] focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your medical requirements or any specific questions..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#04CE78] to-green-600 hover:from-green-600 hover:to-[#04CE78] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>

          {/* Map (only rounded, no shadow) */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[576px] rounded-[20px] overflow-hidden">
              <iframe
                title="Location Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.0266%2C28.4089%2C77.0866%2C28.4689&layer=mapnik&marker=28.4389%2C77.0566"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />

              {/* Top Overlay Info */}
              <div className="absolute top-3 left-3 right-3 z-10">
                <div className="bg-white rounded-md shadow p-3 w-fit max-w-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800">
                      Gurugram
                    </span>
                    <img
                      src="/images/img_div_icon.png"
                      alt="icon"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="text-xs text-gray-600 leading-snug mb-2">
                    Innov8 Orchid Center India, 122001
                    <br />
                    <span className="text-blue-500 underline cursor-pointer">
                      Directions
                    </span>
                  </div>
                  <span className="text-xs text-blue-500 underline cursor-pointer">
                    View larger map
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
