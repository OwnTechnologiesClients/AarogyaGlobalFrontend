import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import featureCardsData from "@/data/featureCards.json";

// Custom SVG Icon component to handle coloring
const CustomIcon = ({ src, alt, color }) => {
  return (
    <div className="w-14 h-14 flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={56}
        height={56}
        className="w-14 h-14"
        style={{
          filter: color === "#000D44"
            ? "brightness(0) saturate(100%) invert(4%) sepia(100%) saturate(7471%) hue-rotate(240deg) brightness(94%) contrast(106%)"
            : "none"
        }}
      />
    </div>
  );
};

const FeatureCards = () => {
  const { cards } = featureCardsData;

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mt-10">
      {cards.map((card) => (
        <Card
          key={card.id}
          className={`flex-1 border-0 shadow-none rounded-3xl ${card.backgroundColor}`}
        >
          <CardContent className="p-6 flex flex-col items-start h-full">
            {/* Icon Container */}
            <div className="mb-4 p-3 bg-white rounded-2xl shadow-sm">
              <CustomIcon
                src={card.icon}
                alt={`${card.title} icon`}
                color={card.iconColor}
              />
            </div>

            {/* Content */}
            <h3 className="font-bold text-lg mb-2 text-gray-900 leading-tight">
              {card.title}
            </h3>

            <p className="text-sm text-gray-700 mb-4 leading-relaxed flex-grow font-semibold">
              {card.description}
            </p>

            {/* CTA Link */}
            <Link
              href={card.cta.href}
              className="mt-auto font-semibold text-sm text-gray-900 hover:text-gray-700 hover:underline flex items-center gap-1 group transition-all duration-200 underline-offset-2"
            >
              {card.cta.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;