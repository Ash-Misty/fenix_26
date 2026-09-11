"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function PosterSection({ onPoster }: { onPoster: (i: number) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="posters" className="poster-section" ref={ref}>
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            The poster
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            FENIX&apos;26 <em>OFFICIAL POSTER</em>
          </motion.h2>
        </div>
      </div>
      <motion.div
        className="single-poster"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="poster-art-large" onClick={() => onPoster(0)}>
          <p>FENIX&apos;26</p>
          <strong>OFFICIAL POSTER</strong>
          <span>07 OCT 2026</span>
          <div>
            RISE.
            <br />
            RECODE.
            <br />
            REIGN.
          </div>
        </div>
        <div className="poster-actions">
          <button onClick={() => onPoster(0)}>View Poster</button>
          <a href="/documents/fenix26-brochure.pdf" download>
            Download Poster
          </a>
        </div>
      </motion.div>
    </section>
  );
}
