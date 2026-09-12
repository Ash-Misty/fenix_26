"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

export function PosterViewer({
  poster,
  setPoster,
}: {
  poster: number | null;
  setPoster: (v: number | null) => void;
}) {
  useEffect(() => {
    if (poster === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPoster(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [poster, setPoster]);

  if (poster === null || poster < 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="poster-modal"
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.button
          className="modal-close"
          onClick={() => setPoster(null)}
          aria-label="Close poster"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X />
        </motion.button>
        <motion.div
          className="poster-art"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p>FENIX&apos;26</p>
          <strong>OFFICIAL POSTER</strong>
          <span>07 OCT 2026</span>
          <div>
            RISE.
            <br />
            RECODE.
            <br />
            REIGN.
          </div>
        </motion.div>
        <a
          className="button button-fire modal-register"
          href="#register"
          onClick={() => setPoster(null)}
        >
          Register <ArrowUpRight size={15} />
        </a>
      </motion.div>
    </AnimatePresence>
  );
}