"use client";

import { motion } from "framer-motion";
import { Spark, Picture, Gas, Brain, Bolt } from "./icons";

const tags = [
  "Cross-chain swaps",
  "Gasless txns",
  "Perps trading",
  "NFT tracking",
  "Token sniping",
  "Omni-chain staking",
];

const features = [
  {
    icon: Spark,
    title: "Airdrop Catcher",
    body: "Never miss rewards by automatically detecting and claiming eligible airdrops.",
    color: "#d4d4d4",
  },
  {
    icon: Picture,
    title: "NFT View",
    body: "Explore, track, and manage your NFTs in one unified dashboard.",
    color: "#ebebeb",
  },
  {
    icon: Gas,
    title: "Gas Abstraction",
    body: "Simplify transactions by removing the complexity of managing gas fees.",
    color: "#0a0a0a",
  },
  {
    icon: Brain,
    title: "Smart Agent Guidance",
    body: "AI-powered insights and automation to optimize your on-chain activities.",
    color: "#6b6b6b",
  },
  {
    icon: Bolt,
    title: "Omnichain Staking & Lending",
    body: "Earn yield or access liquidity across any chain through unified staking and lending.",
    color: "#0a0a0a",
  },
];

export default function CoreFeatures() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fg/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Core feature highlights"
          title={
            <>
              Unlock Web3 with simple, scalable tools —{" "}
              <span className="text-gradient">guided by our smart agent.</span>
            </>
          }
        />

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-2 justify-center"
        >
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-pill border border-fg/10 px-3.5 py-1.5 text-[12.5px] text-fg-muted hover:text-fg hover:border-fg/40 transition-colors"
            >
              {t}
            </span>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (i % 3) * 0.06,
                }}
                className="group relative rounded-card border border-fg/8 bg-bg-2 hover:bg-bg p-7 overflow-hidden hover:border-fg/15 transition-all"
              >
                <div className="size-12 rounded-xl grid place-items-center mb-5 bg-fg text-bg">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-[17px] tracking-tight font-bold text-fg">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-fg-muted leading-relaxed">
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-pill glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-fg-muted">
          <span className="size-1.5 rounded-full bg-fg" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.02em] font-semibold">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-[15.5px] text-fg-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
