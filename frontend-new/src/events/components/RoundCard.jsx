import React from 'react';
import { Reveal } from '../../components/ui/Reveal';

export function RoundCard({ round }) {
  return (
    <Reveal>
      <div style={{ padding: '32px', border: '1px solid var(--line)', background: 'linear-gradient(150deg, rgba(255,45,26,.06), rgba(5,3,3,.7))', borderRadius: '8px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: 'var(--red)' }}>{round.number}</span>
          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.2rem', color: 'var(--ink)', margin: 0 }}>{round.title}</h3>
            <small style={{ color: 'var(--gold)', fontSize: '.72rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>{round.duration}</small>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.7, marginBottom: '16px' }}>{round.description}</p>
        {highlightsKey in round && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
            {(round.highlights || []).map((h, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--ink)', fontSize: '.85rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--gold)' }}>✓</span> {h}
              </li>
            ))}
          </ul>
        )}
        {round.evaluationTitle && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
            <strong style={{ color: 'var(--gold)', fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{round.evaluationTitle}</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(round.evaluation || []).map((c, i) => (
                <span key={i} style={{ padding: '4px 10px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '.72rem', color: 'var(--ink)', background: 'rgba(255,45,26,.05)' }}>{c.label} — {c.weight}</span>
              ))}
            </div>
          </div>
        )}
        {round.prototype && (
          <p style={{ color: 'var(--ink)', fontSize: '.85rem', fontWeight: 600, padding: '12px 16px', background: 'rgba(255,189,102,.1)', borderRadius: '4px', marginTop: '12px' }}>⚡ {round.prototype}</p>
        )}
      </div>
    </Reveal>
  );
}

// Fix the highlightsKey issue - just use highlights directly
export function RoundCardFixed({ round }) {
  return (
    <Reveal>
      <div style={{ padding: '32px', border: '1px solid var(--line)', background: 'linear-gradient(150deg, rgba(255,45,26,.06), rgba(5,3,3,.7))', borderRadius: '8px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: 'var(--red)' }}>{round.number}</span>
          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.2rem', color: 'var(--ink)', margin: 0 }}>{round.title}</h3>
            <small style={{ color: 'var(--gold)', fontSize: '.72rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>{round.duration}</small>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.7, marginBottom: '16px' }}>{round.description}</p>
        {round.highlights && round.highlights.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
            {round.highlights.map((h, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--ink)', fontSize: '.85rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--gold)' }}>✓</span> {h}
              </li>
            ))}
          </ul>
        )}
        {round.evaluationTitle && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
            <strong style={{ color: 'var(--gold)', fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{round.evaluationTitle}</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(round.evaluation || []).map((c, i) => (
                <span key={i} style={{ padding: '4px 10px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '.72rem', color: 'var(--ink)', background: 'rgba(255,45,26,.05)' }}>{c.label} — {c.weight}</span>
              ))}
            </div>
          </div>
        )}
        {round.prototype && (
          <p style={{ color: 'var(--ink)', fontSize: '.85rem', fontWeight: 600, padding: '12px 16px', background: 'rgba(255,189,102,.1)', borderRadius: '4px', marginTop: '12px' }}>⚡ {round.prototype}</p>
        )}
      </div>
    </Reveal>
  );
}
