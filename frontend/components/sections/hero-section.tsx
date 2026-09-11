"use client";

import { motion, useInView } from "framer-motion";
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="hero section-grid">
      <div className="hero-copy">
        <p className="eyebrow">National level technical symposium</p>
        <h1>
          FENIX<span>&apos;26</span>
        </h1>
        <p className="tagline">RISE. RECODE. REIGN.</p>
        <p className="hero-intro">
          Where technology meets imagination. A grand festival of ideas, code,
          and the courage to build what comes next.
        </p>
        <div className="hero-actions">
          <a className="button button-fire" href="#register">
            Register now <ArrowUpRight size={17} />
          </a>
          <a className="text-link" href="#events">
            Explore events <ArrowDown size={16} />
          </a>
        </div>
        <div className="hero-meta">
          <span>
            <CalendarDays size={16} />
            07 October 2026
          </span>
          <span>
            <MapPin size={16} />
            Dr. A.P.J. Abdul Kalam Auditorium
          </span>
        </div>
      </div>
      <div className="phoenix-wrap" aria-label="Phoenix emblem">
        <div className="phoenix-aura" />
        <div className="phoenix">✦</div>
        <div className="phoenix-wings left">⌁</div>
        <div className="phoenix-wings right">⌁</div>
        <div className="circuit circuit-one" />
        <div className="circuit circuit-two" />
      </div>
      <div className="scroll-cue">
        <span>Scroll to enter the realm</span>
        <ArrowDown size={18} />
      </div>
    </section>
  );
}
