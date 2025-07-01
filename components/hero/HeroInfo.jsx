import React from "react";
import data from "@/data/hero.json";

const HeroInfo = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-8 md:py-20 bg-transparent px-4 md:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#04CE78] inline-block" />
        <span className="text-[#04CE78] font-semibold tracking-wider text-sm md:text-base uppercase">
          {data.welcome}
        </span>
        <span className="h-2 w-2 rounded-full bg-[#04CE78] inline-block" />
      </div>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
        {data.title}
        <br />
        <span className="block font-extrabold text-3xl md:text-5xl lg:text-6xl">
          {data.titleAbroad}
        </span>
      </h1>
      <p className="text-lg md:text-xl font-semibold text-white/90 max-w-2xl mx-auto leading-relaxed">
        {data.subtitle}
      </p>
    </section>
  );
};

export default HeroInfo;
