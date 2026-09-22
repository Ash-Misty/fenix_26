import { useState } from 'react';
import { ArrowRight, Award, CheckCircle2, ChevronRight, ClipboardCheck, Clock3, Code2, Cpu, Crown, Gauge, Globe, HardDrive, Laptop, Layers, Layers3, Menu, Medal, Phone, ScrollText, Tags, Target, Timer, Trophy, UserRound, Users, X } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/code-arena-exact.css';
import './styles/code-arena-code.css';

const topics = ['Arrays', 'Strings', 'Hash Maps', 'Two Pointers', 'Sliding Window', 'Stack', 'Queue', 'Binary Search', 'Linked List', 'Trees', 'Graphs', 'Heap', 'Intervals', 'Recursion', 'Backtracking', 'Dynamic Programming'];
const criteria = [[Target, 'Correctness'], [Timer, 'Time Taken'], [Gauge, 'Problem-Solving Accuracy'], [Cpu, 'Algorithm Efficiency'], [Layers3, 'Time Complexity'], [HardDrive, 'Space Complexity']];
const rounds = [['01', '2 PROBLEMS', 'Solve two algorithmic and data-structure challenges within the time limit.', 'emerald'], ['02', 'MIXED LEVELS', 'Problems may be Easy, Medium, or Hard to test fundamental and advanced skills.', 'orange'], ['03', 'SMART SCORING', 'Efficient, correct, and faster solutions earn higher scores.', 'red']];
const rules = ['This is a single-round algorithmic coding challenge lasting 30 minutes.', 'Every participant must bring a laptop for the challenge.', 'Participants receive two coding problems drawn from the published topics.', 'Any programming language supported by the judge may be used.', 'Solutions are evaluated for correctness, speed, algorithm efficiency, and time and space complexity.', 'The top three performers are ranked by their overall score across both problems.'];
const contacts = [['Event Incharge', 'Vaishnavi P', '9344095495'], ['Tech Coordinator', 'Muthuraja P', '8489387739']];
const twoSumExample = `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`;

function SectionHeading({ icon: Icon, children }) { return <h2 className="cae-heading"><span><Icon size={16} /></span>{children}</h2>; }
function EditorArt() { return <div className="cae-editor"><div className="cae-editor-bar"><i /><i /><i /><span>two-sum.js</span></div><pre className="cae-code"><code>{twoSumExample}</code></pre></div>; }

export function CodeArenaExactPage() {
  const { goHome, goRegister } = useEventNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  const jump = (id) => { close(); document.getElementById(`cae-${id}`)?.scrollIntoView({ behavior: 'smooth' }); };
  return <main className="cae-page"><div className="cae-shell">
    <header className="cae-nav"><button className="cae-brand" type="button" onClick={goHome}><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><span>FENIX<span>'26</span></span></button><nav className={menuOpen ? 'cae-links open' : 'cae-links'}><button onClick={goHome} type="button">Home</button><button onClick={() => jump('rounds')} type="button">Events</button><button onClick={() => jump('contact')} type="button">Contact</button></nav><button className="cae-register" onClick={goRegister} type="button">Register Now <ArrowRight size={15} /></button><button className="cae-menu" onClick={() => setMenuOpen(!menuOpen)} type="button" aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></header>
    <section className="cae-hero" id="cae-home"><div className="cae-hero-copy"><span className="cae-pill"><Cpu size={14} /> TECH EVENT</span><h1>CODE ARENA</h1><p className="cae-tagline">Think Fast. Code Smart. Optimize Better. Battle with Algorithms.</p><p className="cae-description">A single-round algorithmic coding challenge built around problem-solving, speed, and efficient solutions.</p><ul className="cae-facts"><li><Users size={16} />Individual<small>Coding Challenge</small></li><li><Laptop size={16} />Laptop<small>Required</small></li><li><Clock3 size={16} />30 Minutes</li></ul></div><div><EditorArt /></div></section>
    <section className="cae-section" id="cae-rounds"><SectionHeading icon={Layers}>Challenge Format</SectionHeading><div className="cae-round-grid">{rounds.map(([num, title, desc, color]) => <article className={`cae-round ${color}`} key={num}><div><b>{num}</b><h3>{title}</h3></div><p>{desc}</p></article>)}</div></section>
    <section className="cae-section cae-topic-layout" id="cae-topics"><div><SectionHeading icon={Tags}>Topics</SectionHeading><ul className="cae-topic-list">{topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div><div><SectionHeading icon={ClipboardCheck}>Evaluation Criteria</SectionHeading><ul className="cae-criteria">{criteria.map(([Icon, label]) => <li key={label}><span><Icon size={15} /></span>{label}</li>)}</ul></div></section>
    <section className="cae-section" id="cae-rules"><SectionHeading icon={ScrollText}>Rules</SectionHeading><ol className="cae-rules">{rules.map((rule, index) => <li key={rule}><CheckCircle2 size={16} /><span><b>{String(index + 1).padStart(2, '0')}.</b> {rule}</span></li>)}</ol></section>
    <section className="cae-section" id="cae-winners"><SectionHeading icon={Trophy}>Final Ranking</SectionHeading><div className="cae-podium">{[[Medal, '2nd', 'second'], [Crown, '1st', 'first'], [Award, '3rd', 'third']].map(([Icon, place, color]) => <div className={color} key={place}><Icon size={28} /><span>{place}</span></div>)}</div></section>
    <section className="cae-register-panel" id="cae-register"><h2>Ready to enter the Arena?</h2><p>Register your team and claim your spot in FENIX&apos;26&apos;s most intense coding showdown.</p><button onClick={goRegister} type="button">Register Now <ArrowRight size={16} /></button></section>
    <section className="cae-section cae-contact-section" id="cae-contact"><SectionHeading icon={Phone}>Meet the Makers</SectionHeading><div className="cae-contact-grid">{contacts.map(([position, name, mobile]) => <a href={`tel:+91${mobile}`} className="cae-contact-card" key={mobile}><span>{position}</span><strong>{name}</strong><small><Phone size={14} /> +91 {mobile}</small></a>)}</div></section>
    <footer className="cae-footer"><button className="cae-footer-brand" onClick={goHome} type="button"><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><span>FENIX<span>'26</span></span></button><p>Code Arena — Think Fast. Code Smart. Compete to Win.</p><div className="cae-footer-links"><button type="button" onClick={goHome}>Home</button><button type="button" onClick={() => jump('rounds')}>Events</button><button type="button" onClick={() => jump('contact')}>Contact</button></div><small>© 2026 FENIX&apos;26. All rights reserved.</small></footer>
  </div></main>;
}
