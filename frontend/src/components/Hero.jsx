/**
 * Hero Section Component
 */
import { useState, useCallback, useMemo } from 'react';

const Hero = ({ onSearch, isLoading }) => {
  const [mood, setMood] = useState('');
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (mood.trim()) {
      onSearch(mood.trim());
    }
  }, [mood, onSearch]);
  
  const moodSuggestions = useMemo(() => [
    { text: 'Adventurous and Excited', icon: 'rocket' },
    { text: 'Need a Good Laugh', icon: 'smile' },
    { text: 'Thrilling and Suspenseful', icon: 'lightning' },
    { text: 'Romantic and Heartfelt', icon: 'heart' },
    { text: 'Nostalgic and Reflective', icon: 'star' },
    { text: 'Motivational and Inspiring', icon: 'fire' }
  ], []);
  
  const handleSuggestionClick = useCallback((suggestion) => {
    setMood(suggestion.text);
    onSearch(suggestion.text);
  }, [onSearch]);
  
  const getIcon = useCallback((iconName) => {
    const icons = {
      rocket: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
      smile: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
      lightning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
      heart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
      star: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
      fire: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    };
    return icons[iconName] || icons.star;
  }, []);
  
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
          <form onSubmit={handleSubmit} className="mb-10 scale-in">
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
          
          {/* Mood Suggestions */}
          <div className="flex flex-wrap justify-center gap-3">
            {moodSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isLoading}
                className="group px-5 py-2.5 rounded-full bg-ott-light text-sm text-gray-300 hover:bg-gradient-to-r hover:from-accent-primary hover:to-accent-secondary hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {getIcon(suggestion.icon)}
                </svg>
                <span className="font-medium">{suggestion.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
