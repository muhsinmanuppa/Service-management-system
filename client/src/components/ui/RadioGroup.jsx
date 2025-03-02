import React from "react";

export const RadioGroup = React.forwardRef(({
  className = "",
  children,
  onChange,
  value,
  name,
  ...props
}, ref) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  // Clone children with additional props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        name,
        checked: child.props.value === value,
        onChange: handleChange,
      });
    }
    return child;
  });

  return (
    <div
      ref={ref}
      className={`space-y-2 ${className}`}
      role="radiogroup"
      {...props}
    >
      {enhancedChildren}
    </div>
  );
});

RadioGroup.displayName = "RadioGroup";

export const Radio = React.forwardRef(({
  className = "",
  label,
  id,
  value,
  checked,
  onChange,
  disabled = false,
  error,
  helper,
  name,
  ...props
}, ref) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-4 w-4 border-gray-300 text-blue-600
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
            ${error ? "border-red-300" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {label && (
        <div className="ml-3 text-sm">
          <label
            htmlFor={id}
            className={`font-medium text-gray-700 ${
              disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            }`}
          >
            {label}
          </label>
          {helper && !error && (
            <p className="text-gray-500">{helper}</p>
          )}
          {error && (
            <p className="text-red-600">{error}</p>
          )}
        </div>
      )}
    </div>
  );
});

Radio.displayName = "Radio";