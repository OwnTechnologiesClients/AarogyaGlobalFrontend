'use client';

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className={`w-full py-6 ${isHomePage ? "bg-white" : "bg-[#000D44]"}`}>
      <div className="mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4 items-center px-4 sm:px-8 md:px-16 max-w-full">
        <span className={`text-[14px] sm:text-[18px] font-normal text-center sm:text-left ${isHomePage ? "text-gray-800" : "text-white"}`}>
          Caring Today for a Healthier Tomorrow and Forever
        </span>
        <Link
          href="#"
          className={`font-semibold hover:underline flex items-center gap-2 text-[14px] sm:text-[18px] cursor-pointer ${isHomePage ? "text-[#0D6EFD]" : "text-white"}`}
        >
          Doctor Led
          <ArrowRight className="w-5 h-5 font-bold" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
