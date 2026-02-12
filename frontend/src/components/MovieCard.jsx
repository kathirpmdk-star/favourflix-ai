/**
 * Movie Card Component with Netflix-style hover effects
 */
import { useState, useMemo, useCallback, memo } from 'react';
import { getImageUrl } from '../services/api';

const MovieCard = memo(({ movie, onFavourite, isFavourite, showFavouriteButton = true }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const posterUrl = useMemo(() => getImageUrl(movie.poster_path), [movie.poster_path]);
  const backdropUrl = useMemo(() => getImageUrl(movie.backdrop_path, 'w780'), [movie.backdrop_path]);
  const displayImage = useMemo(
    () => (isHovered && backdropUrl) ? backdropUrl : posterUrl,
    [isHovered, backdropUrl, posterUrl]
  );
  
  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);
  
  const handleFavouriteClick = useCallback((e) => {
    e.stopPropagation();
    onFavourite(movie);
  }, [onFavourite, movie]);
  
  return (
    <div
      className="group relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-110 hover:z-10 hover:shadow-2xl hover:shadow-accent-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Movie Poster */}
      <div className="aspect-[2/3] overflow-hidden bg-ott-light">
        {imageError || !displayImage ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ott-gray to-ott-light">
            <div className="text-center p-4">
              <svg className="w-16 h-16 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              <p className="text-sm text-gray-500 font-medium">{movie.title}</p>
            </div>
          </div>
        ) : (
          <img
            src={displayImage}
            alt={movie.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </div>
      
      {/* Hover Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className={`absolute bottom-0 left-0 right-0 p-5 transform transition-all duration-500 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 text-sm font-semibold">
                ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
              </span>
              {movie.release_date && (
                <span className="text-gray-400 text-sm">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              )}
            </div>
            
            {showFavouriteButton && onFavourite && (
              <button
                onClick={handleFavouriteClick}
                className={`p-2 rounded-full transition-all ${
                  isFavourite
                    ? 'bg-accent-primary text-white hover:bg-accent-secondary'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
              >
                <svg className="w-5 h-5" fill={isFavourite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            )}
          </div>
          
          {movie.overview && (
            <p className="text-gray-300 text-sm line-clamp-3">
              {movie.overview}
            </p>
          )}
        </div>
      </div>
      
      {/* Rating Badge (visible when not hovering) */}
      {!isHovered && movie.vote_average && (
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-yellow-400 font-bold text-sm flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{movie.vote_average.toFixed(1)}</span>
          </span>
        </div>
      )}
    </div>
  );
});

export default MovieCard;
