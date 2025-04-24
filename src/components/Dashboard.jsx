import React from 'react';
import { useSelector } from 'react-redux';
import Category from './Category';
import SearchBar from './SearchBar';

export default function Dashboard() {
  const categories = useSelector(state => state.widgets.categories);

  return (
    <div className="space-y-10">
      <SearchBar />
      {categories.map(cat => (
        <Category key={cat.id} category={cat} />
      ))}
    </div>
  );
}