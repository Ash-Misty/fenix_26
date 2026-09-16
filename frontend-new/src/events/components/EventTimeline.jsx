import React from 'react';
import { Reveal } from '../../components/ui/Reveal';

export function EventTimeline({ items, title = 'Timeline' }) {
  if (!items || !items.length) return null;
  return (
    <section style={{ padding: '60px 0' }}>
      <Reveal>
        <p className="eyebrow">{title}</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 32px', color: 'var(--ink)' }}>{title}</h2>
      </Reveal>
      <div className="event-timeline">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="event-timeline-item">
              <span className="event-timeline-step">{item.step}</span>
              <div className="event-timeline-node" aria-hidden="true" />
              <div className="event-timeline-card">
                <strong>{item.title || item.step}</strong>
                {item.date && <span className="event-timeline-date">{item.date}</span>}
                <p>{item.desc || item.detail || ''}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
