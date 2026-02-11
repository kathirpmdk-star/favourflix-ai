# FavourFlix-AI 🎬

<div align="center">

**AI-Powered Movie Recommendation Platform**

A production-ready full-stack application that uses AI to recommend movies based on your mood, featuring a Netflix-level UI and scalable architecture.

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green.svg)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue.svg)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan.svg)](https://tailwindcss.com/)

</div>

---

## 🌟 Features

### Core Functionality
- 🎭 **Mood-Based Discovery** - Enter your mood and get AI-curated movie recommendations
- 🤖 **Gemini AI Integration** - Converts feelings into perfect genre matches
- 🎬 **TMDB Integration** - Access to thousands of movies with rich metadata
- ⭐ **Favourites Management** - Save and manage your favorite movies
- 📜 **Search History** - Track all your mood searches with AI explanations
- 📄 **Pagination Support** - Browse through extensive movie collections
- ✨ **Real-time Loading States** - Smooth animations during API calls

### Technical Highlights
- 🏗️ **Clean Architecture** - Modular, scalable, production-ready code
- 🔒 **Type Safety** - Pydantic validation on backend
- 🌐 **RESTful API** - Well-structured API endpoints
- 💾 **Auto Database Setup** - Tables created automatically on startup
- 🎨 **OTT-Style UI** - Netflix/Prime Video-inspired dark theme
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Vite for frontend, async FastAPI for backend

---

## 🏛️ Architecture

```
FavourFlix-AI/
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── models/         # SQLAlchemy ORM models
│   │   ├── schemas/        # Pydantic validation schemas
│   │   ├── services/       # Business logic layer
│   │   │   ├── gemini_service.py
│   │   │   ├── tmdb_service.py
│   │   │   └── recommendation_service.py
│   │   ├── routers/        # API endpoints
│   │   ├── config.py       # Configuration management
│   │   ├── database.py     # Database setup
│   │   └── main.py         # FastAPI application
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/               # React Frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   ├── services/       # API integration
    │   └── App.jsx         # Main app with routing
    ├── package.json
    └── .env.example
```

---

## 🚀 Quick Start

### Prerequisites

- **Python** 3.9+
- **Node.js** 16+
- **PostgreSQL** 12+
- **Gemini API Key** - [Get here](https://makersuite.google.com/app/apikey)
- **TMDB API Key** - [Get here](https://www.themoviedb.org/settings/api)

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd favourflix-ai
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env with your database and API credentials

# Run the server
uvicorn app.main:app --reload
```

**Backend will run on:** `http://localhost:8000`

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Configure environment (optional)
copy .env.example .env

# Run development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

### 4️⃣ Database Setup

**Create PostgreSQL database:**

```sql
CREATE DATABASE favourflix;
```

Update `DATABASE_URL` in `backend/.env`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/favourflix
```

The tables will be created automatically when you start the backend.

---

## 🔧 Configuration

### Backend Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/favourflix

# API Keys
GEMINI_API_KEY=your_gemini_api_key_here
TMDB_API_KEY=your_tmdb_api_key_here

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=True

# CORS
CORS_ORIGINS=http://localhost:5173
```

### Frontend Environment Variables

```env
VITE_API_URL=http://localhost:8000
```

---

## 📡 API Endpoints

### Recommendations
```http
POST /api/recommend?page=1
Content-Type: application/json

{
  "mood": "feeling adventurous and excited"
}
```

### Favourites
```http
POST   /api/favourites          # Add favourite
GET    /api/favourites          # Get all favourites
DELETE /api/favourites/{id}     # Remove favourite
```

### History
```http
GET /api/history?limit=20       # Get search history
```

**Full API documentation:** `http://localhost:8000/docs` (Swagger UI)

---

## 🎨 UI Preview

### Design System

**Colors:**
- Background: `#0f0f0f`
- Cards: `#1a1a1a`
- Accent: `#e50914` (Netflix Red)
- Text: `#ffffff`

**Effects:**
- Glass morphism cards
- Smooth hover animations
- Red glow shadows
- Gradient text accents

**Components:**
- Netflix-style movie cards with scaling
- Smooth pagination
- Loading animations
- AI explanation cards

---

## 🌲 Git Workflow (3-Branch Strategy)

This project supports independent development of frontend and backend:

### Branches

- **`main`** - Stable production code
- **`backend`** - Backend development
- **`frontend`** - Frontend development

### Workflow

**Initial Setup:**
```bash
# Create branches
git checkout -b backend
git checkout -b frontend
git checkout main
```

**Backend Development:**
```bash
git checkout backend
# Make changes to backend/
git add backend/
git commit -m "feat: add new API endpoint"
git push origin backend

# Merge to main when stable
git checkout main
git merge backend
git push origin main
```

**Frontend Development:**
```bash
git checkout frontend
# Make changes to frontend/
git add frontend/
git commit -m "feat: add new component"
git push origin frontend

# Merge to main when stable
git checkout main
git merge frontend
git push origin main
```

---

## 🏗️ Tech Stack

### Backend
- **FastAPI** - Modern async web framework
- **PostgreSQL** - Production database
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **httpx** - Async HTTP client
- **Google Generative AI** - Gemini API integration

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **Axios** - HTTP client

### External APIs
- **Google Gemini** - AI mood-to-genre conversion
- **TMDB** - Movie database and images

---

## 📦 Database Schema

### Favourites Table
```sql
id              SERIAL PRIMARY KEY
movie_id        INTEGER UNIQUE NOT NULL
title           VARCHAR NOT NULL
overview        TEXT
poster_path     VARCHAR
backdrop_path   VARCHAR
vote_average    FLOAT
release_date    VARCHAR
created_at      TIMESTAMP DEFAULT NOW()
```

### History Table
```sql
id              SERIAL PRIMARY KEY
mood            VARCHAR NOT NULL
genres          VARCHAR NOT NULL
explanation     TEXT NOT NULL
created_at      TIMESTAMP DEFAULT NOW()
```

---

## 🧪 Development

### Run Backend Tests
```bash
cd backend
pytest
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

### Linting
```bash
# Frontend
cd frontend
npm run lint
```

---

## 🚢 Production Deployment

### Backend (Railway, Render, or Heroku)

1. Set environment variables
2. Configure PostgreSQL database
3. Deploy with: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel, Netlify)

1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set `VITE_API_URL` environment variable

### Docker Deployment (Optional)

**Backend Dockerfile:**
```dockerfile
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

---

## 🤝 Contributing

This is a production-ready template. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 🙏 Acknowledgments

- **TMDB** for the comprehensive movie database
- **Google** for Gemini AI API
- **Tailwind CSS** for the amazing styling framework
- **FastAPI** for the excellent Python framework

---

## 📞 Support

For issues or questions:
1. Check the documentation in `backend/README.md` and `frontend/README.md`
2. Review API documentation at `http://localhost:8000/docs`
3. Open an issue on GitHub

---

<div align="center">

**Built with ❤️ using Clean Architecture and Production Standards**

⭐ Star this repo if you find it helpful!

</div>
