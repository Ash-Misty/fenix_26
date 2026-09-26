import React, { createContext, useContext } from 'react';

const EventNavigationContext = createContext({
  goHome: () => {},
  goBack: () => {},
  goRegister: () => {},
  goToSection: () => {},
});

export function EventNavigationProvider({ children, goHome, goRegister, goToSection }) {
  // Event pages always stay within FENIX: the default destination is the home Events section.
  const goBack = goHome;

  return (
    <EventNavigationContext.Provider value={{ goHome, goBack, goRegister, goToSection }}>
      {children}
    </EventNavigationContext.Provider>
  );
}

export function useEventNavigation() {
  return useContext(EventNavigationContext);
}
