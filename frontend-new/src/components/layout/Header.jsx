import React, { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export function Header({ setPage, registerMode = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Events', href: '#events' },
    { label: 'Workshop', href: '#workshop' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Team', href: '#team' },
  ];

  const navigate = (href) => { setMenuOpen(false); setPage('home'); window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 30); };

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}${registerMode ? ' register-nav' : ''}`} data-header>
        <a className="brand brand-lockup" href="#top" aria-label="Fenix home" onClick={(event) => { event.preventDefault(); setMenuOpen(false); setPage('home'); window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 30); }}>
          <img src="/fenix-26-logo.jpg" alt="FENIX 2026" />
          <span>FENIX<span>'26</span></span>
        </a>
        <div className="college-lockup" aria-label="University College of Engineering, BIT Campus, Anna University, Trichy">
          <img className="college-crest" src="/anna-university-logo.png" alt="" />
          <span className="college-name">University College of Engineering<small>BIT Campus · Anna University · Trichy</small></span>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.href} onClick={() => navigate(item.href)}>{item.label}</button>
          ))}
        </nav>
        <button className="admin-nav-button" onClick={() => { window.location.hash = '#/admin/login'; }}>Admin</button>
        <button className="header-cta" onClick={() => setPage('register')}>Register <ArrowRight size={14} /></button>
        <button
          className="menu-button"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          data-menu-button
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i></i><i></i>
        </button>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} data-menu>
        {navItems.map((item) => (
          <button key={item.href} onClick={() => navigate(item.href)}>{item.label}</button>
        ))}
        <button onClick={() => { setMenuOpen(false); window.location.hash = '#/admin/login'; }}>Admin</button>
        <button onClick={() => { setMenuOpen(false); setPage('register'); }}>Register now ↗</button>
      </div>
    </>
  );
}
