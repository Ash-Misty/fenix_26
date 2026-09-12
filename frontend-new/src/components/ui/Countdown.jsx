import React, { useEffect, useState } from 'react';

export function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const calc = () => {
      const d = new Date('2026-10-07T09:00:00') - Date.now();
      return [
        Math.max(0, Math.floor(d / 86400000)),
        Math.max(0, Math.floor(d / 3600000) % 24),
        Math.max(0, Math.floor(d / 60000) % 60),
        Math.max(0, Math.floor(d / 1000) % 60),
      ];
    };
    setTime(calc());
    setMounted(true);
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const labels = ['DAYS', 'HOURS', 'MINS', 'SECS'];
  return (
    <div className="countdown">
      {time.map((n, i) => (
        <div className="time" key={labels[i]}>
          <strong>{String(n).padStart(2, '0')}</strong>
          <span>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}