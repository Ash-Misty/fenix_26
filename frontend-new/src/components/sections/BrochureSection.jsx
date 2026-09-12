import React from 'react';
import { Download, Image } from 'lucide-react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function BrochureSection() {
  return (
    <section id="brochure" className="section brochure">
      <Reveal>
        <p className="eyebrow">EVERY DETAIL, ONE PLACE</p>
      </Reveal>
      <Reveal delay={100}>
        <h2>
          The FENIX'26<br />
          <span>brochure.</span>
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p>Download the official event guide with complete schedule, rules, and venue details.</p>
      </Reveal>
      <Reveal delay={300}>
        <div className="hero-actions">
          <Button secondary onClick={() => {}}>
            <Download size={16} /> Download Brochure (PDF)
          </Button>
          <Button secondary onClick={() => {}}>
            <Image size={16} /> View Poster
          </Button>
        </div>
      </Reveal>
      <Reveal delay={400}>
        <div className="brochure-paper">
          <small>FENIX'26</small>
          <strong>
            MAKE<br />
            YOUR<br />
            MARK<span>.</span>
          </strong>
          <i>OCT / 07 / 26</i>
        </div>
      </Reveal>
      <Reveal delay={500}>
        <div className="poster-placeholder">
          <Image size={48} style={{opacity: 0.4, marginBottom: 16}} />
          <p className="eyebrow">POSTER PREVIEW</p>
          <p style={{color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 16}}>
            Official event poster will be displayed here
          </p>
          <div className="poster-frame">
            <div className="poster-upload-area">
              <Image size={32} />
              <p>Attach poster image (PNG/JPG, max 5MB)</p>
              <small style={{color: 'var(--muted)'}}>Drag & drop or click to upload</small>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}