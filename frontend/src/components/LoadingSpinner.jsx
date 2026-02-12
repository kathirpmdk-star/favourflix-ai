/**
 * Loading Spinner Component - Premium Edition
 */
import { memo } from 'react';

const LoadingSpinner = memo(({ size = 'large', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 border-2',
    medium: 'w-12 h-12 border-3',
    large: 'w-20 h-20 border-4'
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className={`${sizeClasses[size]} border-accent-primary/30 border-t-accent-primary rounded-full animate-spin`}></div>
        {/* Inner pulsing circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-accent-primary rounded-full animate-pulse"></div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-xl animate-pulse"></div>
      </div>
      {message && (
        <p className="mt-6 text-gray-400 text-lg font-medium animate-pulse tracking-wide">{message}</p>
      )}
    </div>
  );
});

export default LoadingSpinner;
