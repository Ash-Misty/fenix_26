import React from 'react';

export function Button({ children, onClick, secondary = false, type = 'button', className = '' }) {
  return (
    <button type={type} onClick={onClick} className={`btn ${secondary ? 'secondary' : ''} ${className}`}>
      {children}
    </button>
  );
}