import React, { createContext, useContext } from 'react';

const EventNavigationContext = createContext({
  goHome: () => {},
  goRegister: () => {},
  goToSection: () => {},
});

export function EventNavigationProvider({ children, goHome, goRegister, goToSection }) {
  return (
    <EventNavigationContext.Provider value={{ goHome, goRegister, goToSection }}>
      {children}
    </EventNavigationContext.Provider>
  );
}

export function useEventNavigation() {
  return useContext(EventNavigationContext);
}
