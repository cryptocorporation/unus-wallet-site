"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";
import { Target } from "./icons";

const features = [
  "Real-time launch detection across all supported chains",
  "Lightning-fast mobile execution with MEV protection",
  "Advanced honeypot and rugpull detection",
  "Customizable parameters and risk management",
];

export default function Upcoming() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Coming soon"
          title={
            <>
              Onchain perps, tokenized stocks,{" "}
              <span className="text-gradient">and the world's first mobile sniper bot.</span>
            </>
          }
          subtitle="Soon, users will trade onchain perpetuals with leverage, access tokenized stock markets, and perform private, incognito swaps."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative rounded-card overflow-hidden glass-strong border border-fg/10"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-[#0a0a0a]/30 blur-3xl" />
            <div className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full bg-fg/20 blur-3xl" />
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 rounded-pill bg-[#0a0a0a]/15 border border-[#0a0a0a]/30 text-[#0a0a0a] px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
                Q1 2027
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight tracking-[-0.02em]">
                Multi-Chain Sniper Bot
              </h3>
              <p className="mt-4 text-[14.5px] text-fg-muted leading-relaxed max-w-md">
                The world's first mobile multi-chain sniper bot for token
                launches. Execute on opportunities the moment they hit any
                chain — with risk controls and MEV protection built in.
              </p>
              <ul className="mt-8 space-y-3">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[14px] text-fg-muted"
                  >
                    <span className="mt-0.5 size-5 rounded-full bg-[#0a0a0a]/15 border border-[#0a0a0a]/30 grid place-items-center shrink-0">
                      <span className="size-1.5 rounded-full bg-[#0a0a0a]" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[420px] grid place-items-center p-10 lg:border-l border-fg/5">
              <SniperVisual />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SniperVisual() {
  return (
    <div className="relative w-full max-w-md aspect-square">
      {/* concentric rings */}
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="absolute inset-0 rounded-full border border-[#0a0a0a]/20 animate-pulse"
          style={{
            margin: `${n * 10}%`,
            animationDuration: `${2 + n}s`,
          }}
        />
      ))}

      {/* radar sweep */}
      <div
        className="absolute inset-[10%] rounded-full opacity-40 animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #0a0a0a 25%, transparent 30%)",
        }}
      />

      {/* center target */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full glow-orange blur-xl" />
          <div className="relative size-24 rounded-full glass-strong border-2 border-[#0a0a0a]/50 grid place-items-center">
            <Target className="size-10 text-[#0a0a0a]" />
          </div>
        </div>
      </div>

      {/* coin ticks */}
      {[
        { top: "8%", left: "18%", c: "#0a0a0a" },
        { top: "20%", right: "14%", c: "#d4d4d4" },
        { bottom: "22%", left: "10%", c: "#ebebeb" },
        { bottom: "12%", right: "26%", c: "#0a0a0a" },
      ].map((p, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
          className="absolute size-3 rounded-full"
          style={{
            ...p,
            background: p.c,
            boxShadow: `0 0 20px ${p.c}`,
          }}
        />
      ))}
    </div>
  );
}
