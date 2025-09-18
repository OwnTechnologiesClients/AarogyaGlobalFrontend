import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const ContactForm = ({ title = "Get In Touch", onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [honeypot, setHoneypot] = useState("");
    const [startTime] = useState(Date.now());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const elapsedMs = Date.now() - startTime;
        if (honeypot || elapsedMs < 1500) {
            return;
        }
        if (onSubmit) {
            onSubmit(formData);
        }
        // Redirect to thank-you page for conversion tracking
        if (typeof window !== 'undefined') {
            window.location.href = '/thank-you?source=contact-form';
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
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                />
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