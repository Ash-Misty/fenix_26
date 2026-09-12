import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { events } from './data';
import './styles/global.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { EventsSection } from './components/sections/EventsSection';
import { WorkshopSection } from './components/sections/WorkshopSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { TeamSection } from './components/sections/TeamSection';
import { PricingSection } from './components/sections/PricingSection';
import { BrochureSection } from './components/sections/BrochureSection';
import { FAQSection } from './components/sections/FAQSection';
import { SocialSection } from './components/sections/SocialSection';
import { EventPage } from './components/sections/EventPage';
import { RegisterPage } from './components/sections/RegisterPage';
import { PhoenixCarousel } from './components/ui/PhoenixCarousel';
import { FlightScene } from './components/ui/FlightScene';
import { SiteLoader } from './components/ui/SiteLoader';
import { CampusSignature } from './components/ui/CampusSignature';

function App() {
  const [page, setPage] = React.useState('home');
  const [registrationCount, setRegistrationCount] = React.useState(60);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const completeRegistration = () => {
    setRegistrationCount((count) => count + 1);
  };

  if (page === 'register') {
    return (
      <>
        <Header setPage={setPage} registerMode />
        <RegisterPage setPage={setPage} onRegistrationComplete={completeRegistration} />
      </>
    );
  }

  if (page.startsWith('event:')) {
    const event = events.find((e) => 'event:' + e.slug === page) || events[0];
    return (
      <>
        <Header setPage={setPage} />
        <EventPage event={event} setPage={setPage} />
        <Footer setPage={setPage} />
      </>
    );
  }

  return (
    <>
      <SiteLoader />
      <Header setPage={setPage} />
      <FlightScene>
        <HeroSection setPage={setPage} registrationCount={registrationCount} />
        <PhoenixCarousel />
      </FlightScene>
      <AboutSection />
      <EventsSection setPage={setPage} />
      <WorkshopSection setPage={setPage} />
      <TimelineSection />
      <TeamSection />
      <PricingSection setPage={setPage} />
      <BrochureSection />
      <FAQSection />
      <SocialSection />
      <CampusSignature />
      <Footer setPage={setPage} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
