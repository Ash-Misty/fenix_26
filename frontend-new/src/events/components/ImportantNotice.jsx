import React from 'react';
import { Reveal } from '../../components/ui/Reveal';

export function ImportantNotice({ items, title = 'Important Information' }) {
  if (!items || !items.length) return null;
  return (
    <section style={{ padding: '60px 0' }}>
      <Reveal>
        <p className="eyebrow">{title}</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 20px', color: 'var(--ink)' }}>{title}</h2>
      </Reveal>
      <div>
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', border: '1px solid var(--line)', borderLeft: '3px solid var(--gold)', background: 'rgba(255,189,102,.04)', borderRadius: '4px', marginBottom: '8px' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 800, fontFamily: "'Syne', sans-serif", fontSize: '.85rem', flexShrink: 0 }}>!</span>
              <p style={{ color: 'var(--ink)', fontSize: '.9rem', lineHeight: 1.6, margin: 0 }}>{item}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
