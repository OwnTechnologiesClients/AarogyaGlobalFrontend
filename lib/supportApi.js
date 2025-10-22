import apiService from './apiService.js';

class SupportApiService {
  constructor() {
    this.apiService = apiService;
  }

  /**
   * Get user's support tickets
   * @param {string} userId - User ID
   * @returns {Promise} API response
   */
  async getUserTickets(userId) {
    return this.apiService.request(`/support/user/${userId}`, {
      method: 'GET',
      includeAuth: true
    });
  }

  /**
   * Get specific support ticket by ID
   * @param {string} ticketId - Ticket ID
   * @returns {Promise} API response
   */
  async getTicketById(ticketId) {
    return this.apiService.request(`/support/ticket/${ticketId}`, {
      method: 'GET'
    });
  }

  /**
   * Create new support ticket
   * @param {Object} ticketData - Ticket data
   * @param {string} ticketData.subject - Ticket subject
   * @param {string} ticketData.message - Ticket message
   * @param {string} ticketData.userId - User ID
   * @param {File} ticketData.attachment - Optional attachment file
   * @returns {Promise} API response
   */
  async createTicket(ticketData) {
    const formData = new FormData();
    formData.append('subject', ticketData.subject);
    formData.append('message', ticketData.message);
    formData.append('userId', ticketData.userId);
    
    if (ticketData.attachment) {
      formData.append('attachment', ticketData.attachment);
    }

    return this.apiService.request('/support/create', {
      method: 'POST',
      includeAuth: true,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export default new SupportApiService();
