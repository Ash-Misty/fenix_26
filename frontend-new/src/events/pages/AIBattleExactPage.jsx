import { useState } from 'react';
import { ArrowRight, Braces, Check, ChevronRight, CircleDot, Code2, Cpu, ExternalLink, GitBranch, Layers3, Mail, Menu, Network, Phone, Rocket, Sparkles, X, Zap } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/ai-battle-exact.css';

const pipeline = [
  { label: 'Theme', icon: CircleDot }, { label: 'Ideate', icon: Sparkles }, { label: 'Develop', icon: Braces },
  { label: 'Test', icon: GitBranch }, { label: 'Submit', icon: Check }, { label: 'Demo', icon: ExternalLink },
];
const tech = [
  { label: 'Programming\nLanguages', icon: Code2 }, { label: 'Frameworks', icon: Layers3 },
  { label: 'AI Tools', icon: Cpu }, { label: 'APIs', icon: Network }, { label: 'Open Source', icon: GitBranch },
];
const criteria = [['01', 'Innovation & Creativity'], ['02', 'AI Implementation'], ['03', 'Technical Implementation'], ['04', 'Functionality & Working'], ['05', 'UI/UX & User Experience'], ['06', 'Presentation & Demo']];

export function AIBattleExactPage() {
  const { goHome, goRegister } = useEventNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const sectionLink = (id) => { closeMenu(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <main className="aib-exact-page">
      <div className="event-shell">
        <div className="ambient ambient-one" /><div className="ambient ambient-two" />
        <header className="site-header">
          <button type="button" className="brand" aria-label="Fenix 26 home" onClick={goHome}><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><span>FENIX<span className="brand-year">'26</span></span></button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen} type="button">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <button type="button" onClick={goHome}>Home</button><button type="button" onClick={() => sectionLink('events')}>Events</button><button type="button" onClick={() => sectionLink('gallery')}>Gallery</button><button type="button" onClick={() => sectionLink('contact')}>Contact</button>
          </nav>
          <button className="register-button" onClick={goRegister} type="button">Register Now <ArrowRight size={15} /></button>
        </header>

        <div className="page-content" id="top">
          <section className="hero-panel" id="events">
            <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> TECH EVENT</div><h1>AI BATTLE</h1><p className="hero-tagline">Think Fast. Build Smart. Battle with AI.</p><p className="challenge-label">Rapid Application Development</p><p className="hero-description">Design, develop, test, and complete a working end-to-end application for the given theme or problem statement.</p><div className="hero-facts"><span><span className="fact-icon">◉</span> Laptop<br /><small>Required</small></span><span><span className="fact-icon">◫</span> Any Tech<br />Stack</span><span><span className="fact-icon">◷</span> 1 Hr 30 Mins</span></div></div>
            <div className="hero-art" aria-hidden="true"><div className="orb orb-a" /><div className="orb orb-b" /><div className="circuit circuit-a" /><div className="circuit circuit-b" /><div className="ai-face"><span>AI</span><div className="face-line line-one" /><div className="face-line line-two" /><div className="face-line line-three" /></div><div className="floating-code">&lt;/&gt;<br /><span>MODEL</span></div></div>
            <button className="hero-cta" onClick={goRegister} type="button"><span>Build a Solution <Rocket size={14} /></span></button>
          </section>

          <section className="main-grid"><div className="left-column">
            <section className="info-card pipeline-card"><h2><span className="section-pip" /> Development Pipeline</h2><div className="pipeline">{pipeline.map((step, index) => { const Icon = step.icon; return <div className="pipeline-step" key={step.label}><div className="step-icon"><Icon size={17} /></div><span>{step.label}</span>{index < pipeline.length - 1 && <ChevronRight className="pipeline-arrow" size={15} />}</div>; })}</div></section>
            <section className="info-card ecosystem-card" id="gallery"><h2><span className="section-pip" /> Technology Ecosystem</h2><div className="tech-grid">{tech.map((item) => { const Icon = item.icon; return <div className="tech-tile" key={item.label}><Icon size={20} /><span>{item.label.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</span></div>; })}</div></section>
            <section className="solution-banner" id="register"><Zap size={29} fill="currentColor" /><strong>Build, test, submit, and demonstrate a working end-to-end solution.</strong></section>
          </div><section className="info-card criteria-card"><h2><span className="section-pip" /> Evaluation Criteria</h2><div className="criteria-list">{criteria.map(([number, label]) => <div className="criteria-row" key={number}><span className="criteria-number">{number}</span><span>{label}</span></div>)}</div></section></section>
        </div>

        <footer className="site-footer" id="contact"><div className="footer-brand"><button className="footer-logo" type="button" onClick={goHome}><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><strong>FENIX<span className="brand-year">'26</span></strong></button><p>More Than an Event,<br />We Are Your Future.</p><small>© 2026 FENIX'26. All rights reserved.</small></div><div className="footer-links"><div><h3>Quick links</h3><button onClick={goHome} type="button">Home</button><button onClick={() => sectionLink('events')} type="button">Events</button><button onClick={() => sectionLink('gallery')} type="button">Gallery</button><button onClick={() => sectionLink('contact')} type="button">Contact</button></div><div><h3>Contact</h3><a className="person" href="tel:+9184764210"><img src="/ananya.png" alt="Ananya Sharma" /><span>Ananya Sharma<small>+91 8476 4210</small></span></a><a className="person" href="tel:+9196345210"><img src="/rahul.png" alt="Rahul Mehta" /><span>Rahul Mehta<small>+91 9634 5210</small></span></a></div></div><div className="footer-contact"><h3>Reach Out</h3><p className="no-social">Questions? Contact our event team.</p><a href="tel:+9184764210"><Phone size={14} /> Call the team</a><a href="mailto:hello@fenix26.dev"><Mail size={14} /> hello@fenix26.dev</a><small>Built with <Zap size={11} fill="currentColor" /> for the innovators</small></div></footer>
      </div>
    </main>
  );
}
