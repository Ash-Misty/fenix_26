"use client";

import { motion, useInView } from "framer-motion";
import { payment, paymentSteps } from "@/data/payment";
import { useRef } from "react";

export function PaymentSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="payment" className="payment-section" ref={ref}>
      <div className="section-heading">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            The tribute
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            REGISTRATION & <em>PAYMENT</em>
          </motion.h2>
        </div>
      </div>
      <motion.div
        className="payment-fees"
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        {payment.fees.map(
          (fee: {
            id: string;
            label: string;
            amount: string;
            description: string;
          }, i) => (
            <motion.div
              className="fee-card"
              key={fee.id}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: "easeOut" }}
              whileHover={{
                y: -5,
                borderColor: "var(--gold)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <span className="fee-label">{fee.label}</span>
              <span className="fee-amount">{fee.amount}</span>
              <span className="fee-description">{fee.description}</span>
            </motion.div>
          ),
        )}
      </motion.div>
      <motion.div
        className="payment-info"
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
      >
        <h3>PAYMENT INFORMATION</h3>
        <div className="payment-details">
          <div className="payment-detail">
            <span>UPI ID</span>
            <strong>{payment.upiId}</strong>
          </div>
          <div className="payment-detail">
            <span>ACCOUNT NAME</span>
            <strong>{payment.accountName}</strong>
          </div>
          <div className="payment-detail">
            <span>BANK NAME</span>
            <strong>{payment.bankName}</strong>
          </div>
          <div className="payment-detail">
            <span>ACCOUNT NUMBER</span>
            <strong>{payment.accountNumber}</strong>
          </div>
          <div className="payment-detail">
            <span>IFSC</span>
            <strong>{payment.ifsc}</strong>
          </div>
        </div>
        <div className="payment-qr">
          <div className="qr-placeholder">
            <span>SCAN TO PAY</span>
            <small>{payment.qrCode}</small>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="payment-process"
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
      >
        <h3>PAYMENT PROCESS</h3>
        <div className="process-steps">
          {paymentSteps.map((step: string, i: number) => (
            <motion.div
              className="process-step"
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.75 + i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -3 }}
            >
              <span className="process-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}