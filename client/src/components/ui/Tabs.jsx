import React, { useState, createContext, useContext, useEffect } from "react";

// Create a context for tabs
const TabsContext = createContext({
  selectedTab: null,
  changeTab: () => {},
});

export const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  className = "",
  children,
  ...props
}) => {
  const [selectedTab, setSelectedTab] = useState(value || defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedTab(value);
    }
  }, [value]);

  const changeTab = (tabValue) => {
    if (value === undefined) {
      setSelectedTab(tabValue);
    }
    if (onValueChange) {
      onValueChange(tabValue);
    }
  };

  return (
    <TabsContext.Provider value={{ selectedTab, changeTab }}>
      <div className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ className = "", children, ...props }) => {
  return (
    <div
      role="tablist"
      className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, className = "", children, ...props }) => {
  const { selectedTab, changeTab } = useContext(TabsContext);
  const isSelected = selectedTab === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      onClick={() => changeTab(value)}
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50 
        ${isSelected 
          ? "bg-white text-gray-900 shadow-sm" 
          : "text-gray-500 hover:text-gray-900"}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, className = "", children, ...props }) => {
  const { selectedTab } = useContext(TabsContext);
  const isSelected = selectedTab === value;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      data-state={isSelected ? "active" : "inactive"}
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};