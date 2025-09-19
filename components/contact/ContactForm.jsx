import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { sendContactEmail, validateFormData } from '../../lib/emailService';

const ContactForm = ({ title = "Get In Touch", onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [honeypot, setHoneypot] = useState("");
    const [startTime] = useState(Date.now());
    const [errors, setErrors] = useState({});

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
        const validation = validateFormData(formData, ['name', 'email', 'message']);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setErrors({});
        
        try {
            // Send via EmailJS
            await sendContactEmail(
                {
                    name: formData.name,
                    email: formData.email,
                    phone: '',
                    message: formData.message,
                },
                'Contact Form'
            );
            if (onSubmit) {
                onSubmit(formData);
            }
            if (typeof window !== 'undefined') {
                window.location.href = '/thank-you';
            }
        } catch (err) {
            // Optionally show a toast; for now, alert
            console.error('Failed to send contact email', err);
            if (typeof window !== 'undefined') {
                alert('There was an issue sending your message. Please try again later.');
            }
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
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                    Send Message
                    <ChevronRight className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
};

export default ContactForm; 