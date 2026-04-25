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

        <div className="mt-16 grid lg:grid-cols-3 gap-5">
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
  if (variant === "perp") {
    return (
      <div className="absolute inset-0 p-4 flex flex-col">
        <div className="flex items-center justify-between text-[10px] text-fg-dim">
          <span>BTC-PERP · 5x</span>
          <span className="text-fg">+ $1,284.20</span>
        </div>
        <svg viewBox="0 0 200 80" className="w-full mt-2 flex-1">
          <defs>
            <linearGradient id="perpGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 L20 50 L40 55 L60 35 L80 42 L100 25 L120 30 L140 18 L160 22 L180 12 L200 10 L200 80 L0 80 Z"
            fill="url(#perpGrad)"
          />
          <path
            d="M0 60 L20 50 L40 55 L60 35 L80 42 L100 25 L120 30 L140 18 L160 22 L180 12 L200 10"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="rounded-md bg-fg/10 border border-fg/30 text-fg text-[10px] py-1 text-center">
            Long
          </div>
          <div className="rounded-md bg-fg/5 border border-fg/10 text-fg-muted text-[10px] py-1 text-center">
            Short
          </div>
        </div>
      </div>
    );
  }
  if (variant === "stocks") {
    return (
      <div className="absolute inset-0 p-4 flex flex-col gap-2">
        {[
          ["AAPL", "+0.8%", "$184.21"],
          ["TSLA", "+2.4%", "$211.60"],
          ["AMZN", "-0.3%", "$178.04"],
        ].map(([t, d, p]) => (
          <div
            key={t}
            className="flex items-center justify-between rounded-md px-3 py-2 bg-fg/5 border border-fg/5 text-[11px]"
          >
            <span className="font-medium">{t}</span>
            <span
              className={d.startsWith("+") ? "text-fg" : "text-fg-400"}
              style={{ color: d.startsWith("+") ? color : "#0a0a0a" }}
            >
              {d}
            </span>
            <span className="text-fg-muted">{p}</span>
          </div>
        ))}
      </div>
    );
  }
  // private
  return (
    <div className="absolute inset-0 p-4 flex items-center justify-center">
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ background: color, opacity: 0.4 }}
        />
        <div
          className="relative size-24 rounded-full border-2 grid place-items-center"
          style={{ borderColor: `${color}66`, background: `${color}10` }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect
              x="4"
              y="11"
              width="16"
              height="10"
              rx="2"
              stroke={color}
              strokeWidth="1.6"
            />
            <path
              d="M8 11V7a4 4 0 1 1 8 0v4"
              stroke={color}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="mt-3 text-center text-[11px] text-fg-muted">
          Incognito enabled
        </div>
      </div>
    </div>
  );
}
