import React from 'react';
import { Reveal } from '../../components/ui/Reveal';

export function EventMeta({ meta }) {
  if (!meta || !meta.length) return null;
  return (
    <section style={{ padding: '24px 0', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        {meta.map((item) => (
          <Reveal key={item.label}>
            <div style={{ padding: '14px 16px', border: '1px solid var(--line)', background: 'rgba(255,45,26,.05)', borderRadius: '4px' }}>
              <small style={{ color: 'var(--muted)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{item.label}</small>
              <strong style={{ color: 'var(--ink)', fontSize: '.9rem', fontFamily: "'Syne', sans-serif" }}>{item.value}</strong>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
