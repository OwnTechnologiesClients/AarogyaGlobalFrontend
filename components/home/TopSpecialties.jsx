import React from "react";
import Wrapper from "@/components/Wrapper";

const specialties = [
  { icon: "🦴", label: "Orthopedics", count: "42 Listings" },
  { icon: "❤️", label: "Cardiology", count: "38 Listings" },
  { icon: "🩸", label: "Blood Test", count: "19 Listings" },
  { icon: "🧪", label: "Laboratory", count: "16 Listings" },
];

const TopSpecialties = () => (
  <Wrapper padding="default" background="transparent">
    <section className="w-full flex flex-col items-center">
      <h3 className="text-xl font-bold mb-6">Top Searched Specialties</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {specialties.map((spec, idx) => (
          <div key={idx} className="flex flex-col items-center bg-[#F8F9FF] rounded-xl p-6 shadow">
            <span className="text-3xl mb-2">{spec.icon}</span>
            <span className="font-semibold text-lg mb-1">{spec.label}</span>
            <span className="text-gray-500 text-sm">{spec.count}</span>
          </div>
        ))}
      </div>
    </section>
  </Wrapper>
);

export default TopSpecialties;
