/**
 * Hero Section Component
 */
import { useState } from 'react';

const Hero = ({ onSearch, isLoading }) => {
  const [mood, setMood] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim()) {
      onSearch(mood.trim());
    }
  };
  
  const moodSuggestions = [
    'Feeling adventurous and excited 🚀',
    'Need a good laugh 😂',
    'Want something thrilling 😱',
    'In the mood for romance 💕',
    'Feeling nostalgic 🌟',
    'Need motivation 💪'
  ];
  
  const handleSuggestionClick = (suggestion) => {
    setMood(suggestion);
  };
  
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
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Discover Movies Based on Your{' '}
            <span className="gradient-text">Mood</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10">
            Let AI understand your feelings and recommend the perfect movies for you
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="How are you feeling today? (e.g., happy, sad, adventurous...)"
                className="w-full px-6 py-4 pr-32 text-lg rounded-full bg-ott-light border-2 border-transparent focus:border-accent-primary focus:outline-none text-white placeholder-gray-500 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !mood.trim()}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-full font-semibold transition-all ${
                  isLoading || !mood.trim()
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-accent-primary text-white hover:bg-accent-secondary hover:shadow-glow'
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
          
          {/* Mood Suggestions */}
          <div className="flex flex-wrap justify-center gap-3">
            {moodSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isLoading}
                className="px-4 py-2 rounded-full bg-ott-light text-sm text-gray-300 hover:bg-ott-gray hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
