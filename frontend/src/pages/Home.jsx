/**
 * Home Page - Movie Discovery based on Mood
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ExplanationSection from '../components/ExplanationSection';
import { getRecommendations, addFavourite, getFavourites, removeFavourite } from '../services/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [explanation, setExplanation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMood, setCurrentMood] = useState('');
  const [favouriteIds, setFavouriteIds] = useState(new Set());
  const abortControllerRef = useRef(null);
  
  const loadFavourites = useCallback(async () => {
    try {
      const favourites = await getFavourites();
      const ids = new Set(favourites.map(f => f.movie_id));
      setFavouriteIds(ids);
    } catch (err) {
      // Silent fail for favourites loading
    }
  }, []);
  
  // Load favourites on mount
  useEffect(() => {
    loadFavourites();
  }, [loadFavourites]);
  
  const handleSearch = useCallback(async (mood, page = 1) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    setIsLoading(true);
    setError(null);
    
    if (mood !== undefined) {
      setCurrentMood(mood);
    }
    
    const searchMood = mood !== undefined ? mood : currentMood;
    
    try {
      const data = await getRecommendations(searchMood, page);
      setMovies(data.movies);
      setExplanation(data.explanation);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
      
      if (page === 1) {
        setTimeout(() => {
          window.scrollTo({ top: 600, behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError(err.response?.data?.detail || 'Failed to get recommendations. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentMood]);
  
  const handlePageChange = useCallback((page) => {
    handleSearch(undefined, page);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  }, [handleSearch]);
  
  const handleFavourite = useCallback(async (movie) => {
    try {
      if (favouriteIds.has(movie.id)) {
        await removeFavourite(movie.id);
        setFavouriteIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(movie.id);
          return newSet;
        });
      } else {
        await addFavourite(movie);
        setFavouriteIds(prev => new Set([...prev, movie.id]));
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update favourite');
    }
  }, [favouriteIds]);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero onSearch={(mood) => handleSearch(mood, 1)} isLoading={isLoading} />
      
      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading && <LoadingSpinner message="Finding perfect movies for you..." />}
        
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}
        
        {!isLoading && movies.length > 0 && (
          <>
            {/* AI Explanation */}
            <ExplanationSection explanation={explanation} />
            
            {/* Movie Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className="fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <MovieCard
                    movie={movie}
                    onFavourite={handleFavourite}
                    isFavourite={favouriteIds.has(movie.id)}
                  />
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
        
        {!isLoading && !error && movies.length === 0 && currentMood && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <p className="text-xl text-gray-400">No movies found. Try a different mood!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
