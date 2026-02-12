/**
 * Pagination Component
 */
import { memo } from 'react';

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 7;
  
  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const pages = [];
    const leftSide = Math.floor(maxVisiblePages / 2);
    const rightSide = maxVisiblePages - leftSide - 1;
    
    if (currentPage <= leftSide + 1) {
      // Near the start
      for (let i = 1; i <= maxVisiblePages - 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - rightSide) {
      // Near the end
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In the middle
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <div className="flex items-center justify-center space-x-3 mt-14 mb-12 fade-in">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`group px-5 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
          currentPage === 1
            ? 'bg-ott-light text-gray-600 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-ott-light to-ott-gray text-white hover:from-accent-primary hover:to-accent-secondary hover:shadow-lg hover:scale-105'
        }`}
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </button>
      
      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500 font-bold">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative w-11 h-11 rounded-lg font-semibold transition-all duration-300 overflow-hidden group ${
                currentPage === page
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/50 scale-110'
                  : 'bg-ott-light text-white hover:bg-ott-gray hover:scale-105'
              }`}
            >
              <span className="relative z-10">{page}</span>
              {currentPage !== page && (
                <span className="absolute inset-0 bg-gradient-to-r from-accent-primary/30 to-accent-secondary/30 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              )}
            </button>
          )
        ))}
      </div>
      
      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`group px-5 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
          currentPage === totalPages
            ? 'bg-ott-light text-gray-600 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-ott-light to-ott-gray text-white hover:from-accent-primary hover:to-accent-secondary hover:shadow-lg hover:scale-105'
        }`}
      >
        <span>Next</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
});

export default Pagination;
