import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import FeatureCards from "@/components/home/FeatureCards";
import AboutSection from "@/components/home/AboutSection/AboutSection";
import OnlineConsultationBanner from "@/components/layout/OnlineConsultationBanner";
import TrustedBy from "@/components/home/TrustedBy";
import WorkingProcess from "@/components/home/WorkingProcess";
import Testimonials from "@/components/home/Testimonials";
import Stats from "@/components/home/Stats";
import AarogyaTeam from "@/components/home/AarogyaTeam";
import BeyondBookingsPayments from "@/components/home/BeyondBookingsPayments";
import VideoModal from "@/components/home/AboutSection/DoctorVideoSection";
const About = () => {
  const { title, routes } = getPageHeaderData('/about');

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <PageHeader title={title} routes={routes} />
        <FeatureCards />
        <AboutSection />
        <Stats />
        <div className="pt-10">
          <AarogyaTeam />
        </div>
        <OnlineConsultationBanner />
        <BeyondBookingsPayments />
        <Testimonials />
        <WorkingProcess />
        <VideoModal
          videoId="prb1NXQhUMI"
          thumbnailUrl="https://img.youtube.com/vi/prb1NXQhUMI/hqdefault.jpg"
          // title="Rick Astley"
          containerClass="w-full h-[70vh] rounded-2xl relative cursor-pointer overflow-hidden"
          imageClass="rounded-2xl object-cover"
          nameBadgeClass="absolute top-2 left-2 bg-blue-600 px-3 py-1 rounded"
          nameTextClass="text-white text-sm font-medium"
          playButtonWrapperClass="absolute inset-0 flex items-center justify-center"
          playButtonClass="bg-white md:p-8 p-4  rounded-full"
          playIconClass="md:w-12 w-6 h-6 md:h-12 text-[#04CE78]"
          modalOverlayClass="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          modalContentClass="w-[90vw] max-w-[800px] aspect-video relative"
          iframeClass="w-full h-full rounded-lg"
          closeButtonClass="absolute -top-8 right-0 text-white text-3xl hover:text-red-400"
        />
        <TrustedBy />
      </div>
    </>
  );
};

export default About;
