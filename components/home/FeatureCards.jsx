import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import featureCardsData from "@/data/featureCards.json";

const FeatureCards = () => {
  const { cards } = featureCardsData;

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap gap-4 mt-10 overflow-hidden">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`flex flex-row items-start rounded-[24px] md:rounded-[30px] p-6 md:p-8 ${card.backgroundColor} flex-1`}
          style={{
            height: "auto",
            minHeight: "244.8px", // fix desktop shape
          }}
        >
          {/* Icon */}
          <div className="flex-shrink-0 mr-4 md:mr-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center">
              <Image src={card.icon} alt={`${card.title} icon`} width={48} height={48} />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-4 justify-between overflow-hidden">
            <div>
              <h3 className="font-semibold text-xl md:text-3xl text-[#0B0757] mb-4">
                {card.title}
              </h3>
              <p className="text-base md:text-xl  text-[#000D44] mb-4 leading-relaxed">
                {card.description}
              </p>
            </div>
            <Link
              href={card.cta.href}
              className="font-bold text-lg text-[#0B0757] flex items-center gap-1.5 group transition-all duration-200"
            >
              {card.cta.label}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
