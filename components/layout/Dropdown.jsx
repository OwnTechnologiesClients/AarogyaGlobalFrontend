"use client";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const DropdownSelect = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    onChange({ target: { value: option } });
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative ">
      <button
        type="button"
        className="bg-[#F5F7FA] rounded-lg w-full justify-between flex flex-row items-center md:pl-[56px] pl-[12px] md:pr-[24.5px] pr-[24px] md:py-[20px] py-[18px]  md:mr-[50px]   text-lg font-normal focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={value ? "" : "text-[#555555]"}>
          {value || placeholder || label}
        </span>
        <ChevronDown className=" h-6 w-6 text-gray-600" />
      </button>
      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`w-full text-left px-6 py-3 hover:bg-[#04CE78]/10 text-gray-700 ${
                value === option ? "bg-[#04CE78]/20 font-semibold" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
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
