"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const PageHeader = ({ title, routes = [] }) => {
  return (
   <div className="relative w-full h-[300px] md:h-[400px]  overflow-hidden rounded-[30px]">
  {/* Background Image */}
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <Image
      src="/pageHeader.jpg"
      alt="Page Header Background"
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
        objectPosition: "center 30%",
        width: "100%",
        height: "100%",
        transition: "transform 1.2s ease-in-out",
        transform: "scale(1.1)",
      }}
      priority
      quality={100}
    />
  </div>

  {/* Overlay with your custom color */}
  <div className="absolute inset-0 rounded-[30px]" style={{ backgroundColor: "#000D44B2" }}></div>

  {/* Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 mt-8 md:mt-24 transition-all duration-700 ease-in-out">
    <h1 className="text-2xl md:text-4xl  font-[var(--font-anton)] mb-6 text-center text-white drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">
      {title}
    </h1>

    {routes.length > 0 && (
      <div className="flex items-center gap-2 text-base md:text-sm bg-black/60 px-6 py-3 rounded-full shadow-lg transition-all duration-700">
        {routes.map((route, index) => (
          <React.Fragment key={index}>
            {index === 0 ? (
              <Link
                href={route.href || "/"}
                className="text-gray-100 hover:text-red-400 transition-colors duration-300 flex items-center font-medium"
              >
                <FaHome className="mr-2" />
                {route.label}
              </Link>
            ) : (
              <>
                <span className="text-gray-300 mx-2">&gt;</span>
                {route.href ? (
                  <Link
                    href={route.href}
                    className="text-gray-100 hover:text-red-400 transition-colors duration-300 font-medium"
                  >
                    {route.label}
                  </Link>
                ) : (
                  <span className="text-[#04CE78] font-medium">
                    {route.label}
                  </span>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default PageHeader;
