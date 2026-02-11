# FavourFlix-AI Backend

Production-ready FastAPI backend for AI-powered movie recommendations.

## Features

- 🤖 AI-powered mood-to-genre conversion using Google Gemini
- 🎬 Movie discovery via TMDB API with pagination
- ⭐ Favourites management
- 📜 Search history tracking
- 🗄️ PostgreSQL database with SQLAlchemy ORM
- 🔒 Environment-based configuration
- 📝 Automatic database initialization
- 🌐 CORS-enabled REST API

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL + SQLAlchemy
- **AI**: Google Gemini API
- **Movies**: TMDB API
- **Validation**: Pydantic
- **HTTP Client**: httpx (async)

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration management
│   ├── database.py          # Database setup
│   ├── models/
│   │   └── models.py        # SQLAlchemy models
│   ├── schemas/
│   │   └── schemas.py       # Pydantic schemas
│   ├── services/
│   │   ├── gemini_service.py      # Gemini AI integration
│   │   ├── tmdb_service.py        # TMDB API integration
│   │   └── recommendation_service.py  # Business logic
│   └── routers/
│       └── api.py           # API endpoints
├── requirements.txt
├── .env.example
└── .gitignore
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Create `.env` file from template:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/favourflix
GEMINI_API_KEY=your_gemini_api_key
TMDB_API_KEY=your_tmdb_api_key
CORS_ORIGINS=http://localhost:5173
```

**Get API Keys:**
- Gemini API: https://makersuite.google.com/app/apikey
- TMDB API: https://www.themoviedb.org/settings/api

### 3. Setup PostgreSQL

Install PostgreSQL and create database:

```sql
CREATE DATABASE favourflix;
```

### 4. Run the Server

```bash
# Development mode (auto-reload)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

The database tables will be created automatically on first run.

## API Endpoints

### POST /api/recommend
Get mood-based movie recommendations

**Request:**
```json
{
  "mood": "feeling adventurous and excited"
}
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)

**Response:**
```json
{
  "explanation": "AI-generated explanation...",
  "page": 1,
  "total_pages": 50,
  "total_results": 1000,
  "movies": [...]
}
```

### POST /api/favourites
Add movie to favourites

**Request:**
```json
{
  "movie_id": 123,
  "title": "Movie Title",
  "overview": "...",
  "poster_path": "/path.jpg",
  "vote_average": 8.5
}
```

### GET /api/favourites
Get all favourite movies

### DELETE /api/favourites/{movie_id}
Remove movie from favourites

### GET /api/history
Get mood search history

**Query Parameters:**
- `limit` (optional): Maximum entries (default: 20)

## Database Schema

### Favourites Table
- id (Primary Key)
- movie_id (Unique)
- title
- overview
- poster_path
- backdrop_path
- vote_average
- release_date
- created_at

### History Table
- id (Primary Key)
- mood
- genres (comma-separated IDs)
- explanation
- created_at

## Development

### Code Style
- Clean architecture with separation of concerns
- Service layer for business logic
- Dependency injection for database sessions
- Async/await for external API calls
- Comprehensive error handling

### Adding New Endpoints
1. Define schemas in `schemas/schemas.py`
2. Add business logic to appropriate service
3. Create endpoint in `routers/api.py`
4. Update documentation

## Troubleshooting

**Database connection error:**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

**API key errors:**
- Verify API keys are valid
- Check API quotas/limits
- Review service-specific logs

**CORS issues:**
- Update CORS_ORIGINS in .env
- Restart server after changes

## Production Deployment

1. Set `DEBUG=False` in .env
2. Use production-grade WSGI server
3. Enable HTTPS
4. Set up database backups
5. Configure logging and monitoring
6. Use environment variables for secrets
7. Scale with multiple workers

## License

MIT
