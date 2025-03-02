import React, { useState, useRef, useEffect } from "react";

export const Dropdown = ({ 
  trigger, 
  children, 
  align = "left",
  width = "w-48", 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const getAlignmentClasses = () => {
    switch (align) {
      case "left":
        return "left-0";
      case "right":
        return "right-0";
      case "center":
        return "left-1/2 -translate-x-1/2";
      default:
        return "left-0";
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div 
          className={`absolute z-10 mt-2 ${width} rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${getAlignmentClasses()}`}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ 
  children, 
  onClick,
  className = "",
  disabled = false
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={`
        px-4 py-2 text-sm text-gray-700 cursor-pointer
        hover:bg-gray-100 hover:text-gray-900
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      role="menuitem"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export const DropdownDivider = ({ className = "" }) => (
  <div className={`h-px my-1 bg-gray-200 ${className}`} role="separator" />
);