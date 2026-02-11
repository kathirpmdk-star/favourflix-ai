"""FastAPI main application"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .config import settings
from .database import init_db
from .routers import api


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for startup and shutdown"""
    # Startup: Initialize database tables
    print("🚀 Starting FavourFlix-AI Backend...")
    print("📊 Initializing database...")
    init_db()
    print("✅ Database initialized successfully")
    yield
    # Shutdown
    print("👋 Shutting down FavourFlix-AI Backend...")


# Create FastAPI application
app = FastAPI(
    title="FavourFlix-AI API",
    description="AI-powered movie recommendation platform with mood-based search",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api.router)


@app.get("/")
async def root():
    """Root endpoint - health check"""
    return {
        "message": "Welcome to FavourFlix-AI API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
