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
import { GamesEventPage } from './events/pages/GamesEventPage';
import { EventDashboardPage } from './events/pages/EventDashboardPage';
import { EventNavigationProvider } from './events/components/EventNavigation';
import { getEventBySlug } from './events/config';
import { api } from './api';
import './styles/admin.css';
import './events/styles/events.css';
import './events/styles/event-redesign.css';

function App() {
  const [route, setRoute] = React.useState(window.location.hash);
  const [page, setPage] = React.useState('home');
  const [registrationStats, setRegistrationStats] = React.useState(null);
  const [registrationStatsError, setRegistrationStatsError] = React.useState(false);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const loadRegistrationStats = React.useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 8000);
    try {
      const response = await api('/registrations/count', { signal: controller.signal });
      const count = Number(response?.data?.count);
      const capacity = Number(response?.data?.capacity);
      if (!Number.isFinite(count) || !Number.isFinite(capacity)) throw new Error('Invalid registration totals');
      setRegistrationStats({ count: Math.max(0, count), capacity: Math.max(0, capacity) });
      setRegistrationStatsError(false);
    } catch {
      setRegistrationStatsError(true);
    } finally {
      window.clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    loadRegistrationStats();
    const refreshId = window.setInterval(loadRegistrationStats, 30000);
    return () => window.clearInterval(refreshId);
  }, [loadRegistrationStats]);

  const goHomeToEvents = () => {
    window.location.hash = '';
    setPage('home');
    window.setTimeout(() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }), 40);
  };

  const goRegister = () => {
    window.location.hash = '';
    setPage('register');
  };

  const goHomeToSection = (sectionId) => {
    window.location.hash = '';
    setPage('home');
    window.setTimeout(() => {
      if (sectionId === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 40);
  };

  const completeRegistration = () => loadRegistrationStats();

  const EventComponentMap = {
    'pixel-perfect': PixelPerfectPage,
    'ai-battle': AIBattlePage,
    'paper-presentation': PaperPresentationPage,
    'code-arena': CodeArenaPage,
    'ipl-auction': IPLAuctionPage,
    'free-fire': EventDashboardPage,
    'game-event': GamesEventPage,
    'mini-militia': EventDashboardPage,
    'treasure-hunt': EventDashboardPage,
    'meme-creation': EventDashboardPage,
  };

  const renderEventPage = (slug) => {
    const Component = EventComponentMap[slug];
    if (Component) {
      return (
        <EventNavigationProvider goHome={goHomeToEvents} goRegister={goRegister} goToSection={goHomeToSection}>
          {Component === EventDashboardPage ? <Component slug={slug} /> : <Component />}
        </EventNavigationProvider>
      );
    }
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
        <HeroSection setPage={setPage} registrationStats={registrationStats} hasRegistrationStatsError={registrationStatsError} />
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
