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
import { NewsTicker } from './components/ui/NewsTicker';
import { AdminApp } from './components/admin/AdminApp';
import { PixelPerfectPage } from './events/pages/PixelPerfectPage';
import { AIBattlePage } from './events/pages/AIBattlePage';
import { PaperPresentationPage } from './events/pages/PaperPresentationPage';
import { CodeArenaPage } from './events/pages/CodeArenaPage';
import { IPLAuctionPage } from './events/pages/IPLAuctionPage';
import { FreeFirePage } from './events/pages/FreeFirePage';
import { MiniMilitiaPage } from './events/pages/MiniMilitiaPage';
import { TreasureHuntPage } from './events/pages/TreasureHuntPage';
import { MemeCreationPage } from './events/pages/MemeCreationPage';
import { getEventBySlug } from './events/config';
import './styles/admin.css';
import './events/styles/events.css';

function App() {
  const [route, setRoute] = React.useState(window.location.hash);
  const [page, setPage] = React.useState('home');
  const [registrationCount, setRegistrationCount] = React.useState(60);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const completeRegistration = () => {
    setRegistrationCount((count) => count + 1);
  };

  const EventComponentMap = {
    'pixel-perfect': PixelPerfectPage,
    'ai-battle': AIBattlePage,
    'paper-presentation': PaperPresentationPage,
    'code-arena': CodeArenaPage,
    'ipl-auction': IPLAuctionPage,
    'ipl-action': IPLAuctionPage,
    'free-fire': FreeFirePage,
    'game-event': FreeFirePage,
    'mini-militia': MiniMilitiaPage,
    'treasure-hunt': TreasureHuntPage,
    'meme-creation': MemeCreationPage,
  };

  const renderEventPage = (slug) => {
    const Component = EventComponentMap[slug];
    if (Component) return <Component setPage={setPage} />;
    const event = getEventBySlug(slug);
    if (event) {
      return (
        <>
          <Header setPage={setPage} />
          <EventPage event={event} setPage={setPage} />
          <Footer setPage={setPage} />
        </>
      );
    }
    return null;
  };

  const eventRoute = route.match(/^#\/events\/([^/?#]+)/);
  if (eventRoute) {
    return renderEventPage(eventRoute[1]);
  }

  if (route.startsWith('#/admin')) {
    return <AdminApp />;
  }

  if (page === 'register') {
    return (
      <>
        <Header setPage={setPage} registerMode />
        <RegisterPage setPage={setPage} onRegistrationComplete={completeRegistration} />
      </>
    );
  }

  if (page.startsWith('event:')) {
    const slug = page.replace('event:', '');
    return renderEventPage(slug);
  }

  return (
    <>
      <SiteLoader />
      <Header setPage={setPage} />
      <NewsTicker setPage={setPage} className="home-news-ticker" />
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
