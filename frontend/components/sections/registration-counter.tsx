"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EmberField } from "@/components/shared/ember-field";

export function RegistrationCounter() {
  const [count, setCount] = useState(0);
  const [target] = useState(1248);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const step = (ts: number) => {
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [inView, target]);

  return (
    <section id="registrations" className="registration-section" ref={ref}>
      <EmberField />
      <div className="registration-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          The rise has begun
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          JOIN THE PHOENIX
        </motion.h2>
        <motion.div
          className="registration-counter"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="registration-flame" aria-hidden="true">
            🔥
          </div>
          <span className="registration-label">TOTAL REGISTRATIONS</span>
          <span className="registration-number">{count.toLocaleString()}</span>
          <span className="registration-note">
            Mock value — replace with API
          </span>
        </motion.div>
      </div>
    </section>
  );
}
