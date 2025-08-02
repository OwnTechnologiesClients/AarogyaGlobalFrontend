'use client';

import { usePathname } from "next/navigation";
import TopBar from "@/components/navbar/TopBar";
import BottomFooter from "@/components/footer/BottomFooter";
import Footer from "@/components/footer/Footer";
import Wrapper from "@/components/layout/Wrapper";
import NavbarToFilterLayout from "@/components/layout/NavbarToFilterLayout";
import Header from "@/components/navbar/Header";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <>
      <TopBar />
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <Wrapper padding="none">
          {/* Only show this on homepage */}
          {isHomePage ? <NavbarToFilterLayout /> : <Header />}

          {children}
          <Footer />
        </Wrapper>
      </div>
      <BottomFooter />
    </>
  );
}
