import React from 'react';
import { notFound } from 'next/navigation';
import TreatmentDetailsClient from './TreatmentDetailsClient';

// Import all treatment data
import dataService from '@/lib/dataService';

// Cache for static params to prevent hydration mismatches
let cachedParams = null;

// Generate static params for all specialties and individual treatments
export async function generateStaticParams() {
  try {
    // Return cached params if available
    if (cachedParams) {
      console.log('generateStaticParams: Using cached params');
      return cachedParams;
    }

    // Get all specialties
    const specialties = dataService.getAllSpecialties();
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
        if (specialtyData && specialtyData.treatments && Array.isArray(specialtyData.treatments)) {
          for (const treatment of specialtyData.treatments) {
            if (treatment && treatment.id) {
              params.push({ treatment: treatment.id });
            }
          }
        }
      }
    }

    // Sort params to ensure consistent ordering
    params.sort((a, b) => a.treatment.localeCompare(b.treatment));

    // Cache the params
    cachedParams = params;

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