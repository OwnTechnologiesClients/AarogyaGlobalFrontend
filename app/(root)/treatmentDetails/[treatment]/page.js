import React from 'react';
import { notFound } from 'next/navigation';
import TreatmentDetailsClient from './TreatmentDetailsClient';

// Import all treatment data
import dataService from '@/lib/dataService';
import apiService from '@/lib/apiService';

// Cache for static params to prevent hydration mismatches
let cachedParams = null;
let cacheTimestamp = 0;

// Force cache refresh for development
if (process.env.NODE_ENV === 'development') {
  cachedParams = null;
  cacheTimestamp = 0;
}

// Function to manually clear cache if needed
export function clearStaticParamsCache() {
  cachedParams = null;
  cacheTimestamp = 0;
  console.log('generateStaticParams: Cache manually cleared');
}

// Generate static params for all specialties and individual treatments
// Updated to include ONC0013 - force recompilation
export async function generateStaticParams() {
  try {
    // Return cached params if available and not expired
    const now = Date.now();
    const cacheExpiry = 5 * 60 * 1000; // 5 minutes cache expiry

    if (cachedParams && (now - cacheTimestamp) < cacheExpiry) {
      console.log('generateStaticParams: Using cached params');
      return cachedParams;
    }

    console.log('generateStaticParams: Cache expired or missing, regenerating params');

    const params = [];

    // 1) Include category slugs based on DB categories
    const categories = ['Cardiology', 'Neurology', 'Orthopaedics', 'Oncology', 'Gynaecology', 'Urology'];
    for (const category of categories) {
      const slug = category.toLowerCase();
      params.push({ treatment: slug });
    }

    // 2) Pull all treatment IDs from backend and include them
    try {
      const res = await apiService.getTreatments({ page: 1, limit: 1000 });
      const all = Array.isArray(res?.data) ? res.data : [];
      const ids = all.map(t => t?.id).filter(Boolean);
      for (const id of ids) {
        params.push({ treatment: id });
      }
    } catch (e) {
      console.warn('generateStaticParams: Failed to load treatments from API, will continue with categories and fallbacks');
    }

    // 3) Ensure critical fallbacks exist
    const fallbacks = ['ORT0001', 'CARD0001', 'NEUR0001', 'ONC0001'];
    for (const fid of fallbacks) {
      if (!params.some(p => p.treatment === fid)) {
        params.push({ treatment: fid });
      }
    }

    // Sort params to ensure consistent ordering
    params.sort((a, b) => a.treatment.localeCompare(b.treatment));

    // Cache the params with timestamp
    cachedParams = params;
    cacheTimestamp = Date.now();

    console.log('generateStaticParams: Generated and cached params:', params);
    return params;
  } catch (error) {
    console.error('generateStaticParams: Error generating params:', error);
    // Return minimal safe fallbacks to satisfy export
    return [
      { treatment: 'cardiology' },
      { treatment: 'neurology' },
      { treatment: 'orthopaedics' },
      { treatment: 'oncology' },
      { treatment: 'gynaecology' },
      { treatment: 'urology' },
      { treatment: 'ORT0001' }
    ];
  }
}

const TreatmentDetailsPage = async ({ params }) => {
  try {
    const resolvedParams = await params;
    const { treatment: treatmentParam } = resolvedParams;

    // Decode the treatment parameter
    const decodedTreatmentParam = decodeURIComponent(treatmentParam);

    // Add validation for treatmentParam
    if (!decodedTreatmentParam) {
      console.warn('TreatmentDetailsPage: No treatment parameter provided');
      notFound();
    }

    let treatmentData = null;

    // Check if it's a treatment ID (starts with specialty prefix) or specialty slug
    if (decodedTreatmentParam.match(/^[A-Z]{3,4}\d+$/)) {
      // It's a treatment ID (e.g., ORT0001, CARD0001, etc.) - get individual treatment data
      console.log(`TreatmentDetailsPage: Getting individual treatment data for ID: ${decodedTreatmentParam}`);
      treatmentData = await dataService.getIndividualTreatmentData(decodedTreatmentParam);
    } else {
      // It's a specialty slug - get specialty treatment data
      console.log(`TreatmentDetailsPage: Getting specialty treatment data for slug: ${decodedTreatmentParam}`);
      treatmentData = dataService.getTreatmentData(decodedTreatmentParam);
    }

    if (!treatmentData) {
      console.warn(`TreatmentDetailsPage: No treatment data found for parameter: ${decodedTreatmentParam}`);
      notFound();
    }

    if (!treatmentData.treatment) {
      console.warn(`TreatmentDetailsPage: Treatment data is missing treatment object for parameter: ${treatmentParam}`);
      notFound();
    }

    // Validate required properties with more lenient checking
    const requiredProperties = ['title', 'overview', 'bestHospitals', 'topDoctors', 'treatmentPackages', 'diagnosticTools', 'advancedTreatments', 'advantages', 'howWeHelp', 'faq'];
    const missingProperties = [];

    for (const prop of requiredProperties) {
      if (!treatmentData.treatment[prop]) {
        missingProperties.push(prop);
      }
    }

    if (missingProperties.length > 0) {
      console.warn(`TreatmentDetailsPage: Missing required properties: ${missingProperties.join(', ')}`);
      // Don't call notFound() for missing properties, just log warning
    }

    // Ensure we have at least the essential properties
    if (!treatmentData.treatment.title) {
      console.warn('TreatmentDetailsPage: Missing essential title property');
      notFound();
    }

    console.log('TreatmentDetailsPage: Treatment data structure:', JSON.stringify(treatmentData, null, 2));
    console.log('TreatmentDetailsPage: treatmentData.treatment exists:', !!treatmentData.treatment);
    console.log('TreatmentDetailsPage: treatmentData.treatment.title exists:', !!(treatmentData.treatment && treatmentData.treatment.title));

    // Ensure all required data is present before rendering
    if (!treatmentData || !treatmentData.treatment) {
      console.error('TreatmentDetailsPage: Invalid treatment data structure');
      notFound();
    }

    return <TreatmentDetailsClient treatmentData={treatmentData} />;
  } catch (error) {
    console.error('TreatmentDetailsPage: Error occurred:', error);
    notFound();
  }
};

export default TreatmentDetailsPage; 