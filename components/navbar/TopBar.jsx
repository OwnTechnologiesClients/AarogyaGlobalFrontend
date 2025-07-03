import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopBar = () => (
<div className="w-full py-6">
  <div className="mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4 items-center px-4 sm:px-8 md:px-16 max-w-full">
    <span className="text-gray-800 text-[14px] sm:text-[18px] font-normal text-center sm:text-left">
      Caring Today for a Healthier Tomorrow and Forever
    </span>
    <Link
      href="#"
      className="text-[#0D6EFD] font-semibold hover:underline flex items-center gap-2 text-[14px] sm:text-[18px]"
    >
      Doctor Led
      <ArrowRight className="w-5 h-5 font-bold" />
    </Link>
  </div>
</div>

);

export default TopBar;
