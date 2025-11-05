// Centralized EmailJS service utility for sending emails from various forms
// Reads configuration from environment variables and exposes typed helpers.

import emailjs from "@emailjs/browser";

let isInitialized = false;

function initializeEmailJsIfNeeded() {
	if (isInitialized) return;
	// Hardcoded public key - replace with your actual EmailJS public key
	const publicKey = "VtFVusSfyGOlKPSmq";
	if (!publicKey || publicKey === "YOUR_EMAILJS_PUBLIC_KEY_HERE") {
		throw new Error("EmailJS public key not configured. Please update lib/emailService.js with your public key.");
	}
	emailjs.init({ publicKey });
	isInitialized = true;
}

function getCommonParams(formSource) {
	return {
		form_source: formSource,
	};
}

// Validation utility function
export function validateFormData(formData, requiredFields = []) {
	const errors = {};
	
	// Check required fields
	requiredFields.forEach(field => {
		if (!formData[field] || formData[field].toString().trim() === '') {
			errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
		}
	});
	
	// Email validation
	if (formData.email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}
	}
	
	// Phone validation (if phone is provided)
	if (formData.phone && formData.phone.trim() !== '') {
		const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
		if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
			errors.phone = 'Please enter a valid phone number';
		}
	}
	
	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
}

async function safeSend(serviceId, templateId, templateParams) {
	initializeEmailJsIfNeeded();
	if (!serviceId || !templateId) {
		throw new Error("EmailJS service ID or template ID not provided.");
	}
	return emailjs.send(serviceId, templateId, templateParams);
}

export async function sendContactEmail(
	{ name, email, phone = "", countryCode = "", message },
	formSource = "Contact Form"
) {
	const serviceId = "service_eakl6iv";
	const templateId = "template_8noh8lq"; // universal template
	const params = {
		name: name || "",
		email: email || "",
		phone: phone || "",
		countryCode: countryCode || "",
		specialty: "",
		hospital: "",
		message: message || "",
		...getCommonParams(formSource),
	};
	return safeSend(serviceId, templateId, params);
}

export async function sendConsultationEmail(
	{ name, email, phone = "", countryCode = "", specialty = "", hospital = "", message = "" },
	formSource = "Consultation Form"
) {
	const serviceId = "service_eakl6iv";
	const templateId = "template_8noh8lq"; // universal template
	const params = {
		name: name || "",
		email: email || "",
		phone: phone || "",
		countryCode: countryCode || "",
		specialty: specialty || "",
		hospital: hospital || "",
		message: message || "",
		...getCommonParams(formSource),
	};
	return safeSend(serviceId, templateId, params);
}

export async function sendPartnerEmail(
	{
		organizationName,
		contactPerson,
		email,
		phone = "",
		countryCode = "",
		organizationType = "",
		services = [],
		location = "",
		message = ""
	},
	formSource = "Partnership Inquiry"
) {
	const serviceId = "service_eakl6iv";
	const templateId = "template_qph8fd9"; // partner template
	const params = {
		organization_name: organizationName || "",
		contact_person: contactPerson || "",
		email: email || "",
		phone: phone || "",
		countryCode: countryCode || "",
		organization_type: organizationType || "",
		services: Array.isArray(services) ? services.join(", ") : services || "",
		location: location || "",
		message: message || "",
		...getCommonParams(formSource),
	};
	return safeSend(serviceId, templateId, params);
}


