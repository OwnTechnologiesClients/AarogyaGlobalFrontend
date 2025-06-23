import React from "react";
import Wrapper from "@/components/Wrapper";

const logos = [
  "/logo1.png",
  "/logo2.png",
  "/logo3.png",
  "/logo4.png",
  "/logo5.png",
];

const TrustedBy = () => (
  <Wrapper padding="default" background="transparent">
    <section className="w-full flex flex-col items-center">
      <h4 className="text-gray-700 font-semibold mb-4 text-center">TRUSTED BY MORE THAN 100+ COMPANIES WORLDWIDE</h4>
      <div className="flex flex-wrap justify-center gap-8">
        {logos.map((logo, idx) => (
          <img key={idx} src={logo} alt="Trusted company logo" className="h-10 object-contain" />
        ))}
      </div>
    </section>
  </Wrapper>
);

export default TrustedBy;
