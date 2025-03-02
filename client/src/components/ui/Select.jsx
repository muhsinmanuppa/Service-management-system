import React from "react";

const Select = ({
  label,
  id,
  name,
  options = [],
  value,
  onChange,
  onBlur,
  error,
  helper,
  placeholder = "Select an option",
  fullWidth = true,
  required = false,
  disabled = false,
  className = "",
  selectClassName = "",
  labelClassName = "",
  ...props
}) => {
  return (
    <div className={`mb-4 ${fullWidth ? "w-full" : ""} ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`
          block w-full rounded-md border py-2 pl-3 pr-10
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}
          ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}
          focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out
          ${selectClassName}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {helper && !error && <p className="mt-1 text-xs text-gray-500">{helper}</p>}
    </div>
  );
};

export default Select;