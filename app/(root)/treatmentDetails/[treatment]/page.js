import React from 'react';
import { notFound } from 'next/navigation';
import TreatmentDetailsClient from './TreatmentDetailsClient';

// Import all treatment data
import dataService from '@/lib/dataService';

// Generate static params for all specialties
export async function generateStaticParams() {
  const specialties = dataService.getAllSpecialties();
  return specialties.map(specialty => ({
    treatment: specialty.slug
  }));
}

const TreatmentDetailsPage = async ({ params }) => {
    const resolvedParams = await params;
    const { treatment: treatmentSlug } = resolvedParams;
    const treatmentData = dataService.getTreatmentData(treatmentSlug);

    if (!treatmentData) {
        notFound();
    }

    return <TreatmentDetailsClient treatmentData={treatmentData} />;
};

export default TreatmentDetailsPage; 