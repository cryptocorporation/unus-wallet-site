"use client";

import { motion } from "framer-motion";

const tokens = [
  { symbol: "BTC", name: "Bitcoin", price: "$95,509.75", change: "+9.77%", up: true, color: "#f7931a", letter: "₿" },
  { symbol: "ETH", name: "Ethereum", price: "$2,509.75", change: "-21.00%", up: false, color: "#627eea", letter: "Ξ" },
  { symbol: "SOL", name: "Solana", price: "$282.09", change: "+59.34%", up: true, color: "#9945ff", letter: "S" },
  { symbol: "BAND", name: "Band Protocol", price: "$553.06", change: "-22.97%", up: false, color: "#1a1a1a", letter: "B" },
  { symbol: "ADA", name: "Cardano", price: "$105.06", change: "+16.31%", up: true, color: "#3cc8c8", letter: "A" },
  { symbol: "TRX", name: "TRON", price: "$5.29", change: "-16.58%", up: false, color: "#ef4444", letter: "T" },
  { symbol: "USDT", name: "Tether", price: "$73.00", change: "+0.07%", up: true, color: "#26a17b", letter: "₮" },
  { symbol: "DOGE", name: "Dogecoin", price: "$23.39", change: "+21.00%", up: true, color: "#c2a633", letter: "Ð" },
  { symbol: "BNB", name: "BNB", price: "$682.41", change: "+2.34%", up: true, color: "#f3ba2f", letter: "B" },
  { symbol: "AVAX", name: "Avalanche", price: "$48.21", change: "-3.12%", up: false, color: "#e84142", letter: "A" },
];

export default function PriceTicker() {
  const loop = [...tokens, ...tokens];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Header rail — like the Crypto Market title in the dashboard */}
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex items-center justify-between text-[11px] text-fg-muted">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-positive animate-pulse" />
            <span className="font-semibold text-fg">Crypto Market</span>
            <span className="text-negative font-semibold">−11.17%</span>
            <span className="text-fg-dim">·  past 24h</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-fg-dim">
            <span>Live</span>
            <span>·</span>
            <span>USD</span>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="mt-3 relative"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex gap-2.5 animate-marquee w-max">
          {loop.map((t, i) => (
            <div
              key={`${t.symbol}-${i}`}
              className="flex items-center gap-2.5 rounded-full border border-fg/10 bg-bg/80 backdrop-blur-md pl-1 pr-3.5 py-1"
            >
              <div
                className="size-6 rounded-full grid place-items-center text-[11px] font-bold text-white shrink-0"
                style={{ background: t.color }}
              >
                {t.letter}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[12px] font-semibold text-fg">
                  {t.symbol}
                </span>
                <span className="text-[12px] font-medium text-fg">
                  {t.price}
                </span>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: t.up ? "#16a34a" : "#ef4444" }}
                >
                  {t.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
