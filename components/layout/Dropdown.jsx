
"use client";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const DropdownSelect = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    // Handle both old pattern (event.target.value) and new pattern (direct value)
    if (typeof onChange === 'function') {
      if (onChange.length === 1) {
        // New pattern: onChange(value)
        onChange(option);
      } else {
        // Old pattern: onChange({ target: { value } })
        onChange({ target: { value: option } });
      }
    }
    setOpen(false);
    setQuery("");
  };

  // Focus the search input when the dropdown opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const filteredOptions = Array.isArray(options)
    ? options.filter((opt) =>
        String(opt).toLowerCase().includes(query.trim().toLowerCase())
      )
    : [];

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        className="w-full bg-[#F5F7FA] rounded-lg flex flex-row items-center justify-between px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-3.5 md:py-4 lg:py-4 text-sm sm:text-base lg:text-lg font-medium focus:outline-none border border-gray-200 hover:border-gray-300 transition-all duration-200 min-h-[48px] sm:min-h-[52px] md:min-h-[56px] lg:min-h-[60px] touch-manipulation cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={`truncate flex-1 text-left ${value ? "text-gray-900" : "text-gray-500"}`}>
          {value || placeholder || `Select ${label}`}
        </span>
        <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-600 transition-transform duration-200 flex-shrink-0 ml-2 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-full">
          <div className="p-2 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${label}...`}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`w-full text-left px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 hover:bg-[#04CE78]/10 text-gray-700 text-sm sm:text-base lg:text-lg transition-colors duration-200 touch-manipulation cursor-pointer ${value === option ? "bg-[#04CE78]/20 font-semibold" : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

DropdownSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default DropdownSelect;
