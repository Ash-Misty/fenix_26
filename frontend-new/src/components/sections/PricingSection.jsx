import React from 'react';
import { Reveal } from '../ui/Reveal';

export function PricingSection({ setPage }) {
  return (
    <section id="pricing" className="section pricing">
      <Reveal>
        <p className="eyebrow">CLEAR. SIMPLE. YOUR WAY.</p>
      </Reveal>
      <Reveal delay={100}>
        <h2>
          Find your<br />
          <span>entry point.</span>
        </h2>
      </Reveal>
      <div className="price-grid">
        <Reveal delay={200}>
          <article className="price-card individual-price">
            <p>INDIVIDUAL</p>
            <strong>₹300</strong>
            <span className="price-events">Up to 2 Technical + 2 Non-Technical events</span>
            <small>One participant can select a maximum of 2 Technical and 2 Non-Technical events.</small>
          </article>
        </Reveal>
        <Reveal delay={300}>
          <article className="price-card team-price featured">
            <label>MOST POPULAR</label>
            <p>TEAM (2)</p>
            <strong>₹550</strong>
            <span className="price-events">Up to 2 Technical + 2 Non-Technical events</span>
            <small>One participant can select a maximum of 2 Technical and 2 Non-Technical events.</small>
          </article>
        </Reveal>
        <Reveal delay={400}>
          <article className="price-card team3-price">
            <p>TEAM (3)</p>
            <strong>₹800</strong>
            <span className="price-events">Up to 2 Technical + 2 Non-Technical events</span>
            <small>One participant can select a maximum of 2 Technical and 2 Non-Technical events.</small>
          </article>
        </Reveal>
      </div>
      <div className="prize-board" aria-label="Overall winner cash prizes">
        <div className="prize-copy"><p className="eyebrow">OVERALL CHAMPIONS</p><h3>Win the<br /><span>constellation.</span></h3></div>
        <div className="prize-list">
          <article className="prize-total"><span>★</span><strong>₹15,000</strong><small>Prizes worth</small></article>
        </div>
      </div>
    </section>
  );
}
