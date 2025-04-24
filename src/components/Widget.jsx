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

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          display: true, 
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 20,
            font: {
              size: window.innerWidth < 768 ? 10 : 12
            }
          }
        },
        tooltip: { 
          mode: 'index', 
          intersect: false,
          bodyFont: {
            size: window.innerWidth < 768 ? 10 : 12
          },
          titleFont: {
            size: window.innerWidth < 768 ? 12 : 14
          }
        },
      },
      scales: {
        x: { 
          title: { 
            display: true, 
            text: 'X-Axis',
            font: {
              size: window.innerWidth < 768 ? 10 : 12
            }
          },
          ticks: {
            font: {
              size: window.innerWidth < 768 ? 8 : 10
            }
          }
        },
        y: { 
          beginAtZero: true, 
          title: { 
            display: true, 
            text: 'Value',
            font: {
              size: window.innerWidth < 768 ? 10 : 12
            }
          },
          ticks: {
            font: {
              size: window.innerWidth < 768 ? 8 : 10
            }
          }
        },
      },
    };

    switch (widget.type) {
      case 'chart':
        return (
          <div className="h-64 sm:h-72 md:h-80">
            <Line
              data={dataset}
              options={commonOptions}
            />
          </div>
        );
      case 'bar':
        return (
          <div className="h-64 sm:h-72 md:h-80">
            <Bar 
              data={dataset} 
              options={commonOptions}
            />
          </div>
        );
      case 'pie':
        return (
          <div className="h-64 sm:h-72 md:h-80">
            <Pie 
              data={dataset} 
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  legend: {
                    ...commonOptions.plugins.legend,
                    position: window.innerWidth < 768 ? 'bottom' : 'right'
                  }
                }
              }}
            />
          </div>
        );
      case 'doughnut':
        return (
          <div className="h-64 sm:h-72 md:h-80">
            <Doughnut 
              data={dataset} 
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  legend: {
                    ...commonOptions.plugins.legend,
                    position: window.innerWidth < 768 ? 'bottom' : 'right'
                  }
                }
              }}
            />
          </div>
        );
      case 'radar':
        return (
          <div className="h-64 sm:h-72 md:h-80">
            <Radar 
              data={dataset} 
              options={commonOptions}
            />
          </div>
        );
      case 'polar':
        return (
          <div className="h-64 sm:h-72 md:h-80">
            <PolarArea 
              data={dataset} 
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  legend: {
                    ...commonOptions.plugins.legend,
                    position: window.innerWidth < 768 ? 'bottom' : 'right'
                  }
                }
              }}
            />
          </div>
        );
      default:
        return <p className="text-purple-800 text-md font-medium">{widget.content}</p>;
    }
  };

  return (
    <div className="relative p-4 sm:p-5 bg-purple-100 bg-opacity-60 rounded-2xl shadow-xl border border-purple-300 hover:scale-105 transition w-full max-w-full overflow-hidden">
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
        aria-label="Remove widget"
      >
        <X size={20} />
      </button>
      <h3 className="text-lg sm:text-xl font-semibold mb-3 text-purple-900 truncate">
        {widget.name}
      </h3>
      <div className="w-full overflow-auto">
        {renderChart()}
      </div>
    </div>
  );
}