"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { eventRules } from "@/data/eventRules";
import { useRef, useState } from "react";

interface RuleData {
  id: string;
  name: string;
  category: string;
  description: string;
  rules: string[];
  eligibility: string;
  teamSize: string;
  rounds: string;
  instructions: string;
}

export function EventRules() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openId, setOpenId] = useState<string | null>(null);

  const technical = eventRules.filter((r) => r.category === "technical");
  const nonTechnical = eventRules.filter(
    (r) => r.category === "non-technical",
  );

  return (
    <section id="rules" className="rules-section" ref={ref}>
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            The codex
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            EVENT <em>RULES</em>
          </motion.h2>
        </div>
      </div>
      <motion.div
        className="rules-content"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <RuleCategory
          title="TECHNICAL EVENTS"
          rules={technical}
          openId={openId}
          setOpenId={setOpenId}
          inView={inView}
        />
        <RuleCategory
          title="NON-TECHNICAL EVENTS"
          rules={nonTechnical}
          openId={openId}
          setOpenId={setOpenId}
          inView={inView}
        />
      </motion.div>
    </section>
  );
}

function RuleCategory({
  title,
  rules,
  openId,
  setOpenId,
  inView,
}: {
  title: string;
  rules: RuleData[];
  openId: string | null;
  setOpenId: (v: string | null) => void;
  inView: boolean;
}) {
  return (
    <div className="rules-category">
      <h3>{title}</h3>
      <div className="rules-list">
        {rules.map((rule, i) => (
          <RuleCard
            key={rule.id}
            rule={rule}
            isOpen={openId === rule.id}
            onClick={() =>
              setOpenId(openId === rule.id ? null : rule.id)
            }
            inView={inView}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

function RuleCard({
  rule,
  isOpen,
  onClick,
  inView,
  index,
}: {
  rule: RuleData;
  isOpen: boolean;
  onClick: () => void;
  inView: boolean;
  index: number;
}) {
  return (
    <motion.div
      className={`rule-card${isOpen ? " open" : ""}`}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
    >
      <button
        className="rule-header"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="rule-name">{rule.name}</span>
        <span className="rule-icon">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="rule-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p>{rule.description}</p>
            <div className="rule-meta">
              <div>
                <span>ELIGIBILITY</span>
                <strong>{rule.eligibility}</strong>
              </div>
              <div>
                <span>TEAM SIZE</span>
                <strong>{rule.teamSize}</strong>
              </div>
              <div>
                <span>ROUNDS</span>
                <strong>{rule.rounds}</strong>
              </div>
            </div>
            <div className="rule-rules">
              <strong>RULES</strong>
              <ul>
                {rule.rules.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="rule-instructions">
              <strong>IMPORTANT INSTRUCTIONS</strong>
              <p>{rule.instructions}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}