"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Phone, UserCheck, Stethoscope, Plane } from 'lucide-react';
import TreatmentNavigation from '../../../../components/TreatmentDetails/TreatmentNavigation';
import DoctorsSwiper from '../../../../components/TreatmentDetails/DoctorsSwiper';
import HospitalsSwiper from '../../../../components/TreatmentDetails/HospitalsSwiper';
import dataService from '../../../../lib/dataService';

const TreatmentDetailsClient = ({ treatmentData }) => {
    const [expandedSections, setExpandedSections] = useState({});
    const [expandedFAQ, setExpandedFAQ] = useState({});
    const [activeTab, setActiveTab] = useState('Overview');
    const [treatmentDoctors, setTreatmentDoctors] = useState([]);

    // Helper function to convert euros to rupees (approximate rate: 1 EUR = 90 INR)
    const convertToRupees = (euroString) => {
        // Handle undefined or null values
        if (!euroString) {
            return "Contact for pricing";
        }

        const euroMatch = euroString.match(/€([\d,]+)/);
        if (euroMatch) {
            const euroAmount = parseFloat(euroMatch[1].replace(/,/g, ''));
            const rupeesAmount = euroAmount * 90; // Approximate conversion rate
            return `₹${rupeesAmount.toLocaleString('en-IN')}`;
        }
        return euroString; // Return original if no euro symbol found
    };

    // Helper function to convert rupees to dollars (approximate rate: 1 INR = 0.012 USD)
    const convertToDollars = (rupeeString) => {
        // Handle undefined or null values
        if (!rupeeString) {
            return "Contact for pricing";
        }

        // Convert "lakh" to actual numbers (1 lakh = 100,000)
        let convertedString = rupeeString;

        // Convert ₹2.0–3.5 lakh to $2,400–4,200
        convertedString = convertedString.replace(/₹(\d+\.?\d*)\s*–\s*(\d+\.?\d*)\s*lakh/g, (match, min, max) => {
            const minRupees = parseFloat(min) * 100000;
            const maxRupees = parseFloat(max) * 100000;
            const minDollars = Math.round(minRupees * 0.012);
            const maxDollars = Math.round(maxRupees * 0.012);
            return `$${minDollars.toLocaleString('en-US')}–$${maxDollars.toLocaleString('en-US')}`;
        });

        // Convert ₹4–7 lakh to $4,800–8,400
        convertedString = convertedString.replace(/₹(\d+)\s*–\s*(\d+)\s*lakh/g, (match, min, max) => {
            const minRupees = parseFloat(min) * 100000;
            const maxRupees = parseFloat(max) * 100000;
            const minDollars = Math.round(minRupees * 0.012);
            const maxDollars = Math.round(maxRupees * 0.012);
            return `$${minDollars.toLocaleString('en-US')}–$${maxDollars.toLocaleString('en-US')}`;
        });

        // Convert remaining ₹ amounts
        convertedString = convertedString.replace(/₹(\d+\.?\d*)/g, (match, amount) => {
            const rupeeAmount = parseFloat(amount);
            const dollarAmount = Math.round(rupeeAmount * 0.012);
            return `$${dollarAmount.toLocaleString('en-US')}`;
        });

        return convertedString;
    };

    // Handle case when treatmentData is not available
    if (!treatmentData) {
        console.error('TreatmentDetailsClient: treatmentData is null or undefined');
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Treatment data not available</div>
            </div>
        );
    }

    if (!treatmentData.treatment) {
        console.error('TreatmentDetailsClient: treatmentData.treatment is null or undefined');
        console.log('TreatmentDetailsClient: treatmentData structure:', JSON.stringify(treatmentData, null, 2));
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Treatment object not available</div>
            </div>
        );
    }

    const { treatment } = treatmentData;
    console.log('TreatmentDetailsClient: treatment object:', JSON.stringify(treatment, null, 2));

    // Handle case when treatment object is missing required properties
    if (!treatment) {
        console.error('TreatmentDetailsClient: treatment is null or undefined after destructuring');
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Treatment information is missing</div>
            </div>
        );
    }

    if (!treatment.title) {
        console.error('TreatmentDetailsClient: treatment.title is missing');
        console.log('TreatmentDetailsClient: treatment properties:', Object.keys(treatment));
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Treatment title is missing</div>
            </div>
        );
    }

    if (!treatment.overview) {
        console.error('TreatmentDetailsClient: treatment.overview is missing');
        console.log('TreatmentDetailsClient: treatment properties:', Object.keys(treatment));
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Treatment overview is missing</div>
            </div>
        );
    }

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

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const sectionMap = {
            'Overview': 'overview',
            'Hospitals': 'hospitals',
            'Doctors': 'doctors',
            'Diagnostic': 'diagnostic',
            'Cost': 'cost',
            'FAQ': 'faq'
        };
        const sectionId = sectionMap[tab];
        if (sectionId) {
            scrollToSection(sectionId);
        }
    };

    // Scroll spy functionality
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['overview', 'hospitals', 'doctors', 'diagnostic', 'cost', 'faq'];
            const scrollPosition = window.scrollY + 200; // Offset for better detection

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    const tabMap = {
                        'overview': 'Overview',
                        'hospitals': 'Hospitals',
                        'doctors': 'Doctors',
                        'diagnostic': 'Diagnostic',
                        'cost': 'Cost',
                        'faq': 'FAQ'
                    };
                    setActiveTab(tabMap[sections[i]]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch doctors for this treatment
    useEffect(() => {
        if (treatment && treatment.topDoctors && treatment.topDoctors.doctors) {
            setTreatmentDoctors(treatment.topDoctors.doctors);
        }
    }, [treatment]);

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

                        {/* Treatment Navigation */}
                        <TreatmentNavigation activeTab={activeTab} setActiveTab={handleTabClick} />

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
                            <HospitalsSwiper
                                hospitals={treatment.bestHospitals.hospitals}
                                title={treatment.bestHospitals.title}
                            />

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
                            <DoctorsSwiper
                                doctors={treatmentDoctors}
                                title="Top Doctors for this Treatment"
                            />

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">
                                    How to select the best doctor?
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    {treatment.topDoctors && treatment.topDoctors.selectionCriteria && treatment.topDoctors.selectionCriteria.map((criteria, index) => (
                                        <li key={index}>{criteria}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Diagnostic Tools Section */}
                        <section id="diagnostic" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Diagnostic Tools for {treatment.name || 'Treatment'}
                            </h2>

                            <div className="space-y-3">
                                {Array.isArray(treatment.diagnosticTools) && treatment.diagnosticTools.map((tool, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <span className="text-gray-800 font-medium">{tool}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Cost Section */}
                        <section id="cost" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Treatment Cost & Packages
                            </h2>

                            <div className="grid grid-cols-1 gap-6 mb-6">
                                {treatment.treatmentPackages.packages.map((pkg, index) => (
                                    <div key={pkg.id} className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="md:w-2/5">
                                                <img
                                                    src={pkg.image}
                                                    alt={pkg.name}
                                                    className="w-full h-64 object-cover"
                                                />
                                            </div>
                                            <div className="md:w-3/5 p-6">
                                                <h3 className="font-bold text-2xl mb-4 text-gray-800">{pkg.name}</h3>
                                                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded-r-lg">
                                                    <p className="text-2xl font-bold text-green-600">{convertToDollars(pkg.price)}</p>
                                                </div>
                                                <p className="text-gray-700 text-base mb-4 leading-relaxed">{pkg.description}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <div className="bg-gray-50 p-3 rounded-lg">
                                                        <p className="font-semibold text-gray-800 mb-1">Duration</p>
                                                        <p className="text-gray-600">{pkg.duration}</p>
                                                    </div>
                                                    <div className="bg-gray-50 p-3 rounded-lg">
                                                        <p className="font-semibold text-gray-800 mb-1">Recovery</p>
                                                        <p className="text-gray-600">{pkg.recovery}</p>
                                                    </div>
                                                </div>
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
                                Advanced Treatment Options for {treatment.name || 'Treatment'}
                            </h2>

                            <div className="space-y-3">
                                {Array.isArray(treatment.advancedTreatments) && treatment.advancedTreatments.map((treatment, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                            <span className="text-gray-800 font-medium">{treatment}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>



                        {/* Advantages Section */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Advantages of {treatment.name || 'Treatment'}
                            </h2>

                            <div className="space-y-3">
                                {Array.isArray(treatment.advantages) && treatment.advantages.map((advantage, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                            <span className="text-gray-800 font-medium">{advantage}</span>
                                        </div>
                                    </div>
                                ))}
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
                                Frequently Asked Questions about {treatment.name}
                            </h2>

                            <div className="space-y-4">
                                {Array.isArray(treatment.faq) && treatment.faq.map((faq, index) => (
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
                                            <div className="p-4 bg-gray-50 text-gray-700 border-t border-gray-200">
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