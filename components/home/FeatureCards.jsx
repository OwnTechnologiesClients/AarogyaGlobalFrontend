import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import featureCardsData from "@/data/featureCards.json";

const FeatureCards = () => {
  const { cards } = featureCardsData;

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap gap-6 mt-10">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`flex flex-col xl:flex-row items-start rounded-2xl ${card.backgroundColor} flex-1  p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12`}
          style={{ minHeight: "200px" }}
        >
          {/* Icon */}
          <div className="flex-shrink-0 mr-4 sm:mr-5 md:mr-6 lg:mr-8">
            <div
              className="rounded-full bg-white flex items-center justify-center
                        w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 xl:w-22 xl:h-22"
            >
              <Image
                src={card.icon}
                alt={`${card.title} icon`}
                width={64}
                height={64}
                className="object-contain w-5 h-5 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-14 xl:h-14"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-between gap-2 overflow-hidden">
            <div>
              <h3 className="text-base sm:text-sm lg:text-lg xl:text-xl font-bold text-[#0B0757] mb-2">
                {card.title}
              </h3>
              <p className="text-base md:text-sm lg:text-sm xl:text-sm text-[#000D44] leading-relaxed mb-3">
                {card.description}
              </p>
            </div>
            <Link
              href={card.cta.href}
              className="font-semibold text-sm xl:text-base text-[#0B0757] flex items-center gap-1.5 group"
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
