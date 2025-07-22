"use client";
import React, { useState } from "react";
import faqData from "../../data/faq.json";
import { MapPin, ArrowRight, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import WelcomeBanner from "../layout/WelcomeBanner";
import CustomButton from "../layout/CustomButton";

// Custom FAQ accordion trigger using Tailwind
const FAQAccordionTrigger = ({ children, open, ...props }) => (
  <button
    {...props}
    className={cn(
      "flex justify-between items-center w-full px-6 py-5 text-left text-base md:text-lg font-semibold text-navy-900 bg-white transition-all duration-200 focus:outline-none border-b",
      open ? "border-b-0" : "border-gray-200"
    )}
    aria-expanded={open}
    type="button"
  >
    <span>{children}</span>
    <span className={cn(
      "ml-4 flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-200",
      open ? "rotate-180 text-[#04CE78]" : "text-[#04CE78]"
    )}>
      {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
    </span>
  </button>
);

export default function FAQSection() {
  // Track which FAQ is open
  const [open, setOpen] = useState("faq-0");

  return (
    <section
      className="relative w-full md:mt-18 mt-8 flex flex-col justify-center items-center px-4 md:px-8 lg:px-10 overflow-hidden"
      style={{
        background: `url('/faqbgImg.png') center bottom no-repeat`,
        backgroundSize: "auto 40%",
      }}
    >
      <div className="w-full flex flex-col md:flex-row gap-12 z-10 items-start">
        {/* Left: Info and CTA */}
        <div className="flex-1 flex flex-col justify-start gap-6">
          <WelcomeBanner
            text="FREQUENTLY ASKED QUESTIONS"
            alignment="left"
            className="text-xl font-semibold mb-3"
          />
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A0142] leading-tight">
            Got questions? <br />
            We’ve got answers
          </h2>
          <p className="text-[#555555] text-lg max-w-2xl">
            Explore our FAQs to find clear, helpful information about
            treatments, travel support, costs, visas, and more. We’re here to
            make your medical journey smooth and stress-free.
          </p>
          <div className="flex items-center gap-6 mt-4">
            <CustomButton
              text="Contact Us Now"
              padding="px-6 py-3 md:px-8 md:py-6"
            />
            <span className="inline-flex items-center justify-center w-14 h-14 bg-[#F5F7FA] rounded-full">
              <MapPin className="w-5 h-5 text-[#1F5FFF]" />
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-[#555555] text-lg">Visit us on</span>
              <span className="font-bold text-[#181059] text-base">
                Gurugram, India
              </span>
            </div>
          </div>
        </div>
        {/* Right: FAQ Accordion */}
        <div className="flex-1 flex flex-col gap-6">
          {faqData.map((faq, idx) => {
            const isOpen = open === `faq-${idx}`;
            return (
              <div
                key={idx}
                className="bg-white border  border-gray-200 rounded-2xl overflow-hidden"
              >
                <FAQAccordionTrigger
                  open={isOpen}
                  onClick={() => setOpen(isOpen ? null : `faq-${idx}`)}
             
                >
                  <span className="text-[#181059] font-bold text-lg md:text-xl">
                    {`${idx + 1}.${faq.question}`}
                  </span>
                </FAQAccordionTrigger>
                <div
                  className={cn(
                    "px-8 max-w-4xl text-[#555555] text-lg  bg-white transition-all duration-200 overflow-hidden",
                    isOpen ? "max-h-[500px] py-4 opacity-100" : "max-h-0 py-0 opacity-0"
                  )}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
