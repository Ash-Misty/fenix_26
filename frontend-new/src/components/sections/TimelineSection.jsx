import React from 'react';
import { Reveal } from '../ui/Reveal';

const timeline = [
  ['NOW', 'Registrations open'],
  ['06 OCT', 'Registration deadline'],
  ['07 OCT', 'Workshop day'],
  ['OCT 07', 'FENIX\u201926'],
  ['OCT 07', 'Prize distribution'],
];

export function TimelineSection() {
  return (
    <section id="timeline" className="section timeline">
      <Reveal>
        <p className="eyebrow">SAVE THE MOMENT</p>
      </Reveal>
      <Reveal delay={100}>
        <h2>
          One day.<br />
          <span>All the energy.</span>
        </h2>
      </Reveal>
      <div className="timeline-wrap">
        {timeline.map(([d, t], i) => (
          <Reveal key={t} delay={i * 100}>
            <div className={'timeline-item t' + i}>
              <span><b>{String(i + 1).padStart(2, '0')}</b>{d}</span>
              <i aria-hidden="true" />
              <div><strong>{t}</strong><small>{i === 0 ? 'Join the FENIX journey now' : 'Mark your calendar'}</small></div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
