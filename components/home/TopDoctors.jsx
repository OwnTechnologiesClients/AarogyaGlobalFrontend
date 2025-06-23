import React from "react";
import Wrapper from "@/components/Wrapper";

const doctors = [
  { name: "Sanyam Sengar", specialty: "Cardiology", img: "/doctor1.png", rating: 4.9 },
  { name: "Dr. Vishnu Dutt", specialty: "Orthopedics", img: "/doctor2.png", rating: 4.8 },
  { name: "Dr. Ashesh Jayapragasan", specialty: "Neurology", img: "/doctor3.png", rating: 4.7 },
  { name: "Suresh Kumar", specialty: "General Medicine", img: "/doctor4.png", rating: 4.8 },
];

const TopDoctors = () => (
  <Wrapper padding="default" background="transparent" className="bg-[#F8F9FF]">
    <section className="w-full flex flex-col items-center">
      <h3 className="text-xl font-bold mb-6">Meet The Top Rated Doctors</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {doctors.map((doc, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-xl p-6 shadow">
            <img src={doc.img} alt={doc.name} className="w-24 h-24 rounded-full object-cover mb-4" />
            <span className="font-semibold text-lg mb-1">{doc.name}</span>
            <span className="text-gray-500 text-sm mb-2">{doc.specialty}</span>
            <span className="text-green-600 font-bold">★ {doc.rating}</span>
            <button className="bg-[#04CE78] text-white px-4 py-2 rounded-lg font-semibold mt-2">View Profile</button>
          </div>
        ))}
    </div>
  </section>
  </Wrapper>
);

export default TopDoctors;
