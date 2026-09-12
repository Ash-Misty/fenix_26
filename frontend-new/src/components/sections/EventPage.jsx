import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

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

  return (
    <main className="event-page">
      <EventNewsTicker event={event} setPage={setPage} />
      <section className={'event-hero ' + (event?.color || '')}>
        <button className="back" type="button" onClick={() => setPage('home')}>← Back to FENIX'26</button>
        <span className="big-symbol">{event?.icon || '◈'}</span>
        <p className="eyebrow">{event?.category || 'TECHNICAL'} EVENT / 0{idx + 1}</p>
        <h1>{event?.name || 'EVENT'}</h1>
        <p className="tagline">{event?.tagline || ''}</p>
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
          {[
            ['Format', event?.format || '[Format]'],
            ['Participants', event?.participants || '[Participants]'],
            ['Rounds', event?.rounds || '[Rounds]'],
            ['Duration', event?.duration || '[Duration]'],
            ['Venue', event?.venue || '[Venue]'],
            ['Eligibility', 'College students'],
          ].map(([x, y]) => (
            <article key={x}>
              <small>{x}</small>
              <strong>{y}</strong>
            </article>
          ))}
        </div>
      </section>

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