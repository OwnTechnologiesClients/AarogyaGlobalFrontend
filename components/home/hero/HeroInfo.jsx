import React from "react";
import data from "@/data/hero.json";
import WelcomeBanner from "../../layout/WelcomeBanner";

const HeroInfo = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-8 md:py-24 bg-transparent px-4 md:px-6 lg:px-8">
      <WelcomeBanner
        text={data.welcome}
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="mb-5 text-lg "
      />
      <h1 className="text-3xl md:text-5xl lg:text-6xl  font-extrabold text-white mb-4 leading-tight">
        {data.title}
        <br />
        <span className="block font-bold text-3xl md:text-5xl lg:text-6xl mt-5">
          {data.titleAbroad}
        </span>
      </h1>
      <p className="text-lg md:text-xl font-normal text-white/90 max-w-6xl mx-auto leading-relaxed mt-4">
        {data.subtitle}
      </p>
    </section>
  );
};

export default HeroInfo;
