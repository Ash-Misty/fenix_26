import React from 'react';
import { Clock } from 'lucide-react';
import { Countdown } from '../ui/Countdown';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function HeroSection({ setPage, registrationStats, hasRegistrationStatsError = false }) {
  const hasRegistrationStats = Boolean(registrationStats);
  const isLoading = !hasRegistrationStats && !hasRegistrationStatsError;
  const registrations = Math.max(0, Number(registrationStats?.count) || 0);

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
        <Reveal delay={350}>
          <p className="spot-registration-notice"><span>●</span> Spot registrations also available</p>
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
          <div className="hero-registration registration-counter" aria-live="polite" aria-label={hasRegistrationStats ? `${registrations} registrations` : 'Registration totals unavailable'}>
            <div><span>Registrations</span><strong className="registration-count-value">{hasRegistrationStats ? registrations : '—'}</strong></div>
          </div>
          {isLoading && <p className="hero-registration-status">Loading registration totals…</p>}
          {hasRegistrationStatsError && <p className="hero-registration-status">Registration totals are temporarily unavailable.</p>}
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
