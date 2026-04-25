"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";
import { Gas, X, Stack } from "./icons";

const items = [
  {
    icon: Stack,
    title: "Complex Bridging",
    body: "Moving assets across chains is slow, risky, and requires extra steps.",
  },
  {
    icon: Gas,
    title: "Gas Management",
    body: "Managing different wallets and tokens for fees makes Web3 frustrating.",
  },
  {
    icon: X,
    title: "Poor UX",
    body: "Complex interfaces create barriers for users trying to access DeFi.",
  },
];

export default function Barriers() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="The problem"
          title={
            <>
              Traditional Web3{" "}
              <span className="text-fg-400" style={{ color: "#0a0a0a" }}>
                has barriers.
              </span>
            </>
          }
          subtitle="Traditional wallets force users to juggle bridges, gas tokens, and multiple accounts. This complexity creates friction, slows adoption, and limits what's possible in Web3."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative rounded-card border border-fg/8 bg-bg-2 p-7 overflow-hidden"
              >
                <div className="size-11 rounded-xl bg-fg text-bg grid place-items-center mb-5">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg tracking-tight font-bold text-fg">
                  {it.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-fg-muted leading-relaxed">
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
