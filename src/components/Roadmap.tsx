"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";
import { Check } from "./icons";

type Phase = {
  quarter: string;
  label: string;
  status: "current" | "next" | "later";
  accent: string;
  items: string[];
};

const phases: Phase[] = [
  {
    quarter: "Q2 2026",
    label: "Current · MVP Launch",
    status: "current",
    accent: "#0a0a0a",
    items: [
      "Core wallet functionality",
      "Cross-chain swaps",
      "Gasless transactions",
      "Smart agent integration",
      "Perpetual trading with leverage",
      "Real-time P&L tracking",
    ],
  },
  {
    quarter: "Q3 2026",
    label: "Enhanced Features",
    status: "next",
    accent: "#d4d4d4",
    items: [
      "Lending feature launch",
      "Mobile app release",
      "Tokenized stocks access",
      "Private/incognito swaps",
      "Advanced DeFi integrations",
      "Portfolio analytics",
    ],
  },
  {
    quarter: "Q4 2026",
    label: "Advanced Infrastructure",
    status: "later",
    accent: "#2a2a2a",
    items: [
      "zkSync integration",
      "Cosmos compatibility",
      "Strategy engine launch",
      "Institutional tools",
    ],
  },
  {
    quarter: "Q1 2027",
    label: "Revolutionary Features",
    status: "later",
    accent: "#0a0a0a",
    items: [
      "Multi-chain sniper bot launch",
      "Advanced trading algorithms",
      "Automated arbitrage tools",
      "Cross-chain MEV protection",
    ],
  },
];

export default function Roadmap() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Translate the horizontal track. We scroll through (N-1) panels worth.
  // Total horizontal travel: -(N-1)/N * 100vw approximately, accounting for the panel width.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      id="roadmap"
      ref={ref}
      className="relative"
      style={{ height: `${phases.length * 100}dvh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden flex flex-col">
        {/* Backdrop blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] glow-brand blur-3xl opacity-40" />
          <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] glow-brand blur-3xl opacity-40" />
        </div>

        {/* Header pinned at top */}
        <div className="pt-24 pb-6 px-5 lg:px-8">
          <SectionHeader
            eyebrow="Our roadmap"
            title={
              <>
                Building the{" "}
                <span className="text-gradient">future of DeFi.</span>
              </>
            }
          />
          <ProgressBar progress={scrollYProgress} total={phases.length} />
        </div>

        {/* Horizontal track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-4 sm:gap-6 pl-[5vw] pr-[5vw] sm:pl-[12vw] sm:pr-[12vw] will-change-transform">
            {phases.map((p, i) => (
              <PhaseCard
                key={p.quarter}
                phase={p}
                index={i}
                total={phases.length}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({
  phase,
  index,
  total,
  progress,
}: {
  phase: Phase;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isCurrent = phase.status === "current";
  const center = (index + 0.5) / total;
  const scale = useTransform(
    progress,
    [Math.max(0, center - 0.2), center, Math.min(1, center + 0.2)],
    isCurrent ? [0.96, 1, 0.96] : [0.9, 1, 0.9]
  );
  // Current phase never dims — it's the only "shipping now" milestone, so it
  // stays visually dominant even when scrolled past. Other phases fade as
  // they leave center.
  const opacity = useTransform(
    progress,
    [Math.max(0, center - 0.25), center, Math.min(1, center + 0.25)],
    isCurrent ? [1, 1, 1] : [0.5, 1, 0.5]
  );

  // Card surface — Current is inverted (solid black card, white content),
  // upcoming phases stay light glass.
  const cardClass = isCurrent
    ? "bg-fg text-bg border-2 border-fg shadow-[0_30px_80px_-20px_rgba(10,10,10,0.6)]"
    : "glass-strong border border-fg/10";

  const labelClass = isCurrent
    ? "rounded-pill bg-positive text-white px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] font-bold inline-flex items-center gap-2 shadow-[0_8px_18px_-6px_rgba(22,163,74,0.55)]"
    : phase.status === "next"
      ? "inline-flex items-center gap-2 rounded-pill glass px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-fg-muted"
      : "inline-flex items-center gap-2 rounded-pill glass px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-fg-dim";

  const counterClass = isCurrent
    ? "text-[11px] uppercase tracking-[0.22em] font-bold text-bg/70"
    : "text-[11px] uppercase tracking-[0.22em] font-medium text-fg-dim";

  const bodyTextClass = isCurrent ? "text-bg" : "text-fg";
  const itemTextClass = isCurrent ? "text-bg/85" : "text-fg-muted";

  return (
    <motion.div
      style={{ scale, opacity }}
      className={`shrink-0 w-[82vw] sm:w-[72vw] md:w-[60vw] lg:w-[48vw] xl:w-[40vw] rounded-card p-6 sm:p-8 md:p-10 relative overflow-hidden ${cardClass}`}
    >
      {/* Decorative blob (skip on current — it's already solid) */}
      {!isCurrent && (
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: phase.accent }}
        />
      )}

      {/* "Live now" pulse ring on the current card */}
      {isCurrent && (
        <>
          <div className="absolute -top-3 -right-3 size-20 rounded-full bg-positive/20 blur-2xl" />
          <span className="absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-pill bg-positive text-white px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] font-bold">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-1.5 rounded-full bg-white opacity-70 animate-ping" />
              <span className="relative inline-flex size-1.5 rounded-full bg-white" />
            </span>
            Shipping now
          </span>
        </>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className={labelClass}>
          {isCurrent && (
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 rounded-full bg-white opacity-70 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
          )}
          {phase.status === "next" && (
            <span className="size-1.5 rounded-full bg-fg" />
          )}
          {phase.status === "later" && (
            <span className="size-1.5 rounded-full bg-fg-dim" />
          )}
          {phase.label}
        </div>
        <div className={counterClass}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      <div
        className={`mt-6 font-display font-extrabold tracking-[-0.025em] leading-none ${bodyTextClass} ${
          isCurrent
            ? "text-[clamp(2.8rem,5.5vw,4.4rem)]"
            : "text-[clamp(2.4rem,5vw,4rem)]"
        }`}
      >
        {phase.quarter}
      </div>

      <ul className="mt-8 space-y-3">
        {phase.items.map((it) => (
          <li
            key={it}
            className={`flex items-start gap-3 text-[14px] ${itemTextClass}`}
          >
            <span
              className={`mt-0.5 size-5 rounded-full grid place-items-center shrink-0 ${
                isCurrent
                  ? "bg-positive text-white"
                  : "bg-fg/8 border border-fg/15 text-fg"
              }`}
            >
              <Check className="size-3" strokeWidth={2.5} />
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProgressBar({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <div className="relative h-1 rounded-full bg-fg/8 overflow-hidden">
        <motion.div
          style={{ width }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-fg via-fg to-fg/40 rounded-full"
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-fg-dim">
        {phases.map((p) => (
          <span key={p.quarter}>{p.quarter}</span>
        ))}
        <span></span>
      </div>
      <div className="text-center text-[11px] text-fg-dim mt-3 lg:hidden">
        scroll to advance
      </div>
    </div>
  );
}
