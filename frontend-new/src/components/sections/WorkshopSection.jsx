import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { PhoenixArt } from '../ui/PhoenixArt';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function WorkshopSection({ setPage }) {
  return (
    <section id="workshop" className="section workshop">
      <div className="workshop-graphic">
        <PhoenixArt className="workshop-phoenix" size="lg" />
        <Reveal>
          <span>RISE<br />BEYOND</span>
        </Reveal>
      </div>
      <div className="workshop-copy">
        <Reveal>
          <p className="eyebrow">FEATURED WORKSHOP & SYMPOSIUM</p>
        </Reveal>
        <Reveal delay={100}>
          <h2>
            Learn from<br />
            <span>the frontiers.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="large">
            A practical, hands-on session designed for students who want to make what's next.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="detail-pills">
            <span><Clock /> October 07, 2026 · 09:00 AM</span>
            <span><MapPin /> Anna University, Trichy</span>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <Button onClick={() => setPage('register')}>Reserve a spot</Button>
        </Reveal>
      </div>
    </section>
  );
}