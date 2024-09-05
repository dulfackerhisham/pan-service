import React, { useState, useRef, useEffect } from "react";

const PanApplicationTitle = ({selectedTitle, setSelectedTitle}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedTitle(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options = ["Mr", "Mrs"];

  return (
    <div className="relative w-36 m-4" ref={dropdownRef}>
      <h1 className="text-[8px] font-light">
        Title <span className="text-red-500">*</span>
      </h1>
      <input
        type="text"
        name="Title"
        value={selectedTitle}
        placeholder="--select--"
        className="border border-gray-300 w-full rounded-md font-light px-2 py-1 text-[8px] leading-3 cursor-pointer outline-none"
        onClick={handleToggle}
        readOnly
        required
      />
      {isOpen && (
        <div className="absolute top-full left-0 w-full border border-gray-300 bg-white z-10">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="px-2 py-1 text-[7px] hover:bg-gray-200 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default PanApplicationTitle;
