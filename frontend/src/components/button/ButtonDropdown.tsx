import React, { useState, useEffect, useRef } from "react";

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface ButtonDropdownProps {
  buttonLabel: string;
  options: DropdownOption[];
}

const ButtonDropdown: React.FC<ButtonDropdownProps> = ({ buttonLabel, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-indigo-500 float-right text-white flex items-center px-2 rounded-md py-1 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {buttonLabel}
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 top-7 w-48 bg-white border border-gray-200 rounded shadow-lg">
          {options.map((option, index) => (
            <li key={index} className="border-b last:border-none">
              <button
                onClick={() => {
                  option.onClick();
                  closeDropdown();
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ButtonDropdown;
