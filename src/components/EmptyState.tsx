import { SearchX } from 'lucide-react';
import './EmptyState.css';

interface EmptyStateProps {
  query?: string;
}

function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <SearchX className="empty-icon" size={64} strokeWidth={1.5} />
      <h3 className="empty-title">
        {query ? 'No Results Found' : 'Start Your Search'}
      </h3>
      <p className="empty-text">
        {query
          ? `We couldn't find any anime matching "${query}". Try a different search term.`
          : 'Search for your favorite anime series, movies, or OVAs above!'}
      </p>
      {query && (
        <div className="empty-suggestions">
          <p className="suggestions-title">Try these suggestions:</p>
          <ul className="suggestions-list">
            <li>Check your spelling</li>
            <li>Use more general terms</li>
            <li>Try searching in English or Japanese</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default EmptyState;

