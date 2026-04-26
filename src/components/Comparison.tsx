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
              <span className="relative inline-block whitespace-nowrap">
                <span
                  aria-hidden
                  className="absolute -inset-x-3 -inset-y-1 rounded-2xl bg-fg -rotate-2 -z-10"
                />
                <span className="relative text-bg italic px-1">
                  outperforms.
                </span>
              </span>
            </>
          }
          subtitle="Simpler workflows and unified cross-chain access — without the friction of traditional Web3 wallets."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mt-14 rounded-card glass overflow-hidden border border-fg/5"
        >
          {/* Header */}
          <div className="grid grid-cols-3 text-[11px] uppercase tracking-[0.2em] text-fg-dim border-b border-fg/5">
            <div className="px-6 py-4">Feature</div>
            <div className="px-6 py-4 text-center">Other Wallets</div>
            <div className="px-6 py-4 text-center bg-fg/5">
              <span className="text-fg">Unus Wallet</span>
            </div>
          </div>

          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-3 items-center text-[14px] ${
                i % 2 ? "bg-fg/[0.015]" : ""
              }`}
            >
              <div className="px-6 py-5 text-fg">{r.label}</div>
              <div className="px-6 py-5 text-center">
                <Cell value={r.others} />
              </div>
              <div className="px-6 py-5 text-center bg-fg/[0.04] border-l border-fg/10">
                <Cell value={r.unus} highlight />
              </div>
            </div>
          ))}
          <div className="px-6 py-3 text-[11px] text-fg-dim border-t border-fg/5">
            ⏱ = Coming soon. See roadmap for dates.
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
        className={`inline-grid place-items-center size-7 rounded-full ${
          highlight
            ? "bg-fg/15 text-fg border border-fg/40"
            : "bg-fg/5 text-fg border border-fg/10"
        }`}
      >
        <Check className="size-4" />
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-grid place-items-center size-7 rounded-full bg-fg/[0.03] text-fg-dim border border-fg/5">
        <X className="size-4" />
      </span>
    );
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill px-3 py-1 text-[12px] ${
        highlight
          ? "bg-fg/10 text-fg border border-fg/30"
          : "bg-fg/5 text-fg-muted border border-fg/10"
      }`}
    >
      {value}
    </span>
  );
}
