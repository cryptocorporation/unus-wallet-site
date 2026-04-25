"use client";

import { motion } from "framer-motion";
import { Arrow, Brain, Stack, Wallet } from "./icons";

const items = [
  {
    icon: Stack,
    eyebrow: "DeFi Core",
    title: "Swap, stake, lend, borrow.",
    body: "Do it all without juggling chains. No more switching wallets, copying contract addresses, or manually calculating gas.",
  },
  {
    icon: Brain,
    eyebrow: "Omnichain Smart Agent",
    title: "Intelligent transactions, zero intermediaries.",
    body: "Connects across multiple blockchains, enabling secure, automated and intelligent transactions guided by AI.",
  },
  {
    icon: Wallet,
    eyebrow: "Powered by Unus",
    title: "Secure messaging across chains.",
    body: "Enables secure messaging between different blockchains, allowing apps to communicate and transfer data effortlessly.",
  },
];

export default function TrioCards() {
  return (
    <section className="relative py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid md:grid-cols-3 gap-4">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.a
              href="#features"
              key={it.eyebrow}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
              className="group relative rounded-card border border-fg/8 bg-bg-2 hover:bg-bg overflow-hidden p-7 hover:-translate-y-1 hover:border-fg/15 transition-all"
            >
              <div className="size-11 rounded-xl grid place-items-center bg-fg text-bg mb-6">
                <Icon className="size-5" />
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-fg-dim mb-3 font-semibold">
                {it.eyebrow}
              </div>
              <h3 className="font-display text-xl tracking-tight leading-snug font-bold text-fg">
                {it.title}
              </h3>
              <p className="mt-3 text-[14px] text-fg-muted leading-relaxed">
                {it.body}
              </p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-fg font-semibold group-hover:gap-3 transition-all">
                Learn more <Arrow className="size-4" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
