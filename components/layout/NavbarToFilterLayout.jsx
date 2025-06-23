import React from "react";
import Navbar from "@/components/navbar/Navbar";
import HeroInfo from "@/components/hero/HeroInfo";
import FilterBar from "@/components/hero/FilterBar";

const NavbarToFilterLayout = () => {
  return (
    <>
      <div
        className="w-full bg-cover bg-no-repeat bg-center rounded-t-2xl min-h-[500px] md:min-h-[600px] relative"
        style={{ backgroundImage: "url(/backgroundImg.png)" }}
      >
        {/* Content */}
        <div className="relative z-30">
          <Navbar />
          <HeroInfo />
        </div>
      </div>
      {/* FilterBar positioned between sections */}
      <div className="relative -mt-20 md:-mt-16 -mb-12 md:-mb-8 z-10">
        <FilterBar />
      </div>
    </>
  );
};

export default NavbarToFilterLayout;
