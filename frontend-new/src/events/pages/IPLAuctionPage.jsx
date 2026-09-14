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

export function IPLAuctionPage() {
  const event = getEventBySlug('ipl-auction');

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
      <div className="event-section" id="auction-flow">
        <p className="eyebrow">Auction Flow</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 24px', color: 'var(--ink)' }}>How the Auction Works</h2>
        <EventTimeline items={event.auctionFlow} title="Auction Process" />
      </div>
      <div className="event-section">
        <div style={{ padding: '32px', border: '2px solid var(--gold)', background: 'linear-gradient(150deg, rgba(255,189,102,.08), rgba(5,3,3,.8))', borderRadius: '8px', textAlign: 'center', marginBottom: '24px' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Virtual Purse</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--gold)', margin: '0 0 12px' }}>₹1,00,00,000</h2>
          <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>Fixed budget — spend wisely to build your championship squad</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', maxWidth: '600px', margin: '0 auto' }}>
          {['Batsmen (4)', 'Bowlers (3)', 'All-Rounders (2)', 'Wicket-Keeper (1)', 'Reserved (1)'].map((pos, i) => (
            <div key={i} style={{ padding: '14px 12px', border: '1px solid var(--line)', borderRadius: '6px', background: 'rgba(255,45,26,.04)', textAlign: 'center' }}>
              <strong style={{ color: 'var(--ink)', fontSize: '.8rem', display: 'block' }}>{pos}</strong>
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
