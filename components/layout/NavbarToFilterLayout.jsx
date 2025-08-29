import React from "react";
import Navbar from "@/components/navbar/Navbar";
import HeroInfo from "@/components/home/hero/HeroInfo";
import FilterBar from "@/components/home/hero/FilterBar";

const NavbarToFilterLayout = () => {
  return (
    <>
      <div
        className="w-full bg-cover bg-no-repeat bg-center rounded-t-2xl min-h-[40vh] sm:min-h-[50vh] md:min-h-[65vh] lg:min-h-[80vh] xl:min-h-[90vh] 2xl:min-h-[100vh] relative transition-all duration-300 overflow-hidden"
        style={{ backgroundImage: "url(/backgroundImg.png)" }}
      >
        {/* Content */}
        <div className="relative z-30 py-2 md:py-4">
          <Navbar />
          <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-4">
            <HeroInfo />
          </div>
        </div>
      </div>
      {/* FilterBar positioned between sections with improved spacing */}
      <div className="relative -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16 xl:-mt-20 z-40 transition-all duration-300 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <FilterBar />
      </div>
    </>
  );
};

export default NavbarToFilterLayout;
