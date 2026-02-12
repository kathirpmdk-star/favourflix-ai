/**
 * History Page - Display mood search history
 */
import { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { getHistory } from '../services/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getHistory(50);
      setHistory(data);
    } catch (err) {
      setError('Failed to load history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);
  
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);
  
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Search <span className="gradient-text">History</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {history.length > 0 
              ? `${history.length} search${history.length !== 1 ? 'es' : ''} recorded`
              : 'No searches yet'
            }
          </p>
        </div>
        
        {/* Loading State */}
        {isLoading && <LoadingSpinner message="Loading your search history..." />}
        
        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}
        
        {/* History List */}
        {!isLoading && !error && history.length > 0 && (
          <div className="space-y-4 fade-in">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="glass rounded-xl p-6 border border-white/5 hover:border-accent-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-pink-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        "{entry.mood}"
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-3">
                        {entry.explanation}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatDate(entry.created_at)}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                          </svg>
                          Genres: {entry.genres}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && history.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-400 mb-4">No Search History</h2>
            <p className="text-gray-500 mb-8">Start searching for movies based on your mood!</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-accent-primary hover:bg-accent-secondary text-white font-semibold rounded-lg transition-all hover:shadow-glow"
            >
              Start Exploring
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
