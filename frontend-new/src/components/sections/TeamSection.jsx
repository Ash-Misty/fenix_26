import React from 'react';
import { team } from '../../data';
import { Reveal } from '../ui/Reveal';

export function TeamSection() {
  return (
    <section id="team" className="section team">
      <div className="section-head">
        <div>
          <Reveal>
            <p className="eyebrow">THE PEOPLE BEHIND THE PULSE</p>
          </Reveal>
          <Reveal delay={100}>
            <h2>
              Meet the<br />
              <span>makers.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <p className="side-copy">
            A driven crew turning a shared vision into an experience worth remembering.
          </p>
        </Reveal>
      </div>
      <div className="team-grid">
        {team.map((p, i) => (
          <Reveal key={i} delay={i * 80}>
            <article className="person">
              <div className={'avatar a' + i}>{p.name.slice(1, 2)}</div>
              <div>
                <h3>{p.name}</h3>
                <p>{p.role}</p>
                <small>{p.meta}</small>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}