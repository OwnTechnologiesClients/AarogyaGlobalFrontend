# Unified Data Structure Documentation

## Overview

The Aarogya Global medical tourism platform now uses a unified data structure that eliminates inconsistencies and provides a single source of truth for all medical data. This document explains the new structure and how to use it.

## Problem Solved

### Previous Issues:
- **Scattered Data**: Data was spread across multiple JSON files (`data/specialties/`, `data/treatments/`, `data/hospitals.json`, etc.)
- **Inconsistencies**: Same hospitals/doctors had different information in different files
- **Duplication**: Data was repeated across multiple files
- **Maintenance Issues**: Updates required changes in multiple places
- **No Single Source of Truth**: Different components used different data sources

### New Solution:
- **Unified Data Structure**: All data centralized in `data/unifiedData.json`
- **Data Service**: Consistent access through `lib/dataService.js`
- **No Duplication**: Each entity (hospital, doctor, treatment) exists once
- **Easy Maintenance**: Single file to update for data changes
- **Consistent Format**: Standardized structure across all specialties

## Data Structure

### Root Structure
```json
{
  "metadata": {
    "version": "1.0",
    "lastUpdated": "2024-01-20T10:00:00Z",
    "description": "Unified data structure for Aarogya Global medical tourism platform"
  },
  "specialties": {
    "cardiology": { /* specialty data */ },
    "urology": { /* specialty data */ },
    "neurology": { /* specialty data */ }
  },
  "globalHospitals": [ /* global hospital list */ ],
  "globalDoctors": [ /* global doctor list */ ],
  "specialtyList": [ /* specialty overview list */ ]
}
```

### Specialty Structure
```json
{
  "id": "cardiology",
  "name": "Cardiology",
  "slug": "cardiology",
  "description": "Expert heart and cardiovascular care services",
  "icon": "lucide/HeartPulse",
  "color": "#A3DAC2",
  "count": 22,
  "overview": {
    "description": "Cardiology is a medical specialty...",
    "highlights": ["Access to world-class hospitals", "..."]
  },
  "filters": {
    "categories": ["All", "Doctors", "Hospitals", "Treatments"],
    "treatments": ["Angioplasty", "Bypass Surgery", "..."],
    "facilities": ["Cardiac Cath Lab", "ICU", "..."]
  },
  "hospitals": [ /* hospital objects */ ],
  "doctors": [ /* doctor objects */ ],
  "treatments": [ /* treatment objects */ ],
  "costs": [ /* cost objects */ ]
}
```

### Hospital Structure
```json
{
  "id": "cardiology_hospital_1",
  "name": "Cleveland Clinic",
  "location": "Cleveland, Ohio, USA",
  "image": "/hospital_logos/img1.jpg",
  "rating": "9.9",
  "patientsPerYear": "2.8M+",
  "successRate": "98.5%",
  "accreditations": ["JCI", "NABH", "ISO"],
  "specialties": ["Interventional Cardiology", "Heart Transplant", "..."],
  "facilities": ["Advanced Cardiac Imaging", "Robotic Surgery", "..."],
  "languages": ["English", "Spanish", "Arabic", "Hindi"],
  "internationalPatients": "15,000+ annually",
  "address": "9500 Euclid Ave, Cleveland, OH 44195",
  "contact": {
    "phone": "+1-216-444-2200",
    "email": "info@clevelandclinic.org",
    "website": "www.clevelandclinic.org"
  },
  "coordinates": {
    "latitude": 41.5048,
    "longitude": -81.6067
  }
}
```

### Doctor Structure
```json
{
  "id": "cardiology_doctor_1",
  "name": "Dr. Steven Nissen",
  "specialty": "Interventional Cardiologist",
  "location": "Cleveland, Ohio, USA",
  "image": "/RelatedSpecialists/img1.png",
  "experience": "30+ years",
  "rating": "9.9",
  "patientsTreated": "50,000+",
  "successRate": "98.2%",
  "expertise": ["Interventional Cardiology", "Clinical Trials", "..."],
  "hospital": "Cleveland Clinic",
  "education": "Harvard Medical School",
  "certifications": ["FACC", "FSCAI", "FESC"],
  "languages": ["English", "Spanish"],
  "researchPapers": "500+ publications",
  "awards": ["Distinguished Scientist Award", "Top Cardiologist 2023"],
  "consultationFee": "₹45,000",
  "qualifications": ["MD", "FACC", "FSCAI", "FESC"]
}
```

### Treatment Structure
```json
{
  "id": "cardiology_treatment_1",
  "name": "Coronary Angioplasty",
  "description": "Minimally invasive procedure to open blocked coronary arteries",
  "duration": "1-2 hours",
  "recovery": "1-3 days",
  "price": "€8,500",
  "priceINR": "₹7,65,000",
  "includes": ["Pre-operative consultation", "Procedure", "..."],
  "image": "/hospitaldirectory/img1.png"
}
```

## Data Service Usage

### Import the Service
```javascript
import dataService from '@/lib/dataService';
```

### Get All Specialties
```javascript
const specialties = dataService.getAllSpecialties();
// Returns array of specialty objects for navigation/menus
```

### Get Specialty Data
```javascript
const cardiology = dataService.getSpecialtyBySlug('cardiology');
// Returns complete specialty data including hospitals, doctors, treatments
```

### Get Hospitals for Specialty
```javascript
const hospitals = dataService.getHospitalsBySpecialty('cardiology');
// Returns array of hospitals for cardiology
```

### Get Doctors for Specialty
```javascript
const doctors = dataService.getDoctorsBySpecialty('cardiology');
// Returns array of doctors for cardiology
```

### Get Treatments for Specialty
```javascript
const treatments = dataService.getTreatmentsBySpecialty('cardiology');
// Returns array of treatments for cardiology
```

### Get Costs for Specialty
```javascript
const costs = dataService.getCostsBySpecialty('cardiology');
// Returns array of cost information for cardiology
```

### Search Hospitals
```javascript
const searchResults = dataService.searchHospitals({
  specialty: 'Cardiology',
  location: 'USA',
  rating: '9.5'
});
```

### Search Doctors
```javascript
const searchResults = dataService.searchDoctors({
  specialty: 'Cardiologist',
  location: 'Cleveland',
  rating: '9.0'
});
```

### Get Treatment Data for Pages
```javascript
const treatmentData = dataService.getTreatmentData('cardiology');
// Returns formatted data for treatment details pages
```

### Get Specialty Data for Pages
```javascript
const specialtyData = dataService.getSpecialtyData('cardiology');
// Returns formatted data for specialty pages
```

### Price Conversion
```javascript
const rupeesPrice = dataService.convertToRupees('€8,500');
// Returns "₹7,65,000"
```

## Migration from Old Structure

### Step 1: Run Migration Script
```bash
node scripts/migrateData.js
```

This script will:
- Validate existing data consistency
- Generate unified data structure
- Save to `data/unifiedData.json`
- Generate validation report

### Step 2: Update Components
Replace direct JSON imports with data service calls:

**Before:**
```javascript
import cardiologyData from '@/data/treatments/cardiology.json';
import cardiologySpecialty from '@/data/specialties/cardiology.json';

const hospitals = cardiologyData.treatment.bestHospitals.hospitals;
const doctors = cardiologySpecialty.doctors;
```

**After:**
```javascript
import dataService from '@/lib/dataService';

const hospitals = dataService.getHospitalsBySpecialty('cardiology');
const doctors = dataService.getDoctorsBySpecialty('cardiology');
```

### Step 3: Update Page Components

**Treatment Details Page:**
```javascript
// Before
export async function generateStaticParams() {
  return [
    { treatment: 'cardiology' },
    { treatment: 'urology' }
  ];
}

export default function TreatmentPage({ params }) {
  const data = await import(`@/data/treatments/${params.treatment}.json`);
  return <TreatmentDetailsClient treatmentData={data} />;
}

// After
import dataService from '@/lib/dataService';

export async function generateStaticParams() {
  const specialties = dataService.getAllSpecialties();
  return specialties.map(specialty => ({
    treatment: specialty.slug
  }));
}

export default function TreatmentPage({ params }) {
  const data = dataService.getTreatmentData(params.treatment);
  return <TreatmentDetailsClient treatmentData={data} />;
}
```

**Specialty Pages:**
```javascript
// Before
export default function SpecialtyPage({ params }) {
  const data = await import(`@/data/specialties/${params.specialty}.json`);
  return <SpecialtyPage data={data} />;
}

// After
import dataService from '@/lib/dataService';

export default function SpecialtyPage({ params }) {
  const data = dataService.getSpecialtyData(params.specialty);
  return <SpecialtyPage data={data} />;
}
```

## Benefits

### 1. **Consistency**
- Single source of truth for all data
- Consistent structure across all specialties
- No duplicate or conflicting information

### 2. **Maintainability**
- Update data in one place
- Automatic validation and error checking
- Easy to add new specialties

### 3. **Performance**
- Reduced bundle size (no duplicate data)
- Efficient data access patterns
- Cached data service instance

### 4. **Developer Experience**
- Clear API for data access
- Type-safe data structure
- Comprehensive documentation

### 5. **Scalability**
- Easy to add new data fields
- Support for multiple languages
- Extensible structure for future features

## Data Validation

The system includes automatic validation:

1. **Consistency Checks**: Ensures all specialties have required data
2. **ID Uniqueness**: Prevents duplicate IDs across specialties
3. **Required Fields**: Validates all required fields are present
4. **Data Types**: Ensures correct data types for all fields

## Adding New Specialties

1. **Add to Unified Data**:
```json
{
  "specialties": {
    "dermatology": {
      "id": "dermatology",
      "name": "Dermatology",
      "slug": "dermatology",
      // ... other fields
    }
  }
}
```

2. **Update Specialty List**:
```json
{
  "specialtyList": [
    // ... existing specialties
    {
      "id": "dermatology",
      "name": "Dermatology",
      "slug": "dermatology",
      "icon": "lucide/Skin",
      "color": "#FFB6C1",
      "count": 16,
      "description": "Skin care and treatment services"
    }
  ]
}
```

3. **Use in Components**:
```javascript
const dermatologyData = dataService.getSpecialtyBySlug('dermatology');
```

## Best Practices

1. **Always use dataService**: Don't import JSON files directly
2. **Validate data**: Use the migration script to validate data consistency
3. **Update documentation**: Keep this documentation updated when adding new fields
4. **Test thoroughly**: Test all data access patterns when making changes
5. **Backup data**: Keep backups of the unified data file

## Troubleshooting

### Common Issues:

1. **Data not found**: Check if specialty slug exists in unified data
2. **Inconsistent data**: Run migration script to validate consistency
3. **Performance issues**: Use data service methods instead of direct JSON access
4. **Missing fields**: Ensure all required fields are present in unified data

### Debug Commands:
```javascript
// Check if specialty exists
console.log(dataService.getSpecialtyBySlug('cardiology'));

// List all specialties
console.log(dataService.getAllSpecialties());

// Check data structure
console.log(dataService.getMetadata());
```

This unified data structure provides a robust, maintainable, and scalable foundation for the Aarogya Global medical tourism platform. 