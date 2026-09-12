import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export function AboutSection() {
  return (
    <section id="about" className="section about">
      <Reveal>
        <p className="eyebrow">NOT JUST AN EVENT</p>
        <h2>
          A spark for every<br />
          <span>kind of mind.</span>
        </h2>
      </Reveal>
      <div className="about-side">
        <p className="large">
          FENIX'26 is where the next wave of creators, coders and culture-shapers come together.
          One electric day, made by the Department of CSE & Data Science.
        </p>
        <a onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}>
          Discover what's waiting <ArrowRight size={17} />
        </a>
      </div>
      <div className="stat-row">
        {[
          ['08', 'Signature events'],
          ['02', 'Ways to play'],
          ['01', 'Unforgettable day'],
          ['∞', 'Possibilities'],
        ].map(([n, l]) => (
          <Reveal key={l}>
            <div className="stat">
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}