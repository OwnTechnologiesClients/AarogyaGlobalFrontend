"use client";

import { PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import WelcomeBanner from "../layout/WelcomeBanner";
import CustomButton from "../layout/CustomButton";


const AppointmentRequest = () => {
  return (
    <section className="w-full relative rounded-3xl overflow-hidden shadow-md min-h-[400px] lg:min-h-[600px] flex items-center md:mt-20 mt-8 mb-4 md:mb-8">
      {/* Background Image */}
      <Image
        src="/bookappointment.jpg"
        alt="Doctor with patient"
        fill
        className="object-cover z-0"
        priority
      />
      {/* Content Above Background */}
      <div className="relative z-20 w-full flex flex-col items-start justify-center px-6 md:px-20 py-12">
        <div className="max-w-3xl w-full space-y-6 text-left">
          <WelcomeBanner
            text="VIEW DETAILS"
            textColor="#1F5FFF"
            dotColor="#1F5FFF"
            alignment="left"
            className="text-base"
          />
          <h2 className="text-xl md:text-3xl font-extrabold text-[#1A0142] leading-tight">
            Request Your Appointment
          </h2>
          <p className="text-blue-950 text-sm md:text-base leading-relaxed">
            Our medical center we are committed to delivering exceptional healthcare
            services tailored to meet the needs of every patient and staffed by highly
            skilled
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
            <Link href="/contact">
              <CustomButton text="Make An Appointment" className="cursor-pointer text-sm md:text-base" />
            </Link>
            <Link href="/#working-process">
              <button className="flex items-center gap-3 text-[#1F5FFF] font-semibold hover:underline text-sm md:text-base">
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1F5FFF] text-white flex items-center justify-center">
                  <PlayIcon className="fill-white w-4 h-4 md:w-5 md:h-5" />
                </span>
                How It Works
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentRequest;
