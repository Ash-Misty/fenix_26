import React from 'react';
import { ArrowRight, Clock3, House, Map, MapPin, Phone, Trophy, UserRound } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/treasure-hunt.css';

const links = [['Home', 'top'], ['Events', 'events'], ['Workshop', 'workshop'], ['Timeline', 'timeline'], ['Team', 'team'], ['About', 'top']];
const contacts = [
  { name: 'Charlin Ashini', phone: '+91 86194 43715', initials: 'CA' },
  { name: 'Sai Krishna', phone: '+91 87954 32109', initials: 'SK' },
];

export function TreasureHuntPage() {
  const { goHome, goRegister, goToSection } = useEventNavigation();
  return (
    <main className="th-page">
      <nav className="th-nav">
        <button className="th-brand" type="button" onClick={() => goToSection('top')}><b>◈</b> FENIX<span>'26</span></button>
        <div className="th-nav-links">{links.slice(1, 5).map(([label, id]) => <button type="button" key={id} onClick={() => goToSection(id)}>{label}</button>)}</div>
        <button className="th-register" type="button" onClick={goRegister}>REGISTER <ArrowRight size={12} /></button>
      </nav>
      <section className="th-hero" id="top">
        <button className="th-back" type="button" onClick={goHome}><House size={12} /> Events</button>
        <div>
          <p className="th-kicker">NON-TECHNICAL EVENT</p>
          <h1>TREASURE <span>HUNT</span></h1>
          <h2>Follow the Clues. Find the Treasure.</h2>
          <p>Solve riddles, crack clues and navigate through hidden locations to find the ultimate treasure. Are you ready for the hunt?</p>
        </div>
        <div className="th-art" aria-hidden="true"><span>🗝</span></div>
        <div className="th-stats">
          <article><UserRound size={15} /><span><small>Team Event</small><strong>2–4 Members</strong></span></article>
          <article><Clock3 size={15} /><span><small>Duration</small><strong>1.5–2 Hours</strong></span></article>
          <article><MapPin size={15} /><span><small>Venue</small><strong>Indoor / Outdoor</strong></span></article>
          <article><Map size={15} /><span><small>Campus</small><strong>College Grounds</strong></span></article>
        </div>
      </section>
      <section className="th-grid">
        <article className="th-card">
          <p className="th-kicker">Event Overview</p>
          <h3>EVENT OVERVIEW</h3>
          <p>Teams will receive a series of clues and riddles. Solve them, complete challenges and reach the final location to find the treasure.</p>
        </article>
        <article className="th-card">
          <p className="th-kicker">How to Play</p>
          <h3>HOW TO PLAY</h3>
          <ol className="th-steps">
            <li><b>1</b> Collect your first clue</li>
            <li><b>2</b> Solve riddles & puzzles</li>
            <li><b>3</b> Complete challenges</li>
            <li><b>4</b> Reach the final location</li>
          </ol>
        </article>
        <article className="th-card">
          <p className="th-kicker">Key Rules</p>
          <h3>KEY RULES</h3>
          <ul className="th-rules">
            <li>Teams must stay together</li>
            <li>No external help or cheating</li>
            <li>Keep the event area clean</li>
            <li>Follow the given time limit</li>
          </ul>
        </article>
        <article className="th-card th-prize">
          <p className="th-kicker">Prize Pool</p>
          <Trophy size={28} color="#ffe08a" />
          <strong>₹ 4,000</strong>
          <span>+ Certificates</span>
        </article>
      </section>
      <div className="th-quote">Find the clues. Uncover the truth.</div>
      <button className="th-cta" type="button" onClick={goRegister}><Trophy size={16} /> Register for Treasure Hunt <ArrowRight size={16} /></button>
      <section className="th-help">
        <div><p className="th-kicker">Need Help?</p><h2>Have questions about this event?</h2><p>Contact the event coordinators.</p></div>
        <div className="th-contacts">{contacts.map((c) => <a href={`tel:${c.phone.replace(/\s/g, '')}`} key={c.phone}><span>{c.initials}</span><strong>{c.name}</strong><small>Event Coordinator<br />{c.phone}</small><Phone size={14} /></a>)}</div>
      </section>
      <footer className="th-footer">
        <div><strong>◈ FENIX<span>'26</span></strong><p>Rise. Recode. Reign.</p></div>
        <div><b>QUICK LINKS</b>{links.map(([label, id]) => <button type="button" key={label} onClick={() => goToSection(id)}>{label}</button>)}</div>
        <div><b>CONTACT US</b>{contacts.map((c) => <p key={c.phone}>{c.name}<br />{c.phone}</p>)}</div>
        <p className="th-copy">© 2026 FENIX. All rights reserved.</p>
      </footer>
    </main>
  );
}
