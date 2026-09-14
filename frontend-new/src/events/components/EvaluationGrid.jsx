import React from 'react';
import { Reveal } from '../../components/ui/Reveal';

export function EvaluationGrid({ criteria, title = 'Evaluation Criteria' }) {
  if (!criteria || !criteria.length) return null;
  return (
    <section style={{ padding: '60px 0' }}>
      <Reveal>
        <p className="eyebrow">{title}</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 24px', color: 'var(--ink)' }}>{title}</h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
        {criteria.map((c, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{ padding: '20px', border: '1px solid var(--line)', background: 'linear-gradient(150deg, rgba(255,45,26,.06), rgba(5,3,3,.6))', borderRadius: '6px' }}>
              <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '.95rem', color: 'var(--ink)', display: 'block', marginBottom: '8px' }}>{c.label}</strong>
              <span style={{ fontSize: '.72rem', color: 'var(--gold)', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700 }}>{c.weight} Priority</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
