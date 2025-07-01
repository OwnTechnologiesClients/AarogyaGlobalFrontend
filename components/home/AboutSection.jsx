import React from 'react';
import aboutData from '../../data/aboutSection.json';
import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="w-screen py-10 flex flex-col md:flex-row items-center gap-8 bg-white">
      <div className="w-full px-4 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-8">
        {/* Left: Doctors and group images */}
        <div className="flex-1 flex flex-col gap-6 items-center md:items-start">
          {/* Doctor Card 1 */}
          <div className="flex items-center bg-white rounded-2xl shadow-md p-4 gap-4 w-full max-w-xs">
            <Image src={aboutData.doctors[0].image} alt={aboutData.doctors[0].name} width={56} height={56} className="rounded-full object-cover border-2 border-green-400" />
            <div className="flex-1">
              <div className="font-bold text-lg text-gray-900">{aboutData.doctors[0].name}</div>
              <div className="text-gray-500 text-sm">{aboutData.doctors[0].specialty}</div>
            </div>
            <button className="bg-[#6C2BFF] text-white px-4 py-2 rounded-lg font-semibold text-sm">Book Now</button>
          </div>
          {/* Group Image */}
          <div className="w-full max-w-xs rounded-2xl overflow-hidden">
            <Image src={aboutData.groupImage} alt="Doctors Group" width={320} height={120} className="object-cover w-full h-28" />
          </div>
          {/* Doctor Card 2 */}
          <div className="flex items-center bg-white rounded-2xl shadow-md p-4 gap-4 w-full max-w-xs">
            <Image src={aboutData.doctors[1].image} alt={aboutData.doctors[1].name} width={56} height={56} className="rounded-full object-cover border-2 border-green-400" />
            <div className="flex-1">
              <div className="font-bold text-lg text-gray-900">{aboutData.doctors[1].name}</div>
              <div className="text-gray-500 text-sm">{aboutData.doctors[1].specialty}</div>
            </div>
            <button className="bg-[#6C2BFF] text-white px-4 py-2 rounded-lg font-semibold text-sm">Book Now</button>
          </div>
        </div>
        {/* Center: Main Doctor Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden shadow-lg">
            <Image src={aboutData.mainDoctorImage} alt="Main Doctor" fill className="object-cover" />
          </div>
        </div>
        {/* Right: Text Content */}
        <div className="flex-1 flex flex-col gap-6 items-start">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="uppercase text-green-600 font-semibold text-sm tracking-wider">{aboutData.aboutLabel}</span>
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{aboutData.sectionTitle}</h2>
          <p className="text-gray-600 text-base md:text-lg">{aboutData.sectionSubtitle}</p>
          {/* Features */}
          <div className="flex flex-col gap-4 w-full">
            {aboutData.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full flex items-center justify-center">
                  <Image src={feature.icon} alt={feature.title} width={36} height={36} />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">{feature.title}</div>
                  <div className="text-gray-500 text-sm">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
          {/* CTA and Emergency */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full mt-4">
            <Link href={aboutData.cta.link} className="bg-[#6C2BFF] text-white px-6 py-3 rounded-xl font-semibold text-base flex items-center gap-2 shadow-md hover:bg-[#4b1bb3] transition">
              {aboutData.cta.text} <span className="ml-2">→</span>
            </Link>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
              <Image src={aboutData.emergency.icon} alt="Emergency" width={28} height={28} />
              <div>
                <div className="text-gray-500 text-xs">{aboutData.emergency.label}</div>
                <div className="font-bold text-indigo-900 text-base">{aboutData.emergency.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;