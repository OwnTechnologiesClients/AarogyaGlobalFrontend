import React from 'react';
import { notFound } from 'next/navigation';
import TreatmentDetailsClient from './TreatmentDetailsClient';

// Import all treatment data
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

    // Pull all treatment IDs from backend and include them
    try {
      const res = await apiService.getTreatments({ page: 1, limit: 1000 });
      const all = Array.isArray(res?.data) ? res.data : [];
      const ids = all.map(t => t?.id).filter(Boolean);
      for (const id of ids) {
        params.push({ treatment: id });
      }
    } catch (e) {
      console.warn('generateStaticParams: Failed to load treatments from API');
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
    // Return empty array when generation fails; no static fallbacks
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

    // Support only concrete treatment IDs sourced from the backend to avoid static defaults
    if (decodedTreatmentParam.match(/^[A-Z]{3,4}\d+$/)) {
      console.log(`TreatmentDetailsPage: Fetching treatment from API for ID: ${decodedTreatmentParam}`);
      const res = await apiService.getTreatmentById(decodedTreatmentParam);
      // Support both { success, data } and direct object responses
      const t = (res && res.data) ? res.data : res;
      if (t && (t.id || t.name)) {
        // Map backend payload to UI structure expected by the client component
        treatmentData = {
          treatment: {
            name: t.name,
            title: `${t.name} - ${t.category} Treatment`,
            slug: t.id,
            description: t.description || `Comprehensive ${t.name} treatment in ${t.category}`,
            image: apiService.getImageUrl(t.image) || null,
            duration: t.duration || 'Varies',
            recovery: t.recovery || 'Varies',
            overview: {
              description: t.description || `Comprehensive ${t.name} treatment in ${t.category}`,
              cta: {
                bookConsultation: 'Book a free consultation',
                secondOpinion: 'Get a second opinion',
                callBack: 'Request a call back'
              }
            },
            bestHospitals: {
              title: `Best hospitals for ${t.name}`,
              description: t.hospitalSelectionHelp || t.hospitalSelectionCriteria || `What helps to find the best hospital for ${t.name}?`,
              hospitals: Array.isArray(t.topHospitals) ? t.topHospitals : [],
              selectionCriteria: Array.isArray(t.hospitalSelectionList) ? t.hospitalSelectionList : (t.hospitalSelectionHelp || t.hospitalSelectionCriteria || '')
            },
            topDoctors: {
              title: `Top doctors for ${t.name}`,
              description: t.doctorSelectionHelp || t.doctorSelectionCriteria || `How to select the best doctor for ${t.name}?`,
              doctors: Array.isArray(t.topDoctors) ? t.topDoctors : [],
              selectionCriteria: Array.isArray(t.doctorSelectionList) ? t.doctorSelectionList : (t.doctorSelectionHelp || t.doctorSelectionCriteria || '')
            },
            diagnosticTools: Array.isArray(t.diagnosticTools) ? t.diagnosticTools : [],
            advancedTreatments: Array.isArray(t.advancedTreatmentOptions) ? t.advancedTreatmentOptions : [],
            advantages: Array.isArray(t.advantages) ? t.advantages : [],
            howWeHelp: {
              title: 'How We Help You',
              services: [
                { icon: 'phone', title: '24/7 Support', description: 'Round-the-clock assistance' },
                { icon: 'user-check', title: 'Expert Consultation', description: 'Specialist doctor consultation' },
                { icon: 'stethoscope', title: 'Treatment Planning', description: 'Personalized care plans' },
                { icon: 'plane', title: 'Travel Arrangements', description: 'International patient support' }
              ]
            },
            treatmentPackages: {
              title: `${t.name} Treatment Packages`,
              packages: [
                {
                  id: 1,
                  name: t.name,
                  price: t.detailedCost || t.costConsiderations || 'Contact for pricing',
                  description: t.description,
                  duration: t.duration,
                  recovery: t.recovery,
                  image: apiService.getImageUrl(t.image) || null
                }
              ]
            },
            faq: Array.isArray(t.faq) ? t.faq : []
          },
          specialty: {
            name: t.category || 'Medical Treatment',
            slug: t.category?.toLowerCase().replace(/\s+/g, '-') || 'treatment',
            description: t.description || '',
            icon: 'lucide/Stethoscope',
            color: '#A3DAC2'
          }
        };
      }
    } else {
      // Disable static specialty fallback to prevent default hardcoded content
      console.warn('TreatmentDetailsPage: Non-ID slug provided; redirecting to notFound to avoid static defaults');
      notFound();
    }

    // Hard guard: if API mapping failed, do not render with undefined data
    if (!treatmentData || !treatmentData.treatment || !treatmentData.treatment.title) {
      console.warn('TreatmentDetailsPage: Missing mapped treatment data; invoking notFound');
      notFound();
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