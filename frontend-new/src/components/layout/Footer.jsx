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
          <strong>President</strong><br />
          Vivekanandan A<br />
          <a href="tel:+919080737731">+91 9080737731</a>
        </p>
        <p>
          <strong>President</strong><br />
          Shobika B<br />
          <a href="tel:+919150705612">+91 9150705612</a>
        </p>

      </div>
      <div className="footer-map">
        <small>FIND US</small>
        <iframe title="University College of Engineering BIT Campus location" src="https://www.google.com/maps?q=University%20College%20of%20Engineering%20BIT%20Campus%20Anna%20University%20Tiruchirappalli&output=embed" loading="lazy" />
      </div>
      <div className="footer-bottom">
        © 2026 FENIX'26. All rights reserved.
        <span>Made for the curious.</span>
      </div>
    </footer>
  );
}
