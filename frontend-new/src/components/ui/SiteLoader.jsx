import React, { useEffect, useState } from 'react';

export function SiteLoader() {
  const [phase, setPhase] = useState('visible');

  useEffect(() => {
    const startExit = window.setTimeout(() => setPhase('leaving'), 1050);
    const remove = window.setTimeout(() => setPhase('hidden'), 1550);
    return () => { window.clearTimeout(startExit); window.clearTimeout(remove); };
  }, []);

  if (phase === 'hidden') return null;
  return <div className={`site-loader ${phase}`} aria-label="Loading FENIX 2026">
    <div className="loader-stars" aria-hidden="true" />
    <div className="loader-mark"><img src="/fenix-26-logo.jpg" alt="" /></div>
    <p>IGNITING FENIX <span>2026</span></p>
    <div className="loader-progress"><i /></div>
  </div>;
}
