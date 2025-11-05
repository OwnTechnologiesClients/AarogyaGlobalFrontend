// components/DoctorProfile.tsx

"use client";
import Image from "next/image";
import { CheckCircle, Star, MapPin, Clock, Phone, Mail } from "lucide-react";
import SpecialtyCard from "./SpecialtyCard";
import apiService from '../../lib/apiService';

const DoctorProfile = ({ doctor }) => {
  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Doctor not found</div>
      </div>
    );
  }

  // Helper function to generate introduction if not provided
  const getIntroduction = (doctor) => {
    if (doctor.about) return doctor.about;
    return "";
  };

  // Helper function to generate specializations if not provided
  const getSpecializations = (doctor) => {
    if (doctor.specializations && doctor.specializations.length > 0) return doctor.specializations;
    if (doctor.expertise && doctor.expertise.length > 0) return doctor.expertise;
    return [];
  };

  // Helper function to handle education data (can be string or array)
  const getEducationData = (education) => {
    if (!education) {
      return [];
    }

    // If it's already an array, validate each item has required properties
    if (Array.isArray(education)) {
      return education.map(edu => {
        // Ensure each education item has the required properties
        if (typeof edu === 'object' && edu !== null) {
          return {
            degree: edu.degree || "Medical Degree",
            institution: edu.institution || "Medical Institution",
            year: edu.year || "Graduate"
          };
        }
        // If it's not an object, convert to proper format
        return {
          degree: "Medical Degree",
          institution: String(edu) || "Medical Institution",
          year: "Graduate"
        };
      });
    }

    // If it's a string, convert to array format
    if (typeof education === 'string') {
      return [{ degree: "Medical Degree", institution: education, year: "Graduate" }];
    }

    // Fallback for any other type
    return [];
  };

  // Helper function to handle professional experience data
  const getProfessionalExperienceData = (professionalExperience) => {
    if (!professionalExperience) {
      return [];
    }

    // If it's already an array, validate each item has required properties
    if (Array.isArray(professionalExperience)) {
      return professionalExperience.map(exp => {
        // Ensure each professional experience item has the required properties
        if (typeof exp === 'object' && exp !== null) {
          return {
            position: exp.position || "Medical Position",
            institution: exp.institution || "Medical Institution",
            duration: exp.duration || "Experience"
          };
        }
        // If it's not an object, convert to proper format
        return {
          position: "Medical Position",
          institution: String(exp) || "Medical Institution",
          duration: "Experience"
        };
      });
    }

    return [];
  };


  // Helper function to generate awards
  const getAwards = (doctor) => {
    if (doctor.awards && doctor.awards.length > 0) return doctor.awards;
    return [];
  };

  // Helper function to generate languages
  const getLanguages = (doctor) => {
    if (doctor.languages && doctor.languages.length > 0) return doctor.languages;
    return [];
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full px-4 lg:px-20 py-12 font-poppins">
      {/* Left Section */}
      <div className="lg:w-1/3 w-full flex flex-col items-center gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
          <div className="w-full h-72 relative">
            <Image
              src={apiService.getImageUrl(doctor.image) || '/doctor.jpg'}
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold text-[#000D44]">
              {doctor.name}
            </h2>
            <p className="text-base text-gray-600 mt-1">{doctor.specialty}</p>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{doctor.rating}</span>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-1 mt-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{doctor.location}</span>
            </div>

            {/* Experience */}
            <div className="flex items-center justify-center gap-1 mt-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{doctor.experience} experience</span>
            </div>

            {/* Contact Info */}
            {/* <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{doctor.contact?.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{doctor.contact?.email}</span>
              </div>
            </div> */}
          </div>
        </div>

        <SpecialtyCard doctor={doctor} />
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 w-full flex flex-col gap-10">
        {/* Introduction */}
        {getIntroduction(doctor) && (
          <section>
            <h3 className="text-3xl font-bold text-[#000D44] mb-4">
              Introduction
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {getIntroduction(doctor)}
            </p>
          </section>
        )}

        {/* Specialization */}
        {getSpecializations(doctor).length > 0 && (
          <section>
            <h3 className="text-3xl font-bold text-[#000D44] mb-4">
              Specializations
            </h3>
            <p className="text-gray-700 mb-4">
              Dr. {doctor.name.split(' ').pop()} specializes in the following areas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#000D44]">
              {getSpecializations(doctor).map((specialization, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                  <p className="font-semibold">{typeof specialization === 'string' ? specialization : String(specialization)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educational Info */}
        {getEducationData(doctor.education).length > 0 && (
          <section>
            <h3 className="text-3xl font-bold text-[#000D44] mb-4">
              Educational Background
            </h3>
            <p className="text-gray-700 mb-4">
              Dr. {doctor.name.split(' ').pop()} has received comprehensive medical education and training:
            </p>
            <div className="flex flex-col gap-3 text-[#000D44]">
              {getEducationData(doctor.education).map((edu, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                  <p>
                    <span className="font-semibold">{edu.institution}</span>{" "}
                    <span className="font-semibold">{edu.degree}</span>{" "}
                    <span className="text-sm">({edu.year})</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {getProfessionalExperienceData(doctor.professionalExperience).length > 0 && (
          <section>
            <h3 className="text-3xl font-bold text-[#000D44] mb-4">
              Professional Experience
            </h3>
            <p className="text-gray-700 mb-4">
              Dr. {doctor.name.split(' ').pop()} has extensive experience in various healthcare institutions:
            </p>
            <div className="flex flex-col gap-3 text-[#000D44]">
              {getProfessionalExperienceData(doctor.professionalExperience).map((exp, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                  <p>
                    <span className="font-semibold">{exp.position}</span>{" "}
                    <span className="text-sm">at {exp.institution} ({exp.duration})</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* Awards */}
        {getAwards(doctor).length > 0 && (
          <section>
            <h3 className="text-3xl font-bold text-[#000D44] mb-4">
              Awards & Recognition
            </h3>
            <p className="text-gray-700 mb-4">
              Dr. {doctor.name.split(' ').pop()} has been recognized for excellence in medical practice:
            </p>
            <div className="flex flex-col gap-3 text-gray-800">
              {getAwards(doctor).map((award, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                  <p>{typeof award === 'string' ? award : String(award)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Research Work */}
        {doctor.researchWork && (
          <section>
            <h3 className="text-3xl font-bold text-[#000D44] mb-4">
              Research Work
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {doctor.researchWork}
            </p>
          </section>
        )}

        {/* Publications */}
        {doctor.publications && doctor.publications.length > 0 && (
          <section>
            <h3 className="text-3xl font-bold text-[#000D44] mb-4">
              Publications
            </h3>
            <p className="text-gray-700 mb-4">
              Dr. {doctor.name.split(' ').pop()} has contributed to medical literature through:
            </p>
            <div className="flex flex-col gap-3 text-gray-800">
              {doctor.publications.map((publication, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                  <p>{typeof publication === 'string' ? publication : String(publication)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {getLanguages(doctor).length > 0 && (
          <section>
            <h3 className="text-3xl font-bold text-[#000D44] mb-4">
              Languages Spoken
            </h3>
            <div className="flex flex-wrap gap-2">
              {getLanguages(doctor).map((language, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {typeof language === 'string' ? language : String(language)}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
