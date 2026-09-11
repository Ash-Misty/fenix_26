"use client";

import { motion } from "framer-motion";

export function CountdownCompleteAnimation() {
  return (
    <motion.div
      className="countdown-complete"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="countdown-complete-glow" />
      <div className="countdown-complete-content">
        <motion.div
          className="countdown-complete-phoenix"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          ✦
        </motion.div>
        <motion.h2
          className="countdown-complete-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          FENIX&apos;26
        </motion.h2>
        <motion.h3
          className="countdown-complete-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          THE PHOENIX HAS RISEN.
        </motion.h3>
        <motion.p
          className="countdown-complete-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          RISE. RECODE. REIGN.
        </motion.p>
      </div>
    </motion.div>
  );
}
