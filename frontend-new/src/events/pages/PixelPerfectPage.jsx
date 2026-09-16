import React, { useState } from 'react';
import { ArrowRight, Clock3, House, Laptop, Trophy, UserRound, LayoutGrid, ListChecks, Settings2, Send, Palette, Ban } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import { PixelPerfectExactPage } from './PixelPerfectExactPage';

const quickLinks = [
  ['Home', 'top'],
  ['Events', 'events'],
  ['Workshop', 'workshop'],
  ['Timeline', 'timeline'],
  ['Team', 'team'],
];

const meta = [
  [UserRound, 'Individual / Team', '2–4 Members'],
  [Laptop, 'Laptop', 'Required'],
  [Clock3, '2–2.5 Hours', 'R1: 30m | R2: 2h'],
  [Palette, 'Figma Only', 'Design tool'],
  [Ban, 'No AI Tools', 'Prohibited'],
];

function LegacyPixelPerfectPage() {
  const { goHome, goRegister, goToSection } = useEventNavigation();
  const [active, setActive] = useState('overview');
  const jump = (id) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <main className="pixel-design-page">
      <nav className="pixel-nav" aria-label="Event navigation">
        <button className="pixel-brand" type="button" onClick={() => goToSection('top')}><span className="pixel-brand-mark">◈</span> FENIX<span>'26</span></button>
        <div className="pixel-nav-links">
          {quickLinks.slice(1, 5).map(([label, id]) => <button type="button" key={id} onClick={() => goToSection(id)}>{label}</button>)}
        </div>
        <button className="pixel-nav-about" type="button" onClick={() => goToSection('top')}>ABOUT</button>
        <button className="pixel-nav-register" type="button" onClick={goRegister}>REGISTER <ArrowRight size={12} /></button>
      </nav>

      <section className="pixel-hero" id="top">
        <button className="pixel-back" type="button" onClick={goHome}><House size={13} /> Events</button>
        <div className="pixel-hero-copy">
          <p className="pixel-kicker">TECHNICAL EVENT</p>
          <h1>PIXEL<br /><span>PERFECT</span></h1>
          <h2>Replicate. Refine. Perfect.</h2>
        </div>
        <div className="pixel-hero-art" aria-hidden="true">
          <div className="pixel-monitor"><div className="pixel-monitor-bar"><i /><i /><i /></div><div className="pixel-figma"><b /><b /><b /><b /><b /></div></div>
          <div className="pixel-phone"><i /><i /><i /></div>
          <span className="pixel-spark spark-one">+</span><span className="pixel-spark spark-two">+</span>
        </div>
        <div className="pixel-meta">
          {meta.map(([Icon, label, value]) => (
            <article key={label}><Icon size={15} /><span><small>{label}</small><strong>{value}</strong></span></article>
          ))}
        </div>
      </section>

      <section className="pixel-body">
        <aside className="pixel-rail" aria-label="Pixel Perfect sections">
          {[['Overview', LayoutGrid, 'overview'], ['Rounds', ListChecks, 'rounds'], ['Rules', Settings2, 'rules'], ['Evaluation', Palette, 'evaluation'], ['Submission', Send, 'important']].map(([label, Icon, id]) => (
            <button className={active === id ? 'active' : ''} type="button" key={id} onClick={() => jump(id)}><Icon size={13} /> {label}</button>
          ))}
        </aside>
        <div className="pixel-content">
          <div className="pixel-content-heading" id="overview">
            <div>
              <p className="pixel-kicker">Event Overview</p>
              <h2>EVENT OVERVIEW</h2>
              <p>Replicate the given designs accurately in Figma. Test your design skills, attention to detail and speed.</p>
            </div>
            <div className="pixel-accuracy"><span>PIXEL ACCURACY</span><strong>90%</strong><i><b /></i></div>
          </div>
          <article className="pixel-rounds" id="rounds">
            <p className="pixel-kicker">ROUNDS</p>
            <div className="pixel-round-grid">
              <button type="button" onClick={() => jump('round-1')}><strong>Round 1 — The Blueprint Copy</strong><span>30 Minutes</span></button>
              <button type="button" onClick={() => jump('round-2')}><strong>Round 2 — The Flow Mimic</strong><span>2 Hours</span></button>
            </div>
          </article>
          <div className="pixel-detail-grid">
            <article className="pixel-detail-card" id="round-1">
              <p className="pixel-kicker">ROUND 1 · 30 MINUTES</p>
              <h2>The Blueprint Copy</h2>
              <p>You are given a reference screenshot of a UI screen. Replicate it as closely as possible in Figma. Every pixel matters.</p>
              <ul>
                <li>Reference screenshot provided</li>
                <li>Match layout, spacing, and typography</li>
                <li>Color accuracy from hex values</li>
                <li>Speed bonus for early completion</li>
              </ul>
              <strong className="pixel-note">Prototype not required in Round 1.</strong>
            </article>
            <article className="pixel-detail-card" id="round-2">
              <p className="pixel-kicker">ROUND 2 · 2 HOURS</p>
              <h2>The Flow Mimic</h2>
              <p>Design five connected screens as a working interactive prototype. Show real interactions, transitions, and navigation flow.</p>
              <ul>
                <li>5 connected screens required</li>
                <li>Interactive prototype (Figma Prototype mode)</li>
                <li>Demonstrate transitions and animations</li>
                <li>User flow must be intuitive</li>
              </ul>
              <strong className="pixel-note">The final 5-screen design must be a working interactive prototype.</strong>
            </article>
          </div>
          <article className="pixel-detail-card" id="rules" style={{ marginTop: 12 }}>
            <p className="pixel-kicker">RULES</p>
            <h2>COMPETITION RULES</h2>
            <ul>
              <li>Use Figma Only — no other design tools allowed.</li>
              <li>No AI-powered design tools or AI-generated assets.</li>
              <li>All content must be original or properly licensed.</li>
              <li>Team members must be registered together before the event starts.</li>
              <li>Judges' decision is final.</li>
            </ul>
          </article>
          <div className="pixel-detail-grid" id="evaluation">
            <article className="pixel-detail-card">
              <p className="pixel-kicker">ROUND 1 EVALUATION</p>
              <ul>
                <li><span>Layout Understanding</span><b>High</b></li>
                <li><span>Visual Accuracy</span><b>High</b></li>
                <li><span>Spacing & Alignment</span><b>High</b></li>
                <li><span>Typography & Colors</span><b>Medium</b></li>
                <li><span>Speed of Execution</span><b>Medium</b></li>
              </ul>
            </article>
            <article className="pixel-detail-card">
              <p className="pixel-kicker">ROUND 2 EVALUATION</p>
              <ul>
                <li><span>Prototype Functionality</span><b>High</b></li>
                <li><span>Interaction Design</span><b>High</b></li>
                <li><span>Visual Consistency</span><b>High</b></li>
                <li><span>UX Flow & Navigation</span><b>Medium</b></li>
                <li><span>Animation Quality</span><b>Medium</b></li>
              </ul>
            </article>
          </div>
          <article className="pixel-detail-card" id="important" style={{ marginTop: 12 }}>
            <p className="pixel-kicker">SUBMISSION</p>
            <ul>
              <li>Bring your own laptop with Figma installed and a stable internet connection.</li>
              <li>Round 1 results determine eligibility for Round 2.</li>
              <li>Screens must be exported as Figma prototype links — no image exports.</li>
              <li>Late submissions will not be accepted.</li>
            </ul>
          </article>
          <button className="pixel-cta" type="button" onClick={goRegister}><Trophy size={16} /> Register for Pixel Perfect <ArrowRight size={16} /></button>
        </div>
      </section>

      <footer className="pixel-footer">
        <div><strong>FENIX<span>'26</span></strong><p>Rise. Recode. Reign.</p></div>
        <div><small>QUICK LINKS</small>{quickLinks.map(([label, id]) => <button key={id} type="button" onClick={() => goToSection(id)}>{label}</button>)}</div>
        <p>© 2026 FENIX'26. All rights reserved.</p>
      </footer>
    </main>
  );
}

export function PixelPerfectPage() {
  return <PixelPerfectExactPage />;
}
