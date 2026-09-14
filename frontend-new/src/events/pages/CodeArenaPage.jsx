import React from 'react';
import { getEventBySlug } from '../config';
import { EventHero } from '../components/EventHero';
import { EventMeta } from '../components/EventMeta';
import { EventOverview } from '../components/EventOverview';
import { TopicGrid } from '../components/TopicGrid';
import { EvaluationGrid } from '../components/EvaluationGrid';
import { RuleCard } from '../components/RuleCard';
import { ImportantNotice } from '../components/ImportantNotice';
import { EventCTA } from '../components/EventCTA';
import { EventCountdown } from '../components/EventCountdown';

export function CodeArenaPage() {
  const event = getEventBySlug('code-arena');

  return (
    <div className="event-page">
      <EventHero event={event} />
      <div className="event-section">
        <EventCountdown />
        <EventMeta meta={event.meta} />
      </div>
      <div className="event-section">
        <EventOverview overview={event.overview} />
      </div>
      <div className="event-section">
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 24px', color: 'var(--ink)' }}>Three Rounds</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {event.rounds.map((round, i) => (
            <div key={i} style={{ padding: '24px', border: '1px solid var(--line)', background: 'linear-gradient(150deg, rgba(6,182,212,.06), rgba(5,3,3,.6))', borderRadius: '8px' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", color: 'var(--gold)', fontSize: '.75rem', fontWeight: 700 }}>{round.number}</span>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', color: 'var(--ink)', margin: '8px 0 6px' }}>{round.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.6, margin: '0 0 8px' }}>{round.desc}</p>
              <small style={{ color: 'var(--gold)', fontSize: '.72rem' }}>{round.problems} problems</small>
            </div>
          ))}
        </div>
      </div>
      <div className="event-section">
        <TopicGrid topics={event.topics} title="Topics Covered" />
      </div>
      <div className="event-section" id="rules">
        <p className="eyebrow">Rules</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 20px', color: 'var(--ink)' }}>Competition Rules</h2>
        {event.rules.map((rule, i) => (
          <RuleCard key={i} rule={rule} index={i} />
        ))}
      </div>
      <div className="event-section">
        <EvaluationGrid criteria={event.evaluation} title={event.evaluationTitle} />
      </div>
      <div className="event-section" id="important">
        <ImportantNotice items={event.important} />
      </div>
      <EventCTA event={event} />
    </div>
  );
}
