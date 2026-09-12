import React from 'react';
import { PhoenixArt } from './PhoenixArt';

export function FlightScene({ children }) {
  return <div className="flight-scene">
    <div className="flight-sky" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    <div className="sticky-flight" aria-hidden="true"><PhoenixArt className="flight-phoenix" /></div>
    <div className="flight-content">{children}</div>
  </div>;
}
