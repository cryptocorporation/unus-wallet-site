"use client";

import { motion } from "framer-motion";

const chains = [
  { name: "XRP", color: "#23292f" },
  { name: "BTC", color: "#f7931a" },
  { name: "AVAX", color: "#e84142" },
  { name: "BNB", color: "#f3ba2f" },
  { name: "XLM", color: "#000000" },
  { name: "SOL", color: "#9945ff" },
  { name: "ETH", color: "#627eea" },
  { name: "BASE", color: "#0052ff" },
];

export default function WalletShowcase() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] glow-mist blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-pill glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-fg-muted"
        >
          <span className="size-1.5 rounded-full bg-brand" />
          Self-custody · Multi-chain
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] font-extrabold text-deep"
        >
          One Wallet. <span className="text-gradient">Every Chain.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-5 max-w-2xl mx-auto text-[16px] text-fg-muted leading-relaxed"
        >
          See every token and NFT in one place. Self-custody. Multi-chain. No
          compromises.
        </motion.p>

        {/* Wallet card with chain icons orbiting */}
        <div className="mt-16 relative h-[460px] flex items-center justify-center">
          {/* Center wallet card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <WalletCard />
          </motion.div>

          {/* Orbiting chain badges */}
          {chains.map((c, i) => (
            <ChainOrb key={c.name} chain={c} index={i} total={chains.length} />
          ))}

          {/* Decorative ring */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="size-[460px] rounded-full border border-deep/8" />
            <div className="absolute size-[340px] rounded-full border border-deep/10 border-dashed animate-spin-slow" />
          </div>
        </div>

        <div className="mt-2 text-[12px] uppercase tracking-[0.25em] text-fg-dim">
          Live · 8 chains supported
        </div>
      </div>
    </section>
  );
}

function WalletCard() {
  return (
    <div
      className="relative w-[300px] sm:w-[340px] aspect-[16/10] rounded-2xl overflow-hidden p-5 text-white"
      style={{
        background:
          "linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 60%, #000000 100%)",
        boxShadow:
          "0 30px 70px -20px rgba(10, 10, 10, 0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Subtle holographic stripe */}
      <div
        className="absolute inset-x-0 top-1/3 h-12 holo-stripe opacity-15"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 20%, black 80%, transparent)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">
            Total Balance
          </div>
          <div className="font-display text-2xl font-extrabold mt-1 tracking-tight">
            $25,456.00
          </div>
          <div className="text-[10px] mt-1 font-semibold" style={{ color: "#22c55e" }}>
            +$936.21 (+27.74%) ↗
          </div>
        </div>
        <div className="size-9 rounded-lg bg-white/10 grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-4" fill="none">
            <rect x="3" y="6" width="18" height="13" rx="2" stroke="white" strokeWidth="1.6" />
            <path d="M16 13h2M3 9h13a3 3 0 0 1 3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {["#627eea", "#f7931a", "#9945ff", "#ff007a"].map((c, i) => (
            <div
              key={i}
              className="size-5 rounded-full border-2 border-black/40"
              style={{ background: c, marginLeft: i === 0 ? 0 : -8 }}
            />
          ))}
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] opacity-60 font-semibold">
          unus
        </div>
      </div>
    </div>
  );
}

function ChainOrb({
  chain,
  index,
  total,
}: {
  chain: { name: string; color: string };
  index: number;
  total: number;
}) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const radius = 200;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const delay = index * 0.06;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ x, y }}
      className="absolute"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3 + (index % 3),
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-40"
          style={{ background: chain.color }}
        />
        <div
          className="relative size-16 rounded-full flex items-center justify-center font-display text-[11px] font-bold text-white"
          style={{
            background: `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.5) 0%, ${chain.color} 60%, ${chain.color}cc 100%)`,
            boxShadow: `0 12px 30px ${chain.color}55, inset 0 0 14px rgba(255,255,255,0.3)`,
            border: `1px solid ${chain.color}aa`,
          }}
        >
          {chain.name}
        </div>
      </motion.div>
    </motion.div>
  );
}
