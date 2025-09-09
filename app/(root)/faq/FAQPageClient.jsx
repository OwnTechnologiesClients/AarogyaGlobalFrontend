"use client";
import React, { useState } from "react";
import faqData from "../../../data/faq.json";
import { ArrowRight, Plus, Minus, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import WelcomeBanner from "../../../components/layout/WelcomeBanner";
import CustomButton from "../../../components/layout/CustomButton";
import Link from "next/link";

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
        <span
            className={cn(
                "ml-4 flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-200",
                open ? "rotate-180 text-[#04CE78]" : "text-[#04CE78]"
            )}
        >
            {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
    </button>
);

export default function FAQPage() {
    // Track which FAQ is open
    const [open, setOpen] = useState("faq-0");

    return (
        <div className="min-h-screen bg-[#F5F7FA]">
            {/* Header Section */}
            <section
                className="w-screen pt-20 pb-20 flex flex-col items-center gap-8 relative"
                style={{
                    background: `url('/faqbgImg.png') center bottom no-repeat`,
                    backgroundSize: "auto 25%",
                }}
            >
                <div className="w-full px-4 md:px-12 lg:px-16 flex flex-col items-center gap-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <WelcomeBanner
                            text="FREQUENTLY ASKED QUESTIONS"
                            textColor="#04CE78"
                            dotColor="#04CE78"
                            alignment="center"
                            className="text-lg mb-6"
                        />
                        <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#1A0142] mb-6 leading-tight">
                            Got questions? <br />
                            We've got answers
                        </h1>
                        <p className="text-[#555555] text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
                            Find comprehensive answers to all your questions about medical tourism,
                            our services, and how we can help you get the best healthcare abroad.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-screen py-16 md:py-20 bg-white">
                <div className="w-full px-4 md:px-12 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {faqData.map((faq, idx) => {
                                const isOpen = open === `faq-${idx}`;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#04CE78] hover:shadow-lg transition-all duration-300 group"
                                    >
                                        <FAQAccordionTrigger
                                            open={isOpen}
                                            onClick={() => setOpen(isOpen ? null : `faq-${idx}`)}
                                        >
                                            <span className="text-[#1A0142] font-semibold group-hover:text-[#04CE78] transition-colors duration-200">
                                                {`${idx + 1}. ${faq.question}`}
                                            </span>
                                        </FAQAccordionTrigger>
                                        <div
                                            className={cn(
                                                "px-6 text-[#555555] text-sm md:text-base bg-gray-50 transition-all duration-300 overflow-hidden",
                                                isOpen
                                                    ? "max-h-[500px] py-6 opacity-100"
                                                    : "max-h-0 py-0 opacity-0"
                                            )}
                                        >
                                            <div className="border-l-4 border-[#04CE78] pl-4">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Section */}
                        <div className="mt-20 text-center bg-[#F5F7FA] rounded-2xl p-8 md:p-12">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A0142] mb-4">
                                Still have questions?
                            </h3>
                            <p className="text-[#555555] text-sm md:text-base lg:text-lg mb-8 max-w-2xl mx-auto">
                                Our medical experts are here to help you with any specific questions
                                about your treatment journey. Get in touch with us today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact">
                                    <CustomButton
                                        text="Contact Us Now"
                                        bgColor="bg-[#1F5FFF]"
                                        textColor="text-white"
                                        hoverBgColor="bg-green-600"
                                        padding="px-8 py-4"
                                        textSize="text-sm xl:text-base 2xl:text-lg"
                                        className="cursor-pointer"
                                    />
                                </Link>
                                <Link href="/">
                                    <button className="inline-flex items-center gap-2 text-[#1F5FFF] hover:text-[#4B00B4] font-medium px-8 py-4 border-2 border-[#1F5FFF] rounded-lg hover:border-[#4B00B4] transition-all duration-300">
                                        <ArrowLeft size={16} />
                                        Back to Home
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
