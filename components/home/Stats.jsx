"use client";
import React from "react";
import CountUp from "react-countup";
import { Trophy, UserPlus, Globe, Star } from "lucide-react";

// Common icon style
const iconProps = {
  size: 56,
  strokeWidth: 2.5,
  color: "#1F5FFF",
};

// Stats content
const statsData = [
  { label: "Hospital Partners", value: 50, suffix: "+", icon: <Trophy {...iconProps} /> },
  { label: "Doctors in the network", value: 250, suffix: "+", icon: <UserPlus {...iconProps} /> },
  { label: "Language Translators", value: 18, suffix: "+", icon: <Globe {...iconProps} /> },
  { label: "Satisfied Patients", value: 1000, suffix: "+", icon: <Star {...iconProps} /> },
];

const Stats = () => {
  return (
    <section className="w-full flex justify-center bg-white py-20">
      <div className="w-full max-w-[2200px] px-6 md:px-10 flex flex-col md:flex-row items-start justify-between gap-y-12">
        {statsData.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col items-start text-left px-6 md:px-14 ${
              index !== statsData.length - 8 ? "border-r border-gray-500" : ""
            }`}
          >
            <div className="mb-4">{stat.icon}</div>
            <span className="text-6xl font-extrabold text-[#000D44]">
              <CountUp end={stat.value} duration={2} suffix={stat.suffix} enableScrollSpy />
            </span>
            <span className="text-[#555555] mt-2 text-xl font-semibold">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
