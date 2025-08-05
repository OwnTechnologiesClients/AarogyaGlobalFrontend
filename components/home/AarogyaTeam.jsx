"use client";
import React from "react";
import Image from "next/image";
import WelcomeBanner from "../layout/WelcomeBanner";
import teamData from "../../data/aarogyateam.json";

const AarogyaTeam = () => {

  return (
    <section className="overflow-hidden bg-[#F5F7FA]">
      <div className="px-4 md:px-8 lg:px-18  w-screen flex justify-center flex-col">
        <WelcomeBanner
          text="AAROGYA TEAM"
          textColor="#04CE78"
          dotColor="#04CE78"
          alignment="left"
          className="text-lg mt-30 mb-5"
        />
        <div className="flex w-full justify-start items-center md:mb-18 mb-8">
          <h3 className="text-xl md:text-3xl font-extrabold text-[#1A0142] leading-tight">
            Founding Team / Directors
          </h3>
        </div>

        <div className="w-full px-4 mb-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {teamData.slice(0, 4).map((member, idx) => (
              <div key={idx} className="flex flex-col bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 w-full max-w-xs mx-auto mb-8 h-[380px] md:h-[420px]">
                {/* Image Container - No padding for full-width image */}
                <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={260}
                    height={340}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  {/* Gradient overlay for better text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Text Content - Proper padding only for text area */}
                <div className="flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-white to-gray-50 flex-1">
                  <h4 className="text-lg md:text-xl font-bold text-[#1A0142] mb-2 line-clamp-2">
                    {member.name}
                  </h4>
                  <p className="text-sm md:text-base text-[#555555] font-medium line-clamp-2">
                    {member.role}
                  </p>
                  {/* Professional accent line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-[#1F5FFF] to-[#04CE78] rounded-full mt-3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AarogyaTeam;
