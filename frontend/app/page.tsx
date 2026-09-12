"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { events, schedule } from "@/data/events";
import { eventConfig } from "@/data/eventConfig";
import { EmberField } from "@/components/shared/ember-field";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { CountdownSection } from "@/components/sections/countdown-section";
import { RegistrationCounter } from "@/components/sections/registration-counter";
import { EventsSection } from "@/components/sections/events-section";
import { PosterSection } from "@/components/sections/poster-section";
import { PosterViewer } from "@/components/sections/poster-viewer";
import { WorkshopSection } from "@/components/sections/workshop-section";
import { ScheduleSection } from "@/components/sections/schedule-section";
import { PrizesSection } from "@/components/sections/prizes-section";
import { EventRules } from "@/components/sections/event-rules";
import { InstructionsSection } from "@/components/sections/instructions-section";
import { PaymentSection } from "@/components/sections/payment-section";
import { BrochureSection } from "@/components/sections/brochure-section";
import { RegisterSection } from "@/components/sections/register-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CampusGallery } from "@/components/sections/campus-gallery";

const nav = ["Home", "Events", "Posters", "Workshop", "Schedule", "Prizes", "Rules", "Brochure", "Contact"];

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [category, setCategory] = useState("technical");
  const [poster, setPoster] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <EmberField />
          <div className="loading-phoenix">✦</div>
          <div className="loading-mark">
            FENIX<span>&apos;26</span>
          </div>
          <p>RISE. RECODE. REIGN.</p>
          <button className="loading-skip" onClick={() => setLoading(false)}>
            Skip
          </button>
        </div>
      )}
      <ScrollProgress />
      <div className="site-shell">
        <EmberField />
        <header className={`navbar${scrolled ? " scrolled" : ""}`}>
          <a href="#home" className="brand">
            <span className="brand-flame">✦</span> FENIX<span>&apos;26</span>
          </a>
          <button
            className="menu-button"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle navigation"
            aria-expanded={menu}
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className={menu ? "open" : ""}>
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenu(false)}
              >
                {item}
              </a>
            ))}
            <a className="nav-register" href="#register" onClick={() => setMenu(false)}>
              Register <ArrowUpRight size={15} />
            </a>
          </nav>
        </header>

        <main>
          <HeroSection />
          <CountdownSection />
          <RegistrationCounter />
          <AboutSection />
          <CampusGallery />
          <EventsSection
            events={events}
            category={category}
            setCategory={setCategory}
            onPoster={setPoster}
          />
          <PosterSection onPoster={setPoster} />
          <WorkshopSection />
          <ScheduleSection />
          <PrizesSection />
          <EventRules />
          <InstructionsSection />
          <PaymentSection />
          <BrochureSection />
          <RegisterSection />
          <ContactSection />
        </main>

        <footer>
          <a className="brand" href="#home">
            <span className="brand-flame">✦</span> FENIX<span>&apos;26</span>
          </a>
          <span>Rise. Recode. Reign.</span>
          <span>Department of Computer Science and Engineering</span>
          <span>{eventConfig.college}</span>
          <div className="footer-links">
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </div>
          <span>© 2026 FENIX&apos;26. All Rights Reserved.</span>
        </footer>
      </div>
      <PosterViewer poster={poster} setPoster={setPoster} />
    </>
  );
}