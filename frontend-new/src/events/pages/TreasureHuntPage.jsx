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

export function TreasureHuntPage() {
  const event = getEventBySlug('treasure-hunt');

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
      <div className="event-section" id="map">
        <p className="eyebrow">Route Map</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 24px', color: 'var(--ink)' }}>Your Journey</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {event.map.map((step, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 40px 1fr', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", color: i === event.map.length - 1 ? 'var(--red)' : 'var(--gold)', fontSize: '.75rem', fontWeight: 700 }}>{step.step}</span>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: i === event.map.length - 1 ? '2px solid var(--red)' : '2px solid var(--gold)', background: i === event.map.length - 1 ? 'var(--red)' : 'var(--bg)', justifySelf: 'center' }} />
              <div>
                <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '1rem', color: 'var(--ink)', display: 'block', marginBottom: '4px' }}>{step.step}</strong>
                <p style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
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
