# FavourFlix-AI Frontend

Production-ready React frontend for AI-powered movie recommendations with Netflix-style UI.

## Features

- 🎨 Netflix/Prime Video-level dark theme UI
- 🎭 Mood-based movie search with AI
- ⭐ Favourite movies management
- 📜 Search history tracking
- 📄 Pagination support
- ✨ Smooth animations and hover effects
- 📱 Responsive design
- 🚀 Fast Vite build system

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Fonts**: Google Fonts (Inter)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── MovieCard.jsx
│   │   ├── Pagination.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ExplanationSection.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Favourites.jsx
│   │   └── History.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment (Optional)

Create `.env` file if you want to customize the API URL:

```env
VITE_API_URL=http://localhost:8000
```

By default, it uses `http://localhost:8000`.

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Component Overview

### Pages

**Home.jsx**
- Hero section with mood search
- AI-generated explanation display
- Movie grid with pagination
- Favourite management

**Favourites.jsx**
- Display saved favourite movies
- Remove from favourites
- Empty state handling

**History.jsx**
- Show mood search history
- AI explanations archive
- Timestamps and metadata

### Components

**Navbar.jsx**
- Navigation between pages
- Active route highlighting
- Glass morphism design

**Hero.jsx**
- Large search section
- Mood input with suggestions
- Gradient styling

**MovieCard.jsx**
- Netflix-style hover effects
- Image loading states
- Rating display
- Favourite button

**Pagination.jsx**
- Smart page number display
- Previous/Next navigation
- Active page highlighting

**LoadingSpinner.jsx**
- Animated loading indicator
- Customizable size and message

**ExplanationSection.jsx**
- AI explanation display
- Glass card design

## Styling Guide

### Colors
- `ott-dark`: #0f0f0f (Background)
- `ott-gray`: #1a1a1a (Cards)
- `ott-light`: #2a2a2a (Hover states)
- `accent-primary`: #e50914 (Red accent)
- `accent-secondary`: #b20710 (Dark red)

### Utilities
- `glass`: Glass morphism effect
- `gradient-text`: Gradient text color
- `shadow-glow`: Red glow effect
- `fade-in`: Fade in animation

## Features in Detail

### Mood-Based Search
1. Enter your mood or situation
2. AI converts mood to genres
3. Movies are fetched with explanation
4. Results displayed with pagination

### Favourites
- Add/remove movies with heart button
- Stored in backend database
- Persistent across sessions
- Quick access from any page

### History
- Automatic search tracking
- Shows mood and AI explanation
- Chronological display
- Timestamp formatting

### Responsive Design
- Mobile: 2 columns
- Tablet: 3-4 columns
- Desktop: 5 columns
- Smooth transitions

## API Integration

All API calls are in `src/services/api.js`:

```javascript
import { getRecommendations, addFavourite, getFavourites, removeFavourite, getHistory } from './services/api';
```

## Development Tips

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Navbar.jsx`

### Customizing Theme
Edit `tailwind.config.js` to modify colors, fonts, etc.

### Image Optimization
Uses TMDB CDN for movie images:
- Posters: w500 (500px width)
- Backdrops: w1280 (1280px width)

## Troubleshooting

**CORS errors:**
- Ensure backend CORS_ORIGINS includes frontend URL
- Check backend is running on port 8000

**API connection failed:**
- Verify VITE_API_URL in .env
- Check backend is accessible
- Review browser console for errors

**Build errors:**
- Clear node_modules and reinstall
- Check Node.js version (16+ required)
- Verify all dependencies installed

## Production Deployment

### Vercel / Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL`

### Manual Deployment
1. Run `npm run build`
2. Upload `dist/` folder to web server
3. Configure server for SPA routing
4. Set up SSL certificate

## Performance

- Code splitting with React lazy loading (ready for expansion)
- Image lazy loading on MovieCard
- Optimized animations with CSS transitions
- Minimal bundle size with Vite tree-shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
