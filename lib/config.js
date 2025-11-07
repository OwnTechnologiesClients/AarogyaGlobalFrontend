/**
 * Configuration file for Aarogya Global Frontend
 * Contains API endpoints and other configuration settings
 */

const config = {
  // API Configuration
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://backend.aarogyaglobal.com/api',
    timeout: 10000, // 10 seconds
    retryAttempts: 3,
  },

  // Image Configuration
  images: {
    // Backend serves images from /uploads directory
    baseURL: process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'https://backend.aarogyaglobal.com',
    uploadsPath: '/uploads',
    // No fallback images; UI should handle missing images explicitly
    fallbacks: {
      doctor: null,
      hospital: null,
      treatment: null,
    }
  },

  // Pagination Configuration
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
    defaultPage: 1,
  },

  // Search Configuration
  search: {
    debounceMs: 300, // Debounce search input
    minQueryLength: 2, // Minimum characters to start search
    maxResults: 50, // Maximum search results to return
  },

  // Error Handling Configuration
  error: {
    showUserFriendlyMessages: true,
    logToConsole: process.env.NODE_ENV === 'development',
    fallbackToStaticData: false, // Set to true to fallback to static data on API errors
  },

  // Development Configuration
  development: {
    enableApiLogging: process.env.NODE_ENV === 'development',
    mockApiResponses: false, // Set to true to use mock data instead of real API
  }
};

export default config;
