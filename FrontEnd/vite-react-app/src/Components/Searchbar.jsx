// SearchBar.js
import React from 'react';

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={onSearchChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
