import React from 'react';
import SearchBar from '@theme-original/SearchBar';

// Simple wrapper - the actual fix is in DocItem/Layout/index.js
export default function SearchBarWrapper(props) {
  return <SearchBar {...props} />;
}