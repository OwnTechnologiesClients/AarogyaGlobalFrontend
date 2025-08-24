import React from 'react';
import { notFound } from 'next/navigation';
import TreatmentDetailsClient from './TreatmentDetailsClient';

// Import all treatment data
import dataService from '@/lib/dataService';

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

    // Get all specialties
    const specialties = dataService.getAllSpecialties();
    console.log('generateStaticParams: All specialties:', specialties.map(s => ({ slug: s.slug, name: s.name })));
    const params = [];

    // Add specialty slugs first
    for (const specialty of specialties) {
      if (specialty && specialty.slug) {
        params.push({ treatment: specialty.slug });
      }
    }

    // Add individual treatment IDs
    for (const specialty of specialties) {
      if (specialty && specialty.slug) {
        const specialtyData = dataService.getSpecialtyBySlug(specialty.slug);
        console.log(`generateStaticParams: Processing specialty ${specialty.slug}, found ${specialtyData?.treatments?.length || 0} treatments`);
        if (specialtyData && specialtyData.treatments && Array.isArray(specialtyData.treatments)) {
          console.log(`generateStaticParams: Treatments for ${specialty.slug}:`, specialtyData.treatments.map(t => t.id));
          for (const treatment of specialtyData.treatments) {
            if (treatment && treatment.id) {
              console.log(`generateStaticParams: Adding treatment ID: ${treatment.id}`);
              params.push({ treatment: treatment.id });
            }
          }
        } else {
          console.log(`generateStaticParams: No treatments found for ${specialty.slug}`);
        }

        // Additional debugging for oncology specifically
        if (specialty.slug === 'oncology') {
          console.log(`generateStaticParams: Oncology specialty data:`, JSON.stringify(specialtyData, null, 2));
        }
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
    return [];
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
      treatmentData = dataService.getIndividualTreatmentData(decodedTreatmentParam);
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