import React from "react";

export const Input = React.forwardRef(
  ({ 
    className = "", 
    type = "text",
    error,
    label,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled = false,
    ...props 
  }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            disabled={disabled}
            className={`
              block rounded-md border
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 
                'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
              ${leftIcon ? 'pl-10' : 'pl-4'}
              ${rightIcon ? 'pr-10' : 'pr-4'}
              ${fullWidth ? 'w-full' : ''}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;