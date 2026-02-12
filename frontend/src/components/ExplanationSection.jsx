/**
 * Explanation Section Component
 * Displays AI-generated mood explanation
 */
const ExplanationSection = ({ explanation }) => {
  if (!explanation) return null;
  
  return (
    <div className="max-w-4xl mx-auto mb-12 fade-in">
      <div className="glass rounded-xl p-6 border border-accent-primary/20">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-pink-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              AI Recommendation Insight
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
