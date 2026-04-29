"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";
import { Check, X } from "./icons";

type Mark = "yes" | "no" | string;

const rows: { label: string; others: Mark; unus: Mark }[] = [
  { label: "Cross-Chain Swaps", others: "yes", unus: "yes" },
  { label: "Smart Agent", others: "no", unus: "yes" },
  { label: "One-Click DeFi Actions", others: "no", unus: "yes" },
  { label: "NFT Tools", others: "yes", unus: "Advanced" },
  { label: "Perpetual Trading", others: "no", unus: "yes" },
  { label: "Stock Trading", others: "no", unus: "Q3 2026" },
  { label: "Multi-Chain Sniper", others: "no", unus: "Q1 2027" },
];

export default function Comparison() {
  return (
    <section id="comparison" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Feature comparison"
          title={
            <>
              See how Unus Wallet's smart agent{" "}
              <span className="text-gradient">outperforms.</span>
            </>
          }
          subtitle="Simpler workflows and unified cross-chain access — without the friction of traditional Web3 wallets."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mt-14 rounded-card overflow-visible relative"
        >
          {/* Spotlight glow behind the Unus column to draw the eye there */}
          <div
            aria-hidden
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 -z-10"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(10,10,10,0.08), transparent 70%)",
            }}
          />

          <div className="-mx-5 sm:mx-0 overflow-x-auto">
          <div className="rounded-card overflow-hidden border border-fg/10 shadow-[0_30px_80px_-30px_rgba(10,10,10,0.18)] bg-bg min-w-[480px]">
            {/* Header */}
            <div className="grid grid-cols-[1.5fr_1fr_1.1fr] text-[9.5px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] border-b border-fg/8">
              <div className="px-3 py-4 sm:px-6 sm:py-5 text-fg-dim font-semibold">Feature</div>
              <div className="px-3 py-4 sm:px-6 sm:py-5 text-center text-fg-dim font-semibold">
                Other Wallets
              </div>
              <div className="px-3 py-4 sm:px-6 sm:py-5 text-center bg-fg text-bg font-bold relative">
                <div className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-positive" />
                  Unus Wallet
                </div>
                {/* "Winner" ribbon */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-pill bg-positive text-white px-2.5 py-0.5 text-[9px] uppercase tracking-[0.18em] font-bold shadow-[0_8px_18px_-6px_rgba(22,163,74,0.6)]">
                  ★ Winner
                </span>
              </div>
            </div>

            {rows.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`grid grid-cols-[1.5fr_1fr_1.1fr] items-center text-[12.5px] sm:text-[14.5px] ${
                  i % 2 ? "bg-fg/[0.02]" : ""
                }`}
              >
                <div className="px-3 py-4 sm:px-6 sm:py-5 text-fg font-medium">{r.label}</div>
                <div className="px-3 py-4 sm:px-6 sm:py-5 text-center">
                  <Cell value={r.others} />
                </div>
                <div className="px-3 py-4 sm:px-6 sm:py-5 text-center bg-fg/[0.05] border-l-2 border-fg">
                  <Cell value={r.unus} highlight />
                </div>
              </motion.div>
            ))}

            <div className="px-6 py-4 text-[11px] text-fg-dim border-t border-fg/8 flex items-center justify-between">
              <span>⏱ = Coming soon. See roadmap for dates.</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-fg-muted font-medium">
                <span className="size-1.5 rounded-full bg-positive" />
                7 of 7 features lead
              </span>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Cell({ value, highlight }: { value: Mark; highlight?: boolean }) {
  if (value === "yes")
    return (
      <span
        className={`inline-grid place-items-center size-8 rounded-full ${
          highlight
            ? "bg-positive text-white shadow-[0_6px_16px_-6px_rgba(22,163,74,0.6)]"
            : "bg-fg/8 text-fg-dim border border-fg/10"
        }`}
      >
        <Check className="size-4" strokeWidth={2.5} />
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-grid place-items-center size-8 rounded-full bg-fg/[0.04] text-fg-dim border border-fg/10">
        <X className="size-4" strokeWidth={2} />
      </span>
    );
  // Phase tag (e.g. "Advanced", "Q3 2026", "Q1 2027")
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill px-3 py-1.5 text-[12px] font-semibold ${
        highlight
          ? "bg-fg text-bg"
          : "bg-fg/5 text-fg-muted border border-fg/10"
      }`}
    >
      {value}
    </span>
  );
}
