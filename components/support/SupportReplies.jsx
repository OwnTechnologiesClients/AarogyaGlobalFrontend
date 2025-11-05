"use client";
import React, { useState } from "react";
import { FaClock, FaCheckCircle, FaExclamationCircle, FaPaperclip, FaUser, FaReply, FaTimes, FaDownload, FaPlus } from "react-icons/fa";
import NoDataPlaceholder from "./NoDataPlaceholder";
import Swal from 'sweetalert2';
import supportApi from "@/lib/supportApi";
import UserReplyModal from "./UserReplyModal";

const SupportReplies = ({ tickets, activeTicket, onTicketSelect, user, onTicketUpdate }) => {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedTicketForReply, setSelectedTicketForReply] = useState(null);
  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'urgent':
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadAttachment = async (attachment) => {
    if (!attachment || !attachment.path) {
      Swal.fire({
        title: 'Download Error',
        text: 'Attachment not available for download',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      // Extract filename from the normalized path (e.g., /uploads/support/filename.pdf -> filename.pdf)
      const filename = attachment.path.split('/').pop();
      
      // Construct the download URL using the dedicated download endpoint
      const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/support/download/${filename}`;
      
      // Fetch the file
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      // Get the blob data
      const blob = await response.blob();
      
      // Create a blob URL and trigger download
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = attachment.name || 'attachment';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
    } catch (error) {
      console.error('Download error:', error);
      Swal.fire({
        title: 'Download Failed',
        text: `Failed to download attachment: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const selectedTicket = tickets.find(ticket => ticket.id === activeTicket);

  const handleOpenReplyModal = (ticket) => {
    if (!user?.id) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to send a message.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    setSelectedTicketForReply(ticket);
    setIsReplyModalOpen(true);
  };

  const handleCloseReplyModal = () => {
    setIsReplyModalOpen(false);
    setSelectedTicketForReply(null);
  };

  const handleSubmitReply = async (formData) => {
    if (!selectedTicketForReply || !user?.id) return;

    try {
      const response = await supportApi.sendMessage({
        ticketId: selectedTicketForReply.id,
        message: formData.message,
        userId: user.id,
        attachment: formData.attachment
      });

      if (response.success) {
        if (onTicketUpdate) {
          await onTicketUpdate();
        }
        setIsReplyModalOpen(false);
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send message. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Ticket List */}
      <div className="flex-1 flex flex-col">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Your Support Requests</h4>
        {tickets.length === 0 ? (
          <NoDataPlaceholder type="tickets" />
        ) : (
          <div className="flex-1 overflow-y-auto max-h-96">
            <div className="space-y-2">
              {tickets.map((ticket) => (
              <div key={ticket.id}>
                {/* Ticket Item */}
                <div
                  onClick={() => onTicketSelect(ticket.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    activeTicket === ticket.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(ticket.status)}
                        <h5 className="text-sm font-medium text-gray-900 truncate">
                          {ticket.subject}
                        </h5>
                        <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                          Ticket ID: {ticket.id}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {formatDate(ticket.createdAt)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      {ticket.messages && ticket.messages.length > 0 && (
                        <span className="text-xs text-blue-600">
                          {ticket.messages.length} Message{ticket.messages.length > 1 ? 's' : ''}
                        </span>
                      )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline Detailed View */}
                {activeTicket === ticket.id && (
                  <div className="mt-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                    {/* Conversation Header */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <FaUser className="text-white text-sm" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
                            <p className="text-xs text-gray-500">Ticket #{ticket.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {getStatusIcon(ticket.status)}
                            <span className="ml-1">{ticket.status}</span>
                          </span>
                          <button
                            onClick={() => onTicketSelect(null)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                            title="Close ticket view"
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Conversation Flow */}
                    <div className="p-4 space-y-4">
                      {/* Original Message */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaUser className="text-white text-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-900">{ticket.user.name}</span>
                            <span className="text-xs text-gray-500">{formatDate(ticket.createdAt)}</span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                              {ticket.message}
                            </div>
                            {ticket.attachment && (
                              <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                                <FaPaperclip className="w-3 h-3" />
                                <span className="break-all">{ticket.attachment.name || 'Attachment'}</span>
                                <button 
                                  onClick={() => handleDownloadAttachment(ticket.attachment)}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Download attachment"
                                >
                                  <FaDownload className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* All Messages */}
                      {ticket.messages && ticket.messages.length > 0 ? (
                        ticket.messages.map((msg, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.senderType === 'admin' ? 'bg-blue-500' : 'bg-green-500'}`}>
                              <FaUser className="text-white text-sm" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-900">{msg.senderName || (msg.senderType === 'admin' ? 'Support Team' : 'You')}</span>
                                <span className="text-xs text-gray-500">{formatDate(msg.createdAt)}</span>
                              </div>
                              <div className={`rounded-lg p-3 ${msg.senderType === 'admin' ? 'bg-blue-50' : 'bg-green-50'}`}>
                                <div className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                                  {msg.message}
                                </div>
                                {msg.attachment && (
                                  <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                                    <FaPaperclip className="w-3 h-3" />
                                    <span className="break-all">{msg.attachment.name || 'Attachment'}</span>
                                    <button 
                                      onClick={() => handleDownloadAttachment(msg.attachment)}
                                      className="text-blue-600 hover:text-blue-800"
                                      title="Download attachment"
                                    >
                                      <FaDownload className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center py-6">
                          <div className="text-center text-gray-500">
                            <FaReply className="mx-auto text-2xl mb-2 text-gray-300" />
                            <p className="text-sm font-medium">Waiting for response</p>
                            <p className="text-xs">Our support team will respond within 24 hours</p>
                          </div>
                        </div>
                      )}

                      {/* Reply Button */}
                      {selectedTicket && (
                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenReplyModal(selectedTicket);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            <FaPlus className="w-3 h-3" />
                            Send Message
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {isReplyModalOpen && selectedTicketForReply && (
        <UserReplyModal
          ticket={selectedTicketForReply}
          onSubmit={handleSubmitReply}
          onClose={handleCloseReplyModal}
        />
      )}
    </div>
  );
};

export default SupportReplies;
