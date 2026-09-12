import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { events } from '../../data';
import { Reveal } from '../ui/Reveal';

export function EventsSection({ setPage }) {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? events : events.filter((e) => e.category === filter);

  return (
    <section id="events" className="section events">
      <div className="section-head">
        <div>
          <Reveal>
            <p className="eyebrow">FIND YOUR ARENA</p>
          </Reveal>
          <Reveal delay={100}>
            <h2>
              Pick your<br />
              <span>pulse.</span>
            </h2>
          </Reveal>
        </div>
        <div className="filters">
          {['All', 'Technical', 'Non-Technical'].map((x) => (
            <button
              key={x}
              className={filter === x ? 'active' : ''}
              onClick={() => setFilter(x)}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <div className="event-grid">
        {shown.map((e, i) => (
          <article className={`event-card ${e.color}`} key={e.slug}>
            <div className="card-top">
              <span className="event-icon">{e.icon}</span>
              <span className="badge">{e.category}</span>
            </div>
            <h3>{e.name}</h3>
            <p>{e.description}</p>
            <div className="card-actions">
              <button className="details-link" onClick={() => setPage('event:' + e.slug)}>
                View details <ArrowRight size={16} />
              </button>
              <a className="register-link" href="#register" onClick={(event) => { event.preventDefault(); setPage('register'); }}>
                Register now <ArrowRight size={16} />
              </a>
            </div>
            <div className="card-number">0{i + 1}</div>
          </article>
        ))}
      </div>
    </section>
  );
}