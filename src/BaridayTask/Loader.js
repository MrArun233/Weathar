// src/Loader.jsx
import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loading-text">Sending your wish... 🎁</p>
    </div>
  );
};

export default Loader;