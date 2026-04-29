"use client";

import { motion, type Transition } from "framer-motion";
import { Swap, Spark, Picture, Gas, Brain, Bolt } from "./icons";

// Each card gets a distinct idle animation on its icon, plus a hover boost.
type IconAnim = {
  animate: Record<string, number[] | string[]>;
  transition: Transition;
};

const iconAnims: IconAnim[] = [
  // 0 — Cross-Chain Swaps · arrows wiggle horizontally
  {
    animate: { x: [0, 2, -2, 0], rotate: [0, 8, -8, 0] },
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
  // 1 — Airdrop Catcher · sparkle pulse
  {
    animate: { scale: [1, 1.18, 1], rotate: [0, 90, 180] },
    transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
  },
  // 2 — NFT View · gentle shimmer
  {
    animate: { scale: [1, 1.06, 1], rotate: [0, -3, 0] },
    transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
  },
  // 3 — Gas Abstraction · pump-up bounce
  {
    animate: { scaleY: [1, 1.18, 1], y: [0, -2, 0] },
    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
  },
  // 4 — Smart Agent · brain-wave breathing
  {
    animate: { scale: [1, 1.08, 1] },
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
  // 5 — Omnichain Staking · lightning flicker
  {
    animate: { rotate: [0, -8, 4, -2, 0], scale: [1, 1.12, 1, 1.06, 1] },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.1, 0.18, 0.26, 1],
    },
  },
];

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
    icon: Swap,
    title: "Cross-Chain Swaps",
    body: "Instantly exchange assets across multiple blockchains with seamless interoperability.",
    color: "#0a0a0a",
  },
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
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                <motion.div
                  className="size-12 rounded-xl grid place-items-center mb-5 bg-fg text-bg relative overflow-hidden"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  {/* Soft inner glow that breathes — adds life at rest */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22), transparent 70%)",
                    }}
                    animate={{ opacity: [0.35, 0.7, 0.35] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.25,
                    }}
                  />
                  {/* Sweeping highlight on hover — diagonal shine */}
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
                    animate={iconAnims[i % iconAnims.length].animate}
                    transition={iconAnims[i % iconAnims.length].transition}
                    className="relative"
                  >
                    <Icon className="size-5" />
                  </motion.div>
                </motion.div>
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
