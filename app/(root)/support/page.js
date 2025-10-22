import SupportChat from "@/components/support/SupportChat";
import PageHeader from "@/components/layout/PageHeader";
import { getPageHeaderData } from "@/utils/navigationUtils";

const Support = () => {
  const { title, routes } = getPageHeaderData('/support');

  return (
    <>
      <PageHeader title={title} routes={routes} />
      <SupportChat />
    </>
  );
};

export default Support;




