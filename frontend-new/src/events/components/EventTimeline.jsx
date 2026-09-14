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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 100}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 40px 1fr', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
              <span style={{ color: 'var(--gold)', fontFamily: "'DM Mono', monospace", fontSize: '.85rem', fontWeight: 700 }}>{item.step}</span>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid var(--gold)', background: 'var(--bg)', justifySelf: 'center' }} />
              <div>
                <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', color: 'var(--ink)', display: 'block', marginBottom: '4px' }}>{item.title}</strong>
                <p style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.6, margin: 0 }}>{item.desc || item.detail || ''}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
