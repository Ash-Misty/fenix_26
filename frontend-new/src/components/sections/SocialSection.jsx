import React from 'react';
import { Reveal } from '../ui/Reveal';

export function SocialSection() {
  return (
    <section className="section social">
      <Reveal>
        <p className="eyebrow">DON'T MISS A BEAT</p>
      </Reveal>
      <Reveal delay={100}>
        <h2>
          Follow the FENIX'26<br />
          <span>journey.</span>
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <div>
          <a href="#">Instagram ↗</a>
          <a href="#">LinkedIn ↗</a>
          <a href="#">YouTube ↗</a>
          <a href="#">WhatsApp ↗</a>
        </div>
      </Reveal>
    </section>
  );
}