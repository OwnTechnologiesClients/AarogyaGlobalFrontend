import React from "react";
import aboutData from "../../../data/aboutSection.json";
import Image from "next/image";
import Link from "next/link";
import WelcomeBanner from "../../layout/WelcomeBanner";
import CustomButton from "../../layout/CustomButton";
import DoctorVideoSection from "./DoctorVideoSection";

const AboutSection = () => {
  return (
    <section className="w-screen pt-20 pb-20 flex flex-col items-center gap-8">
      <div className="w-full px-4 md:px-12 lg:px-16 flex flex-col xl:flex-row items-center gap-8">
        {/* Left: Doctor video */}
        <div className="flex-1 flex flex-col gap-6 items-center xl:items-start ">
          <DoctorVideoSection />
        </div>

        {/* Right: Text Content */}
        <div className="flex-1 flex flex-col gap-6 items-start">
          <WelcomeBanner
            text={aboutData.aboutLabel}
            textColor="#04CE78"
            dotColor="#04CE78"
            alignment="right"
            className="text-lg"
          />
          <h2 className="text-xl md:text-3xl max-w-3xl font-extrabold text-[#1A0142] leading-tight">
            {aboutData.sectionTitle}
          </h2>
          <p className="text-[#555555] text-sm md:text-base max-w-2xl">
            {aboutData.sectionSubtitle}
          </p>

          {/* Features */}
          <div className="flex flex-col gap-6 w-full">
            {aboutData.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-[#F5F7FA] p-7 rounded-full flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <div className="font-bold text-base md:text-lg text-[#000D44]">
                    {feature.title}
                  </div>
                  <div className="text-[#555555] mt-2 text-sm md:text-base max-w-2xl">
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
                textSize="text-sm xl:text-base 2xl:text-lg"
                className="cursor-pointer"
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
              <div className="text-[#555555] 2xl:text-lg  text-sm">
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
}


export default AboutSection;
