import React from "react";
import aboutData from "../../../data/aboutSection.json";
import Image from "next/image";
import Link from "next/link";
import WelcomeBanner from "../../layout/WelcomeBanner";
import CustomButton from "../../layout/CustomButton";
import DoctorVideoSection from "./DoctorVideoSection";

const AboutSection = () => {
  return (
    <section className="w-screen py-10 flex flex-col md:flex-row items-center gap-8 bg-white">
      <div className="w-full px-4 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-8">
        {/* Left: Doctor video*/}
        <div className="flex-1 flex flex-col gap-6 items-center md:items-start">
          <DoctorVideoSection />
        </div>
        {/* Right: Text Content */}
        <div className="flex-1 flex flex-col gap-6 items-start">
          <WelcomeBanner
            text={aboutData.aboutLabel}
            textColor="#04CE78"
            dotColor="#04CE78"
            alignment="center"
            className="text-lg md:text-xl"
          />
          <h2 className="text-3xl md:text-5xl font-bold text-[#000D44] leading-tight">
            {aboutData.sectionTitle}
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            {aboutData.sectionSubtitle}
          </p>
          {/* Features */}
          <div className="flex flex-col gap-4 w-full">
            {aboutData.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={36}
                    height={36}
                  />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">
                    {feature.title}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* CTA and Emergency */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full mt-4">
            <Link href={aboutData.cta.link}>
              <CustomButton
                text={aboutData.cta.text}
                bgColor="bg-[#1F5FFF]"
                textColor="text-white"
                hoverBgColor="bg-green-600"
              />
            </Link>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
              <Image
                src={aboutData.emergency.icon}
                alt="Emergency"
                width={28}
                height={28}
              />
              <div>
                <div className="text-gray-500 text-xs">
                  {aboutData.emergency.label}
                </div>
                <div className="font-bold text-indigo-900 text-base">
                  {aboutData.emergency.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
