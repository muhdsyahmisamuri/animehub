import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { searchAnime, setQuery, resetSearch } from '../store/slices/searchSlice';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import SkeletonCard from '../components/SkeletonCard';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import './SearchPage.css';

function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error, query, currentPage, totalPages } = useSelector(
    (state: RootState) => state.search
  );

  const handleSearch = useCallback((searchQuery: string) => {
    dispatch(setQuery(searchQuery));
    dispatch(searchAnime({ query: searchQuery, page: 1 }));
  }, [dispatch]);

  const handlePageChange = useCallback((page: number) => {
    if (query) {
      dispatch(searchAnime({ query, page }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [dispatch, query]);

  const handleRetry = useCallback(() => {
    if (query) {
      dispatch(searchAnime({ query, page: currentPage }));
    }
  }, [dispatch, query, currentPage]);

  // Clear search state when component unmounts (user navigates away)
  useEffect(() => {
    return () => {
      dispatch(resetSearch());
    };
  }, [dispatch]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">
          Discover Your Next Favorite Anime
        </h1>
        <p className="search-subtitle">
          Search through thousands of anime series, movies, and OVAs
        </p>
      </div>

      <SearchBar onSearch={handleSearch} initialValue={query} />

      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!error && !loading && results.length === 0 && query && (
        <EmptyState query={query} />
      )}

      {!error && !loading && results.length === 0 && !query && (
        <EmptyState />
      )}

      {loading && (
        <div className="search-results">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <div className="results-info">
            <p className="results-count">
              Showing results for <strong>"{query}"</strong>
            </p>
          </div>
          <div className="search-results">
            {results.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default SearchPage;

