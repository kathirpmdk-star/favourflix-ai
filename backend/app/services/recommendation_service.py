"""Recommendation service orchestrating Gemini and TMDB"""
from typing import Dict
from sqlalchemy.orm import Session
from .gemini_service import GeminiService
from .tmdb_service import TMDBService
from ..models.models import History
from ..schemas.schemas import Movie


class RecommendationService:
    """Service for orchestrating movie recommendations"""
    
    def __init__(self):
        """Initialize recommendation service with AI and movie services"""
        self.gemini_service = GeminiService()
        self.tmdb_service = TMDBService()
    
    async def get_recommendations(
        self, 
        mood: str, 
        page: int,
        db: Session
    ) -> Dict:
        """
        Get movie recommendations based on mood
        
        Process:
        1. Convert mood to genres using Gemini AI
        2. Fetch movies from TMDB
        3. Save search to history
        4. Return formatted response
        
        Args:
            mood: User's mood or situation
            page: Page number for pagination
            db: Database session
            
        Returns:
            Dict with explanation, movies, and pagination info
        """
        # Step 1: Get genres and explanation from AI
        ai_response = await self.gemini_service.mood_to_genres(mood)
        genre_ids = ai_response["genre_ids"]
        explanation = ai_response["explanation"]
        
        # Step 2: Fetch movies from TMDB
        tmdb_response = await self.tmdb_service.discover_movies(
            genre_ids=genre_ids,
            page=page
        )
        
        # Step 3: Save to history (only on first page to avoid duplicates)
        if page == 1:
            history_entry = History(
                mood=mood,
                genres=",".join(map(str, genre_ids)),
                explanation=explanation
            )
            db.add(history_entry)
            db.commit()
        
        # Step 4: Format movies
        movies = [
            Movie(
                id=movie.get("id"),
                title=movie.get("title", ""),
                overview=movie.get("overview"),
                poster_path=movie.get("poster_path"),
                backdrop_path=movie.get("backdrop_path"),
                vote_average=movie.get("vote_average"),
                release_date=movie.get("release_date"),
                genre_ids=movie.get("genre_ids", [])
            )
            for movie in tmdb_response["results"]
        ]
        
        return {
            "explanation": explanation,
            "page": tmdb_response["page"],
            "total_pages": tmdb_response["total_pages"],
            "total_results": tmdb_response["total_results"],
            "movies": movies
        }
