"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";
import { Chart, Bolt, Lock } from "./icons";

const cards = [
  {
    icon: Chart,
    title: "Perpetual Trading",
    body: "Open long or short positions with leverage directly inside your wallet. Real-time PnL, liquidation alerts, and decentralized execution keep you in control.",
    color: "#0a0a0a",
    visual: "perp",
  },
  {
    icon: Bolt,
    title: "Tokenized Stocks",
    body: "Access global stock markets on-chain. Buy and sell tokenized shares of Apple, Tesla, Amazon — all from your crypto wallet.",
    color: "#d4d4d4",
    visual: "stocks",
  },
  {
    icon: Lock,
    title: "Private Swaps",
    body: "Protect your privacy with one-tap incognito swaps. No sign-ups, no tracking — seamless cross-chain swaps with full anonymity.",
    color: "#ebebeb",
    visual: "private",
  },
] as const;

export default function AdvancedTrading() {
  return (
    <section id="highlights" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-brand blur-3xl opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Advanced Trading"
          title={
            <>
              Features that go <span className="text-gradient">beyond a typical wallet.</span>
            </>
          }
          subtitle="Trade perpetuals, access tokenized stocks, and swap privately across chains."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-card glass p-1 overflow-hidden"
              >
                <div
                  className="relative h-44 rounded-2xl overflow-hidden border border-fg/8"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(247,248,251,1) 100%)",
                  }}
                >
                  <Visual variant={c.visual} color={c.color} />
                </div>
                <div className="p-6">
                  <div className="size-10 rounded-lg grid place-items-center mb-4 bg-fg text-bg">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display text-lg tracking-tight font-bold text-fg">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] text-fg-muted leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Visual({
  variant,
  color,
}: {
  variant: "perp" | "stocks" | "private";
  color: string;
}) {
  if (variant === "perp") return <PerpVisual color={color} />;
  if (variant === "stocks") return <StocksVisual color={color} />;
  return <PrivateVisual color={color} />;
}

/* ---- Animated visuals ---- */

function PerpVisual({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 p-4 flex flex-col">
      <div className="flex items-center justify-between text-[10px] text-fg-dim">
        <span className="font-medium">BTC-PERP · 5×</span>
        <motion.span
          className="font-bold text-positive tabular-nums"
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          + $1,284.20
        </motion.span>
      </div>

      <div className="relative flex-1 mt-2">
        <svg viewBox="0 0 200 80" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="perpGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* grid lines */}
          {[20, 40, 60].map((y) => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(10,10,10,0.05)" strokeWidth="0.5" />
          ))}
          {/* Filled area — fades in after the line draws */}
          <motion.path
            d="M0 60 L20 50 L40 55 L60 35 L80 42 L100 25 L120 30 L140 18 L160 22 L180 12 L200 10 L200 80 L0 80 Z"
            fill="url(#perpGrad)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
          {/* Stroke — draws across in 1.2s */}
          <motion.path
            d="M0 60 L20 50 L40 55 L60 35 L80 42 L100 25 L120 30 L140 18 L160 22 L180 12 L200 10"
            fill="none"
            stroke="#16a34a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          {/* Pulsing dot at the leading edge */}
          <motion.circle
            cx="200"
            cy="10"
            r="3"
            fill="#16a34a"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 1.2 }}
          />
          <motion.circle
            cx="200"
            cy="10"
            r="3"
            fill="#16a34a"
            opacity="0.5"
            animate={{ scale: [1, 3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <motion.div
          className="rounded-md text-[10px] py-1.5 text-center font-bold text-white"
          style={{ background: "#16a34a" }}
          animate={{
            boxShadow: [
              "0 0 0 rgba(22,163,74,0)",
              "0 0 12px rgba(22,163,74,0.55)",
              "0 0 0 rgba(22,163,74,0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↗ Long
        </motion.div>
        <div className="rounded-md bg-fg/5 border border-fg/10 text-fg-muted text-[10px] py-1.5 text-center font-medium">
          ↘ Short
        </div>
      </div>
    </div>
  );
}

function StocksVisual({ color: _color }: { color: string }) {
  const stocks = [
    { ticker: "AAPL", change: "+0.8%", price: "$184.21", up: true },
    { ticker: "TSLA", change: "+2.4%", price: "$211.60", up: true },
    { ticker: "AMZN", change: "-0.3%", price: "$178.04", up: false },
  ];

  return (
    <div className="absolute inset-0 p-4 flex flex-col gap-1.5">
      {stocks.map((s, i) => (
        <motion.div
          key={s.ticker}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.2 + i * 0.12 }}
          className="relative flex items-center justify-between rounded-md px-3 py-1.5 bg-fg/5 border border-fg/8 text-[11px] overflow-hidden"
        >
          {/* Sparkline behind the row */}
          <svg
            viewBox="0 0 100 20"
            className="absolute inset-y-0 right-0 w-1/2 h-full opacity-40 pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.path
              d={
                s.up
                  ? "M0 16 L15 13 L30 14 L45 9 L60 11 L75 6 L90 8 L100 4"
                  : "M0 4 L15 7 L30 6 L45 11 L60 9 L75 13 L90 11 L100 16"
              }
              fill="none"
              stroke={s.up ? "#16a34a" : "#ef4444"}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 + i * 0.12, ease: "easeOut" }}
            />
          </svg>
          <span className="relative z-10 font-bold text-fg">{s.ticker}</span>
          <motion.span
            className="relative z-10 font-semibold tabular-nums"
            style={{ color: s.up ? "#16a34a" : "#ef4444" }}
            animate={{ opacity: [1, 0.55, 1] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          >
            {s.change}
          </motion.span>
          <span className="relative z-10 text-fg-muted tabular-nums font-medium">
            {s.price}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function PrivateVisual({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 p-4 flex items-center justify-center">
      <div className="relative size-32 grid place-items-center">
        {/* Expanding privacy rings */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={`ring-${i}`}
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: color }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 2.4, opacity: [0, 0.45, 0] }}
            transition={{
              duration: 2.6,
              delay: i * 0.85,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Glow halo behind lock */}
        <motion.div
          className="absolute inset-3 rounded-full blur-xl"
          style={{ background: color, opacity: 0.35 }}
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Center lock */}
        <motion.div
          className="relative size-20 rounded-full border-2 grid place-items-center"
          style={{
            borderColor: color,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(4px)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect
              x="4"
              y="11"
              width="16"
              height="10"
              rx="2"
              stroke={color}
              strokeWidth="1.8"
            />
            <path
              d="M8 11V7a4 4 0 1 1 8 0v4"
              stroke={color}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Keyhole */}
            <circle cx="12" cy="15" r="1.2" fill={color} />
            <rect x="11.4" y="15" width="1.2" height="3" fill={color} />
          </svg>
        </motion.div>

        {/* Orbiting "encryption" particles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute top-1/2 left-1/2"
            style={{ width: 0, height: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4,
            }}
          >
            <span
              className="absolute size-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: color,
                top: 0,
                left: 56 + i * 4,
                boxShadow: `0 0 8px ${color}`,
              }}
            />
          </motion.div>
        ))}

        {/* Status label */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute -bottom-1 inline-flex items-center gap-1 rounded-pill bg-fg text-bg px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] font-bold whitespace-nowrap"
        >
          <span className="relative flex size-1">
            <span className="absolute inline-flex size-1 rounded-full bg-positive opacity-70 animate-ping" />
            <span className="relative inline-flex size-1 rounded-full bg-positive" />
          </span>
          Incognito
        </motion.div>
      </div>
    </div>
  );
}
