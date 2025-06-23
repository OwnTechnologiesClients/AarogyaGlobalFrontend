import React from "react";
import Wrapper from "@/components/Wrapper";

const hospitals = [
  { name: "Trust Care Medical Group", location: "Delhi, India", img: "/hospital1.png", rating: 4.8 },
  { name: "Premier Health Center", location: "Mumbai, India", img: "/hospital2.png", rating: 4.7 },
  { name: "Perthkin Medical Center", location: "Bangalore, India", img: "/hospital3.png", rating: 4.9 },
];

const FeaturedHospitals = () => (
  <Wrapper padding="default" background="transparent" className="bg-[#F8F9FF]">
    <section className="w-full flex flex-col items-center">
      <h3 className="text-xl font-bold mb-6">Aarogya Global Featured Hospitals</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {hospitals.map((hosp, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-xl p-6 shadow">
            <img src={hosp.img} alt={hosp.name} className="w-32 h-32 rounded-xl object-cover mb-4" />
            <span className="font-semibold text-lg mb-1">{hosp.name}</span>
            <span className="text-gray-500 text-sm mb-2">{hosp.location}</span>
            <span className="text-green-600 font-bold">★ {hosp.rating}</span>
          <button className="bg-[#04CE78] text-white px-4 py-2 rounded-lg font-semibold mt-2">View Details</button>
        </div>
      ))}
    </div>
  </section>
  </Wrapper>
);

export default FeaturedHospitals;
