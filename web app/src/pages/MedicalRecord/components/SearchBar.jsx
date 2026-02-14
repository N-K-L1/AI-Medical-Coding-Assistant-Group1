import React from 'react';

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search here..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export default SearchBar;
