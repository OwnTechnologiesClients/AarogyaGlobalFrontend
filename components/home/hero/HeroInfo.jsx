import React from "react";
import data from "@/data/hero.json";
import WelcomeBanner from "../../layout/WelcomeBanner";

const HeroInfo = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-14 md:py-12 lg:py-16 xl:py-20 bg-transparent px-0 md:px-1 lg:px-2 xl:px-1 2xl:px-20">
      <div className="2xl:pt-16">
        <WelcomeBanner
          text={data.welcome}
          textColor="#04CE78"
          dotColor="#04CE78"
          alignment="center"
          className="mb-4 md:mb-6 text-lg"
        />
      </div>
      <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
        Discover World-Class Healthcare Abroad
      </h1>
      <p className="text-xs md:text-sm lg:text-base 2xl:text-3xl font-normal text-white/90 lg:max-w-4xl 2xl:max-w-6xl  mx-auto leading-relaxed mt-1 md:mt-1 select-none">
        {data.subtitle}
      </p>
    </section>
  );
};

export default HeroInfo;
