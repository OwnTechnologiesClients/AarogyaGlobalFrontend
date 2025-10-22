
import axios from 'axios';
import config from './config.js';

class ApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: config.api.baseURL,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.token = null;
    
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('userToken');
    }

    this.setupInterceptors();
  }

  /**
   * Setup axios interceptors for request and response handling
   */
  setupInterceptors() {
    this.axios.interceptors.request.use(
      (config) => {
        if (config.includeAuth) {
          // Get token from localStorage dynamically
          const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : this.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        delete config.includeAuth;
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axios.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response) {
          const { status, statusText, data, config } = error.response;
          
          if (status === 404) {
            return {
              success: false,
              status: 404,
              statusText: statusText,
              url: config?.url,
              error: (data && (data.message || data.error)) || 'Not Found'
            };
          }

          const payload = {
            status: status,
            statusText: statusText,
            url: config?.url,
            errorData: data || undefined,
          };
          console.error('API Error:', payload);

          const message = (data && (data.message || data.error)) || `HTTP error! status: ${status}`;
          const err = new Error(message);
          err.details = payload;
          throw err;
        } else if (error.request) {
          console.error('Network Error:', error.request);
          throw new Error('Network error - please check your connection');
        } else {
          console.error('Request Error:', error.message);
          throw error;
        }
      }
    );
  }

  /**
   * Generic API request method
   */
  async request(endpoint, options = {}) {
    try {
      return await this.axios.request({
        url: endpoint,
        ...options,
      });
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getDoctors(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/doctors/list?${queryString}`);
  }

  async getDoctorById(id) {
    return this.request(`/doctors/list/${id}`);
  }

  async searchDoctors(filters = {}) {
    return this.getDoctors(filters);
  }

  async getHospitals(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/hospitals/list?${queryString}`);
  }

  async getHospitalById(id) {
    return this.request(`/hospitals/list/${id}`);
  }

  async searchHospitals(filters = {}) {
    return this.getHospitals(filters);
  }

  async getTreatments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/treatments/list?${queryString}`);
  }

  async getTreatmentById(id) {
    return this.request(`/treatments/list/${id}`);
  }

  async getTreatmentsByCategory(category) {
    return this.request(`/treatments/category/${category}`);
  }

  async searchTreatments(filters = {}) {
    return this.getTreatments(filters);
  }

  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      data: { email, password },
    });

    if (response.success && response.data.token) {
      this.token = response.data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('userToken', this.token);
      }
    }

    return response;
  }

  async firebaseLogin(idToken, authProvider, displayName = null) {
    const requestData = { idToken, authProvider };
    
    // Add displayName for phone authentication
    if (displayName && authProvider === 'phone') {
      requestData.displayName = displayName;
    }
    
    const response = await this.request('/user-auth/firebase-login', {
      method: 'POST',
      data: requestData,
    });

    if (response.success && response.data.token) {
      this.token = response.data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('userToken', this.token);
      }
    }

    return response;
  }

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
      localStorage.removeItem('userToken');
    }
  }

  isAuthenticated() {
    return !!this.token;
  }

  // Method to refresh token from localStorage
  refreshTokenFromStorage() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('userToken');
    }
    return this.token;
  }

  getImageUrl(imagePath) {
    if (!imagePath) return null;

    if (typeof imagePath === 'object') {
      const candidate = imagePath?.url || imagePath?.path || imagePath?.src;
      imagePath = candidate || '';
    }
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const baseUrl = config.images.baseURL;
    
    if (imagePath.startsWith('/uploads/')) {
      let cleanPath = imagePath;
      const pathParts = cleanPath.split('/');
      
      if (cleanPath.includes('/uploads/hospitals/') && pathParts.length > 4) {
        const filename = pathParts[pathParts.length - 1];
        cleanPath = `/uploads/hospitals/${filename}`;
      }
      
      return `${baseUrl}${cleanPath}`;
    }
    
    if (imagePath.startsWith('/')) {
      return imagePath;
    }

    if (imagePath.includes('/') && !imagePath.startsWith('uploads/')) {
      return `/${imagePath.replace(/^\//, '')}`;
    }

    const normalized = imagePath.startsWith('uploads/') ? `/${imagePath}` : `/uploads/hospitals/${imagePath}`;
    return `${baseUrl}${normalized}`;
  }

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

  // Enquiry API methods
  async createEnquiry(enquiryData) {
    return this.request('/enquiries', {
      method: 'POST',
      data: enquiryData,
    });
  }

  async getEnquiries(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/enquiries?${queryString}`);
  }

  async getEnquiryById(id) {
    return this.request(`/enquiries/${id}`);
  }

  async updateEnquiryStatus(id, statusData) {
    return this.request(`/enquiries/${id}/status`, {
      method: 'PUT',
      data: statusData,
      includeAuth: true,
    });
  }

  async updateEnquiry(id, enquiryData) {
    return this.request(`/enquiries/${id}`, {
      method: 'PUT',
      data: enquiryData,
      includeAuth: true,
    });
  }

  async deleteEnquiry(id) {
    return this.request(`/enquiries/${id}`, {
      method: 'DELETE',
      includeAuth: true,
    });
  }

  async getEnquiryStats() {
    return this.request('/enquiries/stats', {
      includeAuth: true,
    });
  }

}

const apiService = new ApiService();
export default apiService;
