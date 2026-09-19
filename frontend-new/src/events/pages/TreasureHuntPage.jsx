import { useState } from 'react';
import { Check, Flag, Flame, MapPin, Menu, Phone, Shield, Trophy, Users, X } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/treasure-hunt.css';

const PATH = [['Rules & First Clue · 5 min', Flag], ['Clue Hunting & Challenges · 45 min', MapPin], ['Final Treasure & Submission · 10 min', Trophy]];
const DOS = ['Teams must have 2–3 members; individual participation is not allowed', 'Use observation, logical thinking, and problem-solving skills', 'Work together with clear communication and quick decisions', 'Manage time creatively while following organizer instructions', 'Keep every clue in its original condition and location'];
const DONTS = ['Do not damage, remove, or share clues', 'No unfair or external assistance', 'Do not interfere with other participants'];
const CONTACTS = [{ name: 'Aarya Sharma', role: 'Event Head', phone: '+91 98123 42233' }, { name: 'Rohan Nette', role: 'Coordinator', phone: '+91 87641 22104' }];

export function TreasureHuntPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { goHome, goRegister } = useEventNavigation();
  const jump = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <main className="thx-page">
      <div className="thx-glow thx-glow-one" aria-hidden="true" /><div className="thx-glow thx-glow-two" aria-hidden="true" />
      <div className="thx-shell">
        <header className="thx-nav">
          <button className="thx-brand" type="button" onClick={goHome}><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><span>FENIX<i>'26</i></span></button>
          <nav className={menuOpen ? 'open' : ''} aria-label="Treasure Hunt navigation"><button type="button" onClick={goHome}>Home</button><button className="active" type="button" onClick={() => jump('thx-path')}>Events</button><button type="button" onClick={() => jump('thx-contact')}>Contact</button></nav>
          <button className="thx-register" type="button" onClick={goRegister}>Register now</button>
          <button className="thx-menu" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </header>

        <section className="thx-hero" id="thx-home">
          <div className="thx-copy"><p><Flame size={14} /> Mega event</p><h1>TREASURE<br />HUNT</h1><h2>Single-round clue-solving &amp; treasure hunting challenge.</h2><span><Users size={16} /> Team Event · 60 Minutes</span></div>
          <div className="thx-hero-image"><img src="/images/treasure-hunt-hero.png" alt="Treasure map, compass, and an open chest of gold" /></div>
        </section>

        <section className="thx-path" id="thx-path"><h2>Three-Stage Hunt Path</h2><ol>{PATH.map(([label, Icon], index) => <li key={label}><div className={index === PATH.length - 1 ? 'end' : ''}><Icon size={20} /></div><span>{label}</span>{index < PATH.length - 1 && <i aria-hidden="true" />}</li>)}</ol></section>

        <section className="thx-rules"><article><header><span><Shield size={20} /></span><h2>Focus &amp; Rules</h2></header><div><ul>{DOS.map((rule) => <li key={rule}><i><Check size={14} /></i>{rule}</li>)}</ul><ul>{DONTS.map((rule) => <li key={rule}><i className="no"><X size={14} /></i>{rule}</li>)}</ul></div></article><aside><span><Trophy size={24} /></span><h2>Evaluation &amp; Winners</h2><p>Scores out of 100 consider clues solved, accuracy, completion time, and discovering the treasure. The top three teams are awarded.</p></aside></section>

        <footer className="thx-footer" id="thx-contact"><div><button className="thx-brand" type="button" onClick={goHome}><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><span>FENIX<i>'26</i></span></button><p>The annual techno-cultural fest. Chase the clues, crack the mystery, and claim the treasure.</p></div><div className="thx-footer-links"><h3>Quick links</h3><button type="button" onClick={goHome}>Home</button><button type="button" onClick={() => jump('thx-path')}>Hunt path</button><button type="button" onClick={() => jump('thx-contact')}>Contact</button></div><div><h3>Contact</h3><ul>{CONTACTS.map((contact) => <li key={contact.name}><b>{contact.name.split(' ').map((part) => part[0]).join('')}</b><span><strong>{contact.name}</strong><small><Phone size={12} /> {contact.phone}</small></span></li>)}</ul></div><div className="thx-copyline">© 2026 FENIX. All rights reserved.<span>Crafted for the thrill of the hunt.</span></div></footer>
      </div>
    </main>
  );
}
