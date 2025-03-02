import React from "react";

const variantStyles = {
  primary: "bg-blue-100 text-blue-800",
  secondary: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  danger: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-indigo-100 text-indigo-800",
};

const sizeStyles = {
  xs: "text-xs px-1.5 py-0.5",
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-0.5",
  lg: "text-sm px-3 py-1",
};

const Badge = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  rounded = true,
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${rounded ? "rounded-full" : "rounded"}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};
export { Badge };
export default Badge;
