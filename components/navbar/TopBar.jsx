'use client';

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className={`w-full py-3 ${isHomePage ? "bg-white" : "bg-[#000D44]"}`}>
      <div className="mx-auto flex flex-col sm:flex-row gap-1 sm:gap-2 items-center px-3 sm:px-6 md:px-12 max-w-full">
        <span className={`text-[12px] sm:text-[14px] font-normal text-center sm:text-left ${isHomePage ? "text-gray-800" : "text-white"}`}>
          Caring Today for a Healthier Tomorrow and Forever
        </span>
        <Link
          href="/hospitalSearch"
          className={`font-semibold hover:underline flex items-center gap-2 text-[12px] sm:text-[14px] cursor-pointer ${isHomePage ? "text-[#0D6EFD]" : "text-white"}`}
        >
          Hospital Led
          <ArrowRight className="w-5 h-5 font-bold" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
