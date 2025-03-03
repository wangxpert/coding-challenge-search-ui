import React from 'react';
import { type SearchResultItem as SearchResultItemType } from '../context/SearchContext';

type SearchResultItemProps = {
  data: SearchResultItemType;
};

const SearchResultItem: React.FC<SearchResultItemProps> = ({ data: { id, title, url, description, category } }) => {
  return (
    <li key={id} className="border p-2 mb-2" data-testid="search-result-item">
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500" data-testid="search-result-item-title">
        {title}
      </a>
      <p data-testid="search-result-item-description">{description}</p>
      <span className={`text-xs font-semibold inline-block py-1 px-2 rounded text-white ${category === 'VIDEOS' ? 'bg-blue-500' : category === 'PLAYLISTS' ? 'bg-green-500' : 'bg-yellow-500'} uppercase last:mr-0 mr-1`} data-testid={`${category.toLowerCase()}`}>
        {category.toLowerCase()}
      </span>
    </li>
  );
};

export default SearchResultItem;
