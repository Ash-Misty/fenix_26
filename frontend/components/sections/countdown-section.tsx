"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { eventConfig } from "@/data/eventConfig";
import { EmberField } from "@/components/shared/ember-field";
import { CountdownCompleteAnimation } from "@/components/sections/countdown-complete-animation";

function CountdownUnit({
  value,
  label,
  index,
  inView,
}: {
  value: string;
  label: string;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="countdown-unit"
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <span className="countdown-value">{value}</span>
      <span className="countdown-label">{label}</span>
    </motion.div>
  );
}

export function CountdownSection() {
  const [mounted, setMounted] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [complete, setComplete] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const target = new Date(eventConfig.targetISO).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((diff / (1000 * 60)) % 60));
      setSeconds(Math.floor((diff / 1000) % 60));
      setComplete(diff === 0);
    };

    tick();
    setMounted(true);
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "DAYS", value: String(days).padStart(2, "0") },
    { label: "HOURS", value: String(hours).padStart(2, "0") },
    { label: "MINUTES", value: String(minutes).padStart(2, "0") },
    { label: "SECONDS", value: String(seconds).padStart(2, "0") },
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
          {items.map((item, i) => (
            <CountdownUnit
              key={item.label}
              value={item.value}
              label={item.label}
              index={i}
              inView={inView}
            />
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