/**
 * API Service for Aarogya Global Medical Tourism Platform
 * Handles all communication with the backend API
 */

import config from './config.js';

class ApiService {
  constructor() {
    // Backend API base URL - can be configured via environment variables
    this.baseURL = config.api.baseURL;
    this.timeout = config.api.timeout;
    this.retryAttempts = config.api.retryAttempts;
    this.token = null;
    
    // Initialize token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  /**
   * Get headers for API requests
   */
  getHeaders(includeAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    if (!response.ok) {
      let errorData = null;
      let errorText = '';
      try {
        // clone before reading body twice
        errorData = await response.clone().json();
      } catch {}
      if (!errorData) {
        try {
          errorText = await response.text();
        } catch {}
      }

      // Gracefully handle 404 as a non-throwing result to allow fallbacks
      if (response.status === 404) {
        return {
          success: false,
          status: 404,
          statusText: response.statusText,
          url: response.url,
          error: (errorData && (errorData.message || errorData.error)) || errorText || 'Not Found'
        };
      }

      const payload = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        errorData: errorData || undefined,
        errorText: errorText || undefined
      };
      console.error('API Error:', payload);

      const message = (errorData && (errorData.message || errorData.error)) || errorText || `HTTP error! status: ${response.status}`;
      const err = new Error(message);
      err.details = payload;
      throw err;
    }
    
    // Handle empty/no-content
    if (response.status === 204) return null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  }

  /**
   * Generic API request method
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.includeAuth),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // ==================== DOCTORS API ====================

  /**
   * Get all doctors with optional filters
   */
  async getDoctors(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/doctors/list?${queryString}`);
  }

  /**
   * Get doctor by ID
   */
  async getDoctorById(id) {
    return this.request(`/doctors/list/${id}`);
  }

  /**
   * Search doctors with filters
   */
  async searchDoctors(filters = {}) {
    return this.getDoctors(filters);
  }

  // ==================== HOSPITALS API ====================

  /**
   * Get all hospitals with optional filters
   */
  async getHospitals(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const result = await this.request(`/hospitals/list?${queryString}`);
    
    // Debug logging to see what data we're getting
    if (process.env.NODE_ENV === 'development' && result?.data) {
      console.log('🏥 Hospitals API Response Sample:', {
        totalHospitals: result.data.length,
        firstHospital: result.data[0] ? {
          id: result.data[0].id,
          name: result.data[0].name,
          displayImage: result.data[0].displayImage,
          gallery: result.data[0].gallery,
          hasGallery: !!result.data[0].gallery?.length
        } : 'No hospitals found'
      });
    }
    
    return result;
  }

  /**
   * Get hospital by ID
   */
  async getHospitalById(id) {
    const result = await this.request(`/hospitals/list/${id}`);
    
    // Debug logging to see what data we're getting
    if (process.env.NODE_ENV === 'development' && result?.data) {
      console.log('🏥 Hospital by ID API Response:', {
        id: result.data.id,
        name: result.data.name,
        displayImage: result.data.displayImage,
        gallery: result.data.gallery,
        hasGallery: !!result.data.gallery?.length,
        doctorsCount: result.data.doctorsCount
      });
    }
    
    return result;
  }

  /**
   * Search hospitals with filters
   */
  async searchHospitals(filters = {}) {
    return this.getHospitals(filters);
  }

  // ==================== TREATMENTS API ====================

  /**
   * Get all treatments with optional filters
   */
  async getTreatments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/treatments/list?${queryString}`);
  }

  /**
   * Get treatment by ID
   */
  async getTreatmentById(id) {
    return this.request(`/treatments/list/${id}`);
  }

  /**
   * Get treatments by category
   */
  async getTreatmentsByCategory(category) {
    return this.request(`/treatments/category/${category}`);
  }

  /**
   * Search treatments with filters
   */
  async searchTreatments(filters = {}) {
    return this.getTreatments(filters);
  }

  // ==================== AUTHENTICATION API ====================
  // (For future admin functionality - not needed for content display)

  /**
   * Login to get authentication token
   */
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data.token) {
      this.token = response.data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', this.token);
      }
    }

    return response;
  }

  /**
   * Logout and clear token
   */
  async logout() {
    if (this.token) {
      try {
        await this.request('/auth/logout', {
          method: 'POST',
          includeAuth: true,
        });
      } catch (error) {
        console.warn('Logout request failed:', error);
      }
    }

    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.token;
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Get image URL for uploaded files
   */
  getImageUrl(imagePath) {
    if (!imagePath) return null;

    // Support objects with url/path fields
    if (typeof imagePath === 'object') {
      const candidate = imagePath?.url || imagePath?.path || imagePath?.src;
      imagePath = candidate || '';
    }
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const baseUrl = config.images.baseURL;
    
    // Debug logging to see what we're getting from the database
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Image URL construction - Input:', {
        imagePath: imagePath,
        type: typeof imagePath,
        length: imagePath?.length
      });
    }
    
    // If the path already starts with /uploads/, clean it and prepend the base URL
    if (imagePath.startsWith('/uploads/')) {
      let cleanPath = imagePath;
      
      // If it's /uploads/hospitals/some-folder/filename.jpg, extract just the filename
      // This handles cases where the database has subfolder paths but files are stored directly in /uploads/hospitals/
      const pathParts = cleanPath.split('/');
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Path analysis:', {
          originalPath: imagePath,
          cleanPath: cleanPath,
          pathParts: pathParts,
          partsLength: pathParts.length,
          hasHospitalsFolder: cleanPath.includes('/uploads/hospitals/'),
          condition: cleanPath.includes('/uploads/hospitals/') && pathParts.length > 4
        });
      }
      
      if (cleanPath.includes('/uploads/hospitals/') && pathParts.length > 4) {
        const filename = pathParts[pathParts.length - 1]; // Get the last part (filename)
        cleanPath = `/uploads/hospitals/${filename}`;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🧹 Removed hospital folder:', {
            originalPath: imagePath,
            filename: filename,
            cleanedPath: cleanPath
          });
        }
      }
      
      const fullUrl = `${baseUrl}${cleanPath}`;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Image URL construction - Cleaned /uploads/ path:', {
          originalPath: imagePath,
          cleanedPath: cleanPath,
          baseUrl: baseUrl,
          finalUrl: fullUrl
        });
      }
      
      return fullUrl;
    }
    
    // If the path starts with '/' but not '/uploads/', treat it as a Next.js public asset path
    if (imagePath.startsWith('/')) {
      return imagePath;
    }

    // If it's a relative public asset path like 'fortis-memorial/Fortis-Memorial-1.jpg',
    // serve from Next.js public directory
    if (imagePath.includes('/') && !imagePath.startsWith('uploads/')) {
      return `/${imagePath.replace(/^\//, '')}`;
    }

    // Otherwise, assume it's an upload path and point to backend
    const normalized = imagePath.startsWith('uploads/') ? `/${imagePath}` : `/uploads/hospitals/${imagePath}`;
    const fullUrl = `${baseUrl}${normalized}`;
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Image URL construction - Processed:', {
        originalPath: imagePath,
        fullPath: fullPath,
        baseUrl: baseUrl,
        finalUrl: fullUrl
      });
    }
    
    return fullUrl;
  }

  /**
   * Get paginated data with consistent structure
   */
  async getPaginatedData(endpoint, params = {}) {
    const response = await this.request(`${endpoint}?${new URLSearchParams(params).toString()}`);
    
    return {
      data: response.data || response,
      pagination: {
        page: response.page || 1,
        limit: response.limit || 10,
        total: response.total || 0,
        totalPages: response.totalPages || 1,
        currentPage: response.currentPage || response.page || 1,
      },
      success: response.success !== false,
    };
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
