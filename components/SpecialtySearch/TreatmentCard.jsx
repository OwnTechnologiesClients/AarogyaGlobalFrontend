"use client";
import React from 'react';
import {
    ArrowRight,
    Clock,
    Calendar,
    DollarSign
} from 'lucide-react';

const TreatmentCard = ({ treatment }) => {
    // Helper function to convert rupees to dollars (approximate rate: 1 INR = 0.012 USD)
    const convertToDollars = (rupeeString) => {
        if (!rupeeString) return 'Contact for pricing';

        // Convert "lakh" to actual numbers (1 lakh = 100,000)
        let convertedString = rupeeString;

        // Convert ₹2.0–3.5 lakh to $2,400–4,200
        convertedString = convertedString.replace(/₹(\d+\.?\d*)\s*–\s*(\d+\.?\d*)\s*lakh/g, (match, min, max) => {
            const minRupees = parseFloat(min) * 100000;
            const maxRupees = parseFloat(max) * 100000;
            const minDollars = Math.round(minRupees * 0.012);
            const maxDollars = Math.round(maxRupees * 0.012);
            return `$${minDollars.toLocaleString('en-US')}–$${maxDollars.toLocaleString('en-US')}`;
        });

        // Convert ₹4–7 lakh to $4,800–8,400
        convertedString = convertedString.replace(/₹(\d+\.?\d*)\s*–\s*(\d+)\s*lakh/g, (match, min, max) => {
            const minRupees = parseFloat(min) * 100000;
            const minDollars = Math.round(minRupees * 0.012);
            const maxRupees = parseFloat(max) * 100000;
            const maxDollars = Math.round(maxRupees * 0.012);
            return `$${minDollars.toLocaleString('en-US')}–$${maxDollars.toLocaleString('en-US')}`;
        });

        // Convert remaining ₹ amounts
        convertedString = convertedString.replace(/₹(\d+\.?\d*)/g, (match, amount) => {
            const rupeeAmount = parseFloat(amount);
            const dollarAmount = Math.round(rupeeAmount * 0.012);
            return `$${dollarAmount.toLocaleString('en-US')}`;
        });

        return convertedString;
    };

    // Helper function to get simplified cost display
    const getSimplifiedCost = (costString) => {
        if (!costString) return 'Contact for pricing';

        // First, try to extract dollar range (e.g., $1,800–$4,800 or $1,800-$4,800)
        const dollarMatch = costString.match(/\$[\d,]+\s*[–-]\s*\$[\d,]+/);
        if (dollarMatch) {
            return dollarMatch[0].replace(/,/g, ','); // Keep as is
        }

        // Try to extract a single dollar range with tilde (e.g., ~$1,800–$4,800)
        const tildeMatch = costString.match(/~?\$[\d,]+\s*[–-]\s*\$[\d,]+/);
        if (tildeMatch) {
            return tildeMatch[0].replace('~', ''); // Remove tilde
        }

        // Extract just the main cost range from the long text (rupee format)
        const costMatch = costString.match(/₹(\d+\.?\d*)\s*–\s*(\d+\.?\d*)\s*lakh/);
        if (costMatch) {
            const min = costMatch[1];
            const max = costMatch[2];
            const minRupees = parseFloat(min) * 100000;
            const maxRupees = parseFloat(max) * 100000;
            const minDollars = Math.round(minRupees * 0.012);
            const maxDollars = Math.round(maxRupees * 0.012);
            return `$${minDollars.toLocaleString('en-US')}–$${maxDollars.toLocaleString('en-US')}`;
        }

        // Fallback to full conversion if no range found
        return convertToDollars(costString);
    };

    // Helper function to render cost with larger dollar signs
    const renderCostWithLargeDollarSigns = (costString) => {
        if (!costString) return 'Contact for pricing';

        // Split the cost string to separate dollar signs from numbers
        const parts = costString.split(/(\$)/);

        return parts.map((part, index) => {
            if (part === '$') {
                return <span key={index} className="text-lg font-bold text-green-600">$</span>;
            }
            return part;
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#04CE78] text-white text-md font-bold px-3 py-2 rounded-md">
                        Treatment
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">{treatment.name}</h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {treatment.description}
                </p>

                {/* Treatment Details */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-medium mr-2">Duration:</span>
                        <span className="truncate max-w-[200px]" title={treatment.duration}>
                            {treatment.duration.length > 50 ? `${treatment.duration.substring(0, 50)}...` : treatment.duration}
                        </span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-green-500" />
                        <span className="font-medium mr-2">Recovery:</span>
                        <span className="truncate max-w-[200px]" title={treatment.recovery}>
                            {treatment.recovery.length > 50 ? `${treatment.recovery.substring(0, 50)}...` : treatment.recovery}
                        </span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                        <DollarSign className="w-4 h-4 mr-2 text-red-500" />
                        <span className="font-medium mr-2">Cost Range:</span>
                        <span className="text-green-600 font-semibold text-sm">
                            {treatment.costConsiderations ? getSimplifiedCost(treatment.costConsiderations) :
                                treatment.price ? getSimplifiedCost(treatment.price) : 'Contact for pricing'}
                        </span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <a
                        href={`/treatmentDetails/${encodeURIComponent(treatment.id)}`}
                        className="w-full text-center text-indigo-600 flex items-center justify-center space-x-2 hover:text-indigo-800 bg-indigo-100 rounded-lg p-3 transition-colors duration-200 cursor-pointer"
                    >
                        <span className="font-semibold">Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TreatmentCard;
