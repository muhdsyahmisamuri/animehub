import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
}

function SearchBar({ onSearch, initialValue = '', placeholder = 'Search for anime...' }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Debounce the search with 250ms delay
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      if (inputValue.trim()) {
        onSearch(inputValue.trim());
      }
    }, 250);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputValue, onSearch]);

  return (
    <div className="search-bar">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus
      />
      {inputValue && (
        <button
          className="clear-button"
          onClick={() => setInputValue('')}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;

