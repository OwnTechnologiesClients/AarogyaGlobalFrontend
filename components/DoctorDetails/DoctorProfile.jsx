// components/DoctorProfile.tsx

"use client";
import Image from "next/image";
import { CheckCircle, Star, MapPin, Clock, Phone, Mail } from "lucide-react";
import SpecialtyCard from "./SpecialtyCard";

const DoctorProfile = ({ doctor }) => {
  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Doctor not found</div>
      </div>
    );
  }

  // Helper function to handle education data (can be string or array)
  const getEducationData = (education) => {
    if (!education) return [];
    if (Array.isArray(education)) return education;
    // If it's a string, convert to array format
    return [{ degree: "Medical Degree", institution: education, year: "N/A" }];
  };

  // Helper function to handle work experience data (can be array or undefined)
  const getWorkExperienceData = (workExperience) => {
    if (!workExperience) return [];
    if (Array.isArray(workExperience)) return workExperience;
    return [];
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full px-4 lg:px-20 py-12 font-poppins">
      {/* Left Section */}
      <div className="lg:w-1/3 w-full flex flex-col items-center gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
          <div className="w-full h-72 relative">
            <Image
              src={doctor.image}
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
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{doctor.contact?.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{doctor.contact?.email}</span>
              </div>
            </div>
          </div>
        </div>

        <SpecialtyCard doctor={doctor} />
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 w-full flex flex-col gap-10">
        {/* Introduction */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Introduction
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {doctor.about}
          </p>
        </section>

        {/* Specialization */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Specializations
          </h3>
          <p className="text-gray-700 mb-4">
            Dr. {doctor.name.split(' ').pop()} specializes in the following areas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#000D44]">
            {doctor.specializations?.map((specialization, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                <p className="font-semibold">{specialization}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Educational Info */}
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
                  <span className="text-sm">({edu.degree} - {edu.year})</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Professional Experience
          </h3>
          <p className="text-gray-700 mb-4">
            Dr. {doctor.name.split(' ').pop()} has extensive experience in various healthcare institutions:
          </p>
          <div className="flex flex-col gap-3 text-[#000D44]">
            {getWorkExperienceData(doctor.workExperience).map((exp, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                <p>
                  <span className="font-semibold">{exp.position}</span>{" "}
                  <span className="text-sm">at {exp.hospital} ({exp.duration})</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Treatments */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Treatments & Procedures
          </h3>
          <p className="text-gray-700 mb-4">
            Dr. {doctor.name.split(' ').pop()} offers the following treatments and procedures:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#000D44]">
            {doctor.treatments?.map((treatment, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                <p className="font-semibold">{treatment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Awards & Recognition
          </h3>
          <p className="text-gray-700 mb-4">
            Dr. {doctor.name.split(' ').pop()} has been recognized for excellence in medical practice:
          </p>
          <div className="flex flex-col gap-3 text-gray-800">
            {doctor.awards?.map((award, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                <p>{award}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Languages Spoken
          </h3>
          <div className="flex flex-wrap gap-2">
            {doctor.languages?.map((language, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {language}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DoctorProfile;
