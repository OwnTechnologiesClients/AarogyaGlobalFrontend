"use client";
import React, { useState } from "react";
import WelcomeBanner from "../layout/WelcomeBanner";
import { Send } from "lucide-react";
import EditText from "../layout/EditText";
import TextArea from "../layout/TextArea";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <section className="flex flex-col items-center md:mb-16 md:mt-16 mb-8 mt-8">
      <WelcomeBanner
        text="Get In Touch"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-lg mb-7 "
      />
      <h3 className=" text-center text-2xl md:text-4xl font-extrabold text-[#1A0142] leading-tight mb-7">
        Don't Hesitate To Contact Us
      </h3>

      <div className="w-full px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          {/* Contact Form (with shadow + white background) */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl border border-black-100 shadow-md p-6 sm:p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditText
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-[#f6f9fc]"
                />
                <EditText
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-[#f6f9fc]"
                />
              </div>

              {/* Phone + Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditText
                  placeholder="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-[#f6f9fc]"
                />
                <EditText
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="bg-[#f6f9fc]"
                />
              </div>

              {/* Message */}
              <TextArea
                placeholder="Write A Message"
                rows={8}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-[#f6f9fc]"
              />

              {/* Checkbox */}
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="w-4 h-4 mt-1 accent-green-500"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 underline">
                    Terms & Conditions
                  </a>
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#04CE78] hover:bg-[#03b76b] text-white text-sm font-semibold px-6 py-3 rounded-md font-poppins transition"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

          {/* Map (only rounded, no shadow) */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[576px] rounded-[20px] overflow-hidden">
              <iframe
                title="Location Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.0266%2C28.4089%2C77.0866%2C28.4689&layer=mapnik&marker=28.4389%2C77.0566"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />

              {/* Top Overlay Info */}
              <div className="absolute top-3 left-3 right-3 z-10">
                <div className="bg-white rounded-md shadow p-3 w-fit max-w-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800">
                      Gurugram
                    </span>
                    <img
                      src="/images/img_div_icon.png"
                      alt="icon"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="text-xs text-gray-600 leading-snug mb-2">
                    Innov8 Orchid Center India, 122001
                    <br />
                    <span className="text-blue-500 underline cursor-pointer">
                      Directions
                    </span>
                  </div>
                  <span className="text-xs text-blue-500 underline cursor-pointer">
                    View larger map
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
