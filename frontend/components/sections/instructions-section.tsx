"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { instructions } from "@/data/instructions";

export function InstructionsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="instructions" className="instructions-section" ref={ref}>
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            The codex
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            IMPORTANT <em>INSTRUCTIONS</em>
          </motion.h2>
        </div>
      </div>
      <motion.div
        className="instructions-grid"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {instructions.map(
          (
            item: {
              number: string;
              category: string;
              title: string;
              text: string;
            },
            i: number,
          ) => (
            <motion.div
              className="instruction-card"
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <span className="instruction-number">{item.number}</span>
              <span className="instruction-category">{item.category}</span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </motion.div>
          ),
        )}
      </motion.div>
    </section>
  );
}
