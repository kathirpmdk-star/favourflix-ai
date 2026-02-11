/**
 * API Service for FavourFlix-AI
 * Handles all HTTP requests to the backend
 */
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// TMDB image base URLs
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const POSTER_SIZE = 'w500';
export const BACKDROP_SIZE = 'w1280';

/**
 * Get full image URL from TMDB path
 */
export const getImageUrl = (path, size = POSTER_SIZE) => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

/**
 * Get movie recommendations based on mood
 */
export const getRecommendations = async (mood, page = 1) => {
  const response = await api.post(`/api/recommend?page=${page}`, { mood });
  return response.data;
};

/**
 * Add a movie to favourites
 */
export const addFavourite = async (movie) => {
  const response = await api.post('/api/favourites', {
    movie_id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
  });
  return response.data;
};

/**
 * Get all favourite movies
 */
export const getFavourites = async () => {
  const response = await api.get('/api/favourites');
  return response.data;
};

/**
 * Remove a movie from favourites
 */
export const removeFavourite = async (movieId) => {
  const response = await api.delete(`/api/favourites/${movieId}`);
  return response.data;
};

/**
 * Get search history
 */
export const getHistory = async (limit = 20) => {
  const response = await api.get(`/api/history?limit=${limit}`);
  return response.data;
};

export default api;
