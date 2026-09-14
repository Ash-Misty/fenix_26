import React from 'react';
import { getEventBySlug } from '../config';
import { EventHero } from '../components/EventHero';
import { EventMeta } from '../components/EventMeta';
import { EventOverview } from '../components/EventOverview';
import { EventTimeline } from '../components/EventTimeline';
import { EvaluationGrid } from '../components/EvaluationGrid';
import { RuleCard } from '../components/RuleCard';
import { ImportantNotice } from '../components/ImportantNotice';
import { EventCTA } from '../components/EventCTA';
import { EventCountdown } from '../components/EventCountdown';
import { RoundCardFixed } from '../components/RoundCard';

export function PixelPerfectPage() {
  const event = getEventBySlug('pixel-perfect');
  const { rounds } = event;

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
      <div className="event-section" id="rounds">
        <p className="eyebrow">Rounds</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 24px', color: 'var(--ink)' }}>Two Design Challenges</h2>
        {rounds.map((round, i) => (
          <RoundCardFixed key={i} round={round} />
        ))}
      </div>
      <div className="event-section" id="rules">
        <p className="eyebrow">Rules</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 20px', color: 'var(--ink)' }}>Competition Rules</h2>
        {event.rules.map((rule, i) => (
          <RuleCard key={i} rule={rule} index={i} />
        ))}
      </div>
      <div className="event-section">
        <EvaluationGrid criteria={event.rounds[0]?.evaluation || []} title="Round 1 Criteria" />
        <div style={{ height: '40px' }} />
        <EvaluationGrid criteria={event.rounds[1]?.evaluation || []} title="Round 2 Criteria" />
      </div>
      <div className="event-section" id="important">
        <ImportantNotice items={event.important} />
      </div>
      <EventCTA event={event} />
    </div>
  );
}
