'use client';

import React, { useState } from 'react';
import dataService from '../lib/dataService';

/**
 * Example component demonstrating the new unified data structure
 * This shows how to replace the old scattered data approach with the new unified approach
 */

const UnifiedDataExample = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('cardiology');
  const [searchTerm, setSearchTerm] = useState('');

  // Get all specialties for the dropdown
  const specialties = dataService.getAllSpecialties();
  
  // Get data for selected specialty
  const specialtyData = dataService.getSpecialtyBySlug(selectedSpecialty);
  
  // Search hospitals - COMMENTED OUT: This is now async
  // const searchResults = dataService.searchHospitals({
  //   specialty: searchTerm,
  //   rating: '9.0'
  // });
  const searchResults = []; // Empty array for now since searchHospitals is async

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Unified Data Structure Example
      </h1>

      {/* Specialty Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Specialty Selection</h2>
        <select 
          value={selectedSpecialty} 
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          {specialties.map(specialty => (
            <option key={specialty.slug} value={specialty.slug}>
              {specialty.name} ({specialty.count} providers)
            </option>
          ))}
        </select>
      </div>

      {/* Specialty Overview */}
      {specialtyData && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">2. Specialty Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">{specialtyData.name}</h3>
              <p className="text-gray-600 mb-4">{specialtyData.description}</p>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {specialtyData.hospitals?.length || 0} Hospitals
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {specialtyData.doctors?.length || 0} Doctors
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {specialtyData.treatments?.length || 0} Treatments
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Highlights:</h4>
              <ul className="space-y-1">
                {specialtyData.overview?.highlights?.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Hospitals Section */}
      {specialtyData?.hospitals && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Top Hospitals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialtyData.hospitals.slice(0, 3).map(hospital => (
              <div key={hospital.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{hospital.name}</h3>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {hospital.rating}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{hospital.location}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>Patients: {hospital.patientsPerYear}</p>
                  <p>Success Rate: {hospital.successRate}</p>
                  <p>Languages: {hospital.languages?.slice(0, 2).join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doctors Section */}
      {specialtyData?.doctors && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Top Doctors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialtyData.doctors.slice(0, 3).map(doctor => (
              <div key={doctor.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {doctor.rating}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm mb-2">{doctor.location}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>Experience: {doctor.experience}</p>
                  <p>Patients: {doctor.patientsTreated}</p>
                  <p>Success Rate: {doctor.successRate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Treatments Section */}
      {specialtyData?.treatments && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Available Treatments</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {specialtyData.treatments.slice(0, 4).map(treatment => (
              <div key={treatment.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">{treatment.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{treatment.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">{treatment.priceINR}</span>
                  <span className="text-gray-500 text-sm">{treatment.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Example */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">6. Search Example</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search hospitals by specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        {searchResults.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Search Results ({searchResults.length})</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {searchResults.slice(0, 4).map(hospital => (
                <div key={hospital.id} className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold">{hospital.name}</h4>
                  <p className="text-gray-600 text-sm">{hospital.location}</p>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Rating: {hospital.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Data Service Methods */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">7. Available Data Service Methods</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Key Methods:</h3>
          <ul className="space-y-1 text-sm">
            <li><code>dataService.getAllSpecialties()</code> - Get all specialties</li>
            <li><code>dataService.getSpecialtyBySlug(slug)</code> - Get specific specialty data</li>
            <li><code>dataService.getHospitalsBySpecialty(slug)</code> - Get hospitals for specialty</li>
            <li><code>dataService.getDoctorsBySpecialty(slug)</code> - Get doctors for specialty</li>
            <li><code>dataService.getTreatmentsBySpecialty(slug)</code> - Get treatments for specialty</li>
            <li><code>dataService.searchHospitals(criteria)</code> - Search hospitals</li>
            <li><code>dataService.searchDoctors(criteria)</code> - Search doctors</li>
            <li><code>dataService.convertToRupees(euroString)</code> - Convert prices to INR</li>
          </ul>
        </div>
      </div>

      {/* Migration Benefits */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Migration Benefits</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-blue-700 mb-2">Before (Old Structure):</h3>
            <ul className="space-y-1 text-sm text-blue-600">
              <li>• Multiple JSON files to import</li>
              <li>• Inconsistent data structure</li>
              <li>• Duplicate information</li>
              <li>• Hard to maintain</li>
              <li>• No data validation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-700 mb-2">After (Unified Structure):</h3>
            <ul className="space-y-1 text-sm text-green-600">
              <li>• Single data service import</li>
              <li>• Consistent data structure</li>
              <li>• No duplication</li>
              <li>• Easy to maintain</li>
              <li>• Built-in validation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedDataExample; 