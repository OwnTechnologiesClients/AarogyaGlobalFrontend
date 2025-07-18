import React from "react";
import HeroBannerVideo from "./hero/HeroBannerVideo";
import FeatureCards from "./FeatureCards";
import TrustedBy from "./TrustedBy";
import Stats from "./Stats";
import StatsDirectory from "./WorkingProcess";
import TopSpecialties from "./TopSpecialties";
import FeaturedHospitals from "./FeaturedHospitals";
import FAQSection from "./FAQSection";
import TopDoctors from "./TopDoctors";
import Testimonials from "./Testimonials";
import Articles from "./Articles";
import AppointmentRequest from "./AppointmentRequest";
import AboutSection from "./AboutSection/AboutSection";
import WorkingProcess from "./WorkingProcess";
import BeyondBookingsPayments from "./BeyondBookingsPayments";

const HeroSection = () => {
  return (
      <div className="flex flex-col items-center w-full">
        <HeroBannerVideo />
        <FeatureCards />
        <TrustedBy />
        <AboutSection/>
        <Stats />
        <TopSpecialties />
        <BeyondBookingsPayments/>
        <WorkingProcess/>
        <FeaturedHospitals />
        <FAQSection />
        {/* <TopDoctors /> */}
        {/* <Articles /> */}
        <Testimonials />
        <AppointmentRequest />
      </div>
  
  );
};

export default HeroSection;
