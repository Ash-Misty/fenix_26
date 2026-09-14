import React from 'react';
import { Countdown } from '../../components/ui/Countdown';
import { Reveal } from '../../components/ui/Reveal';

export function EventCountdown() {
  return (
    <section style={{ padding: '40px 0', textAlign: 'center' }}>
      <Reveal>
        <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '20px' }}>Countdown to Event Day</p>
        <Countdown />
      </Reveal>
    </section>
  );
}
