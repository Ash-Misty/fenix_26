import React from 'react';
import { Reveal } from '../../components/ui/Reveal';

export function TopicGrid({ topics, title = 'Topics' }) {
  if (!topics || !topics.length) return null;
  if (Array.isArray(topics[0])) {
    return (
      <section style={{ padding: '60px 0' }}>
        <Reveal>
          <p className="eyebrow">{title}</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 24px', color: 'var(--ink)' }}>{title}</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {topics.map((topic, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ padding: '28px 24px', border: '1px solid var(--line)', background: 'linear-gradient(150deg, rgba(255,45,26,.06), rgba(5,3,3,.7))', borderRadius: '8px' }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.15rem', color: 'var(--ink)', margin: '0 0 10px' }}>{topic.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.6, margin: 0 }}>{topic.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section style={{ padding: '60px 0' }}>
      <Reveal>
        <p className="eyebrow">{title}</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 24px', color: 'var(--ink)' }}>{title}</h2>
      </Reveal>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {topics.map((topic, i) => (
          <Reveal key={i} delay={i * 60}>
            <span style={{ padding: '10px 18px', border: '1px solid var(--line)', background: 'rgba(255,45,26,.05)', borderRadius: '999px', color: 'var(--ink)', fontSize: '.82rem', fontWeight: 600 }}>{topic}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
