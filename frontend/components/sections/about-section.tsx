"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="about section-grid">
      <div className="section-label">01 / The awakening</div>
      <div>
        <p className="eyebrow">Where technology meets imagination</p>
        <h2>
          The spark
          <br />
          <em>becomes a flame.</em>
        </h2>
        <p className="body-copy">
          FENIX&apos;26 is a national-level technical symposium by the
          Department of Computer Science and Engineering. Step into a day where
          competitive minds, curious creators, and fearless dreamers come
          together to rise beyond the ordinary.
        </p>
        <a className="text-link" href="#events">
          Enter the realms <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="about-stamp">
        CSE
        <br />
        <span>26</span>
        <small>
          THE NEXT
          <br />
          CHAPTER
        </small>
      </div>
    </section>
  );
}
