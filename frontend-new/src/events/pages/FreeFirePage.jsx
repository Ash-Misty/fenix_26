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

export function FreeFirePage() {
  const event = getEventBySlug('free-fire');

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
      <div className="event-section" id="gameplay">
        <p className="eyebrow">Gameplay Flow</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 24px', color: 'var(--ink)' }}>How the Match Works</h2>
        <EventTimeline items={event.gameplay} title="Match Flow" />
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
