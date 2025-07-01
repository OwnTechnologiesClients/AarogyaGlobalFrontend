import React from "react";
import HeroBannerVideo from "./HeroBannerVideo";
import FeatureCards from "../home/FeatureCards";
import TrustedBy from "../home/TrustedBy";
import Stats from "../home/Stats";
import StatsDirectory from "../home/StatsDirectory";
import TopSpecialties from "../home/TopSpecialties";
import MedicalNetwork from "../home/MedicalNetwork";
import FeaturedHospitals from "../home/FeaturedHospitals";
import FAQSection from "../home/FAQSection";
import TopDoctors from "../home/TopDoctors";
import Testimonials from "../home/Testimonials";
import Articles from "../home/Articles";
import AppointmentRequest from "../home/AppointmentRequest";
import AboutSection from "../home/AboutSection";

const HeroSection = () => {
  return (
      <div className="flex flex-col items-center w-full">
        <HeroBannerVideo />
        <FeatureCards />
        <TrustedBy />
        <AboutSection/>
        <Stats />
        <TopSpecialties />
        <StatsDirectory />
        <MedicalNetwork />
        <FeaturedHospitals />
        <FAQSection />
        <TopDoctors />
        <Testimonials />
        <Articles />
        <AppointmentRequest />
      </div>
  
  );
};

export default HeroSection;
