import React from "react";

// Table Root Component
export const Table = React.forwardRef(({ className = "", ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={`w-full caption-bottom text-sm ${className}`}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

// Table Header Component
export const TableHeader = React.forwardRef(({ className = "", ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
));
TableHeader.displayName = "TableHeader";

// Table Body Component
export const TableBody = React.forwardRef(({ className = "", ...props }, ref) => (
  <tbody
    ref={ref}
    className={`[&_tr:last-child]:border-0 ${className}`}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// Table Footer Component
export const TableFooter = React.forwardRef(({ className = "", ...props }, ref) => (
  <tfoot
    ref={ref}
    className={`bg-gray-50 font-medium text-gray-900 ${className}`}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// Table Row Component
export const TableRow = React.forwardRef(({ className = "", ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-100 ${className}`}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// Table Head Component
export const TableHead = React.forwardRef(({ className = "", ...props }, ref) => (
  <th
    ref={ref}
    className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
));
TableHead.displayName = "TableHead";

// Table Cell Component
export const TableCell = React.forwardRef(({ className = "", ...props }, ref) => (
  <td
    ref={ref}
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
));
TableCell.displayName = "TableCell";

// Table Caption Component
export const TableCaption = React.forwardRef(({ className = "", ...props }, ref) => (
  <caption
    ref={ref}
    className={`mt-4 text-sm text-gray-500 ${className}`}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";