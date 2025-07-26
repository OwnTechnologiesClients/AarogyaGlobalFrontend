import React from "react";
import aboutData from "../../../data/aboutSection.json";
import Image from "next/image";
import Link from "next/link";
import WelcomeBanner from "../../layout/WelcomeBanner";
import CustomButton from "../../layout/CustomButton";
import DoctorVideoSection from "./DoctorVideoSection";

const AboutSection = () => {
  return (
    <section className="w-screen py-10 flex flex-col md:flex-row items-center gap-8 bg-white ">
      <div className="w-full px-4 md:px-12 lg:px-16 flex flex-col md:flex-row items-center gap-8">
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
          <h2 className="text-2xl md:text-5xl max-w-3xl font-bold text-[#000D44] leading-tight">
            {aboutData.sectionTitle}
          </h2>
          <p className="text-[#555555] text-base md:text-lg max-w-2xl">
            {aboutData.sectionSubtitle}
          </p>
          {/* Features */}
          <div className="flex flex-col gap-4 w-full">
            {aboutData.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-[#F5F7FA] p-7 rounded-full flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="text-[#1F5FFF]"
                  />
                </div>
                <div>
                  <div className="font-bold text-2xl  text-[#000D44]">
                    {feature.title}
                  </div>
                  <div className="text-[#555555] mt-2 text-lg max-w-2xl">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* CTA and Emergency */}
          <div className="flex flex-col md:flex-row items-center gap-6 w-full mt-4">
            <Link href={aboutData.cta.link}>
              <CustomButton
                text={aboutData.cta.text}
                bgColor="bg-[#1F5FFF]"
                textColor="text-white"
                hoverBgColor="bg-green-600"
              />
            </Link>
            <div className="flex items-center gap-2 bg-[#F5F7FA] p-5 rounded-full">
              <Image
                src={aboutData.emergency.icon}
                alt="Emergency"
                width={28}
                height={28}
              />
            </div>
              <div className="flex flex-col items-start gap-2">
                <div className="text-[#555555] text-lg">
                  {aboutData.emergency.label}
                </div>
                <div className="font-bold text-[#000D44] text-base">
                  {aboutData.emergency.phone}
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
