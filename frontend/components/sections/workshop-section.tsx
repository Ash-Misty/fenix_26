"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { workshop } from "@/data/workshop";

export function WorkshopSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="workshop" className="workshop section-grid" ref={ref}>
      <div className="forge-art">
        <div className="forge-ring">
          THE
          <br />
          FORGE
        </div>
      </div>
      <div>
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
            <span key={i}>
              {String(i + 1).padStart(2, "0")} / {item}
            </span>
          ))}
        </div>
        <div className="workshop-actions">
          <a className="button button-fire" href="#register">
            Reserve your seat <ArrowUpRight size={17} />
          </a>
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
      </div>
    </section>
  );
}
