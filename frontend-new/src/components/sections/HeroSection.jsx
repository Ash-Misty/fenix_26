import React from 'react';
import { Clock } from 'lucide-react';
import { Countdown } from '../ui/Countdown';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function HeroSection({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="ember ember-one" />
      <div className="ember ember-two" />
      <div className="ember ember-three" />
      <div className="ember ember-four" />
      <div className="fire-aura" />

      <div className="hero-copy">
        <Reveal>
          <p className="eyebrow">DEPARTMENT OF CSE & DATA SCIENCE · UCE BIT CAMPUS</p>
        </Reveal>
        <Reveal delay={100}>
          <h1>
            FENIX<span>'26</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="tagline">Where <em>code</em> meets creativity.</p>
        </Reveal>
        <Reveal delay={300}>
          <p className="hero-date">
            <Clock size={16} /> OCTOBER 07, 2026 <b /> ANNA UNIVERSITY, TRICHY
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="hero-actions">
            <Button onClick={() => setPage('register')}>Register now</Button>
            <Button secondary onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore events
            </Button>
          </div>
        </Reveal>
        <Reveal delay={500}>
          <Countdown />
        </Reveal>
      </div>

      <div className="scroll-cue">
        SCROLL TO EXPLORE <span />
      </div>
    </section>
  );
}
