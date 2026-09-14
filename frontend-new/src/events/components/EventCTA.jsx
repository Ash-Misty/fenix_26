import React from 'react';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';

export function EventCTA({ event }) {
  return (
    <section style={{ padding: '80px 0', textAlign: 'center' }}>
      <Reveal>
        <p className="eyebrow" style={{ textAlign: 'center' }}>Ready to compete?</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, margin: '0 0 24px', color: 'var(--ink)' }}>Secure Your Spot</h2>
      </Reveal>
      <Reveal delay={100}>
        <Button onClick={() => window.location.hash = '#/register'}>Register for {event.title}</Button>
      </Reveal>
    </section>
  );
}
