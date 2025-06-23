import React from "react";
import HeroBannerVideo from "./HeroBannerVideo";
import FeatureCards from "../home/FeatureCards";
import Wrapper from "@/components/Wrapper";
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

const HeroSection = () => {
  return (
    <Wrapper padding="none">
      <div className="flex flex-col items-center w-full">
        <HeroBannerVideo />
        <FeatureCards />
        <TrustedBy />
        <Stats />
        <StatsDirectory />
        <TopSpecialties />
        <MedicalNetwork />
        <FeaturedHospitals />
        <FAQSection />
        <TopDoctors />
        <Testimonials />
        <Articles />
        <AppointmentRequest />
      </div>
    </Wrapper>
  );
};

export default HeroSection;
