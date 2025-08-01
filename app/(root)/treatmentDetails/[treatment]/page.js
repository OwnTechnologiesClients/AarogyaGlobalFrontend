import React from 'react';
import { notFound } from 'next/navigation';
import TreatmentDetailsClient from './TreatmentDetailsClient';

// Import all treatment data
import urologyData from '@/data/treatments/urology.json';
import cardiologyData from '@/data/treatments/cardiology.json';
import neurologyData from '@/data/treatments/neurology.json';
import oncologyData from '@/data/treatments/oncology.json';
import orthopaedicsData from '@/data/treatments/orthopaedics.json';
import gynaecologyData from '@/data/treatments/gynaecology.json';

const treatmentDataMap = {
    'urology': urologyData,
    'cardiology': cardiologyData,
    'neurology': neurologyData,
    'oncology': oncologyData,
    'orthopaedics': orthopaedicsData,
    'gynaecology': gynaecologyData,
};

const TreatmentDetailsPage = async ({ params }) => {
    const resolvedParams = await params;
    const { treatment: treatmentSlug } = resolvedParams;
    const treatmentData = treatmentDataMap[treatmentSlug];

    if (!treatmentData) {
        notFound();
    }

    return <TreatmentDetailsClient treatmentData={treatmentData} />;
};

export default TreatmentDetailsPage; 