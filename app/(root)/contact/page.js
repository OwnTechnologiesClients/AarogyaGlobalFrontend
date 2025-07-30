import ContactCard from "@/components/contact/ContactCard";
import GetInTouch from "@/components/contact/GetInTouch";
import PageHeader from "@/components/layout/PageHeader";
import PageHeadrsData from "@/data/pageHeadersData.json";

const Contact = () => {
  const { title, routes } = PageHeadrsData.contactUs;

  return (
    <>
      <PageHeader title={title} routes={routes} />
      <ContactCard />
      <GetInTouch />
    </>
  );
};

export default Contact;
