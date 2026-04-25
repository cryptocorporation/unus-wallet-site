"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";

const live = [
  { name: "Ethereum", color: "#627eea" },
  { name: "Arbitrum", color: "#28a0f0" },
  { name: "Optimism", color: "#ff0420" },
  { name: "Base", color: "#0052ff" },
  { name: "BNB Chain", color: "#f3ba2f" },
  { name: "Polygon", color: "#8247e5" },
  { name: "Avalanche", color: "#e84142" },
];

const soon = ["Solana", "Cosmos", "zkSync Era", "Additional L2s"];

export default function Chains() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.95]);
  const rowAX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const rowBX = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  const loop = [...live, ...live];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Supported chains"
          title={
            <>
              Trade across{" "}
              <span className="text-gradient">the entire ecosystem.</span>
            </>
          }
          subtitle="Supported today, expanding continuously."
        />

        <motion.div
          style={{ scale }}
          className="mt-14 space-y-4 relative"
          aria-hidden
        >
          <div
            className="relative"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <motion.div
              style={{ x: rowAX }}
              className="flex gap-4 animate-marquee w-max"
            >
              {loop.map((c, i) => (
                <ChainPill key={`a-${c.name}-${i}`} chain={c} />
              ))}
            </motion.div>
          </div>

          <div
            className="relative"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <motion.div
              style={{ x: rowBX }}
              className="flex gap-4 animate-marquee w-max"
            >
              {[...loop].reverse().map((c, i) => (
                <ChainPill key={`b-${c.name}-${i}`} chain={c} small />
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-2 justify-center items-center"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-fg-dim mr-2">
            Coming soon
          </span>
          {soon.map((s) => (
            <span
              key={s}
              className="rounded-pill px-3 py-1 text-[12.5px] text-fg-muted border border-dashed border-fg/15"
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ChainPill({
  chain,
  small,
}: {
  chain: { name: string; color: string };
  small?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-pill glass border border-fg/5 ${
        small ? "px-4 py-2.5" : "px-5 py-3"
      }`}
    >
      <span
        className={small ? "size-5 rounded-full border" : "size-7 rounded-full border"}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${chain.color}, ${chain.color}66 70%, transparent)`,
          borderColor: `${chain.color}55`,
          boxShadow: `0 0 16px ${chain.color}40`,
        }}
      />
      <span className={`${small ? "text-[12.5px]" : "text-[14px]"} text-fg whitespace-nowrap`}>
        {chain.name}
      </span>
    </div>
  );
}
