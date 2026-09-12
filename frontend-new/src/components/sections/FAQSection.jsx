import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data';
import { Reveal } from '../ui/Reveal';

export function FAQSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="section faq">
      <Reveal>
        <p className="eyebrow">GOOD QUESTIONS</p>
      </Reveal>
      <Reveal delay={100}>
        <h2>Everything, <span>unpacked.</span></h2>
      </Reveal>
      <div className="faq-grid">
        {faqs.map(([q, a], i) => (
          <div className={'faq-item' + (active === i ? ' open' : '')} key={q}>
            <button className="faq-header" onClick={() => setActive(active === i ? null : i)}>
              <span>{q}</span>
              <ChevronDown size={20} />
            </button>
            <div className="faq-body">
              <p>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}