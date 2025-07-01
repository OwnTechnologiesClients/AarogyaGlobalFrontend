import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopBar = () => (
  <div className="w-full bg-white text-[16px] py-6">
    <div className="mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4 items-center px-4 sm:px-8 md:px-16 max-w-full">
      <span className="text-gray-600 text-[14px] sm:text-[18px] font-medium text-center sm:text-left">
        Caring Today for a Healthier Tomorrow and Forever
      </span>
      <Link
        href="#"
        className="text-blue-600 font-semibold hover:underline flex items-center gap-1 text-[14px] sm:text-[18px]"
      >
        Doctor Led
        <span className="ml-1 text-base">
          <ArrowRight className="w-4 h-4 font-extrabold" />
        </span>
      </Link>
    </div>
  </div>
);

export default TopBar;
