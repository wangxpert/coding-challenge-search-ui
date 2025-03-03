import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import SearchResultItem from './SearchResultItem';

const SearchResults: React.FC = () => {
  const { results, loading, error } = useSearch();
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (results.length > 0 || error) {
      setHasSearched(true);
    }
  }, [results, error]);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center mt-4" data-testid="search-loader">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {!loading && hasSearched && results.length === 0 && (
        <p className="text-gray-500 mt-4">There are no results matching your query.</p>
      )}
      <ul className="mt-4" data-testid="search-result">
        {results.map((item) => (
          <SearchResultItem key={item.id} data={item} />
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
