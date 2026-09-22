import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function WorkshopSection({ setPage }) {
  return (
    <section id="workshop" className="section workshop">
      <div className="workshop-graphic">
        <img src="/images/data-science-ai-workshop.png" alt="Data Science and AI workshop illustration" />
      </div>
      <div className="workshop-copy">
        <Reveal>
          <p className="eyebrow">FEATURED HANDS-ON WORKSHOP</p>
        </Reveal>
        <Reveal delay={100}>
          <h2>
            Data Science with<br />
            <span>AI Technology.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="large">
            Turn data into practical AI-powered insights through a focused, hands-on learning session.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <ul className="workshop-topics" aria-label="Workshop topics">
            <li>Data cleaning, analysis, and visualisation</li>
            <li>Machine-learning models and AI-assisted workflows</li>
            <li>Hands-on project guidance and responsible AI practice</li>
          </ul>
        </Reveal>
        <Reveal delay={350}>
          <div className="detail-pills">
            <span className="workshop-fee"><b>₹250</b> Workshop fee</span>
            <span><Clock /> October 07, 2026 · 09:00 AM</span>
            <span><MapPin /> Anna University, Trichy</span>
          </div>
        </Reveal>
        <Reveal delay={450}>
          <Button className="workshop-reserve" onClick={() => setPage('workshop-register')}>Reserve a spot</Button>
        </Reveal>
      </div>
    </section>
  );
}
