"""Pydantic schemas for request/response validation"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


# Request Schemas
class MoodRequest(BaseModel):
    """Request schema for mood-based recommendation"""
    mood: str = Field(..., min_length=1, max_length=500, description="User's mood or situation")


class FavouriteCreate(BaseModel):
    """Request schema for creating a favourite"""
    movie_id: int
    title: str
    overview: Optional[str] = None
    poster_path: Optional[str] = None
    backdrop_path: Optional[str] = None
    vote_average: Optional[float] = None
    release_date: Optional[str] = None


# Response Schemas
class Movie(BaseModel):
    """Schema for movie data from TMDB"""
    id: int
    title: str
    overview: Optional[str] = None
    poster_path: Optional[str] = None
    backdrop_path: Optional[str] = None
    vote_average: Optional[float] = None
    release_date: Optional[str] = None
    genre_ids: Optional[List[int]] = []


class RecommendationResponse(BaseModel):
    """Response schema for movie recommendations"""
    explanation: str
    page: int
    total_pages: int
    total_results: int
    movies: List[Movie]


class FavouriteResponse(BaseModel):
    """Response schema for favourite movie"""
    id: int
    movie_id: int
    title: str
    overview: Optional[str] = None
    poster_path: Optional[str] = None
    backdrop_path: Optional[str] = None
    vote_average: Optional[float] = None
    release_date: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class HistoryResponse(BaseModel):
    """Response schema for search history"""
    id: int
    mood: str
    genres: str
    explanation: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class GenreMapping(BaseModel):
    """Schema for genre mapping from Gemini API"""
    genre_ids: List[int]
    explanation: str
