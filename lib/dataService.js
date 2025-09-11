import unifiedData from '../data/unifiedData.json';

/**
 * Data Service for Aarogya Global Medical Tourism Platform
 * Provides consistent access to unified data across the application
 */

class DataService {
  constructor() {
    this.data = unifiedData;
    console.log('DataService: Constructor called, data loaded');
    console.log('DataService: globalDoctors count:', this.data.globalDoctors?.length || 0);
    console.log('DataService: globalDoctors IDs:', this.data.globalDoctors?.map(d => d.id) || []);
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
    if (!slug) {
      console.warn('getSpecialtyBySlug called with empty slug');
      return null;
    }

    const specialty = this.data.specialties[slug];
    if (!specialty) {
      console.warn(`Specialty not found for slug: ${slug}`);
      console.log('Available specialties:', Object.keys(this.data.specialties));
    }

    return specialty || null;
  }

  /**
   * Get all hospitals for a specific specialty
   */
  getHospitalsBySpecialty(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    return specialty ? specialty.hospitals : [];
  }

  /**
   * Get all unique hospitals from all specialties and global hospitals
   */
  getAllUniqueHospitals() {
    const allHospitals = [];

    // Get hospitals from all specialties
    for (const specialty of Object.values(this.data.specialties)) {
      allHospitals.push(...(specialty.hospitals || []));
    }

    // Add global hospitals
    allHospitals.push(...(this.data.globalHospitals || []));

    // Deduplicate by name (keep the first occurrence)
    const uniqueHospitals = [];
    const seenNames = new Set();

    for (const hospital of allHospitals) {
      if (!seenNames.has(hospital.name)) {
        seenNames.add(hospital.name);
        uniqueHospitals.push(hospital);
      }
    }

    return uniqueHospitals;
  }

  /**
   * Get all doctors for a specific specialty
   */
  getDoctorsBySpecialty(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    return specialty ? specialty.doctors : [];
  }

  /**
   * Get all unique doctors from all specialties and global doctors
   */
  getAllUniqueDoctors() {
    // Start with global doctors as the primary source
    const allDoctors = [...(this.data.globalDoctors || [])];

    // Add specialty doctors only if they're not already in global doctors
    for (const specialty of Object.values(this.data.specialties)) {
      if (specialty.doctors && Array.isArray(specialty.doctors)) {
        for (const specialtyDoctor of specialty.doctors) {
          // Check if this doctor is already in global doctors by ID
          const existsInGlobal = this.data.globalDoctors?.some(gd => gd.id === specialtyDoctor.id);
          if (!existsInGlobal) {
            allDoctors.push(specialtyDoctor);
          }
        }
      }
    }

    // Final deduplication by ID (more reliable than name)
    const uniqueDoctors = [];
    const seenIds = new Set();

    for (const doctor of allDoctors) {
      if (doctor && doctor.id && !seenIds.has(doctor.id)) {
        seenIds.add(doctor.id);
        uniqueDoctors.push(doctor);
      }
    }

    console.log(`getAllUniqueDoctors: Found ${uniqueDoctors.length} unique doctors out of ${allDoctors.length} total`);
    return uniqueDoctors;
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
    // Always prioritize global hospitals as they have complete data including doctors
    const globalHospital = this.data.globalHospitals?.find(h => h.id === hospitalId);
    if (globalHospital) return globalHospital;

    // If not found in global hospitals, try specialty hospitals
    for (const specialty of Object.values(this.data.specialties)) {
      const hospital = specialty.hospitals?.find(h => h.id === hospitalId);
      if (hospital) return hospital;
    }

    // If still not found, return null
    return null;
  }

  /**
   * Get doctor by ID
   */
  getDoctorById(doctorId) {
    console.log(`getDoctorById: Looking for doctor ID: ${doctorId}`);

    // Search in specialty-specific doctors
    for (const specialty of Object.values(this.data.specialties)) {
      const doctor = specialty.doctors.find(d => d.id === doctorId);
      if (doctor) {
        console.log(`getDoctorById: Found doctor ${doctorId} in specialty ${specialty.name}`);
        return doctor;
      }
    }

    // Search in global doctors
    const globalDoctor = this.data.globalDoctors.find(d => d.id === doctorId);
    if (globalDoctor) {
      console.log(`getDoctorById: Found doctor ${doctorId} in globalDoctors: ${globalDoctor.name}`);
      return globalDoctor;
    } else {
      console.warn(`getDoctorById: Doctor ${doctorId} not found in globalDoctors`);
      console.log(`getDoctorById: Available global doctor IDs:`, this.data.globalDoctors.map(d => d.id));
      return null;
    }
  }

  /**
   * Get treatment by ID
   */
  getTreatmentById(treatmentId) {
    console.log(`getTreatmentById: Looking for treatment ID: ${treatmentId}`);
    for (const specialty of Object.values(this.data.specialties)) {
      console.log(`getTreatmentById: Checking specialty: ${specialty.name}, treatments count: ${specialty.treatments?.length || 0}`);
      const treatment = specialty.treatments?.find(t => t.id === treatmentId);
      if (treatment) {
        console.log(`getTreatmentById: Found treatment: ${treatment.name} in specialty: ${specialty.name}`);
        return {
          treatment,
          specialty: {
            name: specialty.name,
            slug: specialty.slug,
            description: specialty.description,
            icon: specialty.icon,
            color: specialty.color
          }
        };
      }
    }
    console.warn(`getTreatmentById: No treatment found with ID: ${treatmentId}`);
    return null;
  }

  /**
   * Search hospitals by criteria
   */
  searchHospitals(criteria = {}) {
    // Start with unique hospitals to avoid duplicates
    let results = this.getAllUniqueHospitals();

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
    // Start with unique doctors to avoid duplicates
    let results = this.getAllUniqueDoctors();

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
    console.log(`getTreatmentData: Getting data for specialty slug: ${specialtySlug}`);
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    if (!specialty) {
      console.warn(`Specialty not found for slug: ${specialtySlug}`);
      return null;
    }

    console.log(`getTreatmentData: Found specialty: ${specialty.name}`);

    // Ensure all required properties exist
    if (!specialty.overview) {
      console.warn(`Specialty ${specialtySlug} is missing overview data`);
      return null;
    }

    const treatmentData = {
      treatment: {
        name: `${specialty.name} Worldwide`,
        title: `${specialty.name} Worldwide: Best Hospitals, Doctors, Options & Cost`,
        slug: specialty.slug,
        description: `Comprehensive ${specialty.name.toLowerCase()} care with access to world-class hospitals, top-rated doctors, and advanced treatment options worldwide.`,
        overview: specialty.overview,
        bestHospitals: {
          title: `Best ${specialty.name.toLowerCase()} hospitals worldwide`,
          description: `What helps to find the best ${specialty.name.toLowerCase()} hospital?`,
          hospitals: (() => {
            if (Array.isArray(specialty.hospitals)) {
              console.log(`getTreatmentData: Processing ${specialty.hospitals.length} hospital IDs for specialty ${specialty.slug}:`, specialty.hospitals);
              const foundHospitals = specialty.hospitals.map(hospitalId => {
                const hospital = this.data.globalHospitals.find(h => h.id === hospitalId);
                if (!hospital) {
                  console.warn(`getTreatmentData: Hospital ${hospitalId} not found for specialty ${specialty.slug}`);
                } else {
                  console.log(`getTreatmentData: Found hospital ${hospitalId}: ${hospital.name}`);
                }
                return hospital;
              }).filter(Boolean);
              console.log(`getTreatmentData: Found ${foundHospitals.length} hospitals out of ${specialty.hospitals.length} for specialty ${specialty.slug}`);
              return foundHospitals;
            } else {
              console.log(`getTreatmentData: No hospitals mapped for specialty ${specialty.slug}, returning empty array`);
              return [];
            }
          })(),
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
          doctors: (() => {
            if (Array.isArray(specialty.doctors)) {
              console.log(`getTreatmentData: Processing ${specialty.doctors.length} doctor IDs for specialty ${specialty.slug}:`, specialty.doctors);
              const foundDoctors = specialty.doctors.map(doctorId => {
                const doctor = this.data.globalDoctors.find(d => d.id === doctorId);
                if (!doctor) {
                  console.warn(`getTreatmentData: Doctor ${doctorId} not found for specialty ${specialty.slug}`);
                } else {
                  console.log(`getTreatmentData: Found doctor ${doctorId}: ${doctor.name}`);
                }
                return doctor;
              }).filter(Boolean);
              console.log(`getTreatmentData: Found ${foundDoctors.length} doctors out of ${specialty.doctors.length} for specialty ${specialty.slug}`);
              return foundDoctors;
            } else {
              console.log(`getTreatmentData: No doctors mapped for specialty ${specialty.slug}, returning empty array`);
              return [];
            }
          })(),
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
          treatments: specialty.costs || []
        },
        treatmentPackages: {
          title: `${specialty.name} Treatment Packages`,
          packages: specialty.treatments ? specialty.treatments.map((treatment, index) => ({
            id: treatment.id || index + 1,
            name: treatment.name,
            price: treatment.price || "Contact for pricing",
            description: treatment.description || `Comprehensive ${treatment.name} treatment`,
            duration: treatment.duration || "Varies",
            recovery: treatment.recovery || "Varies",
            image: treatment.image || "/hospitaldirectory/img1.png"
          })) : []
        },
        diagnosticTools: [
          "Blood Tests",
          "Imaging Studies",
          "Medical History Review",
          "Specialized Imaging",
          "Biopsy",
          "Endoscopy",
          "Genetic Testing"
        ],
        advancedTreatments: [
          "Minimally Invasive Procedures",
          "Robotic Surgery",
          "Laser Treatment",
          "Targeted Therapy",
          "3D Imaging",
          "Precision Medicine",
          "Regenerative Therapy"
        ],
        advantages: [
          "High Success Rate",
          "Minimal Recovery Time",
          "Reduced Complications",
          "Better Outcomes",
          "Expert Care",
          "Advanced Technology",
          "Comprehensive Care",
          "Patient Support"
        ],
        howWeHelp: {
          title: "How We Help You",
          services: [
            {
              icon: "phone",
              title: "24/7 Support",
              description: "Round-the-clock assistance"
            },
            {
              icon: "user-check",
              title: "Expert Consultation",
              description: "Specialist doctor consultation"
            },
            {
              icon: "stethoscope",
              title: "Treatment Planning",
              description: "Personalized care plans"
            },
            {
              icon: "plane",
              title: "Travel Arrangements",
              description: "International patient support"
            }
          ]
        },
        faq: [
          {
            question: `What is ${specialty.name}?`,
            answer: `${specialty.name} is a medical specialty that focuses on the diagnosis and treatment of conditions affecting the ${specialty.name.toLowerCase()} system. Our medical tourism platform connects patients with the best ${specialty.name.toLowerCase()} hospitals and doctors worldwide.`
          },
          {
            question: `How do I choose the best ${specialty.name.toLowerCase()} hospital?`,
            answer: `Look for hospitals with international accreditations, experienced specialists, advanced technology, and comprehensive patient support services. Our platform helps you find the best options worldwide.`
          },
          {
            question: `What is the cost of ${specialty.name.toLowerCase()} treatment?`,
            answer: `Costs vary depending on the specific treatment, hospital, and location. Our platform provides transparent pricing and helps you find cost-effective options without compromising quality.`
          },
          {
            question: `How do I prepare for ${specialty.name.toLowerCase()} treatment?`,
            answer: `Preparation typically involves medical evaluation, diagnostic tests, and following specific guidelines provided by your doctor. We help coordinate all aspects of your care.`
          },
          {
            question: `What support services do you provide?`,
            answer: `We provide comprehensive support including consultation booking, travel arrangements, accommodation, language assistance, and ongoing care coordination throughout your treatment journey.`
          }
        ]
      }
    };

    console.log(`getTreatmentData: Returning treatment data with title: ${treatmentData.treatment.title}`);
    return treatmentData;
  }

  /**
 * Get individual treatment data for treatment details page
 * This creates treatment-specific data from individual treatment objects
 */
  getIndividualTreatmentData(treatmentId) {
    console.log(`getIndividualTreatmentData: Looking for treatment ID: ${treatmentId}`);
    const treatmentData = this.getTreatmentById(treatmentId);
    if (!treatmentData) {
      console.warn(`Treatment not found for ID: ${treatmentId}`);
      return null;
    }

    const { treatment, specialty } = treatmentData;
    console.log(`getIndividualTreatmentData: Found treatment: ${treatment.name} in specialty: ${specialty.name}`);

    const individualTreatmentData = {
      treatment: {
        name: treatment.name,
        title: `${treatment.name} - ${specialty.name} Treatment`,
        slug: treatment.id,
        description: treatment.description || `Comprehensive ${treatment.name} treatment in ${specialty.name}`,
        duration: treatment.duration || "Varies",
        recovery: treatment.recovery || "Varies",
        overview: {
          description: treatment.description || `Comprehensive ${treatment.name} treatment in ${specialty.name}`,
          highlights: [
            `Advanced ${treatment.name} procedures`,
            `Experienced ${specialty.name} specialists`,
            `State-of-the-art medical facilities`,
            `Comprehensive pre and post-operative care`,
            `International patient support services`
          ],
          cta: {
            bookConsultation: "Book a free consultation",
            secondOpinion: "Get a second opinion",
            callBack: "Request a call back"
          }
        },
        bestHospitals: {
          title: `Best hospitals for ${treatment.name}`,
          description: treatment.hospitalSelectionCriteria || `What helps to find the best hospital for ${treatment.name}?`,
          hospitals: (() => {
            let hospitalIds = [];

            // Handle different hospital data structures
            if (Array.isArray(treatment.topHospitals)) {
              hospitalIds = treatment.topHospitals;
            } else if (Array.isArray(treatment.hospitals)) {
              hospitalIds = treatment.hospitals;
            }

            if (hospitalIds.length > 0) {
              console.log(`getIndividualTreatmentData: Processing ${hospitalIds.length} hospital IDs for treatment ${treatment.id}:`, hospitalIds);
              const foundHospitals = hospitalIds.map(hospitalId => {
                const hospital = this.data.globalHospitals.find(h => h.id === hospitalId);
                if (!hospital) {
                  console.warn(`getIndividualTreatmentData: Hospital ${hospitalId} not found for treatment ${treatment.id}`);
                } else {
                  console.log(`getIndividualTreatmentData: Found hospital ${hospitalId}: ${hospital.name}`);
                }
                return hospital;
              }).filter(Boolean);
              console.log(`getIndividualTreatmentData: Found ${foundHospitals.length} hospitals out of ${hospitalIds.length} for treatment ${treatment.id}`);
              return foundHospitals;
            } else {
              console.log(`getIndividualTreatmentData: No specific hospitals mapped for treatment ${treatment.id}, returning empty array`);
              return [];
            }
          })(),
          selectionCriteria: treatment.hospitalSelectionList || [
            "Specialized treatment expertise",
            "Advanced medical equipment",
            "Experienced medical team",
            "International patient support",
            "Comprehensive care facilities"
          ]
        },
        topDoctors: {
          title: `Top doctors for ${treatment.name}`,
          description: treatment.doctorSelectionCriteria || `How to select the best doctor for ${treatment.name}?`,
          doctors: (() => {
            let doctorIds = [];

            // Handle different topDoctors data structures
            if (Array.isArray(treatment.topDoctors)) {
              // If topDoctors is an array of doctor IDs
              doctorIds = treatment.topDoctors;
            } else if (treatment.topDoctors && typeof treatment.topDoctors === 'object' && Array.isArray(treatment.topDoctors.doctors)) {
              // If topDoctors is an object with a doctors array
              doctorIds = treatment.topDoctors.doctors;
            }

            if (doctorIds.length > 0) {
              console.log(`getIndividualTreatmentData: Processing ${doctorIds.length} doctor IDs for treatment ${treatment.id}:`, doctorIds);
              const foundDoctors = doctorIds.map(doctorId => {
                const doctor = this.getDoctorById(doctorId);
                if (!doctor) {
                  console.warn(`getIndividualTreatmentData: Doctor ${doctorId} not found for treatment ${treatment.id}`);
                } else {
                  console.log(`getIndividualTreatmentData: Found doctor ${doctorId}: ${doctor.name}`);
                }
                return doctor;
              }).filter(Boolean);
              console.log(`getIndividualTreatmentData: Found ${foundDoctors.length} doctors out of ${doctorIds.length} for treatment ${treatment.id}`);
              return foundDoctors;
            } else {
              // No specific doctors mapped for this treatment - return empty array
              console.log(`getIndividualTreatmentData: No specific doctors mapped for treatment ${treatment.id}, returning empty array`);
              return [];
            }
          })(),
          selectionCriteria: treatment.doctorSelectionList || [
            "Specialized treatment experience",
            "Board certifications",
            "Success rates",
            "Patient testimonials",
            "International experience"
          ]
        },

        treatmentPackages: {
          title: `${treatment.name} Treatment Packages`,
          packages: [
            {
              id: 1,
              name: treatment.name,
              price: treatment.detailedCost || treatment.costConsiderations || "Contact for pricing",
              description: treatment.description,
              duration: treatment.duration,
              recovery: treatment.recovery,
              image: "/hospitaldirectory/img1.png"
            }
          ]
        },
        diagnosticTools: treatment.diagnosticTools && Array.isArray(treatment.diagnosticTools) ? treatment.diagnosticTools : [
          "Blood Tests",
          "Imaging Studies",
          "Medical History Review"
        ],
        advancedTreatments: treatment.advancedTreatmentOptions && Array.isArray(treatment.advancedTreatmentOptions) ? treatment.advancedTreatmentOptions : [
          "Robotic‑assisted TKR",
          "Patient‑specific instrumentation",
          "Cementless implants",
          "Unicompartmental (partial) knee",
          "Minimally invasive approaches"
        ],
        advantages: treatment.advantages && Array.isArray(treatment.advantages) ? treatment.advantages : [
          "Marked pain relief and mobility",
          "Long implant life—~82% of TKRs last ≥25 years",
          "High satisfaction when done at high‑volume centers"
        ],
        howWeHelp: {
          title: "How We Help You",
          services: [
            {
              icon: "phone",
              title: "24/7 Support",
              description: "Round-the-clock assistance"
            },
            {
              icon: "user-check",
              title: "Expert Consultation",
              description: "Specialist doctor consultation"
            },
            {
              icon: "stethoscope",
              title: "Treatment Planning",
              description: "Personalized care plans"
            },
            {
              icon: "plane",
              title: "Travel Arrangements",
              description: "International patient support"
            }
          ]
        },
        faq: treatment.faq ? treatment.faq : [
          {
            "question": "How long do implants last?",
            "answer": "Often >20–25 yrs."
          },
          {
            "question": "When can I drive?",
            "answer": "Typically 4–6 weeks if safe."
          },
          {
            "question": "Are both knees done together?",
            "answer": "Sometimes; depends on risk profile."
          }
        ]
      }
    };

    console.log(`getIndividualTreatmentData: Returning treatment data with title: ${individualTreatmentData.treatment.title}`);
    return individualTreatmentData;
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
      hospitals: specialty.hospitals,
      treatments: specialty.treatments || [],
      overview: specialty.overview || {
        description: `${specialty.name} is a medical specialty that focuses on the diagnosis and treatment of conditions affecting the ${specialty.name.toLowerCase()} system. Our medical tourism platform connects patients with the best ${specialty.name.toLowerCase()} hospitals and doctors worldwide.`,
        approvedBy: "Medical Board",
        lastUpdated: "2024"
      }
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