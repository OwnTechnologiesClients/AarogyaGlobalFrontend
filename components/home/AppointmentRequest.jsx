import React from "react";
import Wrapper from "@/components/Wrapper";

const AppointmentRequest = () => (
  <Wrapper padding="lg" background="transparent" className="border-t border-gray-100">
    <section className="w-full flex flex-col items-center">
      <h3 className="text-xl font-bold mb-6">Request Your Appointment</h3>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl items-center">
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" className="border rounded-lg px-4 py-2" required />
            <input type="email" placeholder="Email Address" className="border rounded-lg px-4 py-2" required />
            <input type="tel" placeholder="Phone Number" className="border rounded-lg px-4 py-2" required />
            <textarea placeholder="Your Message" className="border rounded-lg px-4 py-2" rows={3} />
            <button type="submit" className="bg-[#04CE78] text-white px-6 py-2 rounded-lg font-semibold">Submit Appointment</button>
          </form>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/banner.jpg" alt="Request Appointment" className="rounded-xl w-full max-w-xs object-cover" />
        </div>
      </div>
    </section>
  </Wrapper>
);

export default AppointmentRequest;
