import React, { useState, useCallback } from "react";
import Navbar from "@/components/navbar/Navbar";
import HeroInfo from "@/components/home/hero/HeroInfo";
import FilterBar from "@/components/home/hero/FilterBar";

const NavbarToFilterLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuChange = useCallback((isOpen) => {
    setIsMobileMenuOpen(isOpen);
  }, []);

  return (
    <>
      <div
        id="hero-section"
        className="w-full bg-cover bg-no-repeat bg-center rounded-t-2xl min-h-[35vh] sm:min-h-[38vh] md:min-h-[50vh] lg:min-h-[60vh] xl:min-h-[70vh] 2xl:min-h-[75vh] relative transition-all duration-300 overflow-hidden"
        style={{ backgroundImage: "url(/backgroundImg.png)" }}
      >
        {/* Content */}
        <div className="relative z-30 py-2 md:py-4">
          <Navbar onMobileMenuChange={handleMobileMenuChange} />
          <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-4">
            <HeroInfo />
          </div>
        </div>
      </div>
      {/* FilterBar positioned between sections with improved spacing */}
      {!isMobileMenuOpen && (
        <div className="relative -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 xl:-mt-10 z-40 transition-all duration-300 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <FilterBar />
        </div>
      )}
    </>
  );
};

export default NavbarToFilterLayout;
