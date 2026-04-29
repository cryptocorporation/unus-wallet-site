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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-6 sm:p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 rounded-pill bg-[#0a0a0a]/15 border border-[#0a0a0a]/30 text-[#0a0a0a] px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
                Q1 2027
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight tracking-[-0.025em] font-extrabold text-fg">
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
      {/* Expanding ring waves — radar pulses out from the center */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-[20%] rounded-full border border-[#0a0a0a]/40"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 2.5, opacity: [0, 0.6, 0] }}
          transition={{
            duration: 3,
            delay: i * 1,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Static concentric rings (subtle, give the dial structure) */}
      {[1, 2, 3, 4].map((n) => (
        <div
          key={`ring-${n}`}
          className="absolute inset-0 rounded-full border border-[#0a0a0a]/10"
          style={{ margin: `${n * 10}%` }}
        />
      ))}

      {/* Crosshairs */}
      <div className="absolute inset-[12%] grid place-items-center pointer-events-none">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-[#0a0a0a]/15" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#0a0a0a]/15" />
      </div>

      {/* Radar sweep — slightly faster than the existing animate-spin-slow */}
      <motion.div
        className="absolute inset-[10%] rounded-full opacity-50"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(10,10,10,0) 18%, rgba(10,10,10,0.55) 27%, rgba(10,10,10,0) 32%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulsing target halo */}
      <motion.div
        className="absolute inset-0 grid place-items-center pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="size-32 rounded-full bg-fg/8 blur-2xl" />
      </motion.div>

      {/* Center target */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative size-24 rounded-full bg-fg text-bg border-2 border-fg/80 grid place-items-center shadow-[0_20px_60px_-12px_rgba(10,10,10,0.55)]">
            <Target className="size-10" />
          </div>
          {/* Lock-on corner brackets */}
          {[
            { top: -6, left: -6, rot: 0 },
            { top: -6, right: -6, rot: 90 },
            { bottom: -6, right: -6, rot: 180 },
            { bottom: -6, left: -6, rot: 270 },
          ].map((c, i) => (
            <motion.span
              key={i}
              className="absolute size-3 border-l-2 border-t-2 border-fg"
              style={{
                ...c,
                transform: `rotate(${c.rot}deg)`,
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Coin ticks — animated entrance + steady pulse, with sweeping highlight */}
      {[
        { top: "8%", left: "18%", c: "#0a0a0a", delay: 0 },
        { top: "20%", right: "14%", c: "#0a0a0a", delay: 0.6 },
        { bottom: "22%", left: "10%", c: "#0a0a0a", delay: 1.2 },
        { bottom: "12%", right: "26%", c: "#0a0a0a", delay: 1.8 },
      ].map((p, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
          className="absolute"
          style={{ ...p }}
        >
          <motion.div
            className="size-3 rounded-full"
            style={{
              background: p.c,
              boxShadow: `0 0 0 4px rgba(10,10,10,0.08), 0 0 18px ${p.c}`,
            }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 2,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      {/* Live status pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-pill bg-bg border border-fg/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-fg-muted font-semibold"
      >
        <span className="size-1.5 rounded-full bg-positive animate-pulse" />
        Scanning
      </motion.div>

      {/* Detection counter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-pill bg-fg text-bg px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold"
      >
        <span>4 launches</span>
        <span className="size-1 rounded-full bg-bg/50" />
        <span>Locked</span>
      </motion.div>
    </div>
  );
}
