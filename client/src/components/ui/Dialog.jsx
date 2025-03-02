import React, { Fragment, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// Dialog Root Component
export const Dialog = ({ children, open, onOpenChange }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

// Dialog Context for sharing state between components
const DialogContext = React.createContext({
  open: false,
  onOpenChange: () => {}
});

// Dialog Trigger Component
export const DialogTrigger = ({ children, asChild, ...props }) => {
  const { onOpenChange } = React.useContext(DialogContext);
  
  const handleClick = (e) => {
    e.preventDefault();
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

// Dialog Content Component
export const DialogContent = ({
  children,
  className = "",
  ...props
}) => {
  const { open, onOpenChange } = React.useContext(DialogContext);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    
    const handleClickOutside = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto p-4"
      aria-hidden="true"
      {...props}
    >
      <div
        ref={contentRef}
        className={`bg-white rounded-lg shadow-lg relative max-w-md w-full mx-auto p-6 ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

// Dialog Header Component
export const DialogHeader = ({ className = "", ...props }) => (
  <div className={`mb-4 text-center sm:text-left ${className}`} {...props} />
);

// Dialog Title Component
export const DialogTitle = ({ className = "", ...props }) => (
  <h3
    className={`text-lg font-semibold text-gray-900 ${className}`}
    {...props}
  />
);

// Dialog Description Component
export const DialogDescription = ({ className = "", ...props }) => (
  <p className={`mt-2 text-sm text-gray-500 ${className}`} {...props} />
);

// Dialog Footer Component
export const DialogFooter = ({ className = "", ...props }) => (
  <div
    className={`mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
    {...props}
  />
);

// Dialog Close Component
export const DialogClose = ({ className = "", ...props }) => {
  const { onOpenChange } = React.useContext(DialogContext);
  
  return (
    <button
      type="button"
      className={`absolute top-4 right-4 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${className}`}
      onClick={() => onOpenChange(false)}
      {...props}
    >
      <span className="sr-only">Close</span>
      <svg
        className="h-5 w-5"
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
  );
};