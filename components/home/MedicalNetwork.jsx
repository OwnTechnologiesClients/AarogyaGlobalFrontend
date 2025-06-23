import React from "react";
import Wrapper from "@/components/Wrapper";

const MedicalNetwork = () => (
  <Wrapper padding="default" background="transparent">
    <section className="w-full flex flex-col items-center">
      <h3 className="text-xl font-bold mb-6">Professional Medical Network With Large Directory Listings</h3>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl items-center">
        <div className="flex-1 space-y-4">
          <ul className="list-disc pl-5 text-gray-700 text-base space-y-2">
            <li>Quality Country System</li>
            <li>Highly Professional Staff</li>
            <li>Medical and Surgical Services</li>
            <li>Outpatient Services</li>
          </ul>
          <button className="bg-[#04CE78] text-white px-6 py-2 rounded-lg font-semibold mt-4">Read More</button>
        </div>
        <div className="flex-1 flex flex-col gap-4 items-center">
        <img src="/banner.jpg" alt="Medical Network" className="rounded-xl w-full max-w-xs object-cover" />
        <img src="/banner.jpg" alt="Medical Network" className="rounded-xl w-full max-w-xs object-cover" />
      </div>
    </div>
  </section>
  </Wrapper>
);

export default MedicalNetwork;
