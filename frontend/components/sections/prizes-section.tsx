"use client";

import { motion } from "framer-motion";

export function PrizesSection() {
  return (
    <section id="prizes" className="prizes section-grid">
      <div>
        <p className="eyebrow">05 / The treasures</p>
        <h2>
          Earn your
          <br />
          <em>place in legend.</em>
        </h2>
        <p className="body-copy">
          Compete for glory, take home the championship, and leave with a story
          worth retelling.
        </p>
      </div>
      <div className="prize-grid">
        <div className="prize-card featured">
          <span>Overall</span>
          <strong>
            CHAMPIONSHIP
            <br />
            TROPHY
          </strong>
          <small>For the team that rises above all realms.</small>
        </div>
        <div className="prize-card">
          <span>01</span>
          <strong>
            FIRST
            <br />
            PRIZE
          </strong>
        </div>
        <div className="prize-card">
          <span>02</span>
          <strong>
            SECOND
            <br />
            PRIZE
          </strong>
        </div>
        <div className="prize-card">
          <span>03</span>
          <strong>
            THIRD
            <br />
            PRIZE
          </strong>
        </div>
      </div>
    </section>
  );
}
