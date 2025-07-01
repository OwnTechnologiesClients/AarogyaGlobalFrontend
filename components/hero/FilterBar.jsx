"use client";

import React, { useState } from "react";
import filters from "@/data/filters.json";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightIcon } from "lucide-react";

const FilterBar = () => {
  const [activeToggle, setActiveToggle] = useState(filters.toggles[0].value);
  const [selected, setSelected] = useState({});

  return (
    <div className="w-full flex justify-center relative z-0 mb-18">
      {/* Main Filter Container */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl border border-gray-100 w-full max-w-7xl relative mt-4 md:mt-0 z-0">

        {/* Toggle Buttons - Positioned at top center */}
        <div className="absolute -top-4 md:-top-14 left-1/2 transform -translate-x-1/2 z-[5]">
          <div className="flex gap-0.5 md:gap-1 bg-white rounded-lg md:rounded-xl p-0.5 md:p-6 shadow-lg border border-gray-200">
            {filters.toggles.map((toggle) => (
              <button
                key={toggle.value}
                className={`px-3 md:px-6 py-2 md:py-2.5 rounded-md md:rounded-md font-semibold transition-all duration-200 text-xs md:text-sm focus:outline-none whitespace-nowrap ${
                  activeToggle === toggle.value
                    ? "bg-[#04CE78] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50"
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
        <div className="px-4 md:px-28 py-6 md:py-10">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-4">

            {/* Filters Section */}
            <div className="flex flex-1 gap-3 flex-col md:flex-row w-full lg:w-auto">
              {filters.filters.map((filter) => (
                <Select
                  key={filter.label}
                  value={selected[filter.label] || ""}
                  onValueChange={(val) => setSelected((prev) => ({ ...prev, [filter.label]: val }))}
                >
                  <SelectTrigger className="w-full max-w-56 p-8 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 shadow-sm hover:border-[#04CE78]/50 focus:ring-2 focus:ring-[#04CE78]/30 focus:border-[#04CE78] transition-all duration-200">
                    <SelectValue placeholder={filter.placeholder} className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-gray-200 shadow-lg z-30">
                    {filter.options.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="text-sm py-2.5 hover:bg-[#04CE78]/10 focus:bg-[#04CE78]/10"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full lg:w-auto flex-col md:flex-row">
              {filters.actions.map((action) => (
                <Button
                  key={action.label}
                  asChild
                  variant={action.variant === "primary" ? "default" : "secondary"}
                  className={`font-semibold p-8 rounded-lg shadow-md hover:shadow-lg flex items-center gap-2 text-sm w-full md:w-auto transition-all duration-200 ${
                    action.variant === "primary"
                      ? "bg-[#04CE78] hover:bg-[#03B96A] text-white border-0"
                      : "bg-[#6C2BD7] hover:bg-[#5A23C8] text-white border-0"
                  }`}
                >
                  <a href={action.href} className="flex items-center justify-center w-full gap-2">
                    {action.label}
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
