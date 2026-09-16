import React from 'react';
import { useEventNavigation } from './EventNavigation';

const links = [
  ['Home', 'top'],
  ['Events', 'events'],
  ['Workshop', 'workshop'],
  ['Timeline', 'timeline'],
  ['Team', 'team'],
];

export function EventPageFooter() {
  const { goToSection } = useEventNavigation();

  return (
    <footer className="event-page-footer">
      <div className="event-footer-brand">
        <strong>FENIX<span>'26</span></strong>
        <p>Rise. Recode. Reign.</p>
      </div>
      <div className="event-footer-links">
        <small>QUICK LINKS</small>
        {links.map(([label, id]) => (
          <button type="button" key={id} onClick={() => goToSection(id)}>{label}</button>
        ))}
      </div>
      <p className="event-footer-copyright">© 2026 FENIX'26. All rights reserved.</p>
    </footer>
  );
}
