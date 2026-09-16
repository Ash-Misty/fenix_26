import { useState } from 'react';
import { ArrowRight, Award, CheckCircle2, ChevronRight, ClipboardCheck, Clock3, Code2, Cpu, Crown, Gauge, Globe, HardDrive, Laptop, Layers, Layers3, Menu, Medal, ScrollText, Tags, Target, Timer, Trophy, UserRound, Users, X } from 'lucide-react';
import { useEventNavigation } from '../components/EventNavigation';
import './styles/code-arena-exact.css';
import './styles/code-arena-code.css';

const topics = ['Arrays', 'Strings', 'Hash Maps', 'Two Pointers', 'Sliding Window', 'Stack', 'Queue', 'Binary Search', 'Linked List', 'Trees', 'Graphs', 'Heap', 'Intervals', 'Recursion', 'Backtracking', 'Dynamic Programming'];
const criteria = [[Target, 'Problem-Solving Accuracy'], [Timer, 'Execution Time'], [Gauge, 'Time Taken to Solve'], [Cpu, 'Algorithm Efficiency'], [Layers3, 'Time Complexity'], [HardDrive, 'Space Complexity']];
const rounds = [['01', 'EASY', 'Basic programming and problem-solving.', 'emerald'], ['02', 'MEDIUM', 'Algorithm selection, logical thinking and optimization.', 'orange'], ['03', 'HARD', 'Advanced problem solving and optimized solutions.', 'red']];
const rules = ['Teams may have 1 to 4 members; solo participation is allowed.', 'Every participant must bring their own laptop and charger.', 'Any programming language available on the judge is permitted.', 'Rounds must be cleared in order — Easy, then Medium, then Hard.', 'Plagiarism or use of external help results in instant disqualification.', "The judges' decision on scoring and rankings is final."];
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
    <header className="cae-nav"><button className="cae-brand" type="button" onClick={goHome}><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><span>FENIX<span>'26</span></span></button><nav className={menuOpen ? 'cae-links open' : 'cae-links'}><button onClick={goHome} type="button">Home</button><button onClick={() => jump('rounds')} type="button">Events</button><button onClick={() => jump('topics')} type="button">About</button><button onClick={() => jump('winners')} type="button">Gallery</button><button onClick={() => jump('contact')} type="button">Contact</button></nav><button className="cae-register" onClick={goRegister} type="button">Register Now <ArrowRight size={15} /></button><button className="cae-menu" onClick={() => setMenuOpen(!menuOpen)} type="button" aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></header>
    <section className="cae-hero" id="cae-home"><div className="cae-hero-copy"><span className="cae-pill"><Cpu size={14} /> TECH EVENT</span><h1>CODE ARENA</h1><p className="cae-tagline">Think Fast. Code Smart. Optimize Better. Compete to Win.</p><p className="cae-description">Showcase your coding skills in a high-intensity programming competition.</p><ul className="cae-facts"><li><Users size={16} />Team Event<small>(1–4 Members)</small></li><li><Laptop size={16} />Laptop<small>Required</small></li><li><Clock3 size={16} />2–3 Hours</li></ul></div><div><EditorArt /></div></section>
    <section className="cae-section" id="cae-rounds"><SectionHeading icon={Layers}>Rounds</SectionHeading><div className="cae-round-grid">{rounds.map(([num, title, desc, color]) => <article className={`cae-round ${color}`} key={num}><div><b>{num}</b><h3>{title}</h3></div><p>{desc}</p></article>)}</div></section>
    <section className="cae-section cae-topic-layout" id="cae-topics"><div><SectionHeading icon={Tags}>Topics</SectionHeading><ul className="cae-topic-list">{topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div><div><SectionHeading icon={ClipboardCheck}>Evaluation Criteria</SectionHeading><ul className="cae-criteria">{criteria.map(([Icon, label]) => <li key={label}><span><Icon size={15} /></span>{label}</li>)}</ul></div></section>
    <section className="cae-section" id="cae-rules"><SectionHeading icon={ScrollText}>Rules</SectionHeading><ol className="cae-rules">{rules.map((rule, index) => <li key={rule}><CheckCircle2 size={16} /><span><b>{String(index + 1).padStart(2, '0')}.</b> {rule}</span></li>)}</ol></section>
    <section className="cae-section" id="cae-winners"><SectionHeading icon={Trophy}>Winners</SectionHeading><div className="cae-podium">{[[Medal, '2nd', 'second'], [Crown, '1st', 'first'], [Award, '3rd', 'third']].map(([Icon, place, color]) => <div className={color} key={place}><Icon size={28} /><span>{place}</span></div>)}</div></section>
    <section className="cae-register-panel" id="cae-register"><h2>Ready to enter the Arena?</h2><p>Register your team and claim your spot in FENIX&apos;26&apos;s most intense coding showdown.</p><button onClick={goRegister} type="button">Register Now <ArrowRight size={16} /></button></section>
    <footer className="cae-footer" id="cae-contact"><button className="cae-footer-brand" onClick={goHome} type="button"><img src="/fenix-26-logo.jpg" alt="FENIX 2026" /><span>FENIX<span>'26</span></span></button><p>Code Arena — Think Fast. Code Smart. Compete to Win.</p><small>© 2026 FENIX&apos;26. All rights reserved.</small></footer>
  </div></main>;
}
