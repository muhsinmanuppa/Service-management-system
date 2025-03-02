import React from "react";

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className = "",
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers array with ellipsis
  const getPageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 3; // siblings + current + first + last

    // If there are not enough pages to compress
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    // Fixed values
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // No left dots, but right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    // No right dots, but left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    // Both left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center justify-between py-4 ${className}`}
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          of <span className="font-medium">{totalItems}</span> results
        </p>
      </div>
      <div className="flex justify-center flex-1 sm:justify-end">
        <div className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 
                      ${currentPage === 1 
                          ? "cursor-not-allowed" 
                          : "hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}`}
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {pageNumbers?.map((pageNumber, i) => (
            <React.Fragment key={i}>
              {pageNumber === "..." ? (
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(pageNumber)}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300
                              ${pageNumber === currentPage
                                ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                : "text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              }`}
                >
                  {pageNumber}
                </button>
              )}
            </React.Fragment>
          ))}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300
                      ${currentPage === totalPages 
                          ? "cursor-not-allowed" 
                          : "hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}`}
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}