/**
 * Pagination Component
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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
    <div className="flex items-center justify-center space-x-2 mt-12 mb-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === 1
            ? 'bg-ott-light text-gray-600 cursor-not-allowed'
            : 'bg-ott-light text-white hover:bg-accent-primary hover:shadow-glow'
        }`}
      >
        Previous
      </button>
      
      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                currentPage === page
                  ? 'bg-accent-primary text-white shadow-glow'
                  : 'bg-ott-light text-white hover:bg-ott-gray'
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === totalPages
            ? 'bg-ott-light text-gray-600 cursor-not-allowed'
            : 'bg-ott-light text-white hover:bg-accent-primary hover:shadow-glow'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
