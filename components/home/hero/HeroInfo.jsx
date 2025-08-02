import React from "react";
import data from "@/data/hero.json";
import WelcomeBanner from "../../layout/WelcomeBanner";

const HeroInfo = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-14 md:py-12 lg:py-16 xl:py-20 bg-transparent px-4 md:px-6 lg:px-8">
      <WelcomeBanner
        text={data.welcome}
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="mb-4 md:mb-6 text-lg"
      />
      <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
        {data.title}
      </h1>
      <p className="text-sm md:text-lg lg:text-xl font-normal text-white/90 max-w-6xl mx-auto leading-relaxed mt-4 md:mt-6">
        {data.subtitle}
      </p>
    </section>
  );
};

export default HeroInfo;
