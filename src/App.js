import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConsentPage from './pages/ConsentPage';
import PhotoCapturePage from './pages/PhotoCapturePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/consent" element={<ConsentPage />} />
<Route path="/photo-capture" element={<PhotoCapturePage />} />
      </Routes>
    </Router>
  );
}

export default App;