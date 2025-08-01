"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, UserCheck, Stethoscope, Plane } from 'lucide-react';

const TreatmentDetailsClient = ({ treatmentData }) => {
    const [expandedSections, setExpandedSections] = useState({});
    const [expandedFAQ, setExpandedFAQ] = useState({});

    const { treatment } = treatmentData;

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const toggleFAQ = (index) => {
        setExpandedFAQ(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Page Title */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            {treatment.title}
                        </h1>

                        {/* Navigation Links */}
                        <div className="flex flex-wrap gap-4 mb-8 pb-4 border-b">
                            <a href="#overview" className="text-blue-600 hover:text-blue-800 font-medium">Overview</a>
                            <a href="#hospitals" className="text-blue-600 hover:text-blue-800 font-medium">Best Hospitals</a>
                            <a href="#doctors" className="text-blue-600 hover:text-blue-800 font-medium">Best Doctors</a>
                            <a href="#diagnostic" className="text-blue-600 hover:text-blue-800 font-medium">Diagnostic Tools</a>
                            <a href="#treatments" className="text-blue-600 hover:text-blue-800 font-medium">Treatment Options</a>
                            <a href="#cost" className="text-blue-600 hover:text-blue-800 font-medium">Cost</a>
                            <a href="#faq" className="text-blue-600 hover:text-blue-800 font-medium">FAQ</a>
                        </div>

                        {/* Overview Section */}
                        <section id="overview" className="mb-12">
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {treatment.overview.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                                    {treatment.overview.cta.bookConsultation}
                                </a>
                                <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                                    {treatment.overview.cta.secondOpinion}
                                </a>
                                <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                                    {treatment.overview.cta.callBack}
                                </a>
                            </div>
                        </section>

                        {/* Best Hospitals Section */}
                        <section id="hospitals" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {treatment.bestHospitals.title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                {treatment.bestHospitals.hospitals.map((hospital, index) => (
                                    <div key={hospital.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <img
                                            src={hospital.image}
                                            alt={hospital.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg mb-2">{hospital.name}</h3>
                                            <p className="text-gray-600 text-sm">{hospital.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center mb-4">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    {treatment.bestHospitals.description}
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    {treatment.bestHospitals.selectionCriteria.map((criteria, index) => (
                                        <li key={index}>{criteria}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Top Doctors Section */}
                        <section id="doctors" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {treatment.topDoctors.title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                {treatment.topDoctors.doctors.map((doctor, index) => (
                                    <div key={doctor.id} className="text-center">
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                        />
                                        <h3 className="font-bold text-lg mb-1">{doctor.name}</h3>
                                        <p className="text-gray-600 text-sm mb-1">{doctor.specialty}</p>
                                        <p className="text-gray-500 text-xs">{doctor.location}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center mb-4">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    {treatment.topDoctors.description}
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    {treatment.topDoctors.selectionCriteria.map((criteria, index) => (
                                        <li key={index}>{criteria}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Diagnostic Tools Section */}
                        <section id="diagnostic" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {treatment.diagnosticTools.title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Conventional Methods */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-4">
                                        {treatment.diagnosticTools.conventionalMethods.title}
                                    </h3>

                                    <div className="mb-4">
                                        <div className="bg-green-100 p-4 rounded-lg mb-3">
                                            <h4 className="font-semibold text-green-800 mb-2">
                                                {treatment.diagnosticTools.conventionalMethods.primary.name}
                                            </h4>
                                            <p className="text-green-700 text-sm">
                                                {treatment.diagnosticTools.conventionalMethods.primary.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {treatment.diagnosticTools.conventionalMethods.secondary.map((method, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => toggleSection(`conventional-${index}`)}
                                                    className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50"
                                                >
                                                    <span className="font-medium">{method}</span>
                                                    {expandedSections[`conventional-${index}`] ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>
                                                {expandedSections[`conventional-${index}`] && (
                                                    <div className="p-3 bg-gray-50 text-sm text-gray-600">
                                                        Detailed information about {method.toLowerCase()}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Advanced Options */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-4">
                                        {treatment.diagnosticTools.advancedOptions.title}
                                    </h3>

                                    <div className="mb-4">
                                        <div className="bg-green-100 p-4 rounded-lg mb-3">
                                            <h4 className="font-semibold text-green-800 mb-2">
                                                {treatment.diagnosticTools.advancedOptions.primary.name}
                                            </h4>
                                            <p className="text-green-700 text-sm">
                                                {treatment.diagnosticTools.advancedOptions.primary.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {treatment.diagnosticTools.advancedOptions.secondary.map((method, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => toggleSection(`advanced-${index}`)}
                                                    className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50"
                                                >
                                                    <span className="font-medium">{method}</span>
                                                    {expandedSections[`advanced-${index}`] ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>
                                                {expandedSections[`advanced-${index}`] && (
                                                    <div className="p-3 bg-gray-50 text-sm text-gray-600">
                                                        Detailed information about {method.toLowerCase()}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Treatment Packages Section */}
                        <section id="treatments" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {treatment.treatmentPackages.title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                {treatment.treatmentPackages.packages.map((pkg, index) => (
                                    <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
                                            <p className="text-2xl font-bold text-green-600 mb-2">{pkg.price}</p>
                                            <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                                            <div className="text-xs text-gray-500">
                                                <p>Duration: {pkg.duration}</p>
                                                <p>Recovery: {pkg.recovery}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center mb-4">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                        </section>

                        {/* Advanced Treatments Section */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {treatment.advancedTreatments.title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Latest Options */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-4">
                                        {treatment.advancedTreatments.latestOptions.title}
                                    </h3>

                                    <div className="mb-4">
                                        <div className="bg-green-100 p-4 rounded-lg mb-3">
                                            <h4 className="font-semibold text-green-800 mb-2">
                                                {treatment.advancedTreatments.latestOptions.primary.name}
                                            </h4>
                                            <p className="text-green-700 text-sm">
                                                {treatment.advancedTreatments.latestOptions.primary.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {treatment.advancedTreatments.latestOptions.secondary.map((option, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => toggleSection(`latest-${index}`)}
                                                    className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50"
                                                >
                                                    <span className="font-medium">{option}</span>
                                                    {expandedSections[`latest-${index}`] ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>
                                                {expandedSections[`latest-${index}`] && (
                                                    <div className="p-3 bg-gray-50 text-sm text-gray-600">
                                                        Detailed information about {option.toLowerCase()}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Advancements */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-4">
                                        {treatment.advancedTreatments.advancements.title}
                                    </h3>

                                    <div className="mb-4">
                                        <div className="bg-green-100 p-4 rounded-lg mb-3">
                                            <h4 className="font-semibold text-green-800 mb-2">
                                                {treatment.advancedTreatments.advancements.primary.name}
                                            </h4>
                                            <p className="text-green-700 text-sm">
                                                {treatment.advancedTreatments.advancements.primary.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {treatment.advancedTreatments.advancements.secondary.map((advancement, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => toggleSection(`advancement-${index}`)}
                                                    className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50"
                                                >
                                                    <span className="font-medium">{advancement}</span>
                                                    {expandedSections[`advancement-${index}`] ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>
                                                {expandedSections[`advancement-${index}`] && (
                                                    <div className="p-3 bg-gray-50 text-sm text-gray-600">
                                                        Detailed information about {advancement.toLowerCase()}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Costs Section */}
                        <section id="cost" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {treatment.costs.title}
                            </h2>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="space-y-3">
                                    {treatment.costs.treatments.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                            <span className="font-medium text-gray-800">{item.name}</span>
                                            <span className="font-bold text-green-600">{item.cost}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Advantages Section */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {treatment.advantages.title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Benefits */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-4">
                                        {treatment.advantages.benefits.title}
                                    </h3>

                                    <div className="mb-4">
                                        <div className="bg-green-100 p-4 rounded-lg mb-3">
                                            <h4 className="font-semibold text-green-800 mb-2">
                                                {treatment.advantages.benefits.primary.name}
                                            </h4>
                                            <p className="text-green-700 text-sm">
                                                {treatment.advantages.benefits.primary.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {treatment.advantages.benefits.secondary.map((benefit, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => toggleSection(`benefit-${index}`)}
                                                    className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50"
                                                >
                                                    <span className="font-medium">{benefit}</span>
                                                    {expandedSections[`benefit-${index}`] ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>
                                                {expandedSections[`benefit-${index}`] && (
                                                    <div className="p-3 bg-gray-50 text-sm text-gray-600">
                                                        Detailed information about {benefit.toLowerCase()}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Reasons */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-4">
                                        {treatment.advantages.reasons.title}
                                    </h3>

                                    <div className="mb-4">
                                        <div className="bg-green-100 p-4 rounded-lg mb-3">
                                            <h4 className="font-semibold text-green-800 mb-2">
                                                {treatment.advantages.reasons.primary.name}
                                            </h4>
                                            <p className="text-green-700 text-sm">
                                                {treatment.advantages.reasons.primary.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {treatment.advantages.reasons.secondary.map((reason, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => toggleSection(`reason-${index}`)}
                                                    className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50"
                                                >
                                                    <span className="font-medium">{reason}</span>
                                                    {expandedSections[`reason-${index}`] ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>
                                                {expandedSections[`reason-${index}`] && (
                                                    <div className="p-3 bg-gray-50 text-sm text-gray-600">
                                                        Detailed information about {reason.toLowerCase()}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* How We Help Section */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {treatment.howWeHelp.title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {treatment.howWeHelp.services.map((service, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            {service.icon === 'phone' && <Phone className="w-8 h-8 text-blue-600" />}
                                            {service.icon === 'user-check' && <UserCheck className="w-8 h-8 text-blue-600" />}
                                            {service.icon === 'stethoscope' && <Stethoscope className="w-8 h-8 text-blue-600" />}
                                            {service.icon === 'plane' && <Plane className="w-8 h-8 text-blue-600" />}
                                        </div>
                                        <h3 className="font-semibold text-gray-800 mb-2">{service.title}</h3>
                                        <p className="text-gray-600 text-sm">{service.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section id="faq" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {treatment.faq.title}
                            </h2>

                            <div className="space-y-4">
                                {treatment.faq.questions.map((faq, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg">
                                        <button
                                            onClick={() => toggleFAQ(index)}
                                            className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                                        >
                                            <span className="font-medium text-gray-800">{faq.question}</span>
                                            {expandedFAQ[index] ? (
                                                <ChevronUp className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            )}
                                        </button>
                                        {expandedFAQ[index] && (
                                            <div className="p-4 bg-gray-50 text-gray-700">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact</h3>
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 hover:bg-blue-700">
                                Book a free consultation
                            </button>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows="4"
                                        placeholder="Tell us about your condition..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                                >
                                    Send Request
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatmentDetailsClient; 