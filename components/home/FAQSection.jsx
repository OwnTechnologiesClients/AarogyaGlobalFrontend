import React from "react";
import Wrapper from "@/components/Wrapper";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
	{
		question: "How to find a care city and local services?",
		answer: "You can use our search and filter options to find care services in your city.",
	},
	{
		question: "Is direct appointment & easy city info with doctor?",
		answer: "Yes, you can book appointments and get city info directly from our platform.",
	},
	{
		question: "What should I do before a blood investigation?",
		answer: "Please consult your doctor for specific instructions before any investigation.",
	},
	{
		question: "Is video calling & consult, what kind of questions enabled?",
		answer: "Video consultations are available for a variety of health concerns.",
	},
	{
		question: "What types of cases does your firm handle?",
		answer: "We handle a wide range of healthcare and medical cases.",
	},
];

const FAQSection = () => (
	<Wrapper padding="default" background="transparent">
		<section className="w-full flex flex-col items-center">
			<h3 className="text-xl font-bold mb-6">Find Care Doctor And Hospital At Your Fingertips</h3>
			<div className="w-full max-w-4xl">
				<Accordion type="single" collapsible>
					{faqs.map((faq, idx) => (
						<AccordionItem key={idx} value={`faq-${idx}`}>
							<AccordionTrigger>{faq.question}</AccordionTrigger>
							<AccordionContent>{faq.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	</Wrapper>
);

export default FAQSection;
