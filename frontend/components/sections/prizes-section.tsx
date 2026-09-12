"use client";

import { motion, useInView } from "framer-motion";
import { Trophy } from "lucide-react";
import { useRef } from "react";

export function PrizesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="prizes" className="prizes section-grid" ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="eyebrow">05 / The treasures</p>
        <h2>
          Earn your
          <br />
          <em>place in legend.</em>
        </h2>
        <p className="body-copy">
          Compete for glory, take home the championship, and leave with a story
          worth retelling.
        </p>
      </motion.div>
      <motion.div
        className="prize-grid"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <motion.div
          className="prize-card featured"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span><Trophy size={14} /></span>
          <strong>
            CHAMPIONSHIP
            <br />
            TROPHY
          </strong>
          <small>For the team that rises above all realms.</small>
        </motion.div>
        {[
          { rank: "01", name: "FIRST PRIZE" },
          { rank: "02", name: "SECOND PRIZE" },
          { rank: "03", name: "THIRD PRIZE" },
        ].map((prize, i) => (
          <motion.div
            key={prize.rank}
            className="prize-card"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -5 }}
          >
            <span>{prize.rank}</span>
            <strong>{prize.name}</strong>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}