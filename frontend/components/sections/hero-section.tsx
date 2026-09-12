"use client";

import { motion, useInView } from "framer-motion";
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="home" className="hero section-grid" ref={ref}>
      <div className="hero-copy">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          National level technical symposium
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
        >
          FENIX<span>&apos;26</span>
        </motion.h1>
        <motion.p
          className="tagline"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        >
          RISE. RECODE. REIGN.
        </motion.p>
        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          Where technology meets imagination. A grand festival of ideas, code,
          and the courage to build what comes next.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.75, ease: "easeOut" }}
        >
          <motion.a
            className="button button-fire"
            href="#register"
            whileHover={{ transform: "translate(3px, 3px)", boxShadow: "3px 3px 0 var(--ember)" }}
            whileTap={{ transform: "translate(5px, 5px)" }}
          >
            Register now <ArrowUpRight size={17} />
          </motion.a>
          <motion.a
            className="text-link"
            href="#events"
            whileHover={{ gap: "12px", color: "var(--gold)" }}
          >
            Explore events <ArrowDown size={16} />
          </motion.a>
        </motion.div>
        <motion.div
          className="hero-meta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
        >
          <span>
            <CalendarDays size={16} />
            07 October 2026
          </span>
          <span>
            <MapPin size={16} />
            Dr. A.P.J. Abdul Kalam Auditorium
          </span>
        </motion.div>
      </div>
      <div className="phoenix-wrap" aria-label="Phoenix emblem">
        <motion.div
          className="phoenix-aura"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 0.3, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div
          className="phoenix"
          initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
          animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
        >
          ✦
        </motion.div>
        <motion.div
          className="phoenix-wings left"
          initial={{ opacity: 0, x: -60, rotate: -35 }}
          animate={inView ? { opacity: 0.75, x: 0, rotate: -35 } : {}}
          transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
        >
          ⌁
        </motion.div>
        <motion.div
          className="phoenix-wings right"
          initial={{ opacity: 0, x: 60, rotate: 35 }}
          animate={inView ? { opacity: 0.75, x: 0, rotate: 35 } : {}}
          transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
        >
          ⌁
        </motion.div>
        <motion.div
          className="circuit circuit-one"
          initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
          animate={inView ? { opacity: 0.4, rotate: 45, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        />
        <motion.div
          className="circuit circuit-two"
          initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
          animate={inView ? { opacity: 0.4, rotate: 45, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
        />
      </div>
      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span>Scroll to enter the realm</span>
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}