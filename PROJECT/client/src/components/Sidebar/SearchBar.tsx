import React from 'react';
import { useCanvasStore } from '../../store/canvasStore';

const SearchBar: React.FC = () => {
  const searchQuery = useCanvasStore((s) => s.searchQuery);
  const setSearchQuery = useCanvasStore((s) => s.setSearchQuery);

  return (
    <div className="sidebar-search">
      <span className="sidebar-search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search jewellery…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          className="sidebar-search-clear"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBar;
