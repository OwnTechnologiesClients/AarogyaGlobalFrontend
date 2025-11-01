"use client";
import React, { useState, useEffect } from "react";
import { FaPaperclip, FaTimes, FaUpload, FaWindowClose } from "react-icons/fa";
import Swal from 'sweetalert2';

const UserReplyModal = ({ ticket, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    message: "",
    attachment: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          attachment: "File size must be less than 10MB"
        }));
        return;
      }
      
      // Check file type
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          attachment: "Only images, PDFs, Word docs, and text files are allowed"
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        attachment: file
      }));
      
      if (errors.attachment) {
        setErrors(prev => ({
          ...prev,
          attachment: ""
        }));
      }
    }
  };

  const removeAttachment = () => {
    setFormData(prev => ({
      ...prev,
      attachment: null
    }));
    setErrors(prev => ({
      ...prev,
      attachment: ""
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      
      // Reset form on success
      setFormData({
        message: "",
        attachment: null
      });
    } catch (error) {
      console.error("Error submitting message:", error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error sending your message. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Send Additional Message</h2>
            <p className="text-sm text-gray-600 mt-1">Ticket #{ticket.id}: {ticket.subject}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaWindowClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your additional message or follow-up question..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            {/* File Attachment */}
            <div>
              <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-2">
                Attachment (Optional)
              </label>
              
              {!formData.attachment ? (
                <div className="relative">
                  <input
                    type="file"
                    id="attachment"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt"
                  />
                  <label
                    htmlFor="attachment"
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <FaUpload className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </span>
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Images, PDFs, Word docs, and text files up to 10MB
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <FaPaperclip className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-700">{formData.attachment.name}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({(formData.attachment.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              
              {errors.attachment && (
                <p className="mt-1 text-sm text-red-600">{errors.attachment}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserReplyModal;

