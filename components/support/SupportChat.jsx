"use client";
import React, { useState, useEffect } from "react";
import SupportForm from "./SupportForm";
import SupportReplies from "./SupportReplies";
import supportApi from "@/lib/supportApi";
import { useAuth } from "@/context/AuthContext";
import Swal from 'sweetalert2';

const SupportChat = () => {
  const [activeTicket, setActiveTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();


  // Fetch user's support tickets on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await supportApi.getUserTickets(user.id);
        if (response.success) {
          setTickets(response.data || []);
        } else {
          setError('Failed to load support tickets');
        }
      } catch (err) {
        console.error('Error fetching support tickets:', err);
        setError('Failed to load support tickets');
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user?.id]);

  const handleSubmitQuery = async (formData) => {
    if (!user?.id) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to submit a support request.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await supportApi.createTicket({
        subject: formData.subject,
        message: formData.message,
        userId: user.id,
        attachment: formData.attachment
      });

      if (response.success) {
        // Refresh tickets list
        const updatedResponse = await supportApi.getUserTickets(user.id);
        if (updatedResponse.success) {
          setTickets(updatedResponse.data || []);
          setActiveTicket(response.data.id);
        }
        
        // Show success message with ticket ID
        Swal.fire({
          title: 'Success!',
          html: `Your support request has been submitted successfully!<br><br><strong>Ticket ID: ${response.data.id}</strong><br><br>Our support team will get back to you within <strong>24 hours</strong>.<br><br>Please save this ticket ID for future reference.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to submit support request. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      console.error('Error submitting support request:', err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit support request. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            <p className="text-lg text-gray-600">
              Submit your query and our support team will get back to you within 
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 ml-1">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                24 hours
              </span>
            </p>
            <p className="text-base text-gray-500">
              You can also 
              <span className="font-semibold text-blue-600"> track your previous support requests </span> 
              below for easy reference.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Query Form */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6 h-fit border-l-4 border-blue-500">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Submit a Support Request
              </h3>
            </div>
            <SupportForm onSubmit={handleSubmitQuery} />
          </div>

          {/* Right Side - Replies Display */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 flex flex-col h-full border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Support Replies
                </h3>
              </div>
              {tickets.length > 0 && (
                <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {tickets.length} Request{tickets.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <div className="text-gray-600 font-medium">Loading your support tickets...</div>
                <div className="text-sm text-gray-500 mt-1">Please wait while we fetch your requests</div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-red-600 font-medium">{error}</div>
                <div className="text-sm text-gray-500 mt-1">Please try refreshing the page</div>
              </div>
            ) : !user?.id ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-gray-600 font-medium">Please log in to view your support tickets</div>
                <div className="text-sm text-gray-500 mt-1">Your previous requests will appear here</div>
              </div>
            ) : tickets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="text-gray-600 font-medium">No support requests yet</div>
                <div className="text-sm text-gray-500 mt-1">Submit your first request using the form on the left</div>
              </div>
            ) : (
              <SupportReplies 
                tickets={tickets}
                activeTicket={activeTicket}
                onTicketSelect={setActiveTicket}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
