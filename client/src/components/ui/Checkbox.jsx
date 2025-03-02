import React from "react";

export const Checkbox = React.forwardRef(({
  className = "",
  label,
  id,
  checked,
  onChange,
  disabled = false,
  indeterminate = false,
  error,
  helper,
  ...props
}, ref) => {
  const innerRef = React.useRef(null);
  const resolvedRef = ref || innerRef;

  React.useEffect(() => {
    if (resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [resolvedRef, indeterminate]);

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          ref={resolvedRef}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-4 w-4 rounded border-gray-300 text-blue-600
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

Checkbox.displayName = "Checkbox";