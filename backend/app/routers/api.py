"""API routes for FavourFlix-AI"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List

from ..database import get_db
from ..schemas.schemas import (
    MoodRequest,
    RecommendationResponse,
    FavouriteCreate,
    FavouriteResponse,
    HistoryResponse
)
from ..models.models import Favourite, History
from ..services.recommendation_service import RecommendationService

router = APIRouter(prefix="/api", tags=["api"])


@router.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(
    request: MoodRequest,
    page: int = Query(1, ge=1, le=500, description="Page number"),
    db: Session = Depends(get_db)
):
    """
    Get movie recommendations based on mood
    
    - Converts mood to genres using Gemini AI
    - Fetches movies from TMDB with pagination
    - Returns explanation and movie list
    """
    try:
        recommendation_service = RecommendationService()
        result = await recommendation_service.get_recommendations(
            mood=request.mood,
            page=page,
            db=db
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get recommendations: {str(e)}"
        )


@router.post("/favourites", response_model=FavouriteResponse)
async def add_favourite(
    favourite: FavouriteCreate,
    db: Session = Depends(get_db)
):
    """
    Add a movie to favourites
    
    - Stores movie details in database
    - Prevents duplicate entries
    """
    try:
        db_favourite = Favourite(
            movie_id=favourite.movie_id,
            title=favourite.title,
            overview=favourite.overview,
            poster_path=favourite.poster_path,
            backdrop_path=favourite.backdrop_path,
            vote_average=favourite.vote_average,
            release_date=favourite.release_date
        )
        db.add(db_favourite)
        db.commit()
        db.refresh(db_favourite)
        return db_favourite
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="This movie is already in your favourites"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to add favourite: {str(e)}"
        )


@router.get("/favourites", response_model=List[FavouriteResponse])
async def get_favourites(db: Session = Depends(get_db)):
    """
    Get all favourite movies
    
    - Returns list of all saved favourites
    - Ordered by most recently added
    """
    try:
        favourites = db.query(Favourite).order_by(Favourite.created_at.desc()).all()
        return favourites
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch favourites: {str(e)}"
        )


@router.delete("/favourites/{movie_id}")
async def remove_favourite(
    movie_id: int,
    db: Session = Depends(get_db)
):
    """
    Remove a movie from favourites
    
    - Deletes favourite by movie_id
    """
    try:
        favourite = db.query(Favourite).filter(Favourite.movie_id == movie_id).first()
        if not favourite:
            raise HTTPException(status_code=404, detail="Favourite not found")
        
        db.delete(favourite)
        db.commit()
        return {"message": "Favourite removed successfully"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to remove favourite: {str(e)}"
        )


@router.get("/history", response_model=List[HistoryResponse])
async def get_history(
    limit: int = Query(20, ge=1, le=100, description="Maximum number of history entries"),
    db: Session = Depends(get_db)
):
    """
    Get mood search history
    
    - Returns list of past searches with AI explanations
    - Ordered by most recent
    """
    try:
        history = db.query(History).order_by(History.created_at.desc()).limit(limit).all()
        return history
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch history: {str(e)}"
        )
