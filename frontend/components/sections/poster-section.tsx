"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

export function PosterSection({ onPoster }: { onPoster: (i: number) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="posters" className="poster-section" ref={ref}>
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            The poster
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            FENIX&apos;26 <em>OFFICIAL POSTER</em>
          </motion.h2>
        </div>
      </div>
      <motion.div
        className="single-poster"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <motion.div
          className="poster-art-large"
          onClick={() => onPoster(0)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
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
        </motion.div>
        <div className="poster-actions">
          <motion.button
            onClick={() => onPoster(0)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View Poster
          </motion.button>
          <motion.a
            href="/documents/fenix26-brochure.pdf"
            download
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Poster
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}