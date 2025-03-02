import React from "react";

const variantStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  success: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
};

const sizeStyles = {
  xs: "py-1 px-2 text-xs",
  sm: "py-1.5 px-3 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-2.5 px-5 text-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  type = "button",
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
        rounded-md font-medium transition-colors duration-200
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${fullWidth ? "w-full" : ""}
        ${disabled || isLoading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </div>
      )}
    </button>
  );
};

export { Button };
export default Button;