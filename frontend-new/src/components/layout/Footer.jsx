import React from 'react';

export function Footer({ setPage }) {
  const nav = [
    ['Events', 'events'],
    ['Workshop', 'workshop'],
    ['Timeline', 'timeline'],
    ['Team', 'team'],
  ];
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer>
      <div>
        <button className="brand" onClick={() => setPage('home')}>
          FENIX<span>'26</span>
        </button>
        <p>Department of CSE & Data Science<br />University College of Engineering, BIT Campus<br />Anna University, Trichy</p>
      </div>
      <div>
        <small>EXPLORE</small>
        {nav.map(([n, id]) => (
          <a
            key={id}
            onClick={() => {
              setPage('home');
              setTimeout(() => scrollTo(id), 40);
            }}
          >
            {n}
          </a>
        ))}
      </div>
      <div>
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
