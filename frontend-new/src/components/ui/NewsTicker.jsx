import React from 'react';
import { ArrowRight } from 'lucide-react';

export function NewsTicker({ setPage, className = '' }) {
  const goToRegistration = (event) => {
    event.preventDefault();
    setPage('register');
  };

  const goToAbout = (event) => {
    event.preventDefault();
    setPage('home');
    window.setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 30);
  };

  const content = (
    <>
      <span>FENIX'26 registrations are open</span>
      <span className="ticker-separator">✦</span>
      <span>One day of technical and creative challenges</span>
      <a href="#register" onClick={goToRegistration}>Register now <ArrowRight size={12} /></a>
      <a href="#about" onClick={goToAbout}>Explore FENIX'26</a>
      <span className="ticker-separator">✦</span>
    </>
  );

  return (
    <aside className={`news-ticker ${className}`.trim()} aria-label="FENIX'26 announcements">
      <div className="news-ticker-track">
        <div className="news-ticker-group">{content}</div>
        <div className="news-ticker-group" aria-hidden="true">{content}</div>
      </div>
    </aside>
  );
}
