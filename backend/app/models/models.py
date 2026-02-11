"""SQLAlchemy database models"""
from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from ..database import Base


class Favourite(Base):
    """Model for storing user's favourite movies"""
    __tablename__ = "favourites"
    
    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer, unique=True, nullable=False, index=True)
    title = Column(String, nullable=False)
    overview = Column(Text)
    poster_path = Column(String)
    backdrop_path = Column(String)
    vote_average = Column(Float)
    release_date = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<Favourite(id={self.id}, movie_id={self.movie_id}, title='{self.title}')>"


class History(Base):
    """Model for storing mood search history"""
    __tablename__ = "history"
    
    id = Column(Integer, primary_key=True, index=True)
    mood = Column(String, nullable=False)
    genres = Column(String, nullable=False)  # Comma-separated genre IDs
    explanation = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<History(id={self.id}, mood='{self.mood}')>"
