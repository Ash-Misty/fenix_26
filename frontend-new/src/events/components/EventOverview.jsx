import React from 'react';
import { Reveal } from '../../components/ui/Reveal';

export function EventOverview({ overview }) {
  if (!overview) return null;
  return (
    <section style={{ padding: '60px 0' }}>
      <Reveal>
        <p className="eyebrow">Event Overview</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 20px', color: 'var(--ink)' }}>About This Event</h2>
      </Reveal>
      <Reveal delay={100}>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '700px' }}>{overview}</p>
      </Reveal>
    </section>
  );
}
