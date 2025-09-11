"use client";

import React, { useState } from 'react';
import { Send, User, Mail, Phone, Stethoscope, MapPin, MessageSquare } from 'lucide-react';

const ConsultationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        hospital: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                specialty: '',
                hospital: '',
                message: ''
            });
        }, 3000);
    };

    if (isSubmitted) {
        return (
            <section className="w-full py-16 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-[#04CE78] to-green-600 rounded-3xl p-8 md:p-12 text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                            <Send className="w-8 h-8 text-[#04CE78]" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Thank You for Your Interest!
                        </h3>
                        <p className="text-white/90 text-lg">
                            Our medical team will contact you within 24 hours to discuss your healthcare needs.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Side - Content */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 bg-[#04CE78] text-white px-4 py-2 rounded-full text-sm font-semibold">
                                <Stethoscope className="w-4 h-4" />
                                FREE CONSULTATION
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A0142] leading-tight">
                                Start Your Medical Journey Today
                            </h2>
                            <p className="text-lg text-[#0B0757] leading-relaxed">
                                Get personalized healthcare guidance from India's top medical experts.
                                Our team will help you find the right treatment and hospital for your needs.
                            </p>
                        </div>

                        {/* Benefits List */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-[#04CE78] rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <span className="text-[#0B0757] font-medium">Expert medical consultation</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-[#04CE78] rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <span className="text-[#0B0757] font-medium">Hospital recommendations</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-[#04CE78] rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <span className="text-[#0B0757] font-medium">Treatment cost estimates</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-[#04CE78] rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <span className="text-[#0B0757] font-medium">24/7 support throughout your journey</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#04CE78] focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your phone number"
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
                                        Get Free Consultation
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                By submitting this form, you agree to our privacy policy and terms of service.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultationForm;
