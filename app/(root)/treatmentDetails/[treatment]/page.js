import React from 'react';
import { notFound } from 'next/navigation';
import TreatmentDetailsClient from './TreatmentDetailsClient';

// Import all treatment data
import dataService from '@/lib/dataService';

// Generate static params for all specialties and individual treatments
export async function generateStaticParams() {
  try {
    const specialties = dataService.getAllSpecialties();
    const params = [];
    
    // Add specialty slugs
    specialties.forEach(specialty => {
      if (specialty && specialty.slug) {
        params.push({ treatment: specialty.slug });
      }
    });
    
    // Add individual treatment IDs
    specialties.forEach(specialty => {
      if (specialty && specialty.slug) {
        const specialtyData = dataService.getSpecialtyBySlug(specialty.slug);
        if (specialtyData && specialtyData.treatments && Array.isArray(specialtyData.treatments)) {
          specialtyData.treatments.forEach(treatment => {
            if (treatment && treatment.id) {
              params.push({ treatment: treatment.id.toString() });
            }
          });
        }
      }
    });
    
    console.log('generateStaticParams: Generated params:', params);
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
        
        // Add validation for treatmentParam
        if (!treatmentParam) {
            console.warn('TreatmentDetailsPage: No treatment parameter provided');
            notFound();
        }
        
        let treatmentData = null;
        
        // Check if it's a treatment ID (numeric) or specialty slug (string)
        if (!isNaN(treatmentParam)) {
            // It's a treatment ID - get individual treatment data
            console.log(`TreatmentDetailsPage: Getting individual treatment data for ID: ${treatmentParam}`);
            treatmentData = dataService.getIndividualTreatmentData(treatmentParam);
        } else {
            // It's a specialty slug - get specialty treatment data
            console.log(`TreatmentDetailsPage: Getting specialty treatment data for slug: ${treatmentParam}`);
            treatmentData = dataService.getTreatmentData(treatmentParam);
        }

        if (!treatmentData) {
            console.warn(`TreatmentDetailsPage: No treatment data found for parameter: ${treatmentParam}`);
            notFound();
        }

        if (!treatmentData.treatment) {
            console.warn(`TreatmentDetailsPage: Treatment data is missing treatment object for parameter: ${treatmentParam}`);
            notFound();
        }

        // Validate required properties
        const requiredProperties = ['title', 'overview', 'bestHospitals', 'topDoctors', 'costs', 'treatmentPackages', 'diagnosticTools', 'advancedTreatments', 'advantages', 'howWeHelp', 'faq'];
        for (const prop of requiredProperties) {
            if (!treatmentData.treatment[prop]) {
                console.warn(`TreatmentDetailsPage: Missing required property: ${prop}`);
                notFound();
            }
        }

        console.log('TreatmentDetailsPage: Treatment data structure:', JSON.stringify(treatmentData, null, 2));
        console.log('TreatmentDetailsPage: treatmentData.treatment exists:', !!treatmentData.treatment);
        console.log('TreatmentDetailsPage: treatmentData.treatment.title exists:', !!(treatmentData.treatment && treatmentData.treatment.title));

        return <TreatmentDetailsClient treatmentData={treatmentData} />;
    } catch (error) {
        console.error('TreatmentDetailsPage: Error occurred:', error);
        notFound();
    }
};

export default TreatmentDetailsPage; 