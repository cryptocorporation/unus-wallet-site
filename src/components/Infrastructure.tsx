"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";
import { Brain, Gas, Shield, Wallet } from "./icons";

const components = [
  {
    icon: Wallet,
    title: "Unus Wallet v2",
    body: "Secure omnichain messaging infrastructure.",
  },
  {
    icon: Brain,
    title: "Smart Agent",
    body: "AI-powered transaction optimization.",
  },
  {
    icon: Gas,
    title: "Gas Abstraction",
    body: "Pay fees in any token across chains.",
  },
  {
    icon: Shield,
    title: "Account Abstraction",
    body: "Simplified UX with advanced security.",
  },
];

export default function Infrastructure() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Infrastructure"
          title={
            <>
              Powered by{" "}
              <span className="text-gradient">Unus Wallet v2.</span>
            </>
          }
          subtitle="Advanced tech stack — omnichain messaging, AI optimization, gas abstraction, and account abstraction — working in concert."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {components.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative rounded-card overflow-hidden p-7 border border-fg/8 bg-bg-2 hover:bg-bg hover:border-fg/15 transition-all"
              >
                <div className="size-11 rounded-xl bg-fg text-bg grid place-items-center mb-5">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-base tracking-tight font-bold text-fg">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-fg-muted leading-relaxed">
                  {c.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
