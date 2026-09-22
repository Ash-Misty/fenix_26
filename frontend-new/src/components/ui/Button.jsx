import React from 'react';

export function Button({ children, onClick, secondary = false, type = 'button', className = '', disabled = false }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-busy={disabled || undefined} className={`btn ${secondary ? 'secondary' : ''} ${className}`}>
      {children}
    </button>
  );
}
