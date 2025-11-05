// Enquiry service utility for form submissions
// This service handles saving enquiries to the backend after EmailJS sends emails

import apiService from './apiService.js';

/**
 * Save enquiry data to backend
 * @param {Object} enquiryData - The enquiry data to save
 * @returns {Promise<Object>} - API response
 */
export async function saveEnquiryToBackend(enquiryData) {
  try {
    const response = await apiService.createEnquiry(enquiryData);
    return {
      success: true,
      data: response.data,
      message: 'Enquiry saved successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to save enquiry',
      details: error.details || null
    };
  }
}

/**
 * Prepare enquiry data for backend storage
 * @param {Object} formData - Form data from the frontend
 * @param {string} formSource - Source of the form (e.g., 'Contact Form', 'Consultation Form')
 * @param {string} pageRef - Page reference where the form was submitted
 * @returns {Object} - Formatted enquiry data
 */
export function prepareEnquiryData(formData, formSource, pageRef) {
  // Handle different form types and provide defaults for required fields
  let name = formData.name || '';
  let message = formData.message || '';
  let subject = formData.subject || '';

  // For callback forms (DoctorsResults, SpecialtyResults) that don't have name/message
  if (!name && formData.email) {
    name = `Callback Request from ${formData.email}`;
  }
  
  if (!message) {
    if (formData.phone) {
      message = `Callback requested. Phone: ${formData.countryCode || ''}${formData.phone}`;
    } else {
      message = `Enquiry from ${formSource}`;
    }
  }

  // For partner forms, use organizationName or contactPerson as name
  if (!name && formData.organizationName) {
    name = formData.organizationName;
  }
  if (!name && formData.contactPerson) {
    name = formData.contactPerson;
  }

  // Generate subject if not provided
  if (!subject) {
    if (formData.specialty) {
      subject = `Consultation Request - ${formData.specialty}`;
    } else if (formData.organizationType) {
      subject = `Partnership Inquiry - ${formData.organizationType}`;
    } else if (formData.hospital) {
      subject = `Hospital Contact - ${formData.hospital}`;
    } else {
      subject = `Enquiry from ${formSource}`;
    }
  }

  const baseData = {
    name: name,
    email: formData.email || '',
    phone: formData.phone || '',
    countryCode: formData.countryCode || '',
    subject: subject,
    pageRef: pageRef || 'Unknown',
    message: message,
    formSource: formSource || 'Unknown Form'
  };

  // Add consultation-specific fields if present
  if (formData.specialty) {
    baseData.specialty = formData.specialty;
  }
  if (formData.hospital) {
    baseData.hospital = formData.hospital;
  }

  // Add partner-specific fields if present
  if (formData.organizationName) {
    baseData.organizationName = formData.organizationName;
  }
  if (formData.contactPerson) {
    baseData.contactPerson = formData.contactPerson;
  }
  if (formData.organizationType) {
    baseData.organizationType = formData.organizationType;
  }
  if (formData.services) {
    baseData.services = Array.isArray(formData.services) ? formData.services : [formData.services];
  }
  if (formData.location) {
    baseData.location = formData.location;
  }

  // Final validation - ensure required fields are never empty
  if (!baseData.name.trim()) {
    throw new Error('Name is required but not provided');
  }
  if (!baseData.message.trim()) {
    throw new Error('Message is required but not provided');
  }
  if (!baseData.subject.trim()) {
    throw new Error('Subject is required but not provided');
  }

  return baseData;
}

/**
 * Enhanced form submission handler that sends email via EmailJS AND saves to backend
 * @param {Function} emailFunction - EmailJS function to call (e.g., sendContactEmail)
 * @param {Object} emailData - Data for EmailJS
 * @param {Object} enquiryData - Data for backend storage
 * @param {string} formSource - Source of the form
 * @param {string} pageRef - Page reference
 * @returns {Promise<Object>} - Combined result of both operations
 */
export async function submitEnquiryWithBoth(emailFunction, emailData, enquiryData, formSource, pageRef) {
  const results = {
    emailSent: false,
    enquirySaved: false,
    errors: []
  };

  // Prepare enquiry data for backend
  let backendData;
  try {
    backendData = prepareEnquiryData(enquiryData, formSource, pageRef);
  } catch (validationError) {
    results.errors.push({
      type: 'validation',
      message: validationError.message
    });
    return {
      success: false,
      message: validationError.message,
      emailSent: results.emailSent,
      enquirySaved: false,
      errors: results.errors
    };
  }

  // Try to send email first (existing functionality)
  try {
    await emailFunction(emailData, formSource);
    results.emailSent = true;
  } catch (emailError) {
    results.errors.push({
      type: 'email',
      message: emailError.message || 'Failed to send email'
    });
  }

  // Try to save to backend (new functionality)
  try {
    const backendResult = await saveEnquiryToBackend(backendData);
    if (backendResult.success) {
      results.enquirySaved = true;
    } else {
      results.errors.push({
        type: 'backend',
        message: backendResult.error || 'Failed to save enquiry'
      });
    }
  } catch (backendError) {
    results.errors.push({
      type: 'backend',
      message: backendError.message || 'Failed to save enquiry'
    });
  }

  // Determine overall success
  results.success = results.emailSent || results.enquirySaved;
  
  // Generate appropriate user message
  if (results.emailSent && results.enquirySaved) {
    results.message = 'Your message has been sent successfully!';
  } else if (results.emailSent && !results.enquirySaved) {
    results.message = 'Your message has been sent! (Note: There was an issue saving your enquiry)';
  } else if (!results.emailSent && results.enquirySaved) {
    results.message = 'Your enquiry has been received! (Note: There was an issue sending the email)';
  } else {
    results.message = 'Sorry, there was an issue processing your request. Please try again later.';
  }

  return results;
}

/**
 * Validate enquiry data before submission
 * @param {Object} data - Enquiry data to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - Validation result
 */
export function validateEnquiryData(data, requiredFields = ['name', 'email', 'message']) {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  // Email validation
  if (data.email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
