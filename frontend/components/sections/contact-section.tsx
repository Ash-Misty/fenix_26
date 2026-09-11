"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { contact } from "@/data/contact";

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const items = [
    {
      label: "PHONE",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      icon: "📞",
    },
    {
      label: "EMAIL",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: "✉️",
    },
    {
      label: "INSTAGRAM",
      value: contact.instagramHandle,
      href: contact.instagram,
      icon: "📸",
    },
    {
      label: "COLLEGE",
      value: "University College of Engineering, BIT Campus",
      href: contact.collegeUrl,
      icon: "🏛️",
    },
  ];

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Contact the guardians
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            HAVE A QUESTION? <em>WE&apos;RE HERE TO HELP.</em>
          </motion.h2>
        </div>
      </div>
      <motion.div
        className="contact-grid"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {items.map((item) => (
          <motion.a
            className="contact-card"
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, borderColor: "var(--gold)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="contact-icon">{item.icon}</span>
            <span className="contact-label">{item.label}</span>
            <span className="contact-value">{item.value}</span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
