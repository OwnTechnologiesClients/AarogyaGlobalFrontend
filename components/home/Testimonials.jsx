import React from "react";
import Wrapper from "@/components/Wrapper";

const testimonials = [
  { name: "Simran Sandeen", feedback: "We are extremely satisfied with the services provided. The doctors and staff are very professional and caring.", img: "/patient1.png" },
];

const Testimonials = () => (
  <Wrapper padding="default" background="transparent">
    <section className="w-full flex flex-col items-center">
      <h3 className="text-xl font-bold mb-6">Customer Satisfaction Is Our Working Motivation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {testimonials.map((t, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center bg-[#F8F9FF] rounded-xl p-6 shadow gap-6">
            <img src={t.img} alt={t.name} className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0" />
            <div>
              <p className="text-gray-700 mb-2">{t.feedback}</p>
              <span className="font-semibold text-[#18004b]">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  </Wrapper>
);

export default Testimonials;
