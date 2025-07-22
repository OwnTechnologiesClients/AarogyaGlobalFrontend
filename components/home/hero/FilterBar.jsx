"use client";

import React, { useState } from "react";
import filters from "@/data/filters.json";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import CustomButton from "../../layout/CustomButton";
import DropdownSelect from "@/components/layout/Dropdown";

const FilterBar = () => {
  const [activeToggle, setActiveToggle] = useState(filters.toggles[0].value);
  const [selected, setSelected] = useState({});

  return (
    <div className="w-full flex justify-center relative z-0 mb-18 mt-14 md:mt-0">
      {/* Main Filter Container */}
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-[1400px] relative mt-8 md:mt-0 z-0">
        {/* Toggle Buttons - Positioned at top center */}
        <div className="absolute -top-8 md:-top-14 left-1/2 transform -translate-x-1/2 z-[5]">
          <div className="flex gap-2 md:gap-[10px] bg-white rounded-lg md:rounded-xl p-1 md:p-5 flex-wrap justify-center">
            {filters.toggles.map((toggle) => (
              <button
                key={toggle.value}
                className={`px-4 md:px-[20px] py-3 md:py-[12px] rounded-md md:rounded-md font-semibold transition-all duration-200 text-xs md:text-sm focus:outline-none whitespace-nowrap
              ${
                activeToggle === toggle.value
                  ? "bg-[#04CE78] text-white shadow-md border border-transparent"
                  : "bg-white text-[#000D44] hover:bg-gray-50 border-2 border-[#000D44]"
              }`}
                onClick={() => setActiveToggle(toggle.value)}
                type="button"
              >
                {toggle.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className=" md:pl-[44px] pl-[75px] md:pr-[24.5px] py-24 md:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-center gap-4 md:gap-9">
            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
              {filters.filters.map((filter) => (
                <div key={filter.label} className="w-full max-w-56">
                  <DropdownSelect
                    label={filter.label}
                    options={filter.options}
                    value={selected[filter.label] || ""}
                    onChange={(e) =>
                      setSelected((prev) => ({
                        ...prev,
                        [filter.label]: e.target.value,
                      }))
                    }
                    placeholder={filter.placeholder}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
              {filters.actions.map((action) => (
                <Link key={action.label} href={action.href}>
                  <CustomButton
                    text={action.label}
                    bgColor={
                      action.variant === "primary"
                        ? "bg-[#04CE78]"
                        : "bg-[#1F5FFF]"
                    }
                    textColor="text-white"
                    hoverBgColor={
                      action.variant === "primary"
                        ? "bg-[#03B96A]"
                        : "bg-[#03B96A]"
                    }
                    rounded="rounded-lg"
                    padding="px-6 py-3 md:px-8 md:py-5"
                    textSize="text-sm md:text-base lg:text-lg"
                    iconSize={26}
                    className="group hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
