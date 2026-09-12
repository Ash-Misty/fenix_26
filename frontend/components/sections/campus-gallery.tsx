"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const images = [
  "/images/campus/1.jpg",
  "/images/campus/2.jpg",
  "/images/campus/3.jpg",
  "/images/campus/4.jpg",
];

export function CampusGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section id="campus" className="campus-section" ref={ref}>
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Campus
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            A GLIMPSE OF <em>OUR COLLEGE</em>
          </motion.h2>
        </div>
      </div>
      <motion.div
        className="carousel"
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className="carousel-viewport">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Campus photo ${index + 1}`}
            className="carousel-image"
            initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        </div>
        <div className="carousel-controls">
          <motion.button
            onClick={prev}
            aria-label="Previous image"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ← PREV
          </motion.button>
          <span className="carousel-counter">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
          <motion.button
            onClick={next}
            aria-label="Next image"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            NEXT →
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}