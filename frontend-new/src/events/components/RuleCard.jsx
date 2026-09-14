import React from 'react';
import { Reveal } from '../../components/ui/Reveal';

export function RuleCard({ rule, index }) {
  return (
    <Reveal>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '14px 16px', border: '1px solid var(--line)', background: 'rgba(255,45,26,.04)', borderRadius: '6px', marginBottom: '8px' }}>
        <span style={{ background: 'var(--red)', color: 'var(--ink)', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '.75rem', minWidth: '28px', height: '28px', display: 'grid', placeItems: 'center', borderRadius: '50%', flexShrink: 0 }}>{index + 1}</span>
        <p style={{ color: 'var(--ink)', fontSize: '.9rem', lineHeight: 1.6, margin: 0 }}>{rule}</p>
      </div>
    </Reveal>
  );
}
