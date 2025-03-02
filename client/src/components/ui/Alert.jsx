import React from "react";

const variantStyles = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-400",
    title: "text-blue-800",
    text: "text-blue-700",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "text-green-400",
    title: "text-green-800",
    text: "text-green-700",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "text-yellow-400",
    title: "text-yellow-800",
    text: "text-yellow-700",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-400",
    title: "text-red-800",
    text: "text-red-700",
  },
};

const AlertIcons = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const Alert = ({
  title,
  children,
  variant = "info",
  icon = true,
  dismissible = false,
  onDismiss,
  className = "",
}) => {
  const styles = variantStyles[variant] || variantStyles.info;
  const variantIcon = AlertIcons[variant];

  return (
    <div
      className={`
        border rounded-md p-4 ${styles.bg} ${styles.border}
        ${className}
      `}
      role="alert"
    >
      <div className="flex">
        {icon && (
          <div className={`flex-shrink-0 ${styles.icon}`}>
            {variantIcon}
          </div>
        )}
        <div className={`${icon ? "ml-3" : ""} w-full`}>
          <div className="flex justify-between items-center">
            {title && (
              <h3 className={`text-sm font-medium ${styles.title}`}>
                {title}
              </h3>
            )}
            {dismissible && (
              <button
                type="button"
                className={`ml-auto -mr-1.5 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.icon} hover:bg-gray-100`}
                onClick={onDismiss}
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {children && (
            <div className={`mt-2 text-sm ${styles.text}`}>{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;