"use client";

import { motion } from "framer-motion";
import { schedule } from "@/data/events";

export function ScheduleSection() {
  return (
    <section id="schedule" className="schedule-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">04 / The chronicle</p>
          <h2>
            A day <em>unfolds.</em>
          </h2>
        </div>
      </div>
      <div className="timeline">
        {schedule.map(([time, title, copy]) => (
          <div className="timeline-item" key={time}>
            <div className="timeline-dot" />
            <span className="timeline-time">{time}</span>
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                {title}
              </motion.h3>
              <p>{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
