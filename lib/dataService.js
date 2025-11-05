// COMMENTED OUT: Static JSON data import - now using API service
// import unifiedData from '../data/unifiedData.json';
import apiService from './apiService.js';

/**
 * Data Service for Aarogya Global Medical Tourism Platform
 * Provides consistent access to unified data across the application
 * Now uses backend API instead of static JSON data
 */

class DataService {
  constructor() {
    // COMMENTED OUT: Static data - now using API service
    // this.data = unifiedData;
    this.apiService = apiService;
    
    // Fallback data for specialties (still using static data for now)
    this.specialtyData = {
      // This will be populated from static data as fallback
      // until we migrate specialty data to backend
    };
    // No static image mapping; rely solely on backend-provided images
    this.treatmentImageMap = {};
    if (process.env.NODE_ENV === 'development') {
      console.log('DataService: Constructor called, API service initialized');
    }
    // COMMENTED OUT: Static data logging - now using API service
    // console.log('DataService: globalDoctors count:', this.data.globalDoctors?.length || 0);
    // console.log('DataService: globalDoctors IDs:', this.data.globalDoctors?.map(d => d.id) || []);
  }

  /**
   * Normalize doctor object from backend to UI shape
   */
  normalizeDoctor(doctor) {
    if (!doctor || typeof doctor !== 'object') return doctor;

    const normalizedEducation = Array.isArray(doctor.degrees)
      ? doctor.degrees.map((d) => ({
          degree: d?.name || d?.degree || 'Degree',
          institution: d?.institution || 'Institution',
          year: d?.year || 'Year'
        }))
      : doctor.education;

    return {
      ...doctor,
      about: doctor.introduction || doctor.about,
      education: normalizedEducation,
      specializations: Array.isArray(doctor.specializations) ? doctor.specializations : (doctor.expertise || []),
      hospital: doctor.customHospitalName || doctor.hospitalId?.name || doctor.hospital?.name || doctor.hospital || doctor.hospitalName,
      treatments: Array.isArray(doctor.treatments) ? doctor.treatments : doctor.treatments?.doctors || doctor.treatments,
    };
  }

  /**
   * Normalize hospital object from backend to UI shape
   * - Optionally embed hospital.doctors as full objects
   */
  async normalizeHospital(hospital) {
    if (!hospital || typeof hospital !== 'object') return hospital;

    // Preserve rating object structure - don't flatten it
    const normalizedRating = hospital.rating;

    // Ensure gallery-based displayImage if not present
    const displayImage = hospital.displayImage || (Array.isArray(hospital.gallery) && hospital.gallery[0]) || null;

    // Populate doctors if hospital.doctors is an array of IDs
    let embeddedDoctors = hospital.doctors;
    if (Array.isArray(hospital.doctors) && hospital.doctors.length > 0) {
      const first = hospital.doctors[0];
      if (typeof first === 'string') {
        try {
          // Prefer server-side listing by hospitalId for efficiency
          const list = await this.getDoctorsPaginated({ limit: 100, hospitalId: hospital.id });
          embeddedDoctors = (list?.data || []).map(d => this.normalizeDoctor(d));
        } catch (e) {
          // Fallback: fetch individually
          embeddedDoctors = (await Promise.all(hospital.doctors.map(async (docId) => {
            try {
              const res = await this.apiService.getDoctorById(docId);
              return res?.success ? this.normalizeDoctor(res.data) : null;
            } catch {
              return null;
            }
          }))).filter(Boolean);
        }
      } else if (typeof first === 'object') {
        // Filter out inactive doctors when they come as embedded objects
        embeddedDoctors = hospital.doctors
          .filter(d => d.isActive !== false)
          .map(d => this.normalizeDoctor(d));
      }
    }

    return {
      ...hospital,
      rating: normalizedRating, // Keep original rating structure
      displayImage,
      doctors: embeddedDoctors || [],
    };
  }

  /**
   * Get all specialties list
   * COMMENTED OUT: Using static fallback since specialty data is not migrated yet
   */
  getAllSpecialties() {
    // TODO: This should come from API in the future
    // For now, return a static list of specialties with the correct structure
    return [
      { 
        id: 'cardiology', 
        name: 'Cardiology', 
        label: 'Cardiology',
        slug: 'cardiology',
        description: 'Expert heart and cardiovascular care services',
        icon: 'lucide/HeartPulse',
        color: '#A3DAC2',
        count: 8
      },
      { 
        id: 'neurology', 
        name: 'Neurology', 
        label: 'Neurology',
        slug: 'neurology',
        description: 'Advanced brain and nervous system treatments',
        icon: '/specialties/neurology.png',
        color: '#FEC091',
        count: 6
      },
      { 
        id: 'orthopaedics', 
        name: 'Orthopaedics', 
        label: 'Orthopaedics',
        slug: 'orthopaedics',
        description: 'Comprehensive bone and joint care solutions',
        icon: '/specialties/orthopaedics.png',
        color: '#F6EB61',
        count: 12
      },
      { 
        id: 'oncology', 
        name: 'Oncology', 
        label: 'Oncology',
        slug: 'oncology',
        description: 'Advanced cancer care and treatment options',
        icon: '/specialties/oncology.png',
        color: '#E7C2D4',
        count: 10
      },
      // { 
      //   id: 'gynaecology', 
      //   name: 'Gynaecology', 
      //   label: 'Gynaecology',
      //   slug: 'gynaecology',
      //   description: 'Specialized women\'s health and reproductive care',
      //   icon: 'lucide/Baby',
      //   color: '#A3DAC2',
      //   count: 7
      // },
      // { 
      //   id: 'urology', 
      //   name: 'Urology', 
      //   label: 'Urology',
      //   slug: 'urology',
      //   description: 'Expert urinary system and kidney care',
      //   icon: 'lucide/Stethoscope',
      //   color: '#A3DAC2',
      //   count: 5
      // }
    ];
  }

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
  getAllSpecialties() {
    return this.data.specialtyList;
  }
  */

  /**
   * Get specialty by slug
   * COMMENTED OUT: Using static fallback since specialty data is not migrated yet
   */
  getSpecialtyBySlug(slug) {
    if (!slug) {
      console.warn('getSpecialtyBySlug called with empty slug');
      return null;
    }

    // TODO: This should come from API in the future
    // For now, return a basic specialty object
    const specialties = {
      // 'cardiology': { id: 'cardiology', name: 'Cardiology', slug: 'cardiology', description: 'Heart and cardiovascular care' },
      // 'neurology': { id: 'neurology', name: 'Neurology', slug: 'neurology', description: 'Brain and nervous system care' },
      // 'orthopaedics': { id: 'orthopaedics', name: 'Orthopaedics', slug: 'orthopaedics', description: 'Bone and joint care' },
      // 'oncology': { id: 'oncology', name: 'Oncology', slug: 'oncology', description: 'Cancer care and treatment' },
      // 'gynaecology': { id: 'gynaecology', name: 'Gynaecology', slug: 'gynaecology', description: 'Women\'s health care' },
      // 'urology': { id: 'urology', name: 'Urology', slug: 'urology', description: 'Urinary system care' }
    };

    const specialty = specialties[slug];
    if (!specialty) {
      console.warn(`Specialty not found for slug: ${slug}`);
      console.log('Available specialties:', Object.keys(specialties));
    }

    return specialty || null;
  }

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
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
  */

  /**
   * Get all hospitals for a specific specialty
   */
  getHospitalsBySpecialty(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    return specialty ? specialty.hospitals : [];
  }

  /**
   * Get all unique hospitals from all specialties and global hospitals
   * NOW USES API SERVICE
   */
  async getAllUniqueHospitals() {
    try {
      // Fetch all hospitals by setting a high limit
      const response = await this.apiService.getHospitals({ limit: 1000 });
      if (process.env.NODE_ENV === 'development') {
        console.log(`getAllUniqueHospitals: Found ${response.data?.length || 0} hospitals from API`);
      }
      // Filter to only show active hospitals
      const activeHospitals = (response.data || []).filter(hospital => hospital.isActive !== false);
      if (process.env.NODE_ENV === 'development') {
        console.log(`getAllUniqueHospitals: Filtered to ${activeHospitals.length} active hospitals`);
      }
      return activeHospitals;
    } catch (error) {
      console.error('Error fetching hospitals from API:', error);
      
      // FALLBACK: Return empty array if API fails
      return [];
    }
  }

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
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
  */

  /**
   * Get all doctors for a specific specialty
   */
  getDoctorsBySpecialty(specialtySlug) {
    const specialty = this.getSpecialtyBySlug(specialtySlug);
    return specialty ? specialty.doctors : [];
  }

  /**
   * Get all unique doctors from all specialties and global doctors
   * NOW USES API SERVICE
   */
  async getAllUniqueDoctors() {
    try {
      // Fetch all doctors by setting a high limit
      const response = await this.apiService.getDoctors({ limit: 1000 });
      if (process.env.NODE_ENV === 'development') {
        console.log(`getAllUniqueDoctors: Found ${response.data?.length || 0} doctors from API`);
      }
      // Filter to only show active doctors
      const activeDoctors = (response.data || []).filter(doctor => doctor.isActive !== false);
      if (process.env.NODE_ENV === 'development') {
        console.log(`getAllUniqueDoctors: Filtered to ${activeDoctors.length} active doctors`);
      }
      return activeDoctors;
    } catch (error) {
      console.error('Error fetching doctors from API:', error);
      
      // FALLBACK: Return empty array if API fails
      // TODO: Could implement fallback to static data if needed
      return [];
    }
  }

  /**
   * Get paginated doctors from API (server-side pagination)
   */
  async getDoctorsPaginated(params = {}) {
    try {
      const { page = 1, limit = 6, specialty, location, search, hospitalId } = params;
      const apiParams = { page, limit };
      if (specialty) apiParams.specialty = specialty;
      if (location) apiParams.location = location;
      if (search) apiParams.search = search;
      if (hospitalId) apiParams.hospitalId = hospitalId;

      const response = await this.apiService.getDoctors(apiParams);
      
      // Filter to only show active doctors
      const rawData = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
      const activeData = rawData.filter(doctor => doctor.isActive !== false);
      
      const normalized = {
        data: activeData,
        pagination: {
          page: response?.currentPage || response?.page || page,
          limit: response?.limit || limit,
          total: activeData.length, // Update total to reflect filtered count
          totalPages: Math.ceil(activeData.length / limit)
        },
        success: response?.success !== false
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('getDoctorsPaginated:', normalized.pagination, `(${rawData.length} total, ${activeData.length} active)`);
      }

      return normalized;
    } catch (error) {
      console.error('Error fetching paginated doctors from API:', error);
      return { data: [], pagination: { page: 1, limit: params.limit || 6, total: 0, totalPages: 1 }, success: false };
    }
  }

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
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
  */

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
   * NOW USES API SERVICE
   */
  async getAllGlobalHospitals() {
    try {
      const response = await this.apiService.getHospitals();
      // Filter to only show active hospitals
      const activeHospitals = (response.data || []).filter(hospital => hospital.isActive !== false);
      return activeHospitals;
    } catch (error) {
      console.error('Error fetching global hospitals from API:', error);
      return [];
    }
  }

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
  getAllGlobalHospitals() {
    return this.data.globalHospitals;
  }
  */

  /**
   * Get all global doctors
   * NOW USES API SERVICE
   */
  async getAllGlobalDoctors() {
    try {
      const response = await this.apiService.getDoctors();
      // Filter to only show active doctors
      const activeDoctors = (response.data || []).filter(doctor => doctor.isActive !== false);
      return activeDoctors;
    } catch (error) {
      console.error('Error fetching global doctors from API:', error);
      return [];
    }
  }

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
  getAllGlobalDoctors() {
    return this.data.globalDoctors;
  }
  */

  /**
   * Get hospital by ID
   * NOW USES API SERVICE
   */
  async getHospitalById(hospitalId) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(`getHospitalById: Looking for hospital ID: ${hospitalId}`);
        console.log(`getHospitalById: API Base URL: ${this.apiService.baseURL}`);
      }
      
      // Test API connectivity first
      try {
        const testResponse = await this.apiService.getHospitals({ limit: 1 });
        if (process.env.NODE_ENV === 'development') {
          console.log(`getHospitalById: API connectivity test - Success: ${!!testResponse}`);
        }
      } catch (testError) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`getHospitalById: API connectivity test failed:`, testError);
        }
      }
      
      const response = await this.apiService.getHospitalById(hospitalId);
      
      if (response.success && response.data) {
        // Check if hospital is active
        if (response.data.isActive === false) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`getHospitalById: Hospital ${hospitalId} is inactive`);
          }
          return null;
        }
        if (process.env.NODE_ENV === 'development') {
          console.log(`getHospitalById: Found hospital ${hospitalId}: ${response.data.name}`);
          console.log(`getHospitalById: Hospital gallery:`, response.data.gallery);
          console.log(`getHospitalById: Hospital displayImage:`, response.data.displayImage);
        }
        const normalized = await this.normalizeHospital(response.data);
        return normalized;
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`getHospitalById: Hospital ${hospitalId} not found in API response`);
        }
        return null;
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error fetching hospital ${hospitalId} from API:`, error);
        console.error(`Error details:`, {
          message: error.message,
          stack: error.stack
        });
      }
      return null;
    }
  }

  

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
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
  */

  /**
   * Get doctor by ID
   * NOW USES API SERVICE
   */
  async getDoctorById(doctorId) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(`getDoctorById: Looking for doctor ID: ${doctorId}`);
      }
      const response = await this.apiService.getDoctorById(doctorId);
      
      if (response.success && response.data) {
        // Check if doctor is active
        if (response.data.isActive === false) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`getDoctorById: Doctor ${doctorId} is inactive`);
          }
          return null;
        }
        if (process.env.NODE_ENV === 'development') {
          console.log(`getDoctorById: Found doctor ${doctorId}: ${response.data.name}`);
        }
        return this.normalizeDoctor(response.data);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`getDoctorById: Doctor ${doctorId} not found`);
        }
        return null;
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error fetching doctor ${doctorId} from API:`, error);
      }
      return null;
    }
  }

  

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
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
  */

  /**
   * Get treatment by ID
   * NOW USES API SERVICE
   */
  async getTreatmentById(treatmentId) {
    try {
      console.log(`getTreatmentById: Looking for treatment ID: ${treatmentId}`);
      const response = await this.apiService.getTreatmentById(treatmentId);
      
      if (response.success && response.data) {
        const t = response.data;
        // Check if treatment is active
        if (t.isActive === false) {
          console.warn(`getTreatmentById: Treatment ${treatmentId} is inactive`);
          return null;
        }
        console.log(`getTreatmentById: Found treatment: ${t.name}`);
        // Map backend fields to UI expectations
        const uiTreatment = {
          ...t,
          title: `${t.name} - ${t.category} Treatment`,
          overview: {
            description: t.description,
            cta: {
              bookConsultation: 'Book a free consultation',
              secondOpinion: 'Get a second opinion',
              callBack: 'Request a call back'
            }
          },
          bestHospitals: {
            title: `Best hospitals for ${t.name}`,
            description: t.hospitalSelectionHelp || t.hospitalSelectionCriteria || `What helps to find the best hospital for ${t.name}?`,
            hospitals: Array.isArray(t.topHospitals) ? t.topHospitals.filter(h => h.isActive !== false) : [],
            selectionCriteria: Array.isArray(t.hospitalSelectionList) ? t.hospitalSelectionList : []
          },
          topDoctors: {
            title: `Top doctors for ${t.name}`,
            description: t.doctorSelectionHelp || t.doctorSelectionCriteria || `How to select the best doctor for ${t.name}?`,
            doctors: Array.isArray(t.topDoctors) ? t.topDoctors.filter(d => d.isActive !== false) : [],
            selectionCriteria: Array.isArray(t.doctorSelectionList) ? t.doctorSelectionList : []
          },
          diagnosticTools: Array.isArray(t.diagnosticTools) ? t.diagnosticTools : [],
          advancedTreatments: Array.isArray(t.advancedTreatmentOptions) ? t.advancedTreatmentOptions : [],
          advantages: Array.isArray(t.advantages) ? t.advantages : [],
          treatmentPackages: {
            title: `${t.name} Treatment Packages`,
            packages: [
              {
                id: 1,
                name: t.name,
                price: t.costConsiderations || 'Contact for pricing',
                description: t.description,
                duration: t.duration,
                recovery: t.recovery,
                image: this.treatmentImageMap[t.id] || '/hospitaldirectory/img1.png'
              }
            ]
          },
          faq: Array.isArray(t.faq) ? t.faq : []
        };

        return {
          treatment: uiTreatment,
          specialty: {
            name: t.category || 'Medical Treatment',
            slug: t.category?.toLowerCase().replace(/\s+/g, '-') || 'treatment',
            description: t.description || '',
            icon: 'lucide/Stethoscope',
            color: '#A3DAC2'
          }
        };
      } else {
        console.warn(`getTreatmentById: Treatment ${treatmentId} not found`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching treatment ${treatmentId} from API:`, error);
      return null;
    }
  }

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
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
  */

  /**
   * Search hospitals by criteria
   * NOW USES API SERVICE
   */
  async searchHospitals(criteria = {}) {
    try {
      const response = await this.apiService.searchHospitals(criteria);
      console.log(`searchHospitals: Found ${response.data?.length || 0} hospitals matching criteria`);
      return response.data || [];
    } catch (error) {
      console.error('Error searching hospitals from API:', error);
      return [];
    }
  }

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
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
  */

  /**
   * Search doctors by criteria
   * NOW USES API SERVICE
   */
  async searchDoctors(criteria = {}) {
    try {
      const response = await this.apiService.searchDoctors(criteria);
      console.log(`searchDoctors: Found ${response.data?.length || 0} doctors matching criteria`);
      return response.data || [];
    } catch (error) {
      console.error('Error searching doctors from API:', error);
      return [];
    }
  }

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
  async searchDoctors(criteria = {}) {
    // Start with unique doctors to avoid duplicates
    let results = await this.getAllUniqueDoctors();

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
  */

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
            image: treatment.image || this.treatmentImageMap[treatment.id] || "/hospitaldirectory/img1.png"
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
  async getIndividualTreatmentData(treatmentId) {
    console.log(`getIndividualTreatmentData: Looking for treatment ID: ${treatmentId}`);
    const treatmentData = await this.getTreatmentById(treatmentId);
    if (!treatmentData) {
      console.warn(`Treatment not found for ID: ${treatmentId}`);
      return null;
    }

    const { treatment, specialty } = treatmentData;
    console.log(`getIndividualTreatmentData: Found treatment: ${treatment.name} in specialty: ${specialty.name}`);

    // Resolve best hospitals - check if already populated or need to fetch by IDs
    let resolvedHospitals = [];
    if (Array.isArray(treatment.topHospitals)) {
      // Check if hospitals are already populated (have name property) or are just IDs
      const firstHospital = treatment.topHospitals[0];
      if (firstHospital && typeof firstHospital === 'object' && firstHospital.name) {
        // Hospitals are already populated from backend
        resolvedHospitals = treatment.topHospitals.map(hospital => {
          const hospitalObj = hospital.toObject ? hospital.toObject() : hospital;
          // Add displayImage from gallery if not already present
          if (!hospitalObj.displayImage && hospitalObj.gallery && hospitalObj.gallery.length > 0) {
            hospitalObj.displayImage = hospitalObj.gallery[0];
          }
          return hospitalObj;
        });
        console.log(`getIndividualTreatmentData: Using populated hospitals (${resolvedHospitals.length} hospitals)`);
      } else {
        // Hospitals are just IDs, need to fetch them
        const hospitalIds = treatment.topHospitals;
        resolvedHospitals = (await Promise.all(
          (hospitalIds || []).map(async (hospitalId) => {
            try {
              const res = await this.apiService.getHospitalById(hospitalId);
              return res?.success ? res.data : null;
            } catch (e) {
              console.warn(`getIndividualTreatmentData: Failed to fetch hospital ${hospitalId}`, e?.message || e);
              return null;
            }
          })
        )).filter(Boolean);
        console.log(`getIndividualTreatmentData: Fetched hospitals by IDs (${resolvedHospitals.length} hospitals)`);
      }
    } else if (Array.isArray(treatment.hospitals)) {
      // Fallback to hospitals field
      const hospitalIds = treatment.hospitals;
      resolvedHospitals = (await Promise.all(
        (hospitalIds || []).map(async (hospitalId) => {
          try {
            const res = await this.apiService.getHospitalById(hospitalId);
            return res?.success ? res.data : null;
          } catch (e) {
            console.warn(`getIndividualTreatmentData: Failed to fetch hospital ${hospitalId}`, e?.message || e);
            return null;
          }
        })
      )).filter(Boolean);
    }

    // Fallback: if no specific hospitals mapped, fetch by specialty category
    if ((!resolvedHospitals || resolvedHospitals.length === 0) && specialty?.name) {
      try {
        const listRes = await this.apiService.getHospitals({ specialty: specialty.name });
        resolvedHospitals = Array.isArray(listRes?.data) ? listRes.data.slice(0, 8) : [];
      } catch (e) {
        console.warn('getIndividualTreatmentData: Fallback hospitals fetch failed', e?.message || e);
        resolvedHospitals = [];
      }
    }

    // Resolve top doctors by IDs via API (no static data)
    let doctorIds = [];
    if (Array.isArray(treatment.topDoctors)) {
      doctorIds = treatment.topDoctors;
    } else if (treatment.topDoctors && typeof treatment.topDoctors === 'object' && Array.isArray(treatment.topDoctors.doctors)) {
      doctorIds = treatment.topDoctors.doctors;
    }
    let resolvedDoctors = (await Promise.all(
      (doctorIds || []).map(async (doctorId) => {
        try {
          const res = await this.apiService.getDoctorById(doctorId);
          return res?.success ? res.data : null;
        } catch (e) {
          console.warn(`getIndividualTreatmentData: Failed to fetch doctor ${doctorId}`, e?.message || e);
          return null;
        }
      })
    )).filter(Boolean);

    // Fallback: if no specific doctors mapped, fetch by specialty category
    if ((!resolvedDoctors || resolvedDoctors.length === 0) && specialty?.name) {
      try {
        const listRes = await this.apiService.searchDoctors({ specialty: specialty.name });
        resolvedDoctors = Array.isArray(listRes?.data) ? listRes.data.slice(0, 8) : [];
      } catch (e) {
        console.warn('getIndividualTreatmentData: Fallback doctors fetch failed', e?.message || e);
        resolvedDoctors = [];
      }
    }

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
          hospitals: resolvedHospitals,
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
          doctors: resolvedDoctors,
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
              image: this.treatmentImageMap[treatment.id] || null
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
   * COMMENTED OUT: Using static data as fallback for now
   */
  getMetadata() {
    // TODO: This should come from API in the future
    return {
      version: "1.0",
      lastUpdated: new Date().toISOString(),
      description: "Aarogya Global medical tourism platform - API integrated"
    };
  }

  /**
   * COMMENTED OUT: Old static data method
   */
  /*
  getMetadata() {
    return this.data.metadata;
  }
  */
}

// Create singleton instance
const dataService = new DataService();

export default dataService; 