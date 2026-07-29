import React from 'react';
import SearchBar from './SearchBar';
import CategoryList from './CategoryList';
import JewelleryGrid from './JewelleryGrid';

const Sidebar: React.FC = () => (
  <aside className="app-sidebar">
    <div className="app-sidebar-header">
      <h2>Collections</h2>
    </div>
    <SearchBar />
    <CategoryList />
    <div className="app-sidebar-divider" />
    <JewelleryGrid />
  </aside>
);

export default Sidebar;
