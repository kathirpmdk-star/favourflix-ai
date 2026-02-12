# FavourFlix-AI

An AI-powered movie recommendation platform that suggests movies based on your current mood. The application uses Google Gemini AI to understand mood descriptions and recommends relevant movies from The Movie Database (TMDB).

## Features

- **Mood-Based Search**: Describe your mood in natural language and get personalized movie recommendations
- **AI-Powered Analysis**: Google Gemini AI analyzes your mood and generates relevant search queries
- **Real-Time Recommendations**: Browse curated movie suggestions with ratings and details
- **Favorites Management**: Save and manage your favorite movies
- **Search History**: Track your mood-based searches and revisit past recommendations
- **Responsive Design**: Modern, Netflix-inspired UI built with React and Tailwind CSS
- **Production-Ready**: Optimized backend with connection pooling and structured logging

## Tech Stack

### Backend
- **Framework**: FastAPI 0.109.0
- **Language**: Python 3.11+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash)
- **Movie Data**: The Movie Database (TMDB) API v3
- **HTTP Client**: httpx with connection pooling
- **Server**: Uvicorn with auto-reload

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.11
- **Routing**: React Router DOM 6.21.1
- **Styling**: Tailwind CSS 3.4.1
- **HTTP Client**: Axios 1.6.5
- **Performance Optimization**: React.memo, useCallback, useMemo hooks

### Database Schema
- **Favourites Table**: Stores user's favorite movies
- **History Table**: Tracks mood-based search history

## Prerequisites

Before running this application, ensure you have the following installed:

- **Python**: Version 3.11 or higher
- **Node.js**: Version 18.x or higher
- **PostgreSQL**: Version 14 or higher
- **Git**: For version control

### API Keys Required

1. **Google Gemini API Key**: Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **TMDB API Key**: Register at [The Movie Database](https://www.themoviedb.org/settings/api)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kathirpmdk-star/favourflix-ai.git
cd favourflix-ai
```

### 2. Backend Setup

#### Create Python Virtual Environment

```bash
python -m venv .venv
```

**Activate the virtual environment:**

- **Windows (PowerShell)**:
  ```powershell
  .\.venv\Scripts\Activate.ps1
  ```

- **Windows (Command Prompt)**:
  ```cmd
  .venv\Scripts\activate.bat
  ```

- **macOS/Linux**:
  ```bash
  source .venv/bin/activate
  ```

#### Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### Configure Backend Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/favourflix

# API Keys
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
TMDB_API_KEY=your_actual_tmdb_api_key

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=True

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### Setup PostgreSQL Database

Create a PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE favourflix;
\q
```

Update the `DATABASE_URL` in your `.env` file with your PostgreSQL credentials.

#### Run Database Migrations

The application will automatically create the required tables on startup.

### 3. Frontend Setup

#### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

#### Configure Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

## Running the Application

### Start Backend Server

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

The backend API will be available at: `http://localhost:8000`

API documentation (Swagger UI): `http://localhost:8000/docs`

### Start Frontend Development Server

From the `frontend` directory:

```bash
npm run dev
```

The frontend application will be available at: `http://localhost:5173`

## API Endpoints

### Movie Recommendations

- **POST** `/api/recommend?page=1`
  - Request Body: `{ "mood": "your mood description" }`
  - Returns: List of recommended movies with pagination

### Favorites Management

- **GET** `/api/favourites` - Get all favorite movies
- **POST** `/api/favourites` - Add a movie to favorites
- **DELETE** `/api/favourites/{movie_id}` - Remove a movie from favorites

### Search History

- **GET** `/api/history?limit=20` - Get mood search history

## Project Structure

```
favourflix-ai/
├── backend/
│   ├── app/
│   │   ├── models/          # SQLAlchemy database models
│   │   ├── routers/         # FastAPI route handlers
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic (Gemini, TMDB)
│   │   ├── config.py        # Configuration management
│   │   ├── database.py      # Database connection
│   │   └── main.py          # FastAPI application
│   ├── .env.example         # Environment template
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── App.jsx          # Root component
│   │   └── main.jsx         # Entry point
│   ├── .env.example         # Environment template
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite configuration
└── .gitignore
```

## Performance Optimizations

### Backend
- HTTP connection pooling for TMDB API requests
- Structured logging with Python logging module
- HTTP/2 disabled for ISP compatibility
- Async request handling with FastAPI

### Frontend
- React.memo for preventing unnecessary re-renders
- useCallback and useMemo hooks for performance optimization
- AbortController for request cancellation
- Lazy loading for images
- Optimized build with Vite

## Development Workflow

The project uses a three-branch Git workflow:

- **main**: Production-ready code
- **backend**: Backend development
- **frontend**: Frontend development

Changes are merged from feature branches to main after testing.

## Troubleshooting

### Backend Issues

**Database Connection Error:**
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env` file
- Ensure database exists and credentials are correct

**API Key Errors:**
- Verify Gemini API key is valid
- Check TMDB API key is active
- Ensure no trailing spaces in `.env` file

### Frontend Issues

**API Connection Error:**
- Verify backend server is running on port 8000
- Check VITE_API_URL in frontend `.env` file
- Ensure CORS is properly configured

**Build Errors:**
- Delete `node_modules` and run `npm install` again
- Clear Vite cache: `rm -rf frontend/.vite`

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

For issues and questions, please open an issue in the GitHub repository.
