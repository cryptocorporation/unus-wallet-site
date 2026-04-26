"use client";

import { motion, type Transition } from "framer-motion";
import { Arrow, Brain, Stack, Wallet } from "./icons";

type IconAnim = {
  animate: Record<string, number[] | string[]>;
  transition: Transition;
};

const items: Array<{
  icon: typeof Stack;
  eyebrow: string;
  title: string;
  body: string;
  anim: IconAnim;
}> = [
  {
    icon: Stack,
    eyebrow: "DeFi Core",
    title: "Swap, stake, lend, borrow.",
    body: "Do it all without juggling chains. No more switching wallets, copying contract addresses, or manually calculating gas.",
    // Layered blocks pulsing depth
    anim: {
      animate: { scale: [1, 1.08, 1], y: [0, -2, 0] },
      transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
    },
  },
  {
    icon: Brain,
    eyebrow: "Omnichain Smart Agent",
    title: "Intelligent transactions, zero intermediaries.",
    body: "Connects across multiple blockchains, enabling secure, automated and intelligent transactions guided by AI.",
    // Brain wave breathing
    anim: {
      animate: { scale: [1, 1.05, 1, 1.07, 1] },
      transition: {
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      },
    },
  },
  {
    icon: Wallet,
    eyebrow: "Powered by Unus",
    title: "Secure messaging across chains.",
    body: "Enables secure messaging between different blockchains, allowing apps to communicate and transfer data effortlessly.",
    // Wallet "open & close" flip
    anim: {
      animate: { rotateY: [0, 25, 0, -25, 0], scale: [1, 1.04, 1, 1.04, 1] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
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
              <motion.div
                className="size-11 rounded-xl grid place-items-center bg-fg text-bg mb-6 relative overflow-hidden"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                style={{ perspective: 600 }}
              >
                {/* Breathing inner glow */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22), transparent 70%)",
                  }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
                {/* Diagonal sheen on hover */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%)",
                    backgroundSize: "200% 200%",
                  }}
                  initial={{ backgroundPosition: "200% 0" }}
                  whileHover={{ backgroundPosition: "-50% 0" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.div
                  animate={it.anim.animate}
                  transition={it.anim.transition}
                  className="relative"
                >
                  <Icon className="size-5" />
                </motion.div>
              </motion.div>
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
