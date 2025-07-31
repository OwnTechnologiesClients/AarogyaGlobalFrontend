// components/DoctorProfile.tsx

"use client";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import SpecialtyCard from "./SpecialtyCard";

const DoctorProfile = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full px-4 lg:px-20 py-12 font-poppins">
      {/* Left Section */}
      <div className="lg:w-1/3 w-full flex flex-col items-center gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
          <div className="w-full h-72 relative">
            <Image
              src="/aarogyateam/adarsh.jpg"
              alt="Dr. Demetrius Wright"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold text-[#000D44]">
              Dr. Demetrius Wright
            </h2>
            <p className="text-base text-gray-600 mt-1">Family Medicine</p>
          </div>
        </div>

        <SpecialtyCard />
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 w-full flex flex-col gap-10">
        {/* Introduction */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Introduction
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Dr. Demetrius Wright is a private individual or a professional who
            gained prominence in a specific field after January 2025. I
            recommend checking recent and credible online sources such as
            professional profiles, healthcare directories, the official website
            of the relevant institution or clinic where this person works.
            Social media platforms or professional networking sites may also
            provide up-to-date information.
            <br />
            <br />
            Your health and well-being are our top priorities. We take the time
            to listen to your concerns, answer your questions, and involve you
            in the decision-making process for your healthcare. We believe in
            empowering our patients to make informed choices about their health.
          </p>
        </section>

        {/* Specialization */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Specialization
          </h3>
          <p className="text-gray-700 mb-4">
            Our clinic is equipped with modern facilities and advanced medical
            technology to ensure accurate diagnoses and effective treatments.
            This enables us to provide you with the highest standard of care.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#000D44]">
            {[
              ["Cardiology", "D.N.Sc."],
              ["Dermatology", "M.B.B.S, Ph.D"],
              ["Family Medicine", "D.N.Sc. – M.B.B.S, Ph.D"],
              ["Obstetrics & Gynecology", "Ph.D"],
              ["Oncology", "M.B.B.S, Ph.D"],
              ["Orthopedic Surgery", "M.B.B.S, Ph.D"],
            ].map(([label, degree], index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                <p>
                  <span className="font-semibold">{label}</span>{" "}
                  <span className="text-sm"> {degree}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Educational Info */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Educational Info
          </h3>
          <p className="text-gray-700 mb-4">
            We understand that every patient is unique, and their healthcare
            needs may vary. That’s why we create individualized treatment plans
            tailored to your specific condition, lifestyle, and preferences.
          </p>
          <div className="flex flex-col gap-3  text-[#000D44]">
            <div className="flex items-start gap-2">
              <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
              <p>
                <span className="font-semibold">
                  Medical College Of California
                </span>{" "}
                <span className="text-sm">(Doctor of Medicine 2005)</span>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
              <p>
                <span className="font-semibold">
                  Center Of Medicine Anthology
                </span>{" "}
                <span className="text-sm">(Medicine Doctorate Aid 2010)</span>
              </p>
            </div>
          </div>
        </section>

        {/* Research */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Research, Publications And Awards
          </h3>
          <p className="text-gray-700 mb-4">
            We understand that every patient is unique, and their healthcare
            needs may vary. That’s why we create individualized treatment plans
            tailored to your specific condition, lifestyle, and preferences.
          </p>
          <div className="flex flex-col gap-3 text-gray-800">
            <div className="flex items-start gap-2">
              <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
              <p>
                Medical research helps validate treatments and improve patient
                outcomes
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
              <p>
                Publications spread evidence-based guidelines to the wider
                community
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
              <p>Drives discovery of new drugs, devices, or therapies</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DoctorProfile;
