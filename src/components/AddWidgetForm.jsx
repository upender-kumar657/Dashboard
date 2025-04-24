import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../features/widgets/widgetSlice';

export default function AddWidgetForm({ categoryId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('text');

  const handleSubmit = e => {
    e.preventDefault();

    let formattedContent = content;

    if (type === 'chart' || type === 'pie' || type === 'doughnut' || type === 'radar' || type === 'polar') {
      const [labelsString, valuesString] = content.split('|');
      if (labelsString && valuesString) {
        const labels = labelsString.split(',').map(l => l.trim());
        const values = valuesString.split(',').map(v => parseFloat(v.trim()));
        formattedContent = `${labels.join(',')}|${values.join(',')}`;
      } else {
        formattedContent = content.split(',').map(Number);
      }
    } else if (type === 'bar') {
      formattedContent = content.split(',').map(Number);
    }

    dispatch(addWidget({ categoryId, name, content: formattedContent, type }));
    setName('');
    setContent('');
    setType('text');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-5 bg-white bg-opacity-50 rounded-xl shadow border border-purple-200">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Widget Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 rounded-xl w-full border border-purple-300 focus:outline-purple-500"
          required
        />
        <input
          type="text"
          placeholder={
            ['pie', 'doughnut', 'radar', 'polar', 'chart'].includes(type)
              ? 'Label1,Label2 | Value1,Value2'
              : type === 'bar'
              ? 'Value1,Value2,...'
              : 'Widget Content'
          }
          value={content}
          onChange={e => setContent(e.target.value)}
          className="p-2 rounded-xl w-full border border-purple-300 focus:outline-purple-500"
          required
        />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="p-2 rounded-xl border border-purple-300"
        >
          <option value="text">Text</option>
          <option value="chart">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="doughnut">Doughnut Chart</option>
          <option value="radar">Radar Chart</option>
          <option value="polar">Polar Area Chart</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
        >
          Add
        </button>
      </div>
    </form>
  );
}
