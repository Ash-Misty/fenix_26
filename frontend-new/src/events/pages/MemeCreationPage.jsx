import React from 'react';
import { ArrowRight, Clock3, Globe, House, Phone, Smile, Trophy, UserRound, Wrench } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/meme-creation.css';

const links = [['Home', 'top'], ['Events', 'events'], ['Workshop', 'workshop'], ['Timeline', 'timeline'], ['Team', 'team'], ['About', 'top']];
const contacts = [
  { name: 'Charlin Ashini', phone: '+91 86194 43715', initials: 'CA' },
  { name: 'Sai Krishna', phone: '+91 87954 32109', initials: 'SK' },
];

export function MemeCreationPage() {
  const { goHome, goRegister, goToSection } = useEventNavigation();
  return (
    <main className="meme-page">
      <nav className="meme-nav">
        <button className="meme-brand" type="button" onClick={() => goToSection('top')}><b>◈</b> FENIX<span>'26</span></button>
        <div className="meme-nav-links">{links.slice(1, 5).map(([label, id]) => <button type="button" key={id} onClick={() => goToSection(id)}>{label}</button>)}</div>
        <button className="meme-register" type="button" onClick={goRegister}>REGISTER <ArrowRight size={12} /></button>
      </nav>
      <section className="meme-hero" id="top">
        <button className="meme-back" type="button" onClick={goHome}><House size={12} /> Events</button>
        <div>
          <p className="meme-kicker">NON-TECHNICAL EVENT</p>
          <h1>MEME <span>CREATION</span></h1>
          <h2>Make People Laugh. Win.</h2>
          <p>Turn your creativity into comedy. Create the best meme, make it viral and take the crown.</p>
        </div>
        <div className="meme-art" aria-hidden="true"><span>🐶</span></div>
        <div className="meme-stats">
          <article><UserRound size={15} /><span><small>Format</small><strong>Individual Event</strong></span></article>
          <article><Clock3 size={15} /><span><small>Duration</small><strong>1–2 Hours</strong></span></article>
          <article><Globe size={15} /><span><small>Platform</small><strong>Online / Onsite</strong></span></article>
          <article><Wrench size={15} /><span><small>Tools</small><strong>Any Tool</strong></span></article>
        </div>
      </section>
      <section className="meme-grid">
        <article className="meme-card">
          <p className="meme-kicker">Event Overview</p>
          <h3>EVENT OVERVIEW</h3>
          <p>Participants will create original memes based on given themes or open topics. Creativity, humor and originality will be judged.</p>
        </article>
        <article className="meme-card">
          <p className="meme-kicker">How to Play</p>
          <h3>HOW TO PLAY</h3>
          <ol className="meme-steps">
            <li><b>1</b> Get your meme / topic</li>
            <li><b>2</b> Create your meme</li>
            <li><b>3</b> Submit before deadline</li>
            <li><b>4</b> Win the best meme</li>
          </ol>
        </article>
        <article className="meme-card">
          <p className="meme-kicker">Key Rules</p>
          <h3>KEY RULES</h3>
          <ul className="meme-rules">
            <li>Original content only</li>
            <li>No plagiarized / copied memes</li>
            <li>Keep it fun and respectful</li>
            <li>Follow submission guidelines</li>
          </ul>
        </article>
        <article className="meme-card meme-prize">
          <p className="meme-kicker">Prize Pool</p>
          <Trophy size={28} color="#f9a8d4" />
          <strong>₹ 3,000</strong>
          <span>+ Certificates</span>
        </article>
      </section>
      <div className="meme-quote">Be Creative. Make it Meme-tastic.</div>
      <button className="meme-cta" type="button" onClick={goRegister}><Smile size={16} /> Register for Meme Creation <ArrowRight size={16} /></button>
      <section className="meme-help">
        <div><p className="meme-kicker">Need Help?</p><h2>Have questions about this event?</h2><p>Contact the event coordinators.</p></div>
        <div className="meme-contacts">{contacts.map((c) => <a href={`tel:${c.phone.replace(/\s/g, '')}`} key={c.phone}><span>{c.initials}</span><strong>{c.name}</strong><small>Event Coordinator<br />{c.phone}</small><Phone size={14} /></a>)}</div>
      </section>
      <footer className="meme-footer">
        <div><strong>◈ FENIX<span>'26</span></strong><p>Rise. Recode. Reign.</p></div>
        <div><b>QUICK LINKS</b>{links.map(([label, id]) => <button type="button" key={label} onClick={() => goToSection(id)}>{label}</button>)}</div>
        <div><b>CONTACT US</b>{contacts.map((c) => <p key={c.phone}>{c.name}<br />{c.phone}</p>)}</div>
        <p className="meme-copy">© 2026 FENIX. All rights reserved.</p>
      </footer>
    </main>
  );
}
