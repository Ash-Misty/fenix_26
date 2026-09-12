"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { contact } from "@/data/contact";
import {
  Phone,
  Mail,
  AtSign,
  Building2,
  Globe,
} from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const items = [
    {
      label: "PHONE",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      icon: Phone,
    },
    {
      label: "EMAIL",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: Mail,
    },
    {
      label: "INSTAGRAM",
      value: contact.instagramHandle,
      href: contact.instagram,
      icon: AtSign,
    },
    {
      label: "COLLEGE",
      value: "University College of Engineering, BIT Campus",
      href: contact.collegeUrl,
      icon: Building2,
    },
  ];

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Contact the guardians
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
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
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.a
              className="contact-card"
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: "easeOut" }}
              whileHover={{
                y: -5,
                borderColor: "var(--gold)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <span className="contact-icon">
                <Icon size={22} />
              </span>
              <span className="contact-label">{item.label}</span>
              <span className="contact-value">{item.value}</span>
            </motion.a>
          );
        })}
      </motion.div>
    </section>
  );
}