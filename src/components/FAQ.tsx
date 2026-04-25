"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";
import { Plus } from "./icons";

const items = [
  {
    q: "What makes Unus different from other wallets?",
    a: "Unus combines an omnichain messaging layer with an AI smart agent. You describe what you want — swap, stake, lend, snipe — and the agent picks the best path, abstracts gas, and executes across chains automatically. No bridges, no copying contract addresses, no juggling wallets.",
  },
  {
    q: "How does the smart agent work?",
    a: "The agent reads your intent, scans liquidity and pricing across supported chains, weighs gas, slippage, MEV risk and execution time, then proposes the optimal route. You approve, and Unus Wallet v2's omnichain infrastructure carries it out — usually in seconds.",
  },
  {
    q: "Is Unus non-custodial?",
    a: "Yes — 100% non-custodial. Your keys never leave your device. Unus uses account abstraction so the UX feels effortless, but you remain in full control of your assets at all times.",
  },
  {
    q: "When will the sniper bot launch?",
    a: "The world's first mobile multi-chain sniper bot is on the roadmap for Q1 2027. It will detect token launches in real time across every supported chain with MEV protection and honeypot detection built in.",
  },
  {
    q: "What chains are supported?",
    a: "Live today: Ethereum, Arbitrum, Optimism, Base, BNB Chain, Polygon, and Avalanche. Solana, Cosmos, zkSync Era and additional L2s are coming through 2026 and 2027.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title={<>Frequently asked questions.</>}
        />

        <div className="mt-14 rounded-card glass border border-fg/5 divide-y divide-fg/5">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
                >
                  <span className="font-medium text-[15px] group-hover:text-fg transition-colors">
                    {it.q}
                  </span>
                  <span
                    className={`size-8 rounded-full border border-fg/10 grid place-items-center transition-transform ${
                      isOpen ? "rotate-45 bg-fg/15 border-fg/40 text-fg" : "text-fg-muted"
                    }`}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[14px] text-fg-muted leading-relaxed max-w-2xl">
                        {it.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
