"use client";
import React, { useState } from 'react';
import DoctorCard from '../SpecialtySearch/DoctorCard';
import { ArrowRight, Users, Star, MapPin } from 'lucide-react';
import PhoneInput from '../ui/PhoneInput';
import { sendConsultationEmail, validateFormData } from '../../lib/emailService';

const DoctorsResults = ({ doctors = [], totalDoctors, isLoading, currentPage = 1, totalPages = 1, onPageChange }) => {
  const [callbackPhone, setCallbackPhone] = useState({ countryCode: "+91", phone: "" });
  const [callbackEmail, setCallbackEmail] = useState("");
  const [callbackErrors, setCallbackErrors] = useState({});
  const cardsPerPage = 6;

  const handlePageChange = (pageNumber) => {
    if (typeof onPageChange === 'function') {
      onPageChange(pageNumber);
    }
  };

  // No local pagination state; server controls page via props

  // Keep existing content mounted and show an overlay spinner instead of replacing content

  return (
    <div className="mt-8">
      <section className="relative gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 bg-white rounded-lg border border-black-100 shadow-md mx-2 sm:mx-4 md:mx-8 lg:mx-10 my-3 sm:my-4 md:my-5">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center rounded-lg z-10">
            <div className="flex flex-col items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 text-sm mt-3">Loading...</p>
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto">

          {/* Results Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Doctor Search Results
                </h2>
                <p className="text-gray-600">
                  Showing {doctors.length} of {totalDoctors} doctors
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-blue-600">
                  <Users className="w-4 h-4" />
                  <span>{totalDoctors} Total Doctors</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Star className="w-4 h-4" />
                  <span>Top Rated</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <MapPin className="w-4 h-4" />
                  <span>Worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {doctors.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No doctors found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search filters or browse all doctors
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Doctors
              </button>
            </div>
          ) : (
            <>
              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {doctors.map((doctor, index) => (
                  <DoctorCard key={`doctor-${doctor.id}-${index}`} doctor={doctor} />
                ))}
              </div>

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

                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === pageNumber
                              ? 'bg-blue-600 text-white border border-blue-600'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                              }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return <span key={pageNumber} className="px-2 text-gray-500">...</span>;
                      }
                      return null;
                    })}

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

              {/* Page Info */}
              {totalPages > 1 && (
                <div className="text-center mt-4 text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </>
          )}

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Need Help Finding the Right Doctor?
            </h3>
            <p className="text-gray-600 mb-6">
              Our medical tourism experts are here to help you find the perfect doctor for your needs.
              Get personalized recommendations and support throughout your medical journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-lg font-medium mb-2">
                  Phone Number *
                </label>
                <PhoneInput
                  value={{ countryCode: callbackPhone.countryCode, phone: callbackPhone.phone }}
                  onChange={({ countryCode, phone }) => setCallbackPhone({ countryCode: countryCode || callbackPhone.countryCode, phone })}
                />
                {callbackErrors.phone && <p className="text-red-500 text-sm mt-1">{callbackErrors.phone}</p>}
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
                    callbackErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={callbackEmail}
                  onChange={(e) => setCallbackEmail(e.target.value)}
                />
                {callbackErrors.email && <p className="text-red-500 text-sm mt-1">{callbackErrors.email}</p>}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={async () => {
                  // Validate form data
                  const validation = validateFormData({ 
                    phone: callbackPhone.phone, 
                    email: callbackEmail 
                  }, ['phone', 'email']);
                  
                  if (!validation.isValid) {
                    setCallbackErrors(validation.errors);
                    return;
                  }

                  setCallbackErrors({});
                  
                  try {
                    await sendConsultationEmail({ 
                      name: '', 
                      email: callbackEmail, 
                      phone: callbackPhone.phone, 
                      countryCode: callbackPhone.countryCode, 
                      specialty: '', 
                      hospital: '', 
                      message: '' 
                    }, 'Doctors – Callback');
                    if (typeof window !== 'undefined') {
                      window.location.href = '/thank-you';
                    }
                  } catch (e) {
                    alert('Failed to submit. Please try again.');
                  }
                }}
                className="flex-1 bg-[#04CE78] hover:bg-green-600 text-white py-4 px-4 font-bold text-lg rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 hover:shadow-lg"
              >
                <span>Request Callback</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              {/* <a
                href="/appointment"
                className="flex-1 bg-emerald-600 text-white py-4 px-4 font-bold text-lg rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorsResults; 