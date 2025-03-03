import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

export type SearchResultItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  category: 'VIDEOS' | 'PLAYLISTS' | 'BLOG_POSTS';
};

interface SearchContextProps {
  results: SearchResultItem[];
  loading: boolean;
  error: string;
  handleSearch: (query: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInit = () => {
    setLoading(true);
    setResults([]);
    setError('');
  }

  const handleSearch = useCallback(async (query: string) => {
    handleInit();
    try {
      const response = await fetch(`/api/data?search=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SearchContext.Provider value={{ results, loading, error, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
