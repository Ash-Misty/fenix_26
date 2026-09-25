import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, Expand, X } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

const brochureUrl = '/fenix26-brochure.pdf';

export function BrochureSection() {
  const [posterOpen, setPosterOpen] = useState(false);

  useEffect(() => {
    if (!posterOpen) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') setPosterOpen(false); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = previousOverflow; };
  }, [posterOpen]);

  return (
    <section id="brochure" className="section brochure">
      <Reveal><p className="eyebrow">EVERY DETAIL, ONE PLACE</p></Reveal>
      <Reveal delay={100}><h2>The FENIX&apos;26<br /><span>brochure.</span></h2></Reveal>
      <Reveal delay={200}><p>Explore the official brochure and download a copy for event details.</p></Reveal>
      <Reveal delay={300}>
        <div className="hero-actions brochure-actions"><a className="brochure-action" href={brochureUrl} download="FENIX26-Brochure.pdf"><Download size={16} /> Download brochure PDF</a></div>
      </Reveal>
      <Reveal delay={350}>
        <div className="brochure-covers" aria-label="FENIX'26 brochure previews">
          <figure><img src="/brochure-front.jpg" alt="FENIX'26 brochure front" /><figcaption>Brochure front</figcaption></figure>
          <figure><img src="/brochure-back.jpg" alt="FENIX'26 brochure back" /><figcaption>Brochure back</figcaption></figure>
        </div>
      </Reveal>
      <Reveal delay={400}>
        <button className="poster-preview" type="button" onClick={() => setPosterOpen(true)} aria-label="Open FENIX'26 poster in full screen">
          <img src="/fenix26-poster.png" alt="FENIX'26 official event poster" />
          <span><Expand size={18} /> View poster full screen</span>
        </button>
      </Reveal>
      {posterOpen && createPortal(<div className="poster-modal-backdrop" role="presentation" onMouseDown={() => setPosterOpen(false)}><div className="poster-modal" role="dialog" aria-modal="true" aria-label="FENIX'26 event poster" onMouseDown={(event) => event.stopPropagation()}><button type="button" onClick={() => setPosterOpen(false)} aria-label="Close poster"><X size={22} /></button><img src="/fenix26-poster.png" alt="FENIX'26 official event poster" /></div></div>, document.body)}
    </section>
  );
}
