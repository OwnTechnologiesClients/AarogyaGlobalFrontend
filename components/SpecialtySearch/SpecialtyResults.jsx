"use client";
import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import SpecialtyHospitalCard from './SpecialtyHospitalCard';
import TreatmentCard from './TreatmentCard';
import { ArrowRight } from 'lucide-react';
import PhoneInput from '../ui/PhoneInput';
import { sendConsultationEmail, validateFormData } from '../../lib/emailService';

const SpecialtyResults = ({
  doctors = [],
  hospitals = [],
  treatments = [],
  activeCategory,
  specialtyName
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  // Shared CTA state (sufficient for single active interaction)
  const [ctaPhone, setCtaPhone] = useState("");
  const [ctaCountry, setCtaCountry] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");
  const [finalPhone, setFinalPhone] = useState("");
  const [finalCountry, setFinalCountry] = useState("");
  const [finalEmail, setFinalEmail] = useState("");
  const [ctaErrors, setCtaErrors] = useState({});
  const [finalErrors, setFinalErrors] = useState({});
  const cardsPerPage = 12; // Show all treatments on one page to ensure proper CTA placement

  // Determine what data to show based on active category
  useEffect(() => {
    let data = [];
    switch (activeCategory) {
      case 'Doctors':
        data = doctors;
        break;
      case 'Hospitals':
        data = hospitals;
        break;
      case 'Treatments':
        data = treatments;
        break;
      default: // 'All'
        data = [
          ...doctors.map(item => ({ ...item, type: 'doctor' })),
          ...hospitals.map(item => ({ ...item, type: 'hospital' })),
          ...treatments.map(item => ({ ...item, type: 'treatment' }))
        ];
        break;
    }
    setDisplayData(data);
    setCurrentPage(1); // Reset to first page when category changes
  }, [doctors, hospitals, treatments, activeCategory]);

  const totalPages = Math.ceil(displayData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = displayData.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCard = (item, index) => {
    if (activeCategory === 'Doctors' || item.type === 'doctor') {
      return <DoctorCard key={`doctor-${item.id}-${index}`} doctor={item} />;
    } else if (activeCategory === 'Hospitals' || item.type === 'hospital') {
      return <SpecialtyHospitalCard key={`hospital-${item.id}-${index}`} hospital={item} />;
    } else if (activeCategory === 'Treatments' || item.type === 'treatment') {
      return <TreatmentCard key={`treatment-${item.id}-${index}`} treatment={item} />;
    }
  };

  const renderCTASection = (index) => {
    return (
      <div key={`cta-${index}`} className="col-span-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 my-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Need Help Finding the Right {specialtyName} Treatment?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">Phone Number *</label>
            <PhoneInput
              value={{ countryCode: ctaCountry, phone: ctaPhone }}
              onChange={({ countryCode, phone }) => { setCtaCountry(countryCode); setCtaPhone(phone); }}
            />
            {ctaErrors.phone && <p className="text-red-500 text-sm mt-1">{ctaErrors.phone}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">Email *</label>
            <input
              type="email"
              placeholder="Type Email"
              className={`w-full px-4 py-4 border bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                ctaErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              value={ctaEmail}
              onChange={(e) => setCtaEmail(e.target.value)}
            />
            {ctaErrors.email && <p className="text-red-500 text-sm mt-1">{ctaErrors.email}</p>}
          </div>
        </div>
        <button
          onClick={async () => {
            // Validate form data
            const validation = validateFormData({ 
              phone: ctaPhone, 
              email: ctaEmail 
            }, ['phone', 'email']);
            
            if (!validation.isValid) {
              setCtaErrors(validation.errors);
              return;
            }

            setCtaErrors({});
            
            try {
              await sendConsultationEmail({ name: '', email: ctaEmail, phone: ctaPhone, countryCode: ctaCountry, specialty: '', hospital: '', message: '' }, `${specialtyName} – Callback`);
              if (typeof window !== 'undefined') {
                window.location.href = '/thank-you';
              }
            } catch (e) {
              alert('Failed to submit. Please try again.');
            }
          }}
          className="mt-4 bg-[#04CE78] hover:bg-green-600 text-white py-4 px-4 font-bold text-lg rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-lg"
        >
          <span>Request Callback</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const renderTreatmentGrid = () => {
    if (activeCategory === 'Treatments') {
      const items = [];
      currentCards.forEach((item, index) => {
        // Add treatment card
        items.push(
          <div key={`treatment-${item.id}-${index}`} className="col-span-1">
            {renderCard(item, index)}
          </div>
        );

        // Add CTA after every 6 treatments (after every 2 complete columns of 3 cards)
        // This ensures: 3 cards in first column, 3 cards in second column, then CTA
        if ((index + 1) % 6 === 0 && index < currentCards.length - 1) {
          items.push(
            <div key={`cta-${index}`} className="col-span-1 md:col-span-2 lg:col-span-3">
              {renderCTASection(index)}
            </div>
          );
        }
      });

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items}
        </div>
      );
    }

    // For other categories, render normally
    return (
      <div className={getGridClass()}>
        {currentCards.map((item, index) => renderCard(item, index))}
      </div>
    );
  };

  const getGridClass = () => {
    if (activeCategory === 'Treatments') {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6";
    }
    return "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8";
  };

  return (
    <div className="mt-8">
      <section className="gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 bg-white rounded-lg border border-black-100 shadow-md mx-2 sm:mx-4 md:mx-8 lg:mx-10 my-3 sm:my-4 md:my-5">
        <div className="max-w-7xl mx-auto">

          {/* Results Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {specialtyName} {activeCategory === 'All' ? 'Search Results' : activeCategory}
            </h2>
            <p className="text-gray-600">
              Found {displayData.length} {activeCategory === 'All' ? 'results' : activeCategory.toLowerCase()}
            </p>
          </div>

          {displayData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No {activeCategory.toLowerCase()} found.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search filters</p>
            </div>
          ) : (
            <>
              {/* Results Grid */}
              {renderTreatmentGrid()}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4">
                  {/* Mobile: Simple Previous/Next */}
                  <div className="flex sm:hidden items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>

                  {/* Desktop: Full Pagination */}
                  <div className="hidden sm:flex items-center space-x-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === index + 1
                          ? 'bg-blue-600 text-white border border-blue-600'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Final Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Need Help Finding the Right {specialtyName} Care?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">Phone Number *</label>
                <PhoneInput
                  value={{ countryCode: finalCountry, phone: finalPhone }}
                  onChange={({ countryCode, phone }) => { setFinalCountry(countryCode); setFinalPhone(phone); }}
                />
                {finalErrors.phone && <p className="text-red-500 text-sm mt-1">{finalErrors.phone}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Type Email"
                  className={`w-full px-4 py-4 border bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    finalErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={finalEmail}
                  onChange={(e) => setFinalEmail(e.target.value)}
                />
                {finalErrors.email && <p className="text-red-500 text-sm mt-1">{finalErrors.email}</p>}
              </div>
            </div>
            <button
              onClick={async () => {
                // Validate form data
                const validation = validateFormData({ 
                  phone: finalPhone, 
                  email: finalEmail 
                }, ['phone', 'email']);
                
                if (!validation.isValid) {
                  setFinalErrors(validation.errors);
                  return;
                }

                setFinalErrors({});
                
                try {
                  await sendConsultationEmail({ name: '', email: finalEmail, phone: finalPhone, countryCode: finalCountry, specialty: '', hospital: '', message: '' }, `${specialtyName} – Callback`);
                  if (typeof window !== 'undefined') {
                    window.location.href = '/thank-you';
                  }
                } catch (e) {
                  alert('Failed to submit. Please try again.');
                }
              }}
              className="mt-4 bg-[#04CE78] hover:bg-green-600 text-white py-4 px-4 font-bold text-lg rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-lg"
            >
              <span>Request Callback</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpecialtyResults;
