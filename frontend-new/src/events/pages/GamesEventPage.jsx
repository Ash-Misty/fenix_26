import React from 'react';
import { ArrowRight, Gamepad2, House, Phone, Swords } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/game-events.css';

const links = [['Home', 'top'], ['Events', 'events'], ['Workshop', 'workshop'], ['Timeline', 'timeline'], ['Team', 'team'], ['About', 'top']];
const contacts = [
  { name: 'Charlin Ashini', phone: '+91 86194 43715', initials: 'CA' },
  { name: 'Sai Krishna', phone: '+91 87954 32109', initials: 'SK' },
];

export function GamesEventPage() {
  const { goHome, goRegister, goToSection } = useEventNavigation();
  return (
    <main className="ge-page">
      <nav className="ge-nav">
        <button className="ge-brand" type="button" onClick={() => goToSection('top')}><b>◈</b> FENIX<span>'26</span></button>
        <div className="ge-nav-links">{links.slice(1, 5).map(([label, id]) => <button type="button" key={id} onClick={() => goToSection(id)}>{label}</button>)}</div>
        <button className="ge-register" type="button" onClick={goRegister}>REGISTER <ArrowRight size={12} /></button>
      </nav>
      <section className="ge-hero" id="top" data-reveal>
        <button className="ge-back" type="button" onClick={goHome}><House size={12} /> Events</button>
        <div>
          <p className="ge-kicker">NON-TECHNICAL EVENT</p>
          <h1>GAME <span>EVENTS</span></h1>
          <h2>Play. Compete. Conquer.</h2>
          <p>Two games. One stage. Show your skills in Free Fire and Mini Military and be the champion!</p>
        </div>
        <div className="ge-art" aria-hidden="true"><i><Swords size={48} /></i><i><Gamepad2 size={48} /></i></div>
      </section>
      <section className="ge-choice" data-reveal>
        <a className="ge-card fire" href="#/events/free-fire">
          <Swords size={54} />
          <h3>FREE FIRE</h3>
          <strong>Survive. Strategize. Dominate.</strong>
          <p>Squads will battle in classic mode with predefined rules and custom rooms. Only the best squad will survive!</p>
          <em>View Details <ArrowRight size={14} /></em>
        </a>
        <a className="ge-card military" href="#/events/mini-militia">
          <Gamepad2 size={54} />
          <h3>MINI MILITARY</h3>
          <strong>Small Squad. Big Battles.</strong>
          <p>Teams will compete in fast-paced combat rounds with limited resources. Use strategy, coordination and skill to eliminate the enemy.</p>
          <em>View Details <ArrowRight size={14} /></em>
        </a>
      </section>
      <div className="ge-quote">Choose your game. Show your power.</div>
      <section className="ge-help" data-reveal>
        <div><p className="ge-kicker">Need Help?</p><h2>Have questions about this event?</h2><p>Contact the event coordinators.</p></div>
        <div className="ge-contacts">{contacts.map((c) => <a href={`tel:${c.phone.replace(/\s/g, '')}`} key={c.phone}><span>{c.initials}</span><strong>{c.name}</strong><small>Event Coordinator<br />{c.phone}</small><Phone size={14} /></a>)}</div>
      </section>
      <footer className="ge-footer">
        <div><strong>◈ FENIX<span>'26</span></strong><p>Rise. Recode. Reign.</p></div>
        <div><b>QUICK LINKS</b>{links.map(([label, id]) => <button type="button" key={label} onClick={() => goToSection(id)}>{label}</button>)}</div>
        <div><b>CONTACT US</b>{contacts.map((c) => <p key={c.phone}>{c.name}<br />{c.phone}</p>)}</div>
        <p className="ge-copy">© 2026 FENIX. All rights reserved.</p>
      </footer>
    </main>
  );
}
