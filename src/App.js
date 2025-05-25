import React from 'react';
import Button from './components/ui/Button';
import './App.css';

function App() {
  const handleClick = () => {
    alert('Button component working! 🎉');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Glowish Skin Analyzer
        </h1>
        <p className="text-gray-600 mb-6">
          Testing Component System ✅
        </p>
        <Button onClick={handleClick}>
          Test Component
        </Button>
      </div>
    </div>
  );
}

export default App;