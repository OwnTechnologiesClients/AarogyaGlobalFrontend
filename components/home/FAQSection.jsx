"use client"
import React, { useState, forwardRef } from "react";
import faqData from "../../data/faq.json";
// Removed Shadcn Accordion and Button imports
import { MapPin, ArrowRight, Circle, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom FAQ accordion trigger using Tailwind
const FAQAccordionTrigger = ({ children, open, ...props }) => (
  <button
	{...props}
	className={cn(
	  "flex justify-between items-center w-full px-8 py-7 text-left text-lg md:text-xl font-bold text-[#181059] bg-white rounded-2xl border transition-all duration-200 focus:outline-none",
	  open ? "border-green-400 shadow-lg" : "border-[#D6D6E7]"
	)}
	aria-expanded={open}
	type="button"
  >
	<span>{children}</span>
	<span className="ml-4 flex items-center justify-center w-8 h-8 rounded-full border border-green-400 text-green-500 bg-white">
	  {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
	</span>
  </button>
);

export default function FAQSection() {
	// Track which FAQ is open
	const [open, setOpen] = useState("faq-0");

  return (
	<section
	  className="relative w-full min-h-[80vh] flex flex-col justify-center items-center py-12 px-4 md:px-12 bg-white overflow-hidden"
	  style={{ background: `url('/faqbgImg.png') left bottom no-repeat`, backgroundSize: 'auto 40%' }}
	>
	  <div className="w-full flex flex-col md:flex-row gap-12 z-10 px-20">
		{/* Left: Info and CTA */}
		<div className="flex-1 flex flex-col justify-center gap-6">
		  <div className="flex items-center gap-2">
			<Circle className="h-3 w-3 text-green-400 fill-green-400" />
			<span className="text-green-500 font-semibold text-lg">FREQUENTLY ASKED QUESTIONS</span>
			<Circle className="h-3 w-3 text-green-400 fill-green-400" />
		  </div>
		  <h2 className="text-4xl md:text-5xl font-extrabold text-[#181059] leading-tight">
			Find Care Doctor And <br /> Hospital At Your Fingertips
		  </h2>
		  <p className="text-gray-500 text-lg max-w-xl">
			Our medical center is dedicated to providing comprehensive patient centered healthcare with a commitment to excellence we offer a broad range of medical services from strive to create a welcoming environment where patients feel valued
		  </p>
		  <div className="flex items-center gap-6 mt-4">
			<button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-200 text-lg">
			  Contact Us Now
			  <ArrowRight className="ml-2 w-6 h-6" />
			</button>
			<div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow border">
			  <span className="inline-flex items-center justify-center w-8 h-8 bg-violet-100 rounded-full">
				<MapPin className="w-5 h-5 text-violet-500" />
			  </span>
			  <div className="flex flex-col">
				<span className="text-gray-500 text-xs">Visit us on</span>
				<span className="font-bold text-[#181059] text-base">Gurugram, India</span>
			  </div>
			</div>
		  </div>
		</div>
		{/* Right: FAQ Accordion */}
		<div className="flex-1 flex flex-col gap-6">
		  {faqData.map((faq, idx) => {
			const isOpen = open === `faq-${idx}`;
			return (
			  <div key={idx} className="bg-transparent border-none p-0 mb-6 rounded-2xl overflow-hidden">
				<FAQAccordionTrigger
				  open={isOpen}
				  onClick={() => setOpen(isOpen ? null : `faq-${idx}`)}
				>
				  {`${idx + 1}.${faq.question}`}
				</FAQAccordionTrigger>
				<div
				  className={cn(
					"px-8 pb-8 pt-0 text-gray-500 text-base bg-white rounded-b-2xl border-x border-b border-green-400 animate-fade-in transition-all duration-200",
					isOpen ? "block" : "hidden"
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
