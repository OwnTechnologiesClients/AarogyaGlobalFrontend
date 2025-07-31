import ContactCard from "@/components/contact/ContactCard";
import GetInTouch from "@/components/contact/GetInTouch";
import OnlineConsultationBanner from "@/components/layout/OnlineConsultationBanner";
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";

const Contact = () => {
  const { title, routes } = getPageHeaderData('/contact');

  return (
    <>

      <PageHeader title={title} routes={routes} />
      <ContactCard />
      <GetInTouch />
      <OnlineConsultationBanner />
    </>
  );
};

export default Contact;
