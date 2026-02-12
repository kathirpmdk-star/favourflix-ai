/**
 * Navigation Bar Component
 */
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold gradient-text">
              FavourFlix AI
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/')
                  ? 'bg-accent-primary text-white shadow-glow'
                  : 'text-gray-300 hover:text-white hover:bg-ott-light'
              }`}
            >
              Discover
            </Link>
            <Link
              to="/favourites"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/favourites')
                  ? 'bg-accent-primary text-white shadow-glow'
                  : 'text-gray-300 hover:text-white hover:bg-ott-light'
              }`}
            >
              Favourites
            </Link>
            <Link
              to="/history"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/history')
                  ? 'bg-accent-primary text-white shadow-glow'
                  : 'text-gray-300 hover:text-white hover:bg-ott-light'
              }`}
            >
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
