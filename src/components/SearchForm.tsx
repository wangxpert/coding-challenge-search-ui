import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState('');
  const { handleSearch } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleClear = () => {
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-center justify-center w-full">
      <div className="relative flex-grow">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter search query"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        )}
      </div>
      <button
        type="submit"
        className="ml-2 p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
