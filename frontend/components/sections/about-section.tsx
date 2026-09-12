"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="about section-grid" ref={ref}>
      <div className="section-label">01 / The awakening</div>
      <motion.div
        initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="eyebrow">Where technology meets imagination</p>
        <h2>
          The spark
          <br />
          <em>becomes a flame.</em>
        </h2>
        <p className="body-copy">
          FENIX&apos;26 is a national-level technical symposium by the
          Department of Computer Science and Engineering. Step into a day where
          competitive minds, curious creators, and fearless dreamers come
          together to rise beyond the ordinary.
        </p>
        <motion.a
          className="text-link"
          href="#events"
          whileHover={{ gap: "12px", color: "var(--gold)" }}
        >
          Enter the realms <ArrowUpRight size={16} />
        </motion.a>
      </motion.div>
      <motion.div
        className="about-stamp"
        initial={{ opacity: 0, scale: 0.8, rotate: 8, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 8, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        whileHover={{ rotate: 0, scale: 1.05 }}
      >
        CSE
        <br />
        <span>26</span>
        <small>
          THE NEXT
          <br />
          CHAPTER
        </small>
      </motion.div>
    </section>
  );
}