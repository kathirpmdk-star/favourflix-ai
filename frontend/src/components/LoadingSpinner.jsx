/**
 * Loading Spinner Component
 */
const LoadingSpinner = ({ size = 'large', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 border-2',
    medium: 'w-12 h-12 border-3',
    large: 'w-16 h-16 border-4'
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className={`${sizeClasses[size]} border-accent-primary border-t-transparent rounded-full animate-spin`}></div>
      {message && (
        <p className="mt-4 text-gray-400 text-lg animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
