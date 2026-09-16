import { useEffect, useState } from 'react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/pixel-perfect-exact.css';
import './styles/pixel-perfect-spacing.css';

const highlights = [
  ['◈', 'Individual / Team', '2–4 Members'],
  ['▣', 'Laptop', 'Required'],
  ['◷', '2–2.5 Hours', ''],
  ['✦', 'Figma Only', ''],
  ['⌁', 'No AI Tools', ''],
];

const criteria = [
  ['⬡', 'Layout Understanding'],
  ['⬢', 'Visual Accuracy'],
  ['◈', 'Spacing & Alignment'],
  ['✦', 'Typography & Colors'],
  ['◆', 'Speed of Execution'],
];

function Brand() {
  return <div className="brand"><img className="brand-logo" src="/fenix-26-logo.jpg" alt="FENIX 2026" /><span>FENIX<span className="brand-year">’26</span></span></div>;
}

export function PixelPerfectExactPage() {
  const { goHome, goRegister } = useEventNavigation();
  const [active, setActive] = useState('Home');
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const sections = ['home', 'rounds', 'gallery', 'criteria', 'contact'];
    const onScroll = () => {
      const current = sections.find((id) => {
        const element = document.getElementById(`pixel-${id}`);
        return element && element.getBoundingClientRect().top <= 130 && element.getBoundingClientRect().bottom > 130;
      });
      if (current) setActive(current[0].toUpperCase() + current.slice(1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }), { threshold: 0.12 });
    document.querySelectorAll('.pixel-exact-page .reveal').forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const jump = (id) => document.getElementById(`pixel-${id}`)?.scrollIntoView({ behavior: 'smooth' });
  const register = () => { setRegistered(true); goRegister(); };

  return (
    <main className="pixel-exact-page">
      <div className="site-shell">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <header className="topbar">
          <button className="brand brand-button" onClick={goHome} type="button"><Brand /></button>
          <nav aria-label="Main navigation">
            {['Home', 'Events', 'Gallery', 'Contact'].map((item) => (
              <button key={item} className={active === item ? 'nav-link active' : 'nav-link'} onClick={() => item === 'Home' ? goHome() : jump(item === 'Events' ? 'rounds' : item.toLowerCase())} type="button">{item}</button>
            ))}
          </nav>
          <button className="register-button" onClick={register} type="button">Register Now <span>→</span></button>
        </header>

        <section id="pixel-home" className="hero reveal visible">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy"><div className="eyebrow"><span>◉</span> TECH EVENT</div><h1>PIXEL PERFECT</h1><p className="hero-sub">Replicate. Refine. Perfect.</p><p className="hero-note">Test your design skills and recreate stunning interfaces with precision, creativity<br className="desktop-only" /> and attention to detail.</p></div>
          <div className="figma-orbit" aria-hidden="true"><div className="figma-card"><span className="figma-dot pink" /><span className="figma-dot orange" /><span className="figma-dot purple" /><span className="figma-dot blue" /><span className="figma-dot green" /></div><span className="orbit-dot">✦</span><span className="cursor">◢</span></div>
        </section>

        <section className="highlight-row" aria-label="Event highlights">{highlights.map(([icon, title, detail]) => <div className="highlight" key={title}><span className="highlight-icon">{icon}</span><span><b>{title}</b>{detail && <small>{detail}</small>}</span></div>)}</section>

        <div className="section-layout">
          <section id="pixel-rounds" className="rounds-panel reveal"><div className="section-label"><span>◌</span> Rounds</div><div className="round-grid">
            <article className="round-card"><div className="round-number">01</div><h2>The Blueprint Copy</h2><small>30 Minutes</small><ul><li>Receive a fixed design screenshot via Google Drive</li><li>Replicate the screen accurately in Figma</li><li>Prototype not required</li></ul><div className="mini-preview blueprint"><span /><span /><span /></div><strong>Focus on accuracy &amp; structure</strong></article>
            <article className="round-card"><div className="round-number">02</div><h2>The Flow Mimic</h2><small>2 Hours</small><ul><li>Receive a 5-screen reference prototype</li><li>Recreate screens and interactions in Figma</li><li>Match animations and transitions</li><li>Working prototype required</li></ul><div className="mini-preview flow"><span /><span /><span /><span /></div><strong>Focus on flow &amp; interaction</strong></article>
          </div><div className="final-callout">The final 5-screen design must be a working interactive prototype matching the reference flow.</div><div className="rules-strip"><b>Event Rules</b><span>Figma only</span><span>No AI tools</span><span>Submit Figma link through Google Form</span><span>All submissions are timestamped</span></div></section>

          <aside id="pixel-criteria" className="criteria-panel reveal"><div className="section-label"><span>◈</span> Evaluation Criteria</div><div className="criteria-list">{criteria.map(([icon, item]) => <div key={item}><span>{icon}</span><b>{item}</b></div>)}</div><div className="criteria-glow" /></aside>
          <section id="pixel-gallery" className="gallery-panel reveal"><div className="section-label"><span>✦</span> Event Gallery</div><div className="gallery-grid"><div className="gallery-tile tile-large"><span>PIXEL<br />PERFECT</span><small>Design in motion</small></div><div className="gallery-tile tile-purple"><span>FENIX<br />’26</span><small>Creative energy</small></div><div className="gallery-tile tile-cyan"><span>CREATE<br />BOLDLY</span><small>Make every pixel count</small></div></div></section>
        </div>

        <footer id="pixel-contact" className="footer reveal"><div><Brand /><p>More than an Event,<br />It&apos;s an Experience.</p><small>© 2025 FENIX’26. All rights reserved.</small></div><div className="footer-links"><b>Quick Links</b>{[['Home', 'home'], ['Rounds', 'rounds'], ['Gallery', 'gallery'], ['Criteria', 'criteria'], ['Contact', 'contact']].map(([label, id]) => <button key={id} onClick={() => jump(id)} type="button">{label}</button>)}</div><div className="contact-card"><b>Contact</b><span className="contact-person"><img src="/contact-team.png" alt="Aanya Sharma" /><span><strong>Aanya Sharma</strong><small>+91 9876 4310</small></span></span><span className="contact-person"><img src="/contact-team.png" alt="Rahul Mehta" /><span><strong>Rahul Mehta</strong><small>+91 9876 3210</small></span></span></div></footer>
        {registered && <div className="toast" role="status">Registration interest noted. We&apos;ll see you at FENIX&apos;26.</div>}
      </div>
    </main>
  );
}
