import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/widgets/widgetSlice';

export default function SearchBar() {
  const dispatch = useDispatch();

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search Widgets..."
        onChange={e => dispatch(setSearchQuery(e.target.value))}
        className="w-full p-4 rounded-2xl shadow-md border border-purple-300 bg-white bg-opacity-80 focus:outline-purple-500"
      />
    </div>
  );
}