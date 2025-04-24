import React, { useState } from 'react';
import Widget from './Widget';
import AddWidgetForm from './AddWidgetForm';
import { useSelector } from 'react-redux';

export default function Category({ category }) {
  const [showForm, setShowForm] = useState(false);
  const searchQuery = useSelector(state => state.widgets.searchQuery);

  const filteredWidgets = category.widgets.filter(w =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-purple-100">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold text-purple-700 drop-shadow">{category.name}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-800 shadow-md transition duration-200"
        >
          + Add Widget
        </button>
      </div>
      {showForm && <AddWidgetForm categoryId={category.id} />}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredWidgets.map(widget => (
          <Widget key={widget.id} widget={widget} categoryId={category.id} />
        ))}
      </div>
    </div>
  );
}
