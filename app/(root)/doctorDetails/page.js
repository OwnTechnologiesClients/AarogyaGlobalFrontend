import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";
import DoctorProfile from "@/components/DoctorDetails/DoctorProfile";

const doctorDetails = () => {
  const { title, routes } = getPageHeaderData('/doctorDetails');

  return (
    <>
      <PageHeader title={title} routes={routes} />
      <DoctorProfile />
    </>
  );
};

export default doctorDetails;
