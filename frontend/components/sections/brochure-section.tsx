"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { documents } from "@/data/documents";

export function BrochureSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const brochure = documents[0];

  return (
    <section id="brochure" className="brochure-section" ref={ref}>
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            The brochure
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            FENIX&apos;26 <em>BROCHURE</em>
          </motion.h2>
        </div>
      </div>
      <motion.div
        className="brochure-card"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="brochure-icon">📄</div>
        <h4>{brochure.title}</h4>
        <p>{brochure.description}</p>
        <div className="brochure-actions">
          <a href={brochure.path} target="_blank" rel="noopener noreferrer">
            VIEW
          </a>
          <a href={brochure.path} download>
            DOWNLOAD
          </a>
        </div>
      </motion.div>
    </section>
  );
}
