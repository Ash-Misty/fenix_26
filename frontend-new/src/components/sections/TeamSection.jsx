import React from 'react';
import { Reveal } from '../ui/Reveal';

const makers = [
  ['President', 'Vivekanandan A', '9080737731'], ['President', 'Shobika B', '9150705612'],
  ['Vice President', 'Divya K', '8637474583'], ['Vice President', 'Vishwanath R', '6369004065'],
  ['Secretary', 'Santhiya S', '8220367554'], ['Secretary', 'Balaji M', '9361276110'],
  ['Overall Coordinator', 'Indra Santhoshi B', '6381429220'], ['Overall Coordinator', 'Maha Shree R', '6369546337'],
  ['Student Coordinator', 'Thirishala M', '7845170667'], ['Student Coordinator', 'Renuga S', '9025766830'],
  ['Tech Coordinator', 'Muthuraja P', '8489387739'], ['Non Tech Coordinator', 'Sangeetha J', '8270528707'],
];

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
        {makers.map(([position, name, mobile], index) => (
          <Reveal key={name} delay={index * 55}>
            <article className="person maker-card">
              <div>
                <p>{position}</p>
                <h3>{name}</h3>
                <small><a href={`tel:+91${mobile}`}>+91 {mobile}</a></small>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
