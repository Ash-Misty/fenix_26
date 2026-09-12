"use client";

import { motion, useInView } from "framer-motion";
import { documents } from "@/data/documents";
import { useRef } from "react";

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
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            The brochure
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            FENIX&apos;26 <em>BROCHURE</em>
          </motion.h2>
        </div>
      </div>
      <motion.div
        className="brochure-card"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        whileHover={{ y: -5 }}
      >
        <div className="brochure-icon">📄</div>
        <h4>{brochure.title}</h4>
        <p>{brochure.description}</p>
        <div className="brochure-actions">
          <motion.a
            href={brochure.path}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW
          </motion.a>
          <motion.a
            href={brochure.path}
            download
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            DOWNLOAD
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}