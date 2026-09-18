import { useState } from 'react';
import { ArrowRight, Award, CheckCircle2, Clock3, Image as ImageIcon, Laptop, Lightbulb, Mail, Menu, MessagesSquare, Phone, Plus, Sparkles, Timer, Users, X } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/paper-presentation-exact.css';

const topics = [
  ['01', 'Agentic AI', 'Autonomous Systems Beyond Chatbots'],
  ['02', 'Quantum Computing', 'and Its Impact on Cybersecurity'],
  ['03', 'Neuromorphic Computing', 'Building Brain-Inspired Hardware'],
];
const timeline = [
  ['Abstract', '(200–300 words, PDF)', 'Oct 1', true], ['Shortlisting', '', '', true],
  ['Final Submission', '(PPT)', 'Oct 6, 6 PM', true], ['Presentation', '', '', false],
];
const criteria = ['Content & Technical Depth', 'Innovation & Originality', 'Presentation Skills & Clarity', 'PPT Design & Structure', 'Q&A Handling'];

function SectionHeading({ icon: Icon, title, small = false }) {
  return <div className="pp-heading"><span><Icon size={17} /></span><h2 className={small ? 'small' : ''}>{title}</h2></div>;
}

export function PaperPresentationExactPage() {
  const { goHome, goRegister } = useEventNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const scrollTo = (id) => { closeMenu(); const target = id === 'gallery' ? 'events' : id === 'rules' ? 'about' : id; document.getElementById(`pp-${target}`)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <main className="pp-exact-page">
      <div className="pp-shell">
        <header className="pp-nav">
          <button className="pp-brand" type="button" onClick={goHome}><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><span>FENIX<span>'26</span></span></button>
          <nav className={menuOpen ? 'pp-links open' : 'pp-links'}>
            <button type="button" onClick={goHome}>Home</button><button type="button" onClick={() => scrollTo('events')}>Events</button><button type="button" onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
          <button className="pp-register" type="button" onClick={goRegister}>Register Now <ArrowRight size={15} /></button>
          <button className="pp-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </header>

        <section className="pp-hero" id="pp-home">
          <div className="pp-hero-copy"><span className="pp-pill"><Sparkles size={14} /> Tech Event</span><h1>PAPER<br /><em>PRESENTATION</em></h1><p className="pp-tagline">Research. Analyze. Present.</p><p className="pp-description">Explore future technologies and present your research with clarity, depth and innovation.</p><div className="pp-facts"><div><span><Users size={17} /></span><b>Individual / Team</b><small>(2–4 Members)</small></div><div><span><Laptop size={17} /></span><b>Laptop</b><small>Required</small></div><div><span><Clock3 size={17} /></span><b>2–3 Hours</b><small>Duration</small></div><button type="button" onClick={() => scrollTo('rules')}>Rules &amp; Details <ArrowRight size={15} /></button></div></div>
          <div className="pp-hero-image"><img src="/images/hero-book.png" alt="An open book on a desk lit by a warm amber lamp" /></div>
        </section>

        <section className="pp-section pp-grid-section" id="pp-events"><div className="pp-topics"><SectionHeading icon={Lightbulb} title="Research Topics" /><div className="pp-topic-grid">{topics.map(([num, title, desc]) => <article key={num}><b>{num}</b><h3>{title}</h3><p>{desc}</p></article>)}</div></div><div className="pp-timeline"><SectionHeading icon={CheckCircle2} title="Submission Timeline" small /><ol>{timeline.map(([title, sub, date, done], index) => <li key={title}><span className={done ? 'done' : ''}>{done ? <CheckCircle2 size={14} /> : <i />}</span>{index < timeline.length - 1 && <i className="line" />}<div><b>{title}</b>{sub && <small>{sub}</small>}</div>{date && <strong>{date}</strong>}</li>)}</ol></div></section>

        <section className="pp-section pp-presentation" id="pp-about"><div className="pp-presentation-main"><SectionHeading icon={Timer} title="Presentation" /><div className="pp-presentation-card"><div><strong>10 <small>MINUTES</small></strong><p>Total Time</p></div><div><MessagesSquare size={24} /><b>Presentation <span>+ Q&amp;A</span></b></div><div><Plus size={24} /><b>+2 Minutes <small>Buffer</small></b></div></div></div><div className="pp-evaluation"><SectionHeading icon={Award} title="Evaluation Criteria" small /><ul>{criteria.map((item) => <li key={item}><CheckCircle2 size={19} />{item}</li>)}</ul></div></section>

        <footer className="pp-footer" id="pp-contact"><div className="pp-footer-brand"><button type="button" onClick={goHome}><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><strong>FENIX<span>'26</span></strong></button><p>More Than an Event.<br />It&apos;s an Experience.</p></div><div><h3>Quick Links</h3>{['Home', 'Events', 'Contact'].map((label) => <button type="button" key={label} onClick={() => label === 'Home' ? goHome() : scrollTo(label.toLowerCase())}>{label}</button>)}</div><div><h3>Contacts</h3><a href="tel:+919176543210"><img src="/images/avatar-1.png" alt="Ananya Sharma" /><span><b>Ananya Sharma</b><small><Phone size={12} /> +91 91765 43210</small></span></a><a href="tel:+918765432109"><img src="/images/avatar-2.png" alt="Rohan Mehta" /><span><b>Rohan Mehta</b><small><Phone size={12} /> +91 87654 32109</small></span></a></div><div><h3>Follow Us</h3><div className="pp-social"><a href="#contact" aria-label="Instagram"><ImageIcon size={16} /></a><a href="#contact" aria-label="Mail"><Mail size={16} /></a><a href="#contact" aria-label="Contact"><Phone size={16} /></a></div></div><div className="pp-copyright"><span>© 2025 FENIX&apos;26. All rights reserved.</span><span>Built with ♥ for the Innovators.</span></div></footer>
      </div>
    </main>
  );
}
