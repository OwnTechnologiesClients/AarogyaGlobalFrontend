import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import PageHeadrsData from "@/data/pageHeadersData.json";
import DoctorProfile from "@/components/DoctorDetails/DoctorProfile";
import RelatedSpecialists from "@/components/DoctorDetails/RelatedSpecialists";
const doctorDetails = () => {
  const { title, routes } = PageHeadrsData.doctorDetails;

  return (
    <>
      <PageHeader title={title} routes={routes} />
      <DoctorProfile />
      <RelatedSpecialists/>
    </>
  );
};

export default doctorDetails;
