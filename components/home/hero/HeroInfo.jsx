import React from "react";
import data from "@/data/hero.json";
import WelcomeBanner from "../../layout/WelcomeBanner";

const HeroInfo = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-4 pb-8 md:py-8 lg:py-10 xl:py-12 bg-transparent px-0 md:px-1 lg:px-2 xl:px-1 2xl:px-20">
      <div className="2xl:pt-8">
        <WelcomeBanner
          text={data.welcome}
          textColor="#04CE78"
          dotColor="#04CE78"
          alignment="center"
          className="mb-1 md:mb-3 text-xs"
        />
      </div>
      <h1 className="text-base md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-white mb-1 md:mb-3 leading-tight">
        Discover World-Class Healthcare Abroad
      </h1>
      <p className="text-xs md:text-sm lg:text-base 2xl:text-xl font-normal text-white/90 lg:max-w-3xl 2xl:max-w-4xl mx-auto leading-tight mt-0 select-none px-2">
        {data.subtitle}
      </p>
    </section>
  );
};

export default HeroInfo;
