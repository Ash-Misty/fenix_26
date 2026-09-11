"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EmberField } from "@/components/shared/ember-field";

export function RegisterSection() {
  return (
    <section id="register" className="register-section">
      <EmberField />
      <p className="eyebrow">The final rise</p>
      <h2>
        Ready to <em>rise?</em>
      </h2>
      <p>FENIX&apos;26 awaits.</p>
      <motion.a
        className="button button-fire"
        href="mailto:fenix@example.com"
        whileHover={{
          transform: "translate(3px, 3px)",
          boxShadow: "3px 3px 0 var(--ember)",
        }}
      >
        Register now <ArrowUpRight size={18} />
      </motion.a>
    </section>
  );
}
