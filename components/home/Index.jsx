import React from "react";
import HeroBannerVideo from "./hero/HeroBannerVideo";
import FeatureCards from "./FeatureCards";
import TrustedBy from "./TrustedBy";
import Stats from "./Stats";
import TopSpecialties from "./TopSpecialties";
import FeaturedHospitals from "./FeaturedHospitals";
import FAQSection from "./FAQSection";
import Testimonials from "./Testimonials";
import AppointmentRequest from "./AppointmentRequest";
import AboutSection from "./AboutSection/AboutSection";
import WorkingProcess from "./WorkingProcess";
import BeyondBookingsPayments from "./BeyondBookingsPayments";
import AarogyaTeam from "./AarogyaTeam";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroBannerVideo />
       <FeatureCards /> 
       <TrustedBy />
      <AboutSection />
      <Stats />
      <TopSpecialties />
      <BeyondBookingsPayments />
      <WorkingProcess />
      {/* <FeaturedHospitals />
      <FAQSection />
      <AarogyaTeam />
      <Testimonials />  */}
      <AppointmentRequest />
    </div>
  );
};

export default HeroSection;
