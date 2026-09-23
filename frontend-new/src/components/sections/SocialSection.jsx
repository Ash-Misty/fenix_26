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
          <a href="https://www.instagram.com/feni.x_offl_2k26" target="_blank" rel="noreferrer">Instagram · feni.x_offl_2k26 ↗</a>
          <a href="https://chat.whatsapp.com/C3GlXtVStxqEd5iws5dyK6" target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>
      </Reveal>
    </section>
  );
}
