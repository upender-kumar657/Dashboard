import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../features/widgets/widgetSlice';
import { Line, Pie, Bar, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
import { X } from 'lucide-react';

import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  RadarController,
  PolarAreaController,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  RadarController,
  PolarAreaController,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Widget({ widget, categoryId }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  const renderChart = () => {
    let labels = [];
    let values = [];
    let dataWithPercent = [];

    if (typeof widget.content === 'string') {
      const [labelsString, valuesString] = widget.content.split('|');
      if (labelsString && valuesString) {
        labels = labelsString.split(',').map(l => l.trim());
        values = valuesString.split(',').map(v => parseFloat(v.trim()));
        const total = values.reduce((acc, val) => acc + val, 0);
        dataWithPercent = values.map(v => ((v / total) * 100).toFixed(1));
      } else {
        values = widget.content.split(',').map(v => parseFloat(v.trim()));
        labels = values.map((_, i) => `Item ${i + 1}`);
      }
    } else if (Array.isArray(widget.content)) {
      values = widget.content;
      labels = values.map((_, i) => `Item ${i + 1}`);
    }

    const dataset = {
      labels: (widget.type === 'pie' || widget.type === 'doughnut' || widget.type === 'polar' || widget.type === 'radar')
        ? labels.map((l, i) => `${l} (${dataWithPercent[i] || ''}%)`)
        : labels,
      datasets: [
        {
          label: widget.name,
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: 'rgba(147, 51, 234, 1)',
          fill: true,
          tension: 0.4
        },
      ],
    };

    switch (widget.type) {
      case 'chart':
        return (
          <Line
            data={dataset}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'bottom' },
                tooltip: { mode: 'index', intersect: false },
              },
              scales: {
                x: { title: { display: true, text: 'X-Axis' } },
                y: { beginAtZero: true, title: { display: true, text: 'Value' } },
              },
            }}
          />
        );
      case 'bar':
        return <Bar data={dataset} />;
      case 'pie':
        return <Pie data={dataset} />;
      case 'doughnut':
        return <Doughnut data={dataset} />;
      case 'radar':
        return <Radar data={dataset} />;
      case 'polar':
        return <PolarArea data={dataset} />;
      default:
        return <p className="text-purple-800 text-md font-medium">{widget.content}</p>;
    }
  };

  return (
    <div className="relative p-5 bg-purple-100 bg-opacity-60 rounded-2xl shadow-xl border border-purple-300 hover:scale-105 transition">
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <X />
      </button>
      <h3 className="text-xl font-semibold mb-3 text-purple-900">{widget.name}</h3>
      {renderChart()}
    </div>
  );
}
