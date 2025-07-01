"use client";
import React from "react";
import CountUp from "react-countup";
import { Trophy, UserPlus, Globe, Star } from "lucide-react";

// Icon settings for all stats
const iconProps = {
  size: 56,
  strokeWidth: 2.5,
  color: "#1F5FFF",
};

// Stats data array
const statsData = [
  { label: "Total Awards", value: 90, suffix: "+", icon: <Trophy {...iconProps} /> },
  { label: "Total Experts", value: 243, suffix: "+", icon: <UserPlus {...iconProps} /> },
  { label: "Total Countries", value: 85, suffix: "+", icon: <Globe {...iconProps} /> },
  { label: "Happy Customers", value: 12, suffix: "M+", icon: <Star {...iconProps} /> },
];

const Stats = () => (
  <section className="w-screen flex justify-center bg-white py-16 min-h-[300px]">
    <div className="w-full px-4 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 w-full">
        {statsData.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <div className="mb-4">{stat.icon}</div>
            <span className="text-6xl font-extrabold text-[#000D44]">
              <CountUp end={stat.value} duration={2} suffix={stat.suffix} enableScrollSpy />
            </span>
            <span className="text-[#555555] mt-2 text-xl font-bold">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
