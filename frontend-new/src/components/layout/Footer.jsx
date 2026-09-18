import React from 'react';

export function Footer({ setPage }) {
  const nav = [
    ['Events', 'events'],
    ['Workshop', 'workshop'],
    ['Timeline', 'timeline'],
    ['Team', 'team'],
  ];
  const navigate = (id) => { setPage('home'); window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 40); };

  return (
    <footer>
      <div className="footer-brand">
        <button className="brand" type="button" onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          FENIX<span>'26</span>
        </button>
        <p>Department of CSE & Data Science<br />University College of Engineering, BIT Campus<br />Anna University, Trichy</p>
      </div>
      <div className="footer-links">
        <small>EXPLORE</small>
        {nav.map(([n, id]) => (
          <button key={id} type="button" onClick={() => navigate(id)}>{n}</button>
        ))}
      </div>
      <div className="footer-contact">
        <small>GET IN TOUCH</small>
        <p>
          [College Address]<br />
          [Email]<br />
          [Phone Number]
        </p>
      </div>
      <div className="footer-bottom">
        © 2026 FENIX'26. All rights reserved.
        <span>Made for the curious.</span>
      </div>
    </footer>
  );
}
