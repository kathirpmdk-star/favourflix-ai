/**
 * Hero Section Component
 */
import { useState, useCallback } from 'react';

const Hero = ({ onSearch, isLoading }) => {
  const [mood, setMood] = useState('');
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (mood.trim()) {
      onSearch(mood.trim());
    }
  }, [mood, onSearch]);
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-ott-gray via-ott-dark to-ott-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #e50914 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight fade-in-up">
            Discover Movies Based on Your{' '}
            <span className="gradient-text animate-glow inline-block">Mood</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 fade-in font-light tracking-wide">
            Let AI understand your feelings and recommend the perfect movies for you
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="scale-in">
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full opacity-30 group-hover:opacity-50 blur transition duration-500"></div>
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="How are you feeling today? (e.g., happy, sad, adventurous...)"
                className="relative w-full px-7 py-5 pr-36 text-lg rounded-full bg-ott-light/90 border-2 border-white/10 focus:border-accent-primary focus:outline-none focus:ring-4 focus:ring-accent-primary/20 text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !mood.trim()}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-7 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isLoading || !mood.trim()
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:shadow-xl hover:shadow-accent-primary/50 hover:scale-105 active:scale-95'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
