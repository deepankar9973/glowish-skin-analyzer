import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
