# Project Architecture

FavourFlix-AI architecture documentation.

## System Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │────────▶│   FastAPI   │────────▶│ PostgreSQL  │
│  (React)    │◀────────│   Backend   │◀────────│  Database   │
└─────────────┘         └─────────────┘         └─────────────┘
                              │
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
              ┌──────────┐         ┌──────────┐
              │  Gemini  │         │   TMDB   │
              │   API    │         │   API    │
              └──────────┘         └──────────┘
```

## Backend Architecture (Clean Architecture)

```
┌────────────────────────────────────────────────────┐
│                   API Layer                         │
│  (FastAPI Routes - HTTP Request/Response)          │
└────────────────┬───────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────┐
│                 Service Layer                       │
│  (Business Logic - Orchestration)                  │
│  - RecommendationService                           │
│  - GeminiService                                   │
│  - TMDBService                                     │
└────────────────┬───────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────┐
│               Data Layer                            │
│  (Database Models - ORM)                           │
│  - Favourite                                       │
│  - History                                         │
└────────────────────────────────────────────────────┘
```

### Layer Responsibilities

**API Layer** (`routers/`)
- Handle HTTP requests/responses
- Route definition
- Request validation (Pydantic)
- Dependency injection

**Service Layer** (`services/`)
- Business logic
- External API integration
- Data transformation
- Error handling

**Data Layer** (`models/`)
- Database schema definition
- ORM mappings
- Data persistence

**Cross-cutting** (`config.py`, `database.py`)
- Configuration management
- Database connection
- Shared utilities

## Frontend Architecture (Component-Based)

```
┌────────────────────────────────────────────────────┐
│                    App.jsx                          │
│              (Router & Layout)                     │
└────────────────┬───────────────────────────────────┘
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
    ┌──────┐ ┌───────┐ ┌────────┐
    │ Home │ │Favs   │ │History │
    └──┬───┘ └───┬───┘ └───┬────┘
       │         │         │
       ▼         ▼         ▼
    ┌──────────────────────────┐
    │      Components          │
    │  - MovieCard             │
    │  - Pagination            │
    │  - LoadingSpinner        │
    └──────────┬───────────────┘
               │
               ▼
        ┌─────────────┐
        │  API Service│
        └─────────────┘
```

### Component Hierarchy

**Pages** (`pages/`)
- Top-level routes
- Data fetching
- State management
- Page layout

**Components** (`components/`)
- Reusable UI elements
- Presentation logic
- Event handling
- No direct API calls

**Services** (`services/`)
- API communication
- Data formatting
- HTTP client setup

## Data Flow

### Recommendation Flow

```
1. User Input (Mood)
   │
   ▼
2. Frontend → POST /api/recommend
   │
   ▼
3. API Router → RecommendationService
   │
   ├──▶ GeminiService (mood → genres + explanation)
   │    │
   │    └──▶ Gemini API
   │
   └──▶ TMDBService (genres → movies)
        │
        └──▶ TMDB API
   │
   ▼
4. Save to History (Database)
   │
   ▼
5. Return Response (JSON)
   │
   ▼
6. Frontend Display
   ├─ Explanation Section
   ├─ Movie Grid
   └─ Pagination
```

### Favourite Flow

```
Add Favourite:
User Click → Frontend → POST /api/favourites → Database → Success

Get Favourites:
Page Load → Frontend → GET /api/favourites → Database → Display

Remove Favourite:
User Click → Frontend → DELETE /api/favourites/{id} → Database → Refresh
```

## Database Design

### Entity Relationship

```
┌─────────────────┐
│   Favourites    │
├─────────────────┤
│ id (PK)         │
│ movie_id (UQ)   │
│ title           │
│ overview        │
│ poster_path     │
│ backdrop_path   │
│ vote_average    │
│ release_date    │
│ created_at      │
└─────────────────┘

┌─────────────────┐
│    History      │
├─────────────────┤
│ id (PK)         │
│ mood            │
│ genres          │
│ explanation     │
│ created_at      │
└─────────────────┘
```

**Design Decisions:**

- `movie_id` unique in Favourites (one favourite per movie)
- `genres` stored as comma-separated string (denormalized for simplicity)
- `created_at` with auto-timestamp for chronological sorting
- No user table (single-user application, ready for multi-user expansion)

## API Design Principles

### RESTful Conventions

- `GET` - Retrieve data
- `POST` - Create data
- `DELETE` - Remove data
- `PUT/PATCH` - Update data (future)

### Response Format

**Success Response:**
```json
{
  "data": {},
  "status": "success"
}
```

**Error Response:**
```json
{
  "detail": "Error message"
}
```

### Pagination

```
Query: ?page=1
Response: {
  "page": 1,
  "total_pages": 50,
  "total_results": 1000,
  "results": [...]
}
```

## Security Considerations

### Current Implementation

- ✅ Environment variables for secrets
- ✅ CORS configuration
- ✅ Input validation (Pydantic)
- ✅ SQL injection prevention (ORM)
- ✅ HTTPS ready

### Production Recommendations

- 🔒 Add authentication (JWT)
- 🔒 Rate limiting
- 🔒 API key rotation
- 🔒 HTTPS enforcement
- 🔒 Database encryption
- 🔒 Logging and monitoring

## Scalability Considerations

### Current Design Supports

- Horizontal scaling of backend (stateless)
- Database connection pooling
- Async I/O for external APIs
- CDN for frontend assets

### Future Improvements

- Redis caching for API responses
- Message queue for background tasks
- Load balancer setup
- Database read replicas
- Search indexing (Elasticsearch)

## Technology Choices

### Why FastAPI?

- Modern async Python framework
- Automatic API documentation
- Built-in validation
- High performance
- Easy to learn and use

### Why React + Vite?

- Fast development experience
- Component reusability
- Large ecosystem
- Vite for instant HMR

### Why PostgreSQL?

- ACID compliance
- Rich data types
- Scalability
- Wide support
- Production-ready

### Why Tailwind CSS?

- Utility-first approach
- Fast development
- Small bundle size
- Highly customizable
- Great documentation

## Development Patterns

### Dependency Injection (Backend)

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/endpoint")
async def endpoint(db: Session = Depends(get_db)):
    # db is injected
```

### Service Pattern (Backend)

```python
class RecommendationService:
    def __init__(self):
        self.gemini = GeminiService()
        self.tmdb = TMDBService()
    
    async def get_recommendations(self, mood, page, db):
        # Orchestrate multiple services
```

### Component Composition (Frontend)

```jsx
<Page>
  <Component>
    <SubComponent />
  </Component>
</Page>
```

### Custom Hooks (Frontend - Future)

```javascript
const useFavourites = () => {
  const [favourites, setFavourites] = useState([]);
  // Logic
  return { favourites, addFavourite, removeFavourite };
};
```

## Error Handling Strategy

### Backend

```python
try:
    # Operation
    return success_response
except SpecificError as e:
    raise HTTPException(status_code=400, detail=str(e))
except Exception as e:
    raise HTTPException(status_code=500, detail="Internal error")
```

### Frontend

```javascript
try {
  const data = await api.call();
  setData(data);
} catch (error) {
  setError(error.message);
  console.error(error);
}
```

## Performance Optimizations

### Backend

- Async I/O for external APIs
- Database connection pooling
- Query optimization
- Response caching (future)

### Frontend

- Code splitting (future)
- Image lazy loading
- Debounced search (future)
- Memoization (future)

## Testing Strategy

### Backend Testing

- Unit tests for services
- Integration tests for API endpoints
- Database tests with fixtures

### Frontend Testing

- Component tests
- Integration tests
- E2E tests (future)

## Deployment Architecture

```
┌──────────────┐     ┌──────────────┐
│   Vercel     │     │   Railway    │
│  (Frontend)  │────▶│  (Backend)   │
└──────────────┘     └───────┬──────┘
                             │
                             ▼
                     ┌──────────────┐
                     │  PostgreSQL  │
                     │  (Database)  │
                     └──────────────┘
```

---

This architecture is designed to be:
- ✅ Maintainable
- ✅ Scalable
- ✅ Testable
- ✅ Production-ready
