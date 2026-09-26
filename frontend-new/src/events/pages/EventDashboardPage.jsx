import React, { useEffect, useState } from 'react';
import { ArrowRight, BrainCircuit, CalendarDays, Clock3, Code2, FileText, Gamepad2, Gavel, House, Laptop, ListChecks, Map, Palette, Phone, Swords, Trophy, UserRound } from 'lucide-react';
import { getEventBySlug } from '../config';
import { eventDetails } from '../../eventDetails';
import { useEventNavigation } from '../components/EventNavigation';
import { EventBackButton } from '../components/EventBackButton';

const contacts = [
  { name: 'Charlin Ashini', phone: '+91 86194 43715', initials: 'CA' },
  { name: 'Sai Krishna', phone: '+91 87954 32109', initials: 'SK' },
];

const icons = {
  'pixel-perfect': Palette, 'ai-battle': BrainCircuit, 'paper-presentation': FileText,
  'code-arena': Code2, 'ipl-auction': Gavel, 'free-fire': Swords,
  'mini-militia': Gamepad2, 'treasure-hunt': Map, 'meme-creation': Palette,
};

const prize = {
  'code-arena': '₹ 5,000', 'ipl-auction': '₹ 5,000', 'free-fire': '₹ 5,000',
  'mini-militia': '₹ 4,000', 'treasure-hunt': '₹ 4,000', 'meme-creation': '₹ 3,000',
};

const eventCopy = {
  'pixel-perfect': { tagline: 'Replicate. Refine. Perfect.', description: 'Replicate the given design accurately in Figma. Test your design skills, attention to detail and speed.', stats: ['Individual / Team', '2–4 Members', 'Laptop Required', '2–2.5 Hours'], flowTitle: 'Rounds', flow: [['01', 'The Blueprint Copy', '30 Minutes'], ['02', 'The Flow Mimic', '2 Hours']] },
  'ai-battle': { tagline: 'Think Fast. Build Smart. Battle with AI.', stats: ['Team Event', 'Suggested 20 Members', 'Laptop Required', '2–3 Hours'], flowTitle: 'Development Pipeline' },
  'paper-presentation': { tagline: 'Research. Analyse. Present.', stats: ['Individual / Team (Max 4)', 'Open to All Years', 'Laptop, PPT', '10 Minutes + Q&A'], flowTitle: 'Submission Timeline' },
  'code-arena': { tagline: 'Think Fast. Code Smart. Optimize Better.', description: 'Tackle real-world problems, build innovative solutions and showcase your coding skills in the ultimate programming challenge.', stats: ['Individual Coding Event', 'Laptop Required', '2–3 Hours', '3 Rounds'], flowTitle: 'Rounds' },
  'ipl-auction': { tagline: 'Build Your Championship Squad.', description: 'Strategize. Bid. Build. Take charge as you create your ultimate cricket team in the most exciting auction of the season.', stats: ['Team Event', 'Suggested 10 Members', 'Fixed Virtual Purse', 'Player Auction'], flowTitle: 'Auction Flow' },
  'free-fire': { tagline: 'Survive. Strategize. Dominate.', description: 'Drop in, gear up, and be the last squad standing. Show your skill, teamwork and survival instincts in the ultimate battle royale.', stats: ['Team Event', '4 Members', 'Own Mobile Device', 'Custom Room'], flowTitle: 'Gameplay Flow' },
  'mini-militia': { tagline: 'Small Squad. Big Battles.', description: 'Gear up, strategize and outplay your opponents in this action-packed mini military showdown. Tactics, teamwork and quick thinking win the war!', stats: ['Team Event', 'Own Mobile Device', 'Specified Game Mode', 'Fixed Match Duration'], flowTitle: 'Gameplay Flow' },
  'treasure-hunt': { tagline: 'Follow the Clues. Find the Treasure.', description: 'Solve riddles, crack clues and navigate through hidden locations to find the ultimate treasure. Are you ready for the hunt?', stats: ['Team Event', 'Starting Clue', 'Campus Checkpoints', 'Teamwork'], flowTitle: 'Route Map' },
  'meme-creation': { tagline: 'Make People Laugh. Win.', description: 'Turn your creativity into comedy! Create the best meme, make it viral and take the crown.', stats: ['Individual Event', 'Own Laptop', 'Organizer Prompt', 'Specified Time'], flowTitle: 'Flow' },
};

function stepsFor(event, copy) {
  if (copy.flow) return copy.flow;
  const source = event.pipeline || event.timeline || event.auctionFlow || event.gameplay || event.map || event.flow || event.rounds || [];
  return source.map((item, index) => [item.step || String(index + 1).padStart(2, '0'), item.title || item.step, item.date || item.duration || 'Event stage', item.desc || item.description || item.detail]);
}

function topicsFor(event) {
  if (Array.isArray(event.topics)) return event.topics.map((item) => typeof item === 'string' ? item : item.title);
  if (event.ecosystem) return Object.keys(event.ecosystem).map((key) => key.replace(/([A-Z])/g, ' $1'));
  return [];
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

export function EventDashboardPage({ slug }) {
  const event = getEventBySlug(slug);
  const { goHome, goRegister, goToSection } = useEventNavigation();
  const scrollProgress = useScrollProgress();
  useRevealOnScroll();
  if (!event) return null;

  const copy = eventCopy[event.slug] || {};
  const details = eventDetails[event.slug];
  const EventIcon = icons[event.slug] || CalendarDays;
  const steps = stepsFor(event, copy);
  const topics = topicsFor(event);
  const description = copy.description || event.overview;
  const stats = copy.stats || event.meta?.slice(0, 4).map((item) => item.value) || [];
  const themeStyle = { '--event-primary': event.theme?.primary || '#ff6a22', '--event-accent': event.theme?.accent || '#f9b76e', '--event-glow': event.theme?.glow || 'rgba(255,106,34,.3)' };

  return (
    <main className={`ref-event-page event-theme-${event.slug}`} style={themeStyle}>
      <div className="event-scroll-progress" style={{ '--scroll-progress': `${scrollProgress}%` }} aria-hidden="true" />
      <nav className="ref-event-nav">
        <button className="ref-brand" type="button" onClick={() => goToSection('top')}><span>◈</span> FENIX<span>'26</span></button>
        <div className="ref-nav-links"><button type="button" onClick={() => goToSection('events')}>Events</button><button type="button" onClick={() => goToSection('workshop')}>Workshop</button><button type="button" onClick={() => goToSection('timeline')}>Timeline</button><button type="button" onClick={() => goToSection('team')}>Team</button><button type="button" onClick={() => goToSection('top')}>About</button></div>
        <button className="ref-register" type="button" onClick={goRegister}>Register <ArrowRight size={11} /></button>
      </nav>

      <section className="ref-hero" id="top" data-reveal>
        <EventBackButton className="ref-back" />
        <div className="ref-hero-copy"><p className="ref-kicker">{event.category} EVENT</p><h1>{event.title}</h1><h2>{copy.tagline || event.subtitle}</h2><p>{description}</p></div>
        <div className="ref-art"><EventIcon size={84} strokeWidth={1.1} /><span>{event.tagline}</span><i /><b /></div>
        <div className="ref-stats">{stats.map((value, index) => { const Icon = [UserRound, Laptop, Clock3, Trophy][index] || CalendarDays; return <article key={`${value}-${index}`}><Icon size={15} /><small>{['Format', 'Team size', 'Requirement', 'Duration'][index]}</small><strong>{value}</strong></article>; })}</div>
      </section>

      <section className="ref-layout" id="events">
        <aside className="ref-sidebar"><button className="active" type="button" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}><EventIcon size={13} /> Overview</button><button type="button" onClick={() => document.getElementById('flow')?.scrollIntoView({ behavior: 'smooth' })}><ListChecks size={13} /> {copy.flowTitle || 'Rounds'}</button><button type="button" onClick={() => document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' })}><Swords size={13} /> Rules</button><button type="button" onClick={() => document.getElementById('evaluation')?.scrollIntoView({ behavior: 'smooth' })}><Trophy size={13} /> Evaluation</button><button type="button" onClick={() => document.getElementById('important')?.scrollIntoView({ behavior: 'smooth' })}><FileText size={13} /> Submission</button></aside>
        <div className="ref-main">
          <div className="ref-overview-row" id="overview" data-reveal><article className="ref-card"><p className="ref-kicker">Event Overview</p><h2>Event Overview</h2><p>{description}</p></article><article className="ref-card ref-prize"><p className="ref-kicker">Prize Pool</p><strong>{prize[event.slug] || 'Certificates'}</strong><span>+ Certificates</span></article></div>
          <div className="ref-content-grid">
            <article className="ref-card" id="flow" data-reveal><p className="ref-kicker">{copy.flowTitle || 'How to Play'}</p><div className="ref-flow">{steps.map(([number, title, detail, description]) => <div key={`${number}-${title}`}><b>{number}</b><span>{title}</span><small>{detail}</small>{description && <p>{description}</p>}</div>)}</div></article>
            {!details?.sections?.length && <article className="ref-card" id="rules" data-reveal><p className="ref-kicker">Key Rules</p><ul className="ref-list">{(event.rules || []).map((rule) => <li key={rule}>{rule}</li>)}</ul></article>}
            {topics.length > 0 && <article className="ref-card ref-topics" data-reveal><p className="ref-kicker">{event.slug === 'paper-presentation' ? 'Topics' : 'Technology Ecosystem'}</p><div className="ref-tags">{topics.map((topic) => <span key={topic}>{topic}</span>)}</div></article>}
            <article className="ref-card" id="evaluation" data-reveal><p className="ref-kicker">{event.evaluationTitle || 'Evaluation Criteria'}</p><ul className="ref-list">{(event.evaluation || []).map((criterion) => <li key={criterion.label}><span>{criterion.label}</span><b>{criterion.weight}</b></li>)}</ul></article>
            {details?.sections?.map((section) => <article className="ref-card ref-detail-section" id={/rule|submission|challenge|presentation/i.test(section.title) ? 'rules' : undefined} data-reveal key={section.title}><p className="ref-kicker">{section.title}</p><ul className="ref-list">{section.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
          </div>
          {!details?.sections?.length && <article className="ref-card ref-important" id="important"><p className="ref-kicker">Important Information</p><ul className="ref-list">{(event.important || []).map((item) => <li key={item}>{item}</li>)}</ul></article>}
          <button className="ref-cta" type="button" onClick={goRegister}><Trophy size={15} /> Register for {event.title} <ArrowRight size={15} /></button>
        </div>
      </section>

      <section className="ref-help"><div><p className="ref-kicker">Need Help?</p><h2>Have questions about this event?</h2><p>Contact the event coordinators.</p></div><div className="ref-contacts">{contacts.map((contact) => <a href={`tel:${contact.phone.replace(/\s/g, '')}`} key={contact.phone}><span>{contact.initials}</span><strong>{contact.name}</strong><small>Event Coordinator<br />{contact.phone}</small><Phone size={14} /></a>)}</div></section>
      <footer className="ref-footer"><div><strong>◈ FENIX<span>'26</span></strong><p>Rise. Recode. Reign.</p><div className="ref-social">◉ ◉ ◉</div></div><div><b>QUICK LINKS</b>{['Home', 'Events', 'Workshop', 'Timeline', 'Team', 'About', 'Contact'].map((label) => <button type="button" key={label} onClick={() => goToSection(label.toLowerCase())}>{label}</button>)}</div><div><b>CONTACT US</b>{contacts.map((contact) => <a href={`tel:${contact.phone.replace(/\s/g, '')}`} key={contact.phone}><span>{contact.initials}</span>{contact.name}<small>{contact.phone}</small></a>)}</div><p className="ref-copyright">© 2026 FENIX. All rights reserved.</p></footer>
    </main>
  );
}
