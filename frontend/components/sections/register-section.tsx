"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EmberField } from "@/components/shared/ember-field";

export function RegisterSection() {
  return (
    <section id="register" className="register-section">
      <EmberField />
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        The final rise
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      >
        Ready to <em>rise?</em>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        FENIX&apos;26 awaits.
      </motion.p>
      <motion.a
        className="button button-fire"
        href="mailto:fenix@example.com"
        initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.45, type: "spring", stiffness: 300 }}
        whileHover={{
          transform: "translate(3px, 3px)",
          boxShadow: "3px 3px 0 var(--ember)",
        }}
        whileTap={{ transform: "translate(5px, 5px)" }}
      >
        Register now <ArrowUpRight size={18} />
      </motion.a>
    </section>
  );
}