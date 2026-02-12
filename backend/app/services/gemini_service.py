"""Gemini AI service for mood-to-genre conversion"""
import google.generativeai as genai
from typing import Dict, List
import json
import re
from ..config import settings


class GeminiService:
    """Service for interacting with Google Gemini AI"""
    
    # TMDB Genre ID mapping
    GENRE_MAP = {
        "action": 28,
        "adventure": 12,
        "animation": 16,
        "comedy": 35,
        "crime": 80,
        "documentary": 99,
        "drama": 18,
        "family": 10751,
        "fantasy": 14,
        "history": 36,
        "horror": 27,
        "music": 10402,
        "mystery": 9648,
        "romance": 10749,
        "science fiction": 878,
        "sci-fi": 878,
        "tv movie": 10770,
        "thriller": 53,
        "war": 10752,
        "western": 37
    }
    
    def __init__(self):
        """Initialize Gemini AI client"""
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
    
    async def mood_to_genres(self, mood: str) -> Dict[str, any]:
        """
        Convert user's mood to movie genres using AI
        
        Args:
            mood: User's mood or situation description
            
        Returns:
            Dict containing genre_ids (list) and explanation (str)
        """
        prompt = f"""You are a movie recommendation expert. Based on the user's mood or situation, suggest 1-3 appropriate movie genres.

User's mood: "{mood}"

Available genres: {', '.join(self.GENRE_MAP.keys())}

Respond in this EXACT JSON format:
{{
    "genres": ["genre1", "genre2"],
    "explanation": "A friendly 2-3 sentence explanation of why these genres match the mood."
}}

Only use genres from the available list. Be creative and empathetic in your explanation."""

        try:
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Extract JSON from response (handle markdown code blocks)
            json_match = re.search(r'\{[\s\S]*\}', response_text)
            if json_match:
                json_str = json_match.group(0)
                data = json.loads(json_str)
            else:
                # Fallback parsing
                data = json.loads(response_text)
            
            # Convert genre names to IDs
            genre_ids = []
            for genre in data.get("genres", []):
                genre_lower = genre.lower().strip()
                if genre_lower in self.GENRE_MAP:
                    genre_ids.append(self.GENRE_MAP[genre_lower])
            
            # Fallback if no valid genres found
            if not genre_ids:
                genre_ids = [18, 35]  # Drama and Comedy as fallback
            
            return {
                "genre_ids": genre_ids[:3],  # Limit to 3 genres
                "explanation": data.get("explanation", "Based on your mood, here are some great movie recommendations!")
            }
            
        except Exception as e:
            print(f"Gemini API error: {str(e)}")
            # Fallback response
            return {
                "genre_ids": [18, 35],  # Drama and Comedy
                "explanation": "Based on your mood, we've selected a mix of drama and comedy films that might resonate with you right now."
            }
