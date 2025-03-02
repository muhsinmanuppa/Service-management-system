import React from "react";

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-4 py-3 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`px-4 py-3 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  className = "",
  bodyClassName = "",
  headerClassName = "",
  footerClassName = "",
  shadow = "md",
  bordered = true,
  padding = "md",
  rounded = "md",
}) => {
  const getShadowClass = () => {
    const shadows = {
      none: "",
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };
    return shadows[shadow] || shadows.md;
  };

  const getPaddingClass = () => {
    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    };
    return paddings[padding] || paddings.md;
  };

  const getRoundedClass = () => {
    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    };
    return roundedClasses[rounded] || roundedClasses.md;
  };

  return (
    <div
      className={`
        bg-white ${getRoundedClass()} ${getShadowClass()}
        ${bordered ? "border border-gray-200" : ""}
        ${className}
      `}
    >
      {(title || subtitle || headerAction) && (
        <CardHeader className={headerClassName}>
          <div className="flex justify-between items-center">
            <div>
              {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
              {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className={`${getPaddingClass()} ${bodyClassName}`}>{children}</CardContent>
      {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter };
export default Card;