import { useState } from 'react';
import { ArrowRight, Award, CheckCircle2, Clock3, Image as ImageIcon, Laptop, Lightbulb, Mail, Menu, MessagesSquare, Phone, Plus, Sparkles, Timer, Users, X } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import { EventBackButton } from '../components/EventBackButton';
import './styles/paper-presentation-exact.css';

const topics = [
  ['01', 'Agentic AI', 'Autonomous Systems Beyond Chatbots'],
  ['02', 'Quantum Computing', 'and Its Impact on Cybersecurity'],
  ['03', 'Neuromorphic Computing', 'Building Brain-Inspired Hardware'],
];
const timeline = [
  ['Abstract', '250–300 words · PDF', 'Sep 30', false], ['Final PPT', 'PPT / paper', 'Oct 3 · 6 PM', false],
  ['Presentation', 'Venue & time on website', 'Event day', false],
];
const criteria = ['Content & Technical Depth', 'Innovation & Originality', 'Style of Presentation', 'Communication Skill', 'Implementation', 'PPT Design & Structure', 'Q&A Handling'];
const ruleGroups = [
  ['01', 'Submission', ['Choose one listed topic or an approved sub-topic', 'Original paper + PPT', 'Submit PDF abstract to ksharinimoorthy0151@gmail.com', 'Final PPT / paper before the deadline']],
  ['02', 'Presentation', ['Individual or team · maximum 3 members', '10 minutes: presentation + Q&A', '+2 minutes buffer', 'Bring laptop, charger and required internet access']],
  ['03', 'Event rules', ['Cross-department teams allowed', 'At least one team member must present', 'No proxy presentation', 'Late arrival may forfeit the slot']],
  ['04', 'Integrity policy', ['No plagiarized or previously published work', 'Plagiarism check applies', 'Disclose AI-generated content', 'Fully AI-written papers are disqualified']],
];

function SectionHeading({ icon: Icon, title, small = false }) {
  return <div className="pp-heading"><span><Icon size={17} /></span><h2 className={small ? 'small' : ''}>{title}</h2></div>;
}

export function PaperPresentationExactPage() {
  const { goHome, goRegister } = useEventNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const scrollTo = (id) => { closeMenu(); const target = id === 'gallery' ? 'events' : id; document.getElementById(`pp-${target}`)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <main className="pp-exact-page">
      <div className="pp-shell">
        <header className="pp-nav">
          <button className="pp-brand" type="button" onClick={goHome}><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><span>FENIX<span>'26</span></span></button>
          <nav className={menuOpen ? 'pp-links open' : 'pp-links'}>
            <button type="button" onClick={goHome}>Home</button><button type="button" onClick={() => scrollTo('events')}>Events</button><button type="button" onClick={() => scrollTo('rules')}>Rules</button><button type="button" onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
          <button className="pp-register" type="button" onClick={goRegister}>Register Now <ArrowRight size={15} /></button>
          <button className="pp-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </header>

        <section className="pp-hero" id="pp-home">
          <div className="pp-hero-copy"><EventBackButton /><span className="pp-pill"><Sparkles size={14} /> Tech Event</span><h1>PAPER<br /><em>PRESENTATION</em></h1><p className="pp-tagline">Research. Analyze. Present.</p><p className="pp-description">Explore future technologies and present your research with clarity, depth and innovation.</p><div className="pp-facts"><div><span><Users size={17} /></span><b>Individual / Team</b><small>Maximum 3 members</small></div><div><span><Laptop size={17} /></span><b>Laptop + PPT</b><small>Required</small></div><div><span><Clock3 size={17} /></span><b>10 Minutes</b><small>+2 min buffer</small></div><button type="button" onClick={() => scrollTo('rules')}>Rules &amp; Details <ArrowRight size={15} /></button></div></div>
          <div className="pp-hero-image"><img src="/images/hero-book.png" alt="An open book on a desk lit by a warm amber lamp" /></div>
        </section>

        <section className="pp-section pp-grid-section" id="pp-events"><div className="pp-topics"><SectionHeading icon={Lightbulb} title="Research Topics" /><div className="pp-topic-grid">{topics.map(([num, title, desc]) => <article key={num}><b>{num}</b><h3>{title}</h3><p>{desc}</p></article>)}</div></div><div className="pp-timeline"><SectionHeading icon={CheckCircle2} title="Submission Timeline" small /><ol>{timeline.map(([title, sub, date, done], index) => <li key={title}><span className={done ? 'done' : ''}>{done ? <CheckCircle2 size={14} /> : <i />}</span>{index < timeline.length - 1 && <i className="line" />}<div><b>{title}</b>{sub && <small>{sub}</small>}</div>{date && <strong>{date}</strong>}</li>)}</ol></div></section>

        <section className="pp-section pp-presentation" id="pp-about"><div className="pp-presentation-main"><SectionHeading icon={Timer} title="Presentation" /><div className="pp-presentation-card"><div><strong>10 <small>MINUTES</small></strong><p>Total Time</p></div><div><MessagesSquare size={24} /><b>Presentation <span>+ Q&amp;A</span></b></div><div><Plus size={24} /><b>+2 Minutes <small>Buffer</small></b></div></div></div><div className="pp-evaluation"><SectionHeading icon={Award} title="Evaluation Criteria" small /><ul>{criteria.map((item) => <li key={item}><CheckCircle2 size={19} />{item}</li>)}</ul></div></section>
        <section className="pp-section pp-rules-section" id="pp-rules"><SectionHeading icon={CheckCircle2} title="Rules & Guidelines" /><div className="pp-rule-grid">{ruleGroups.map(([number, title, rules]) => <article key={title}><span>{number}</span><h3>{title}</h3><ul>{rules.map((rule) => <li key={rule}><CheckCircle2 size={14} />{rule}</li>)}</ul></article>)}</div><div className="pp-rules-note">Venue and assigned time slot: check the official website. Judges&apos; decision is final.</div></section>

        <footer className="pp-footer" id="pp-contact"><div className="pp-footer-brand"><button type="button" onClick={goHome}><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><strong>FENIX<span>'26</span></strong></button><p>More Than an Event.<br />It&apos;s an Experience.</p></div><div><h3>Quick Links</h3>{['Home', 'Events', 'Rules', 'Contact'].map((label) => <button type="button" key={label} onClick={() => label === 'Home' ? goHome() : scrollTo(label.toLowerCase())}>{label}</button>)}</div><div><h3>Contacts</h3><a href="tel:+918870519811"><span><b>Ayisha H</b><small>Event Incharge<br /><Phone size={12} /> +91 88705 19811</small></span></a><a href="tel:+918489387739"><span><b>Muthuraja P</b><small>Tech Coordinator<br /><Phone size={12} /> +91 84893 87739</small></span></a></div><div className="pp-copyright"><span>© 2025 FENIX&apos;26. All rights reserved.</span><span>Built with ♥ for the Innovators.</span></div></footer>
      </div>
    </main>
  );
}
