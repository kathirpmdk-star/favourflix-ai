"""TMDB API service for fetching movie data"""
import httpx
from typing import Dict, List, Optional
from ..config import settings


class TMDBService:
    """Service for interacting with The Movie Database (TMDB) API"""
    
    BASE_URL = "https://api.themoviedb.org/3"
    
    def __init__(self):
        """Initialize TMDB service"""
        self.api_key = settings.TMDB_API_KEY
    
    async def discover_movies(
        self, 
        genre_ids: List[int], 
        page: int = 1,
        sort_by: str = "popularity.desc"
    ) -> Dict:
        """
        Discover movies by genre with pagination
        
        Args:
            genre_ids: List of TMDB genre IDs
            page: Page number for pagination (default: 1)
            sort_by: Sort method (default: popularity.desc)
            
        Returns:
            Dict with movies, page info, and metadata
        """
        # Convert genre IDs to comma-separated string
        genres_str = ",".join(map(str, genre_ids))
        
        url = f"{self.BASE_URL}/discover/movie"
        params = {
            "api_key": self.api_key,
            "with_genres": genres_str,
            "sort_by": sort_by,
            "page": page,
            "vote_count.gte": 100,  # Filter for movies with at least 100 votes
            "language": "en-US"
        }
        
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(url, params=params)
                response.raise_for_status()
                data = response.json()
                
                return {
                    "results": data.get("results", []),
                    "page": data.get("page", 1),
                    "total_pages": min(data.get("total_pages", 1), 500),  # TMDB limits to 500 pages
                    "total_results": data.get("total_results", 0)
                }
                
        except httpx.HTTPError as e:
            print(f"TMDB API error: {str(e)}")
            return {
                "results": [],
                "page": 1,
                "total_pages": 1,
                "total_results": 0
            }
    
    async def get_movie_details(self, movie_id: int) -> Optional[Dict]:
        """
        Get detailed information about a specific movie
        
        Args:
            movie_id: TMDB movie ID
            
        Returns:
            Dict with movie details or None if not found
        """
        url = f"{self.BASE_URL}/movie/{movie_id}"
        params = {
            "api_key": self.api_key,
            "language": "en-US"
        }
        
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(url, params=params)
                response.raise_for_status()
                return response.json()
                
        except httpx.HTTPError as e:
            print(f"TMDB API error: {str(e)}")
            return None
    
    async def search_movies(self, query: str, page: int = 1) -> Dict:
        """
        Search for movies by title
        
        Args:
            query: Search query
            page: Page number for pagination
            
        Returns:
            Dict with search results and pagination info
        """
        url = f"{self.BASE_URL}/search/movie"
        params = {
            "api_key": self.api_key,
            "query": query,
            "page": page,
            "language": "en-US"
        }
        
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(url, params=params)
                response.raise_for_status()
                data = response.json()
                
                return {
                    "results": data.get("results", []),
                    "page": data.get("page", 1),
                    "total_pages": min(data.get("total_pages", 1), 500),
                    "total_results": data.get("total_results", 0)
                }
                
        except httpx.HTTPError as e:
            print(f"TMDB API error: {str(e)}")
            return {
                "results": [],
                "page": 1,
                "total_pages": 1,
                "total_results": 0
            }
