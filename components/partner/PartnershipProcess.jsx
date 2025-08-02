"use client";
import React from "react";
import { FileText, Handshake, Settings, Rocket, CheckCircle } from "lucide-react";

const PartnershipProcess = () => {
  const steps = [
    {
      number: "01",
      icon: <FileText className="w-6 h-6" />,
      title: "Application Submission",
      description: "Fill out our partnership application form with your organization details and requirements.",
      details: [
        "Basic organization information",
        "Healthcare services offered",
        "Geographic coverage area",
        "Partnership objectives"
      ]
    },
    {
      number: "02",
      icon: <Handshake className="w-6 h-6" />,
      title: "Initial Consultation",
      description: "Schedule a meeting with our partnership team to discuss opportunities and requirements.",
      details: [
        "Virtual or in-person meeting",
        "Requirements assessment",
        "Partnership model discussion",
        "Timeline planning"
      ]
    },
    {
      number: "03",
      icon: <Settings className="w-6 h-6" />,
      title: "Technical Integration",
      description: "Our team will help you integrate with our platform and set up necessary systems.",
      details: [
        "Platform onboarding",
        "System integration",
        "Staff training",
        "Quality standards setup"
      ]
    },
    {
      number: "04",
      icon: <Rocket className="w-6 h-6" />,
      title: "Launch & Go Live",
      description: "Start your partnership journey with full support from our team and access to our network.",
      details: [
        "Platform activation",
        "Patient referrals begin",
        "Ongoing support",
        "Performance monitoring"
      ]
    }
  ];

  return (
    <div className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            How to Become a Partner
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our partnership process is simple and straightforward. Follow these steps 
            to join our healthcare network and start growing your practice.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#04CE78] to-[#03B868] transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#04CE78] to-[#03B868] text-white text-lg font-bold px-4 py-2 rounded-full">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="bg-[#04CE78] rounded-full p-4 inline-flex mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#04CE78] mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#04CE78] to-[#03B868] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Partnership Journey?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              The entire process typically takes 2-4 weeks from application to going live. 
              Our team will guide you through every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#04CE78] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Apply Now
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-[#04CE78] transition-colors duration-300">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipProcess; 