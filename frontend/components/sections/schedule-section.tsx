"use client";

import { motion, useInView } from "framer-motion";
import { schedule } from "@/data/events";
import { useRef } from "react";

export function ScheduleSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="schedule" className="schedule-section" ref={ref}>
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            04 / The chronicle
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            A day <em>unfolds.</em>
          </motion.h2>
        </div>
      </div>
      <div className="timeline">
        {schedule.map(([time, title, copy], i) => (
          <motion.div
            className="timeline-item"
            key={time}
            initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
          >
            <span className="timeline-time">{time}</span>
            <span className="timeline-dot" />
            <div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}