# Swiper Implementation for Treatment Details

This document describes the implementation of swiper components for the treatment details page, specifically for displaying top-rated cardiologists and best cardiology hospitals worldwide, along with cost conversion to rupees.

## New Components

### 1. DoctorsSwiper Component
**Location**: `components/TreatmentDetails/DoctorsSwiper.jsx`

**Features**:
- Displays top-rated cardiologists in a responsive swiper carousel
- Comprehensive doctor information including:
  - Profile image, name, specialty, and location
  - Rating, experience, patients treated, and success rate
  - Education, certifications, and languages spoken
  - Research publications and awards
  - Hospital affiliation
- Responsive design with different slides per view based on screen size
- Navigation buttons for easy browsing
- Hover effects and smooth transitions
- Fallback icons for missing images
- Color-coded information sections with icons

**Doctor Data Structure**:
```javascript
{
  id: 1,
  name: "Dr. Steven Nissen",
  specialty: "Interventional Cardiologist",
  location: "Cleveland, Ohio, USA",
  image: "/RelatedSpecialists/img1.png",
  experience: "30+ years",
  rating: "9.9",
  patientsTreated: "50,000+",
  successRate: "98.2%",
  expertise: ["Interventional Cardiology", "Clinical Trials", ...],
  hospital: "Cleveland Clinic",
  education: "Harvard Medical School",
  certifications: ["FACC", "FSCAI", "FESC"],
  languages: ["English", "Spanish"],
  researchPapers: "500+ publications",
  awards: ["Distinguished Scientist Award", "Top Cardiologist 2023"]
}
```

**Props**:
- `doctors`: Array of doctor objects with comprehensive information
- `title`: Title for the section (default: "Top-rated cardiologists worldwide")

**Usage**:
```jsx
<DoctorsSwiper 
  doctors={treatment.topDoctors.doctors}
  title={treatment.topDoctors.title}
/>
```

### 2. HospitalsSwiper Component
**Location**: `components/TreatmentDetails/HospitalsSwiper.jsx`

**Features**:
- Displays best cardiology hospitals in a responsive swiper carousel
- Comprehensive hospital information including:
  - Hospital image, name, location, and rating
  - Patients per year, success rate, and international patient count
  - Accreditations and certifications
  - Languages supported by medical staff
  - Specialties and facilities with color-coded tags
- Rating badges with star icons
- Specialty and facility tags with color coding
- Responsive design with navigation controls
- Hover effects and image scaling
- Organized information sections with icons

**Hospital Data Structure**:
```javascript
{
  id: 1,
  name: "Cleveland Clinic",
  location: "Cleveland, Ohio, USA",
  image: "/hospital_logos/img1.jpg",
  rating: "9.9",
  patientsPerYear: "2.8M+",
  successRate: "98.5%",
  accreditations: ["JCI", "NABH", "ISO"],
  specialties: ["Interventional Cardiology", "Heart Transplant", ...],
  facilities: ["Advanced Cardiac Imaging", "Robotic Surgery", ...],
  languages: ["English", "Spanish", "Arabic", "Hindi"],
  internationalPatients: "15,000+ annually"
}
```

**Props**:
- `hospitals`: Array of hospital objects with comprehensive information
- `title`: Title for the section (default: "Best cardiology hospitals worldwide")

**Usage**:
```jsx
<HospitalsSwiper 
  hospitals={treatment.bestHospitals.hospitals}
  title={treatment.bestHospitals.title}
/>
```

## Cost Conversion Feature

### Euro to Rupee Conversion
**Location**: `app/(root)/treatmentDetails/[treatment]/TreatmentDetailsClient.jsx`

**Features**:
- Converts euro prices to Indian rupees using approximate conversion rate (1 EUR = 90 INR)
- Applies to both treatment costs and package prices
- Uses Indian number formatting with proper comma placement
- Maintains original format if no euro symbol is found

**Implementation**:
```javascript
const convertToRupees = (euroString) => {
    const euroMatch = euroString.match(/€([\d,]+)/);
    if (euroMatch) {
        const euroAmount = parseFloat(euroMatch[1].replace(/,/g, ''));
        const rupeesAmount = euroAmount * 90; // Approximate conversion rate
        return `₹${rupeesAmount.toLocaleString('en-IN')}`;
    }
    return euroString; // Return original if no euro symbol found
};
```

**Usage**:
```jsx
<span className="font-bold text-green-600">{convertToRupees(item.cost)}</span>
```

## CSS Styles

### Swiper Styles
**Location**: `app/globals.css`

Added styles for the new swiper components:
```css
/* Doctors and Hospitals Swiper Styles */
.doctors-swiper,
.hospitals-swiper {
  padding: 4px;
}

.doctors-swiper .swiper-slide,
.hospitals-swiper .swiper-slide {
  height: auto;
  display: flex;
  align-items: stretch;
}

.doctors-swiper .swiper-slide>div,
.hospitals-swiper .swiper-slide>div {
  width: 100%;
  height: 100%;
}
```

## Responsive Breakpoints

Both swiper components use the following responsive breakpoints:

- **320px**: 1 slide per view
- **640px**: 1 slide per view (enhanced content requires more space)
- **768px**: 2 slides per view
- **1024px**: 2 slides per view (optimal for detailed information display)

## Demo Page

**Location**: `examples/SwiperDemo.jsx`

A demo page showcasing both swiper components and the cost conversion feature. Can be accessed to test the functionality.

## Integration

The components are integrated into the main treatment details page:

1. **Import statements** added to `TreatmentDetailsClient.jsx`
2. **Hospitals section** replaced with `HospitalsSwiper` component
3. **Doctors section** replaced with `DoctorsSwiper` component
4. **Cost conversion** applied to all price displays

## Dependencies

- **Swiper**: Already installed in the project (v11.2.10)
- **Lucide React**: For icons (already available)
- **Tailwind CSS**: For styling (already configured)

## Benefits

1. **Enhanced User Experience**: Smooth swiper navigation for browsing doctors and hospitals
2. **Comprehensive Information**: Detailed profiles with ratings, experience, success rates, and credentials
3. **Better Mobile Experience**: Responsive design that works well on all devices
4. **Visual Appeal**: Professional card-based design with hover effects and color-coded information
5. **Localization**: Cost display in Indian rupees for better user understanding
6. **Accessibility**: Proper ARIA labels and keyboard navigation support
7. **Performance**: Efficient rendering with proper image fallbacks
8. **Information Hierarchy**: Well-organized data with icons and visual indicators
9. **Trust Building**: Display of accreditations, success rates, and patient volumes
10. **International Focus**: Multi-language support and international patient statistics 