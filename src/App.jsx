
import React from 'react';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-pink-100 to-yellow-100 p-6">
      <h1 className="text-5xl font-extrabold text-center text-purple-800 mb-10 drop-shadow-lg">
        Dashboard
      </h1>
      <Dashboard />
    </div>
  );
}

