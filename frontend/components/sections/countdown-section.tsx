"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { eventConfig } from "@/data/eventConfig";
import { useCountdown } from "@/components/hooks/use-countdown";
import { EmberField } from "@/components/shared/ember-field";
import { CountdownCompleteAnimation } from "@/components/sections/countdown-complete-animation";

export function CountdownSection() {
  const { mounted, days, hours, minutes, seconds, complete } = useCountdown(
    eventConfig.targetISO,
  );
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = [
    { label: "DAYS", value: mounted ? String(days).padStart(2, "0") : "--" },
    { label: "HOURS", value: mounted ? String(hours).padStart(2, "0") : "--" },
    { label: "MINUTES", value: mounted ? String(minutes).padStart(2, "0") : "--" },
    { label: "SECONDS", value: mounted ? String(seconds).padStart(2, "0") : "--" },
  ];

  return (
    <section id="countdown" className="countdown-section" ref={ref}>
      <EmberField />
      <div className="countdown-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          The awakening
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          THE AWAKENING
        </motion.h2>
        <motion.p
          className="countdown-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          THE PHOENIX RISES ON {eventConfig.date.toUpperCase()}
        </motion.p>
        <motion.div
          className="countdown-clock"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {items.map((item) => (
            <div className="countdown-unit" key={item.label}>
              <span className="countdown-value">{item.value}</span>
              <span className="countdown-label">{item.label}</span>
            </div>
          ))}
        </motion.div>
        <motion.p
          className="countdown-target"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {eventConfig.startTime} IST · {eventConfig.venue}
        </motion.p>
      </div>
      {complete && <CountdownCompleteAnimation />}
    </section>
  );
}
