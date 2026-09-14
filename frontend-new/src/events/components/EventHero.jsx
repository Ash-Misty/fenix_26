import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../../components/ui/Reveal';

export function EventHero({ event, setPage }) {
  const theme = event.theme || {};
  return (
    <section className="event-hero" style={{ background: `linear-gradient(135deg, ${theme.bg || '#1a0a14'}, #16090e 70%)` }}>
      <Reveal>
        <p className="eyebrow" style={{ color: theme.accent || 'var(--sun)' }}>{event.category} EVENT</p>
      </Reveal>
      <Reveal delay={100}>
        <h1 style={{ color: '#f7f0e8' }}>{event.title}</h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="tagline" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: theme.accent || 'var(--gold)' }}>{event.subtitle}</p>
      </Reveal>
      <Reveal delay={300}>
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => setPage('register')}>Register Now</button>
          <button className="btn secondary" onClick={() => setPage('events')}>Back to Events</button>
        </div>
      </Reveal>
      {event.tagline && (
        <Reveal delay={400}>
          <p style={{ marginTop: '32px', color: 'var(--muted)', fontSize: '.85rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>{event.tagline}</p>
        </Reveal>
      )}
    </section>
  );
}
