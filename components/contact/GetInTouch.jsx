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
        className="text-lg "
      />
      <h3 className=" text-center text-2xl md:text-4xl font-extrabold text-[#1A0142] leading-tight">
        Don't Hesitate To Contact Us
      </h3>
      
      <div className="flex flex-col lg:flex-row items-center justify-center mt-6 gap-8">

          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-0 ml-10 sm:ml-11">
            {/* Contact Form */}
            <div className="w-full lg:w-3/5 px-2">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <EditText
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  <EditText
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                {/* Phone and Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <EditText
                    placeholder="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                  <EditText
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                  />
                </div>

                {/* Message */}
                <TextArea
                  placeholder="Write A Message"
                  rows={8}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                />

                {/* Agreement Checkbox */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-5 h-5 border border-primary-1/20 rounded cursor-pointer ${
                      agreed
                        ? "bg-primary-accent border-primary-accent"
                        : "bg-transparent"
                    }`}
                    onClick={() => setAgreed(!agreed)}
                  ></div>
                  <div className="text-primary-1 text-base font-inter">
                    <span>I agree to the </span>
                    <a href="#" className="text-primary-blue">
                      Privacy Policy
                    </a>
                    <span> and </span>
                    <a href="#" className="text-primary-blue">
                      Terms & Conditions
                    </a>
                  </div>
                </div>

                {/* Submit Button */}

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-primary-accent text-white  bg-[#04CE78] text-sm font-semibold font-poppins px-4 py-2 rounded"
                >
                  Send Message
                  <Send size={18} />
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="w-full lg:w-2/5 lg:ml-2.5">
              <div
                className="relative bg-gray-1 rounded-2xl overflow-hidden"
                style={{ height: "576px" }}
              >
                {/* Map iframe */}
                <iframe
                  title="Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=77.0266%2C28.4089%2C77.0866%2C28.4689&layer=mapnik&marker=28.4389%2C77.0566"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />

                {/* Map overlay info */}
                <div className="absolute top-2.5 left-2.5 right-1">
                  <div className="bg-secondary-1 rounded-sm p-2 shadow-lg max-w-xs">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-primary-1 text-sm font-medium font-roboto">
                        Gurugram
                      </span>
                      <img
                        src="/images/img_div_icon.png"
                        alt="icon"
                        className="w-5 h-5 mr-5"
                      />
                    </div>
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-primary-1 text-xs font-poppins">
                        Innov8 Orchid Center India, 122001
                      </span>
                      <span className="text-blue-1 text-xs font-roboto mt-1">
                        Directions
                      </span>
                    </div>
                    <span className="text-blue-1 text-xs font-roboto">
                      View larger map
                    </span>
                  </div>
                </div>

                {/* Bottom attribution */}
                <div className="absolute bottom-0 left-2 right-0">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="bg-secondary-1 border-2 border-white-1 rounded p-0.5 shadow-lg">
                      <div className="relative w-9 h-9">
                        <div className="bg-secondary-beige w-full h-full"></div>
                        <img
                          src="/images/img_image_256x256.png"
                          alt="location"
                          className="absolute -top-4 -left-4 w-64 h-64"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-roboto text-primary-1">
                      <span>Keyboard shortcuts</span>
                      <span>Map data ©2025 Google</span>
                      <span>Terms</span>
                      <span>Report a map error</span>
                    </div>
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
