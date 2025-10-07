"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import countryCodes from "country-codes-list";
import { ChevronDown, Search } from "lucide-react";

const buildCountries = () => {
  try {
    const list = countryCodes.customList(
      "countryCode",
      "{countryNameEn}|{countryCallingCode}|{countryCode}"
    );
    return Object.entries(list).map(([iso, val]) => {
      const [name, dial, code] = val.split("|");
      return {
        iso,
        name,
        dialCode: `+${dial}`,
        code,
        search: `${name.toLowerCase()} ${dial} ${iso.toLowerCase()}`,
      };
    });
  } catch (error) {
    // Fallback to a basic list if country-codes-list fails
    console.warn("Failed to load country codes, using fallback list:", error);
    return [
      { iso: "IN", name: "India", dialCode: "+91", code: "IN", search: "india 91 in" },
      { iso: "US", name: "United States", dialCode: "+1", code: "US", search: "united states 1 us" },
      { iso: "GB", name: "United Kingdom", dialCode: "+44", code: "GB", search: "united kingdom 44 gb" },
      { iso: "CA", name: "Canada", dialCode: "+1", code: "CA", search: "canada 1 ca" },
      { iso: "AU", name: "Australia", dialCode: "+61", code: "AU", search: "australia 61 au" },
      { iso: "DE", name: "Germany", dialCode: "+49", code: "DE", search: "germany 49 de" },
      { iso: "FR", name: "France", dialCode: "+33", code: "FR", search: "france 33 fr" },
      { iso: "JP", name: "Japan", dialCode: "+81", code: "JP", search: "japan 81 jp" },
      { iso: "CN", name: "China", dialCode: "+86", code: "CN", search: "china 86 cn" },
      { iso: "BR", name: "Brazil", dialCode: "+55", code: "BR", search: "brazil 55 br" },
    ];
  }
};

const allCountries = buildCountries();

const isoToFlag = (iso) => {
  if (!iso) return "🏳️";
  return String.fromCodePoint(
    ...iso
      .toUpperCase()
      .split("")
      .map((c) => 127397 + c.charCodeAt(0))
  );
};

const defaultCountry = allCountries.find((c) => c.dialCode === "+91") || allCountries[0];

const PhoneInput = ({
  value,
  onChange,
  placeholder = "Enter your phone number",
  className = "",
}) => {
  const isControlled = value && typeof onChange === "function";
  const [internal, setInternal] = useState({
    countryCode: defaultCountry.dialCode,
    phone: "",
  });

  const current = isControlled ? value : internal;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  const filtered = useMemo(() => {
    if (!query) return allCountries.slice(0, 200); // Show limited list initially
    const q = query.toLowerCase();
    return allCountries.filter((c) => c.search.includes(q)); // Search across ALL countries
  }, [query]);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const setValue = (next) => {
    if (isControlled) onChange(next);
    else setInternal(next);
  };

  const handleCountrySelect = (dialCode) => {
    setValue({ ...current, countryCode: dialCode });
    setOpen(false);
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    // Allow digits, spaces, hyphens, parentheses for UX; store digits only
    const digits = raw.replace(/[^0-9]/g, "");
    setValue({ ...current, phone: digits });
  };

  const selected = useMemo(() => {
    return (
      allCountries.find((c) => c.dialCode === current.countryCode) || defaultCountry
    );
  }, [current.countryCode]);

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="px-3 py-3 border border-gray-300 rounded-xl bg-white flex items-center gap-2 hover:border-[#04CE78] focus:outline-none focus:ring-2 focus:ring-[#04CE78]"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="text-lg leading-none">
            {isoToFlag(selected.iso)}
          </span>
          <span className="text-sm font-medium text-gray-700">{selected.dialCode}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        <input
          type="tel"
          inputMode="tel"
          value={current.phone}
          onChange={handlePhoneChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#04CE78] focus:border-transparent transition-all duration-200"
          placeholder={placeholder}
        />
      </div>

      {open && (
        <div className="mt-2 absolute z-50 bg-white border border-gray-200 rounded-xl shadow-lg w-[min(480px,92vw)]">
          <div className="p-2 border-b border-gray-100 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-2 py-2 outline-none text-sm"
              placeholder="Search country or code"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto">
            {filtered.map((c) => (
              <li key={c.iso}>
                <button
                  type="button"
                  onClick={() => handleCountrySelect(c.dialCode)}
                  className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-gray-50 ${c.dialCode === selected.dialCode ? "bg-green-50" : ""
                    }`}
                >
                  <span className="text-lg">{isoToFlag(c.iso)}</span>
                  <span className="flex-1 text-sm text-gray-800">{c.name}</span>
                  <span className="text-sm font-medium text-gray-700">{c.dialCode}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-sm text-gray-500">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;


