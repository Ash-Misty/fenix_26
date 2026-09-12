"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { workshop } from "@/data/workshop";
import { useRef } from "react";

export function WorkshopSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="workshop" className="workshop section-grid" ref={ref}>
      <motion.div
        className="forge-art"
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="forge-ring">
          THE
          <br />
          FORGE
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <p className="eyebrow">Special workshop</p>
        <h2>
          {workshop.title}
          <br />
          <em>{workshop.description}</em>
        </h2>
        <div className="workshop-meta">
          <span>
            <CalendarDays size={14} />
            {workshop.date}
          </span>
          <span>
            <Clock3 size={14} />
            {workshop.time}
          </span>
          <span>
            <MapPin size={14} />
            {workshop.venue}
          </span>
        </div>
        {workshop.speakerName && (
          <div className="workshop-speaker">
            <strong>{workshop.speakerName}</strong>
            <span>{workshop.speakerDesignation}</span>
          </div>
        )}
        <div className="workshop-list">
          {workshop.highlights.map((item: string, i: number) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              {String(i + 1).padStart(2, "0")} / {item}
            </motion.span>
          ))}
        </div>
        <div className="workshop-actions">
          <motion.a
            className="button button-fire"
            href="#register"
            whileHover={{ transform: "translate(3px, 3px)", boxShadow: "3px 3px 0 var(--ember)" }}
            whileTap={{ transform: "translate(5px, 5px)" }}
          >
            Reserve your seat <ArrowUpRight size={17} />
          </motion.a>
          {workshop.poster && (
            <a
              className="text-link"
              href={workshop.poster}
              target="_blank"
              rel="noopener noreferrer"
            >
              View poster
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}