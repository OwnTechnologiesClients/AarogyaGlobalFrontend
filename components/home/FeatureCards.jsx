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
          className={`flex flex-row items-start rounded-2xl ${card.backgroundColor} flex-1 min-h-[180px] md:min-h-[200px] p-6 md:p-8 2xl:p-12`}
        >
          {/* Icon */}
          <div className=" mr-4 sm:mr-5 md:mr-6 lg:mr-8">
            <div
              className="rounded-full bg-white flex items-center justify-center
                        w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 xl:w-18 xl:h-18 2xl:w-22 2xl:h-22"
            >
              <Image
                src={card.icon}
                alt={`${card.title} icon`}
                width={64}
                height={64}
                className="object-contain w-5 h-5 sm:w-5 sm:h-5 md:w-7 md:h-7 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-between gap-3 overflow-hidden h-full">
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#0B0757] mb-3">
                {card.title}
              </h3>
              <p className="text-sm md:text-base text-[#000D44] mb-4 leading-relaxed">
                {card.description}
              </p>
            </div>
            <Link
              href={card.cta.href}
              className="font-semibold text-sm md:text-base text-[#0B0757] flex items-center gap-2 group mt-auto"
            >
              {card.cta.label}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
