"use client";
import React from "react";
import CountUp from "react-countup";
import { Trophy, UserPlus, Globe, Star } from "lucide-react";
import { usePathname } from "next/navigation";

// Background colors for icon wrappers (non-homepage)
const iconBgColors = ["#FEC091", "#ECB2FF", "#92BDF6", "#CBE2AE"];

const Stats = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Icon color based on page
  const iconColor = isHomePage ? "#1F5FFF" : "#000D44";

  // Stats content
  const statsData = [
    {
      label: "Hospital Partners",
      value: 50,
      suffix: "+",
      icon: <Trophy size={32} strokeWidth={2.5} color={iconColor} />,
    },
    {
      label: "Doctors in the network",
      value: 250,
      suffix: "+",
      icon: <UserPlus size={32} strokeWidth={2.5} color={iconColor} />,
    },
    {
      label: "Language Translators",
      value: 18,
      suffix: "+",
      icon: <Globe size={32} strokeWidth={2.5} color={iconColor} />,
    },
    {
      label: "Satisfied Patients",
      value: 1000,
      suffix: "+",
      icon: <Star size={32} strokeWidth={2.5} color={iconColor} />,
    },
  ];

  return (
    <section
      className={`w-full flex justify-center ${
        isHomePage ? "bg-white" : "bg-[#000D44] rounded-2xl shadow-lg"
      } py-20`}
    >
      <div className="w-full max-w-[2200px] px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-y-12">
        {statsData.map((stat, index) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center px-6 md:px-14"
          >
            {/* Icon block */}
            <div className="mb-4">
              {isHomePage ? (
                stat.icon
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: iconBgColors[index] }}
                >
                  {stat.icon}
                </div>
              )}
            </div>

            {/* Count */}
            <span
              className={`text-6xl font-extrabold ${
                isHomePage ? "text-[#000D44]" : "text-white"
              }`}
            >
              <CountUp
                end={stat.value}
                duration={2}
                suffix={stat.suffix}
                enableScrollSpy
              />
            </span>

            {/* Label */}
            <span
              className={`mt-2 text-xl font-semibold ${
                isHomePage ? "text-[#555555]" : "text-white"
              }`}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
