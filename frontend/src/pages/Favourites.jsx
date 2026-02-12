/**
 * Favourites Page - Display saved favourite movies
 */
import { useState, useEffect, useCallback, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getFavourites, removeFavourite } from '../services/api';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadFavourites = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFavourites();
      setFavourites(data);
    } catch (err) {
      setError('Failed to load favourites. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadFavourites();
  }, [loadFavourites]);
  
  const handleRemoveFavourite = useCallback(async (movie) => {
    try {
      await removeFavourite(movie.movie_id);
      setFavourites(prev => prev.filter(f => f.movie_id !== movie.movie_id));
    } catch (err) {
      setError('Failed to remove favourite. Please try again.');
    }
  }, []);
  
  const formattedFavourites = useMemo(() => {
    return favourites.map(movie => ({
      id: movie.movie_id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    }));
  }, [favourites]);
  
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Your <span className="gradient-text">Favourites</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {favourites.length > 0 
              ? `${favourites.length} movie${favourites.length !== 1 ? 's' : ''} saved`
              : 'No favourites yet'
            }
          </p>
        </div>
        
        {/* Loading State */}
        {isLoading && <LoadingSpinner message="Loading your favourites..." />}
        
        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}
        
        {/* Favourites Grid */}
        {!isLoading && !error && favourites.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 fade-in">
            {formattedFavourites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavourite={handleRemoveFavourite}
                isFavourite={true}
              />
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && favourites.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-400 mb-4">No Favourites Yet</h2>
            <p className="text-gray-500 mb-8">Start discovering movies and add them to your favourites!</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-accent-primary hover:bg-accent-secondary text-white font-semibold rounded-lg transition-all hover:shadow-glow"
            >
              Discover Movies
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
