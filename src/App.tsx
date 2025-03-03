import React from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <div className="App">
        <header className="App-header">
          <h1 className="text-3xl font-bold">Search UI Challenge</h1>
          <SearchForm />
          <SearchResults />
        </header>
      </div>
    </SearchProvider>
  );
}

export default App;
