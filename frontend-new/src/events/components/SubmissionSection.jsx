import React from 'react';
import { Reveal } from '../../components/ui/Reveal';

export function SubmissionSection({ data }) {
  if (!data) return null;
  return (
    <section style={{ padding: '60px 0' }}>
      <Reveal>
        <p className="eyebrow">Submission</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 20px', color: 'var(--ink)' }}>{data.title || 'Submission'}</h2>
      </Reveal>
      <Reveal delay={100}>
        <div style={{ padding: '24px', border: '1px solid var(--line)', background: 'rgba(255,45,26,.05)', borderRadius: '8px', maxWidth: '700px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '.95rem', lineHeight: 1.7, margin: '0 0 16px' }}>{data.description || ''}</p>
          {data.deadline && (
            <p style={{ color: 'var(--gold)', fontSize: '.85rem', fontWeight: 700 }}>Deadline: {data.deadline}</p>
          )}
          {data.format && (
            <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginTop: '8px' }}>Format: {data.format}</p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
