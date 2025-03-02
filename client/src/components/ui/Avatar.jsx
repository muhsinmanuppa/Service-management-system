import React from "react";

export const Avatar = ({
  src,
  alt,
  fallback,
  size = "md",
  shape = "circle",
  status,
  statusPosition = "bottom-right",
  className = "",
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const getSizeClass = () => {
    const sizes = {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-16 w-16 text-xl",
      "2xl": "h-20 w-20 text-2xl",
    };
    return sizes[size] || sizes.md;
  };

  const getShapeClass = () => {
    return shape === "square" ? "rounded-md" : "rounded-full";
  };

  const getStatusClass = () => {
    const statusColors = {
      online: "bg-green-500",
      offline: "bg-gray-500",
      busy: "bg-red-500",
      away: "bg-yellow-500",
    };
    return statusColors[status] || "";
  };

  const getStatusPositionClass = () => {
    const positions = {
      "top-right": "-top-1 -right-1",
      "top-left": "-top-1 -left-1",
      "bottom-right": "-bottom-1 -right-1",
      "bottom-left": "-bottom-1 -left-1",
    };
    return positions[statusPosition] || positions["bottom-right"];
  };

  const getInitials = () => {
    if (!alt) return "?";
    return alt
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative inline-block">
      <div
        className={`
          relative inline-flex items-center justify-center
          overflow-hidden bg-gray-100 text-gray-600
          ${getSizeClass()}
          ${getShapeClass()}
          ${className}
        `}
        {...props}
      >
        {!imageError && src ? (
          <img
            src={src}
            alt={alt}
            onError={handleError}
            className={`h-full w-full object-cover ${getShapeClass()}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-medium">
            {fallback || getInitials()}
          </div>
        )}
      </div>
      
      {status && (
        <span
          className={`
            absolute block h-2.5 w-2.5 rounded-full ring-2 ring-white
            ${getStatusClass()}
            ${getStatusPositionClass()}
          `}
        />
      )}
    </div>
  );
};