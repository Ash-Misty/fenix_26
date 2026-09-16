import React from 'react';
import { ArrowRight, Clock3, House, Phone, Smartphone, Swords, Trophy, UserRound } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/free-fire.css';

const links = [['Home', 'top'], ['Events', 'events'], ['Workshop', 'workshop'], ['Timeline', 'timeline'], ['Team', 'team'], ['About', 'top']];
const contacts = [
  { name: 'Charlin Ashini', phone: '+91 86194 43715', initials: 'CA' },
  { name: 'Sai Krishna', phone: '+91 87954 32109', initials: 'SK' },
];

export function FreeFirePage() {
  const { goRegister, goToSection } = useEventNavigation();
  return (
    <main className="ff-page">
      <nav className="ff-nav">
        <button className="ff-brand" type="button" onClick={() => goToSection('top')}><b>◈</b> FENIX<span>'26</span></button>
        <div className="ff-nav-links">{links.slice(1, 5).map(([label, id]) => <button type="button" key={id} onClick={() => goToSection(id)}>{label}</button>)}</div>
        <button className="ff-register" type="button" onClick={goRegister}>REGISTER <ArrowRight size={12} /></button>
      </nav>
      <section className="ff-hero" id="top">
        <button className="ff-back" type="button" onClick={() => { window.location.hash = '#/events/game-event'; }}><House size={12} /> Game Events</button>
        <div>
          <p className="ff-kicker">GAME EVENT · CHILD ARENA</p>
          <h1>FREE <span>FIRE</span></h1>
          <h2>Survive. Strategize. Dominate.</h2>
          <p>Drop in, gear up, and be the last squad standing. Show your skills, teamwork and survival instincts in the ultimate battle royale.</p>
        </div>
        <div className="ff-art" aria-hidden="true"><Swords size={72} /></div>
        <div className="ff-stats">
          <article><UserRound size={15} /><span><small>Team Event</small><strong>4 Members</strong></span></article>
          <article><Smartphone size={15} /><span><small>Platform</small><strong>Mobile</strong></span></article>
          <article><Clock3 size={15} /><span><small>Duration</small><strong>2–3 Hours</strong></span></article>
          <article><Trophy size={15} /><span><small>Mode</small><strong>Classic / Custom</strong></span></article>
        </div>
      </section>
      <section className="ff-grid">
        <article className="ff-card">
          <p className="ff-kicker">Event Overview</p>
          <h3>EVENT OVERVIEW</h3>
          <p>Squads will battle in classic mode with predefined rules and custom rooms. Only the best squad will survive!</p>
        </article>
        <article className="ff-card">
          <p className="ff-kicker">How to Play</p>
          <h3>HOW TO PLAY</h3>
          <ol className="ff-steps">
            <li><b>1</b> Form your squad</li>
            <li><b>2</b> Join the custom room</li>
            <li><b>3</b> Drop, loot & fight</li>
            <li><b>4</b> Get a chicken dinner</li>
          </ol>
        </article>
        <article className="ff-card">
          <p className="ff-kicker">Key Rules</p>
          <h3>KEY RULES</h3>
          <ul className="ff-rules">
            <li>No hacks or cheats</li>
            <li>No teaming (only squad mates apply)</li>
            <li>Follow in-game and event rules</li>
            <li>Respect all players</li>
          </ul>
        </article>
        <article className="ff-card ff-prize">
          <p className="ff-kicker">Prize Pool</p>
          <Trophy size={28} color="#ffbd66" />
          <strong>₹ 5,000</strong>
          <span>+ Certificates</span>
        </article>
      </section>
      <div className="ff-quote">Loot. Fight. Be the last one standing.</div>
      <button className="ff-cta" type="button" onClick={goRegister}><Trophy size={16} /> Register for Free Fire <ArrowRight size={16} /></button>
      <section className="ff-help">
        <div><p className="ff-kicker">Need Help?</p><h2>Have questions about this event?</h2><p>Contact the event coordinators.</p></div>
        <div className="ff-contacts">{contacts.map((c) => <a href={`tel:${c.phone.replace(/\s/g, '')}`} key={c.phone}><span>{c.initials}</span><strong>{c.name}</strong><small>Event Coordinator<br />{c.phone}</small><Phone size={14} /></a>)}</div>
      </section>
      <footer className="ff-footer">
        <div><strong>◈ FENIX<span>'26</span></strong><p>Rise. Recode. Reign.</p></div>
        <div><b>QUICK LINKS</b>{links.map(([label, id]) => <button type="button" key={label} onClick={() => goToSection(id)}>{label}</button>)}</div>
        <div><b>CONTACT US</b>{contacts.map((c) => <p key={c.phone}>{c.name}<br />{c.phone}</p>)}</div>
        <p className="ff-copy">© 2026 FENIX. All rights reserved.</p>
      </footer>
    </main>
  );
}
