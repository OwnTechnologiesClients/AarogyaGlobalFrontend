"use client";
import React from "react";
import CertificateSwiper from "../common/CertificateSwiper";

const CertificateShowcase = () => {
  // Example of custom certificates
  const customCertificates = [
    {
      name: "WHO Certification",
      logo: "/CertificatesImg/img1.png",
      description: "World Health Organization Approved",
    },
    {
      name: "FDA Approved",
      logo: "/CertificatesImg/img2.png",
      description: "Food and Drug Administration",
    },
    {
      name: "European CE Mark",
      logo: "/CertificatesImg/img3.png",
      description: "European Conformity",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Certificate Swiper Showcase
        </h1>
        <p className="text-lg text-gray-600">
          Demonstrating different variants and configurations of the
          CertificateSwiper component
        </p>
      </div>

      {/* Default Variant */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Default Variant
        </h2>
        <p className="text-gray-600 mb-6">
          Best for detailed pages like Hospital Features. Includes larger cards
          with full descriptions.
        </p>
        <CertificateSwiper
          variant="default"
          title="Hospital Certifications & Accreditations"
          showNavigation={true}
        />
      </section>

      {/* Minimal Variant */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Minimal Variant
        </h2>
        <p className="text-gray-600 mb-6">
          Perfect for overview sections. Clean design with medium-sized cards.
        </p>
        <CertificateSwiper
          variant="minimal"
          title="Quality Certifications"
          showNavigation={true}
        />
      </section>

      {/* Compact Variant */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Compact Variant
        </h2>
        <p className="text-gray-600 mb-6">
          Ideal for sidebars, footers, or space-constrained areas. Smaller cards
          with essential info.
        </p>
        <CertificateSwiper
          variant="compact"
          title="Our Certifications"
          showNavigation={false}
        />
      </section>

      {/* Custom Certificates */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Custom Certificates
        </h2>
        <p className="text-gray-600 mb-6">
          Example with custom certificate data and no navigation arrows.
        </p>
        <CertificateSwiper
          certificates={customCertificates}
          variant="minimal"
          title="International Certifications"
          showNavigation={false}
        />
      </section>

      {/* No Title Example */}
      <section className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Without Title</h2>
        <p className="text-gray-600 mb-6">
          Certificate swiper without title, useful when embedded in other
          sections.
        </p>
        <CertificateSwiper
          variant="minimal"
          showTitle={false}
          showNavigation={true}
          className="bg-white rounded-xl p-6"
        />
      </section>

      {/* Usage Examples */}
      <section className="bg-blue-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Usage Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-3">
              Hospital Overview Page
            </h3>
            <code className="text-sm bg-gray-100 p-3 rounded block">
              {`<CertificateSwiper 
  variant="minimal"
  title="Certificates"
  showNavigation={true}
/>`}
            </code>
          </div>
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-3">
              Hospital Features Page
            </h3>
            <code className="text-sm bg-gray-100 p-3 rounded block">
              {`<CertificateSwiper 
  variant="default"
  title="Certifications"
  showNavigation={true}
/>`}
            </code>
          </div>
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-3">Sidebar Component</h3>
            <code className="text-sm bg-gray-100 p-3 rounded block">
              {`<CertificateSwiper 
  variant="compact"
  showNavigation={false}
/>`}
            </code>
          </div>
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-3">Custom Data</h3>
            <code className="text-sm bg-gray-100 p-3 rounded block">
              {`<CertificateSwiper 
  certificates={customData}
  variant="minimal"
/>`}
            </code>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificateShowcase;
