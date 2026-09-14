import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { eventDetails } from '../../eventDetails';
import { eventVariants } from '../../eventVariants';

function EventNewsTicker({ event, setPage }) {
  const goToRegistration = (clickEvent) => {
    clickEvent.preventDefault();
    setPage('register');
  };

  const goToAbout = (clickEvent) => {
    clickEvent.preventDefault();
    document.getElementById('event-about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const tickerContent = (
    <>
      <span>FENIX'26 registrations are open</span>
      <span className="ticker-separator">•</span>
      <span>About this event: {event?.name || 'FENIX’26'}</span>
      <a href="#register" onClick={goToRegistration}>Register now <ArrowRight size={12} /></a>
      <a href="#event-about" onClick={goToAbout}>About this event</a>
    </>
  );

  return (
    <div className="news-ticker" aria-label="Event updates">
      <div className="news-ticker-track">
        <div className="news-ticker-group">{tickerContent}</div>
        <div className="news-ticker-group" aria-hidden="true">{tickerContent}</div>
      </div>
    </div>
  );
}

export function EventPage({ event, setPage }) {
  const idx = event ? 0 : 0;
  const variant = eventVariants[event?.slug] || {};
  const information = eventDetails[event?.slug] || eventDetails[variant.baseSlug] || {};
  const eventTitle = variant.title || event?.name || 'EVENT';

  return (
    <main className={`event-page event-variant-${variant.variant || event?.color || 'default'}`}>
      <EventNewsTicker event={event} setPage={setPage} />
      <section className={'event-hero ' + (event?.color || '')}>
        <button className="back" type="button" onClick={() => setPage('home')}>← Back to FENIX'26</button>
        <div className="event-motif" aria-hidden="true">{(variant.motif || [event?.icon || '◈']).map((symbol) => <span key={symbol}>{symbol}</span>)}</div>
        <span className="big-symbol">{event?.icon || '◈'}</span>
        <p className="eyebrow">{variant.eyebrow || `${event?.category || 'TECHNICAL'} EVENT`} / 0{idx + 1}</p>
        <h1>{eventTitle}</h1>
        <p className="tagline">{event?.tagline || ''}</p>
        {variant.emphasis && <p className="event-emphasis">{variant.emphasis}</p>}
        <Button className="event-register" onClick={() => setPage('register')}>Register for this event</Button>
      </section>

      <section className="event-content" id="event-about">
        <div>
          <p className="eyebrow">ABOUT THE EVENT</p>
          <h2>
            Ready to make<br />
            <span>your move?</span>
          </h2>
          <p className="large">
            {event?.description || ''} Bring your best energy, meet new people and make your mark at FENIX'26.
          </p>
        </div>
        <div className="format-grid">
          {(information.highlights || [
            ['Format', event?.format || '[Format]'],
            ['Participants', event?.participants || '[Participants]'],
            ['Rounds', event?.rounds || '[Rounds]'],
            ['Duration', event?.duration || '[Duration]'],
            ['Venue', event?.venue || '[Venue]'],
            ['Eligibility', 'College students'],
          ]).map(([x, y]) => (
            <article key={x}>
              <small>{x}</small>
              <strong>{y}</strong>
            </article>
          ))}
        </div>
      </section>

      {variant.flow?.length > 0 && (
        <section className="event-flow-section">
          <p className="eyebrow">THE EXPERIENCE</p>
          <h2>How the event<br /><span>unfolds.</span></h2>
          <div className="event-flow" aria-label={`${eventTitle} process`}>
            {variant.flow.map((step, index) => <div className="event-flow-step" key={step}><strong>{String(index + 1).padStart(2, '0')}</strong><span>{step}</span>{index < variant.flow.length - 1 && <i aria-hidden="true">→</i>}</div>)}
          </div>
        </section>
      )}

      {information.sections?.length > 0 && (
        <section className="event-detail-sections">
          <p className="eyebrow">EVENT BRIEF</p>
          <h2>Know the<br /><span>playbook.</span></h2>
          <div className="event-detail-grid">
            {information.sections.map((section) => (
              <article className="event-detail-card" key={section.title}>
                <h3>{section.title}</h3>
                <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          {information.closingLine && <p className="event-closing-line">{information.closingLine}</p>}
        </section>
      )}

      <section className="event-rules">
        <p className="eyebrow">THE FINE PRINT</p>
        <h2>Rules of the<br /><span>arena.</span></h2>
        {(event?.rules || ['Rule 1: ...', 'Rule 2: ...']).map((r, i) => (
          <div className="rule" key={i}>
            <strong>0{i + 1}</strong>
            <p>{r}</p>
          </div>
        ))}
      </section>

      <section className="coordinators">
        <p className="eyebrow">YOUR EVENT CREW</p>
        <h2>Need a<br /><span>hand?</span></h2>
        <div className="coordinator-grid">
          {[1, 2].map((i) => (
            <article key={i}>
              <div className="avatar">C</div>
              <h3>[Coordinator Name]</h3>
              <p>Event Coordinator</p>
              <small>[Phone Number]</small>
              <div>
                <a href="tel:[Phone Number]"><Phone size={16} /> Call</a>
                <a href="https://wa.me/"><MessageCircle size={16} /> WhatsApp</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}