import React from "react";
import { UserCircle, PhoneCall, CalendarCheck2 } from "lucide-react";

const cards = [
  {
    icon: <UserCircle className="w-8 h-8 text-[#A259FF]" />,
    title: "Find Doctor Near You",
    desc: "With a focus on compassionate personalize environment where patient feel valued respected and well informed about their health",
    cta: { label: "View All Doctors", href: "/doctors" },
    bg: "bg-[#F9D8F7]",
  },
  {
    icon: <PhoneCall className="w-8 h-8 text-[#04CE78]" />,
    title: "24/7 Hours Support",
    desc: "With a focus on compassionate personalize environment where patient feel valued respected and well informed about their health",
    cta: { label: "Contact Us", href: "/contact" },
    bg: "bg-[#D8F6F9]",
  },
  {
    icon: <CalendarCheck2 className="w-8 h-8 text-[#FFB86B]" />,
    title: "Book An Appointments",
    desc: "With a focus on compassionate personalize environment where patient feel valued respected and well informed about their health",
    cta: { label: "Request An Appointment", href: "/appointment" },
    bg: "bg-[#FFE5D0]",
  },
];

const FeatureCards = () => (
  <div className="w-full flex flex-col md:flex-row gap-4 mt-8">
    {cards.map((card, idx) => (
      <div
        key={card.title}
        className={`flex-1 rounded-2xl p-6 flex flex-col items-start shadow-md ${card.bg}`}
      >
        <div className="mb-4">{card.icon}</div>
        <h3 className="font-bold text-lg mb-2">{card.title}</h3>
        <p className="text-sm text-gray-700 mb-4">{card.desc}</p>
        <a
          href={card.cta.href}
          className="mt-auto font-semibold text-[#1a0856] hover:underline flex items-center gap-1"
        >
          {card.cta.label} <span className="ml-1">→</span>
        </a>
      </div>
    ))}
  </div>
);

export default FeatureCards; 