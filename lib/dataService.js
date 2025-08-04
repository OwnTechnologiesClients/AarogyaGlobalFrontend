import unifiedData from '../data/unifiedData.json';

/**
 * Data Service for Aarogya Global Medical Tourism Platform
 * Provides consistent access to unified data across the application
 */

class DataService {
  constructor() {
    this.data = unifiedData;
  }

  /**
   * Get all specialties list
   */
  getAllSpecialties() {
    return this.data.specialtyList;
  }

  /**
   * Get specialty by slug
   */
  getSpecialtyBySlug(slug) {
    return this.data.specialties[slug] || null;
  }

  /**
   * Get all hospitals for a specific specialty
   */
  getHospitalsBySpecialty(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    return specialty ? specialty.hospitals : [];
  }

  /**
   * Get all doctors for a specific specialty
   */
  getDoctorsBySpecialty(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    return specialty ? specialty.doctors : [];
  }

  /**
   * Get all treatments for a specific specialty
   */
  getTreatmentsBySpecialty(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    return specialty ? specialty.treatments : [];
  }

  /**
   * Get costs for a specific specialty
   */
  getCostsBySpecialty(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    return specialty ? specialty.costs : [];
  }

  /**
   * Get filters for a specific specialty
   */
  getFiltersBySpecialty(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    return specialty ? specialty.filters : null;
  }

  /**
   * Get overview for a specific specialty
   */
  getOverviewBySpecialty(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    return specialty ? specialty.overview : null;
  }

  /**
   * Get all global hospitals
   */
  getAllGlobalHospitals() {
    return this.data.globalHospitals;
  }

  /**
   * Get all global doctors
   */
  getAllGlobalDoctors() {
    return this.data.globalDoctors;
  }

  /**
   * Get hospital by ID
   */
  getHospitalById(hospitalId) {
    // Search in specialty-specific hospitals
    for (const specialty of Object.values(this.data.specialties)) {
      const hospital = specialty.hospitals.find(h => h.id === hospitalId);
      if (hospital) return hospital;
    }
    
    // Search in global hospitals
    return this.data.globalHospitals.find(h => h.id === hospitalId) || null;
  }

  /**
   * Get doctor by ID
   */
  getDoctorById(doctorId) {
    // Search in specialty-specific doctors
    for (const specialty of Object.values(this.data.specialties)) {
      const doctor = specialty.doctors.find(d => d.id === doctorId);
      if (doctor) return doctor;
    }
    
    // Search in global doctors
    return this.data.globalDoctors.find(d => d.id === doctorId) || null;
  }

  /**
   * Get treatment by ID
   */
  getTreatmentById(treatmentId) {
    for (const specialty of Object.values(this.data.specialties)) {
      const treatment = specialty.treatments.find(t => t.id === treatmentId);
      if (treatment) return treatment;
    }
    return null;
  }

  /**
   * Search hospitals by criteria
   */
  searchHospitals(criteria = {}) {
    let results = [];
    
    // Search in specialty-specific hospitals
    for (const specialty of Object.values(this.data.specialties)) {
      results = results.concat(specialty.hospitals);
    }
    
    // Search in global hospitals
    results = results.concat(this.data.globalHospitals);
    
    // Apply filters
    if (criteria.specialty) {
      results = results.filter(h => 
        h.specialties && h.specialties.includes(criteria.specialty)
      );
    }
    
    if (criteria.location) {
      results = results.filter(h => 
        h.location && h.location.toLowerCase().includes(criteria.location.toLowerCase())
      );
    }
    
    if (criteria.rating) {
      results = results.filter(h => 
        h.rating && parseFloat(h.rating) >= parseFloat(criteria.rating)
      );
    }
    
    return results;
  }

  /**
   * Search doctors by criteria
   */
  searchDoctors(criteria = {}) {
    let results = [];
    
    // Search in specialty-specific doctors
    for (const specialty of Object.values(this.data.specialties)) {
      results = results.concat(specialty.doctors);
    }
    
    // Search in global doctors
    results = results.concat(this.data.globalDoctors);
    
    // Apply filters
    if (criteria.specialty) {
      results = results.filter(d => 
        d.specialty && d.specialty.toLowerCase().includes(criteria.specialty.toLowerCase())
      );
    }
    
    if (criteria.location) {
      results = results.filter(d => 
        d.location && d.location.toLowerCase().includes(criteria.location.toLowerCase())
      );
    }
    
    if (criteria.rating) {
      results = results.filter(d => 
        d.rating && parseFloat(d.rating) >= parseFloat(criteria.rating)
      );
    }
    
    return results;
  }

  /**
   * Get treatment data for treatment details page
   * This combines specialty data with treatment-specific data
   */
  getTreatmentData(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    if (!specialty) return null;

    return {
      treatment: {
        name: `${specialty.name} Worldwide`,
        title: `${specialty.name} Worldwide: Best Hospitals, Doctors, Options & Cost`,
        slug: specialty.slug,
        description: `Comprehensive ${specialty.name.toLowerCase()} care with access to world-class hospitals, top-rated doctors, and advanced treatment options worldwide.`,
        overview: specialty.overview,
        bestHospitals: {
          title: `Best ${specialty.name.toLowerCase()} hospitals worldwide`,
          description: `What helps to find the best ${specialty.name.toLowerCase()} hospital?`,
          hospitals: specialty.hospitals,
          selectionCriteria: [
            "International accreditations and certifications",
            "Experience with international patients",
            "Advanced technology and equipment",
            "Multilingual medical staff",
            "Comprehensive patient support services"
          ]
        },
        topDoctors: {
          title: `Top-rated ${specialty.name.toLowerCase()} doctors worldwide`,
          description: `How to select the best ${specialty.name.toLowerCase()} doctor?`,
          doctors: specialty.doctors,
          selectionCriteria: [
            "Board certifications and international qualifications",
            "Experience with your specific condition",
            "Success rates and patient outcomes",
            "Communication skills and language proficiency",
            "Availability for international patients"
          ]
        },
        costs: {
          title: `${specialty.name} treatment cost worldwide`,
          treatments: specialty.costs
        }
      }
    };
  }

  /**
   * Get specialty data for specialty pages
   */
  getSpecialtyData(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    if (!specialty) return null;

    return {
      specialty: {
        name: specialty.name,
        slug: specialty.slug,
        description: specialty.description,
        icon: specialty.icon,
        color: specialty.color
      },
      filters: specialty.filters,
      doctors: specialty.doctors,
      hospitals: specialty.hospitals
    };
  }

  /**
   * Convert euro prices to rupees
   */
  convertToRupees(euroString) {
    const euroMatch = euroString.match(/€([\d,]+)/);
    if (euroMatch) {
      const euroAmount = parseFloat(euroMatch[1].replace(/,/g, ''));
      const rupeesAmount = euroAmount * 90; // Approximate conversion rate
      return `₹${rupeesAmount.toLocaleString('en-IN')}`;
    }
    return euroString;
  }

  /**
   * Get metadata
   */
  getMetadata() {
    return this.data.metadata;
  }
}

// Create singleton instance
const dataService = new DataService();

export default dataService; 