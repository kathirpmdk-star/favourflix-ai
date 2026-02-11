# FavourFlix-AI Setup Guide

Complete setup instructions for running FavourFlix-AI locally.

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] Python 3.9 or higher installed
- [ ] Node.js 16 or higher installed
- [ ] PostgreSQL 12 or higher installed and running
- [ ] Git installed
- [ ] A Gemini API key ([Get here](https://makersuite.google.com/app/apikey))
- [ ] A TMDB API key ([Get here](https://www.themoviedb.org/settings/api))

## Step-by-Step Setup

### 1. Database Setup

**Start PostgreSQL** and create a new database:

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE favourflix;

-- Create user (optional)
CREATE USER favourflix_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE favourflix TO favourflix_user;

-- Exit
\q
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
copy .env.example .env  # Windows
# cp .env.example .env  # macOS/Linux
```

**Edit `backend/.env`** with your credentials:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/favourflix
GEMINI_API_KEY=your_actual_gemini_api_key
TMDB_API_KEY=your_actual_tmdb_api_key
CORS_ORIGINS=http://localhost:5173
```

**Test backend:**

```bash
# Run the server
uvicorn app.main:app --reload

# You should see:
# 🚀 Starting FavourFlix-AI Backend...
# 📊 Initializing database...
# ✅ Database initialized successfully
```

Visit `http://localhost:8000/docs` to see API documentation.

### 3. Frontend Setup

**Open a new terminal** (keep backend running):

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
copy .env.example .env  # Windows
# cp .env.example .env  # macOS/Linux

# Run development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

### 4. Verify Setup

**Test the flow:**

1. Open `http://localhost:5173`
2. Enter a mood (e.g., "feeling happy and energetic")
3. Click "Search"
4. You should see:
   - AI-generated explanation
   - Movie recommendations
   - Pagination controls

**If something doesn't work:**

- Check backend logs for errors
- Check frontend browser console
- Verify API keys are correct
- Ensure PostgreSQL is running
- Check CORS settings

## Quick Start (Development Script)

**Windows:**
```bash
start-dev.bat
```

**macOS/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

This will start both backend and frontend automatically.

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/favourflix` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `TMDB_API_KEY` | The Movie DB API key | `eyJhbG...` |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `8000` |
| `DEBUG` | Debug mode | `True` |
| `CORS_ORIGINS` | Allowed origins | `http://localhost:5173` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` |

## Troubleshooting

### Backend Issues

**Problem:** "Database connection refused"
- **Solution:** Ensure PostgreSQL is running and credentials are correct

**Problem:** "GEMINI_API_KEY not found"
- **Solution:** Check `.env` file exists and has the correct key

**Problem:** "Module not found"
- **Solution:** Activate virtual environment and reinstall: `pip install -r requirements.txt`

### Frontend Issues

**Problem:** "CORS error"
- **Solution:** Add frontend URL to `CORS_ORIGINS` in backend `.env`

**Problem:** "Cannot connect to backend"
- **Solution:** Verify backend is running on port 8000

**Problem:** "npm install fails"
- **Solution:** Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Database Issues

**Problem:** "Table does not exist"
- **Solution:** Tables are auto-created. Restart backend server once.

**Problem:** "Permission denied"
- **Solution:** Grant permissions: `GRANT ALL ON ALL TABLES IN SCHEMA public TO your_user;`

## Getting API Keys

### Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key to your `.env` file

### TMDB API Key

1. Go to [TMDB](https://www.themoviedb.org/signup)
2. Create an account
3. Go to Settings → API
4. Request an API key (choose "Developer")
5. Fill out the form
6. Copy the API key (v3 auth) to your `.env` file

## Development Workflow

### Working on Backend

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app.main:app --reload
```

### Working on Frontend

```bash
cd frontend
npm run dev
```

### Running Both Together

Use the provided scripts:
- Windows: `start-dev.bat`
- Unix: `./start-dev.sh`

## Next Steps

Once setup is complete:

1. ✅ Test mood search functionality
2. ✅ Add movies to favourites
3. ✅ Check history page
4. ✅ Test pagination
5. ✅ Verify AI explanations

Ready to start developing! 🚀

## Production Deployment

See [README.md](README.md) for production deployment instructions.
