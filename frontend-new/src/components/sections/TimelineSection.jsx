import React from 'react';
import { Reveal } from '../ui/Reveal';

const timeline = [
  ['NOW', 'Registrations open'],
  ['SEP 25', 'Registration deadline'],
  ['OCT 06', 'Workshop day'],
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
              <span>{d}</span>
              <i aria-hidden="true" />
              <strong>{t}</strong>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
