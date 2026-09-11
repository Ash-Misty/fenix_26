"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3, Flame } from "lucide-react";
import { events } from "@/data/events";

interface Event {
  id: number;
  name: string;
  category: string;
  description: string;
  date: string;
  time: string;
}

interface EventsSectionProps {
  events: Event[];
  category: string;
  setCategory: (v: string) => void;
  onPoster: (i: number) => void;
}

export function EventsSection({
  events: eventData,
  category,
  setCategory,
  onPoster,
}: EventsSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const visible = eventData.filter((event) => event.category === category);

  return (
    <section id="events" className="events-section">
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            02 / Choose your challenge
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            The <em>realms.</em>
          </motion.h2>
        </div>
        <p className="section-note">
          Five ways to test the mind.
          <br />
          One reason to rise.
        </p>
      </div>
      <EventTabs category={category} setCategory={setCategory} />
      <div className="event-grid">
        {visible.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            index={i}
            onPoster={onPoster}
          />
        ))}
      </div>
    </section>
  );
}

function EventTabs({
  category,
  setCategory,
}: {
  category: string;
  setCategory: (v: string) => void;
}) {
  return (
    <div className="tabs">
      <button
        className={category === "technical" ? "active" : ""}
        onClick={() => setCategory("technical")}
      >
        Technical events
      </button>
      <button
        className={category === "non-technical" ? "active" : ""}
        onClick={() => setCategory("non-technical")}
      >
        Non-technical events
      </button>
    </div>
  );
}

function EventCard({
  event,
  index,
  onPoster,
}: {
  event: Event;
  index: number;
  onPoster: (i: number) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      className="event-card"
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div className="event-number">0{index + 1}</div>
      <div className="event-icon">
        <Flame size={22} />
      </div>
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <div className="event-details">
        <span>
          <CalendarDays size={13} />
          {event.date}
        </span>
        <span>
          <Clock3 size={13} />
          {event.time}
        </span>
      </div>
      <div className="card-actions">
        <button
          onClick={() =>
            onPoster(events.findIndex((item) => item.id === event.id))
          }
        >
          View poster
        </button>
        <a href="#register">
          Register <ArrowUpRight size={14} />
        </a>
      </div>
    </motion.article>
  );
}
