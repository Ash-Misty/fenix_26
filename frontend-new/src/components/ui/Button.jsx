import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Button({ children, onClick, secondary = false, type = 'button', className = '' }) {
  return (
    <button type={type} onClick={onClick} className={`btn ${secondary ? 'secondary' : ''} ${className}`}>
      {children}
      <ArrowRight size={16} />
    </button>
  );
}