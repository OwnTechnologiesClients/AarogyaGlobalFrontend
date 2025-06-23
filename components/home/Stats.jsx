import React from "react";
import Wrapper from "@/components/Wrapper";

const stats = [
  { label: "Total Assets", value: "90+" },
  { label: "Total Experts", value: "243+" },
  { label: "Total Countries", value: "85+" },
  { label: "Happy Customers", value: "12M+" },
];

const Stats = () => (
  <Wrapper padding="default" background="transparent" className="bg-[#F8F9FF]">
    <section className="w-full flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#18004b]">{stat.value}</span>
            <span className="text-gray-600 mt-2 text-base">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  </Wrapper>
);

export default Stats;
