import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import PartnerHero from "@/components/partner/PartnerHero";
import PartnershipBenefits from "@/components/partner/PartnershipBenefits";
import PartnershipTypes from "@/components/partner/PartnershipTypes";
import PartnershipProcess from "@/components/partner/PartnershipProcess";
import PartnerForm from "@/components/partner/PartnerForm";
import OnlineConsultationBanner from "@/components/layout/OnlineConsultationBanner";
import TrustedBy from "@/components/home/TrustedBy";

const PartnerWithUs = () => {
  const { title, routes } = getPageHeaderData('/partner/partnerWithUs');

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <PageHeader title={title} routes={routes} />
        <PartnerHero />
        <PartnershipBenefits />
        <PartnershipTypes />
        <PartnershipProcess />
        <PartnerForm />
        <OnlineConsultationBanner />
        <TrustedBy />
      </div>
    </>
  );
};

export default PartnerWithUs; 