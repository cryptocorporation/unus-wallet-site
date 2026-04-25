"use client";

import { motion } from "framer-motion";
import { Brain, Chat, Shield } from "./icons";

const items = [
  {
    icon: Brain,
    title: "AI that grows with you.",
    body: "An on-device assistant that learns your preferences over time — from chat to checkout, every tap is more personal than the last.",
  },
  {
    icon: Chat,
    title: "Payments that feel like texting.",
    body: "Request, send, and split crypto inside any conversation. No invoices, no QR fumbling — just a message and a tap.",
  },
  {
    icon: Shield,
    title: "Layer-2 speed, battle-tested security.",
    body: "Account abstraction handles signatures, gas abstraction lets you pay fees in any token, audited contracts guard every transfer.",
  },
];

export default function AIFeatures() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] glow-pale blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-pill glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-fg-muted"
          >
            <span className="size-1.5 rounded-full bg-brand" />
            Powered by Web3 industry leaders
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] tracking-[-0.03em] font-extrabold text-deep"
          >
            The first AI-native{" "}
            <span className="text-gradient">messaging wallet.</span>
          </motion.h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-card glass-strong p-7 relative overflow-hidden"
              >
                <div
                  className="absolute -top-20 -right-20 size-48 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(circle, #d4d4d4 0%, transparent 70%)",
                  }}
                />
                <div
                  className="size-12 rounded-xl grid place-items-center mb-5 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #d4d4d4, #0a0a0a 60%, #2a2a2a 100%)",
                    boxShadow:
                      "0 12px 30px rgba(10, 10, 10, 0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
                  }}
                >
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-[18px] font-bold tracking-tight text-deep">
                  {it.title}
                </h3>
                <p className="mt-2 text-[14px] text-fg-muted leading-relaxed">
                  {it.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
