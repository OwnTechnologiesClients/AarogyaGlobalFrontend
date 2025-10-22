import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { sendContactEmail, validateFormData } from '../../lib/emailService';
import { submitEnquiryWithBoth, validateEnquiryData } from '../../lib/enquiryService';

const ContactForm = ({ title = "Get In Touch", onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [honeypot, setHoneypot] = useState("");
    const [startTime] = useState(Date.now());
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const elapsedMs = Date.now() - startTime;
        if (honeypot || elapsedMs < 1500) {
            return;
        }

        // Validate form data
        const validation = validateEnquiryData(formData, ['name', 'email', 'message']);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);
        
        try {
            // Use hybrid approach: send email via EmailJS AND save to backend
            const result = await submitEnquiryWithBoth(
                sendContactEmail,
                {
                    name: formData.name,
                    email: formData.email,
                    phone: '',
                    message: formData.message,
                },
                formData,
                'Contact Form',
                'Contact Us'
            );

            if (onSubmit) {
                onSubmit(formData);
            }

            // Redirect on success
            if (result.success) {
                window.location.href = '/thank-you';
            }
        } catch (err) {
            console.error('Failed to submit contact form', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden) */}
                <div className="hidden" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input
                        id="company"
                        type="text"
                        name="company"
                        autoComplete="off"
                        tabIndex={-1}
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <textarea
                        name="message"
                        placeholder="Message *"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                            errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <ChevronRight className="w-4 h-4" />}
                </button>
            </form>
        </div>
    );
};

export default ContactForm; 