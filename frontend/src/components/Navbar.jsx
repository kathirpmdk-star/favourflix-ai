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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="text-2xl font-bold gradient-text transition-all duration-300 group-hover:tracking-wide">
              FavourFlix AI
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`relative px-5 py-2.5 rounded-lg font-medium transition-all duration-300 overflow-hidden group ${
                isActive('/')
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/50'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="relative z-10">Discover</span>
              {!isActive('/') && (
                <span className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              )}
            </Link>
            <Link
              to="/favourites"
              className={`relative px-5 py-2.5 rounded-lg font-medium transition-all duration-300 overflow-hidden group ${
                isActive('/favourites')
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/50'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="relative z-10">Favourites</span>
              {!isActive('/favourites') && (
                <span className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              )}
            </Link>
            <Link
              to="/history"
              className={`relative px-5 py-2.5 rounded-lg font-medium transition-all duration-300 overflow-hidden group ${
                isActive('/history')
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/50'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="relative z-10">History</span>
              {!isActive('/history') && (
                <span className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
