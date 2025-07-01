"use client";
import React from "react";
import specialties from "@/data/topSpecialties.json";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Bone,
  HeartPulse,
  Stethoscope,
  Syringe,
  Microscope,
  Brain,
  Baby,
} from "lucide-react";

const ICON_MAP = {
  Orthopedics: Bone,
  Cardiology: HeartPulse,
  Oncology: Stethoscope,
  "Blood Test": Syringe,
  Laboratory: Microscope,
  Neurology: Brain,
  Pulmonology: Stethoscope,
  Ophthalmology: Stethoscope,
  Dentistry: Stethoscope,
  Pediatrics: Baby,
  Emergency: Stethoscope,
  Genetics: Stethoscope,
  "General Medicine": Stethoscope,
  Physiotherapy: Stethoscope,
  "Infectious Disease": Stethoscope,
  Vaccination: Syringe,
  "Family Medicine": Stethoscope,
  Pathology: Microscope,
  Rheumatology: Bone,
  Neonatology: Baby,
};

const TopSpecialties = () => (

    <section className="w-full flex flex-col items-start px-4 md:px-8 lg:px-18 py-8">
      <div className="flex items-center gap-2 mb-2 mt-2">
        <span className="h-2 w-2 bg-green-400 rounded-full"></span>
        <span className="text-green-500 font-semibold tracking-wide text-base md:text-lg">CATEGORIES</span>
        <span className="h-2 w-2 bg-green-400 rounded-full"></span>
      </div>
      <h3 className="text-3xl md:text-5xl font-extrabold mb-8 text-[#1A0142] leading-tight">Top Searched Specialities</h3>
      <Card className="w-full bg-[#f7f9fb]  rounded-3xl shadow-none border-0">
        <Carousel
          opts={{ align: "center", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {specialties.map((spec, idx) => {
              const LucideIcon = ICON_MAP[spec.label] || Bone;
              return (
                <CarouselItem
                  key={idx}
                  className="flex justify-center items-center basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <Card
                    className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg border-0 mx-auto p-4 md:p-6 transition-all duration-200 aspect-square w-[200px] h-[240px] md:w-[260px] md:h-[300px] hover:shadow-xl hover:scale-105 gap-2 md:gap-4"
                  >
                    <div
                      className="rounded-full flex items-center justify-center mb-4 mt-4 md:mb-6 md:mt-8 transition-all duration-200 border-4 border-white shadow"
                      style={{ background: spec.color, width: 90, height: 90, ...(typeof window !== 'undefined' && window.innerWidth >= 768 && { width: 130, height: 130 }) }}
                    >
                      <LucideIcon size={56} strokeWidth={2.5} color="#1A0142" className="md:w-[80px] md:h-[80px] w-[56px] h-[56px]" />
                    </div>
                    <span className="font-extrabold text-xl md:text-3xl text-[#1A0142] mb-1 md:mb-2 text-center" style={{letterSpacing: '-0.5px'}}>{spec.label}</span>
                    <span className="text-gray-500 text-base md:text-xl text-center font-medium mb-2 md:mb-4">{spec.count} Listing{spec.count > 1 ? 's' : ''}</span>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </Card>
    </section>

);

export default TopSpecialties;
