/**
 * Explanation Section Component - Premium Edition
 * Displays AI-generated mood explanation
 */
import { memo } from 'react';

const ExplanationSection = memo(({ explanation }) => {
  if (!explanation) return null;
  
  return (
    <div className="max-w-4xl mx-auto mb-16 fade-in-up">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary via-pink-600 to-accent-secondary rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition duration-500"></div>
        
        <div className="relative glass rounded-2xl p-8 border border-accent-primary/30 backdrop-blur-xl">
          <div className="flex items-start space-x-5">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary via-pink-600 to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/50 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center space-x-2">
                <span className="gradient-text">AI Recommendation Insight</span>
                <svg className="w-5 h-5 text-accent-primary animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg font-light">
                {explanation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ExplanationSection;
