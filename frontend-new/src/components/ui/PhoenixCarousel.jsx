import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  ['FENIX / 01', 'Explore every', 'constellation.', 'EVENTS', '08 arenas'],
  ['FENIX / 02', 'Find your', 'signal.', 'WORKSHOP', 'Build beyond'],
  ['FENIX / 03', 'Make your', 'mark.', 'REWARDS', 'Cash prizes'],
];

export function PhoenixCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);
  const go = (direction) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="phoenix-carousel" aria-label="FENIX highlights">
      {slides.map(([label, lineOne, lineTwo, mockLabel, mockCopy], index) => (
        <article className={`carousel-slide carousel-slide-${index} ${active === index ? 'active' : ''}`} key={label} aria-hidden={active !== index}>
          <div className="carousel-galaxy" aria-hidden="true"><i /><i /><i /><b /></div>
          <div className="carousel-shade" />
          <div className="carousel-copy"><p className="eyebrow">{label}</p><h2>{lineOne}<br /><span>{lineTwo}</span></h2></div>
          <div className={`carousel-mock carousel-mock-${index}`} aria-hidden="true"><span>{mockLabel}</span><strong>{mockCopy}</strong><i /><i /><i /></div>
        </article>
      ))}
      <div className="carousel-controls">
        <button onClick={() => go(-1)} aria-label="Previous slide"><ArrowLeft size={19} /></button>
        <div>{slides.map((slide, index) => <button key={slide[0]} onClick={() => setActive(index)} className={active === index ? 'active' : ''} aria-label={`Show slide ${index + 1}`} />)}</div>
        <button onClick={() => go(1)} aria-label="Next slide"><ArrowRight size={19} /></button>
      </div>
    </section>
  );
}
