"use client";

import { motion } from "framer-motion";
import { Lock, Stack, Swap as SwapIcon, Chart } from "./icons";
import {
  PhoneFrame,
  ReceiveScreen,
  DashboardScreen,
  SwapScreen,
  TransactionsScreen,
  TradeScreen,
} from "./AppMocks";

const panels = [
  {
    eyebrow: "Self-custody",
    icon: Lock,
    title: "Your keys. Your coins. Your wallet.",
    body: "Generate, receive and hold across every chain you use. Non-custodial by default — Unus never holds your keys, sees your activity, or touches your funds.",
    Screen: ReceiveScreen,
  },
  {
    eyebrow: "Multi-chain dashboard",
    icon: Stack,
    title: "All your assets. One clean view.",
    body: "ETH on Mainnet, BONK on Solana, FRAX on Arbitrum — every token and NFT, balanced and tracked side by side. Receive, send, swap or trade in a tap.",
    Screen: DashboardScreen,
  },
  {
    eyebrow: "Cross-chain swaps",
    icon: SwapIcon,
    title: "Swap, bridge and trade in one tap.",
    body: "Move value across chains without juggling bridges. The router picks the best route — slippage, gas and ETA shown up front.",
    Screen: SwapScreen,
  },
  {
    eyebrow: "Receipts & history",
    icon: Stack,
    title: "Every send, swap and trade — receipted.",
    body: "Confirmed, pending or failed: filter by address, asset or type. Search across every chain at once.",
    Screen: TransactionsScreen,
  },
  {
    eyebrow: "Onchain trading",
    icon: Chart,
    title: "Spot prices, candles, leverage.",
    body: "Open longs and shorts on the assets you already hold. Real-time PnL, decentralized execution, no order-book intermediaries.",
    Screen: TradeScreen,
  },
];

export default function FeaturePanels() {
  return (
    <section id="features" className="relative py-24 lg:py-32 space-y-28">
      {panels.map((p, i) => (
        <Panel key={p.eyebrow} {...p} reverse={i % 2 === 1} index={i} />
      ))}
    </section>
  );
}

function Panel({
  eyebrow,
  icon: Icon,
  title,
  body,
  Screen,
  reverse,
}: {
  eyebrow: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  Screen: React.ComponentType;
  reverse: boolean;
  index: number;
}) {
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square w-full max-w-md mx-auto flex items-center justify-center"
        >
          <div className="absolute inset-[10%] rounded-[2.5rem] bg-bg-2 border border-fg/8" />
          <div className="absolute inset-[16%] rounded-[2rem] bg-bg shadow-[0_30px_70px_-25px_rgba(10,10,10,0.18)] border border-fg/8" />
          <PhoneFrame width={230}>
            <Screen />
          </PhoneFrame>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 rounded-pill border border-fg/10 bg-bg-2 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            <span className="size-1.5 rounded-full bg-fg" />
            {eyebrow}
          </div>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] tracking-[-0.035em] font-extrabold text-fg">
            {title}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-fg-muted max-w-xl">
            {body}
          </p>
          <div className="mt-7 flex items-center gap-3">
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-pill btn-brand px-5 py-2.5 text-[13.5px] font-semibold"
            >
              Get the app
            </a>
            <div className="size-10 rounded-full bg-bg-2 border border-fg/10 grid place-items-center text-fg">
              <Icon className="size-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
