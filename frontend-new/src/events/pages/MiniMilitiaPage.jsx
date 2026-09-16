import React from 'react';
import { ArrowRight, Clock3, Gamepad2, House, MonitorSmartphone, Phone, Trophy, UserRound } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/mini-military.css';

const links = [['Home', 'top'], ['Events', 'events'], ['Workshop', 'workshop'], ['Timeline', 'timeline'], ['Team', 'team'], ['About', 'top']];
const contacts = [
  { name: 'Charlin Ashini', phone: '+91 86194 43715', initials: 'CA' },
  { name: 'Sai Krishna', phone: '+91 87954 32109', initials: 'SK' },
];

export function MiniMilitiaPage() {
  const { goRegister, goToSection } = useEventNavigation();
  return (
    <main className="mm-page">
      <nav className="mm-nav">
        <button className="mm-brand" type="button" onClick={() => goToSection('top')}><b>◈</b> FENIX<span>'26</span></button>
        <div className="mm-nav-links">{links.slice(1, 5).map(([label, id]) => <button type="button" key={id} onClick={() => goToSection(id)}>{label}</button>)}</div>
        <button className="mm-register" type="button" onClick={goRegister}>REGISTER <ArrowRight size={12} /></button>
      </nav>
      <section className="mm-hero" id="top">
        <button className="mm-back" type="button" onClick={() => { window.location.hash = '#/events/game-event'; }}><House size={12} /> Game Events</button>
        <div>
          <p className="mm-kicker">GAME EVENT · CHILD ARENA</p>
          <h1>MINI <span>MILITARY</span></h1>
          <h2>Small Squad. Big Battles.</h2>
          <p>Gear up, strategize and outplay your opponents in this action-packed mini military showdown. Tactics, teamwork and quick thinking win the war!</p>
        </div>
        <div className="mm-art" aria-hidden="true"><Gamepad2 size={72} /></div>
        <div className="mm-stats">
          <article><UserRound size={15} /><span><small>Team Event</small><strong>2–4 Members</strong></span></article>
          <article><MonitorSmartphone size={15} /><span><small>Platform</small><strong>Mobile / PC</strong></span></article>
          <article><Clock3 size={15} /><span><small>Duration</small><strong>2–3 Hours</strong></span></article>
          <article><Trophy size={15} /><span><small>Format</small><strong>Combat Rounds</strong></span></article>
        </div>
      </section>
      <section className="mm-grid">
        <article className="mm-card">
          <p className="mm-kicker">Event Overview</p>
          <h3>EVENT OVERVIEW</h3>
          <p>Teams will compete in fast-paced combat rounds with limited resources. Use strategy, coordination and skill to eliminate the enemy and win.</p>
        </article>
        <article className="mm-card">
          <p className="mm-kicker">How to Play</p>
          <h3>HOW TO PLAY</h3>
          <ol className="mm-steps">
            <li><b>1</b> Join your squad</li>
            <li><b>2</b> Enter the arena</li>
            <li><b>3</b> Eliminate opponents</li>
            <li><b>4</b> Be the last standing</li>
          </ol>
        </article>
        <article className="mm-card">
          <p className="mm-kicker">Key Rules</p>
          <h3>KEY RULES</h3>
          <ul className="mm-rules">
            <li>No use of unfair cheats or hacks</li>
            <li>Team coordination is mandatory</li>
            <li>Respect all participants</li>
          </ul>
        </article>
        <article className="mm-card mm-prize">
          <p className="mm-kicker">Prize Pool</p>
          <Trophy size={28} color="#7dff9a" />
          <strong>₹ 4,000</strong>
          <span>+ Certificates</span>
        </article>
      </section>
      <div className="mm-quote">Small Team. Giant Moves.</div>
      <button className="mm-cta" type="button" onClick={goRegister}><Trophy size={16} /> Register for Mini Military <ArrowRight size={16} /></button>
      <section className="mm-help">
        <div><p className="mm-kicker">Need Help?</p><h2>Have questions about this event?</h2><p>Contact the event coordinators.</p></div>
        <div className="mm-contacts">{contacts.map((c) => <a href={`tel:${c.phone.replace(/\s/g, '')}`} key={c.phone}><span>{c.initials}</span><strong>{c.name}</strong><small>Event Coordinator<br />{c.phone}</small><Phone size={14} /></a>)}</div>
      </section>
      <footer className="mm-footer">
        <div><strong>◈ FENIX<span>'26</span></strong><p>Rise. Recode. Reign.</p></div>
        <div><b>QUICK LINKS</b>{links.map(([label, id]) => <button type="button" key={label} onClick={() => goToSection(id)}>{label}</button>)}</div>
        <div><b>CONTACT US</b>{contacts.map((c) => <p key={c.phone}>{c.name}<br />{c.phone}</p>)}</div>
        <p className="mm-copy">© 2026 FENIX. All rights reserved.</p>
      </footer>
    </main>
  );
}
