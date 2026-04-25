"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Arrow, Bolt, Chat, Spark } from "./icons";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const phoneScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden min-h-[100svh] flex items-center pt-24 pb-20"
    >
      {/* WebGL backdrop with parallax */}
      <motion.div
        style={{ y: canvasY, scale: canvasScale }}
        className="absolute inset-0 -z-10"
      >
        <HeroCanvas />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 pointer-events-none bg-bg"
      />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-bg/30 via-transparent to-bg" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8 w-full grid lg:grid-cols-12 gap-14 items-center">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 glass rounded-pill px-3.5 py-1.5 text-[12.5px] text-fg-muted mb-7"
          >
            <span className="relative grid place-items-center size-1.5">
              <span className="absolute inset-0 rounded-full bg-cyan" />
              <span className="absolute inset-0 rounded-full bg-cyan animate-ping" />
            </span>
            MVP live · Q2 2026
            <span className="text-fg-dim">·</span>
            <span className="text-cyan">Sniper bot Q1 2027</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.05 }}
            className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-[-0.03em] font-semibold"
          >
            One Wallet,
            <br />
            <span className="text-gradient">Infinite Possibilities.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.15 }}
            className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-fg-muted"
          >
            Fast, secure, omnichain messaging that lets you swap, stake, lend
            and borrow across every chain — without juggling bridges, gas
            tokens or wallets. Just say what you want; the smart agent does
            the rest.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="https://app.unuswallet.com"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-pill bg-cyan text-fg px-6 py-3.5 font-medium text-sm hover:scale-[1.02] transition-transform"
            >
              <span className="absolute inset-0 rounded-pill bg-cyan blur-xl opacity-50 group-hover:opacity-80 transition-opacity -z-10" />
              Launch App <Arrow className="size-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-pill glass px-6 py-3.5 text-sm text-fg hover:bg-fg/8 transition-colors"
            >
              Explore Features
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              ["7+", "Chains live"],
              ["0", "Bridge clicks"],
              ["100%", "Non-custodial"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl tracking-tight">{n}</div>
                <div className="text-xs text-fg-dim mt-1 uppercase tracking-wider">
                  {l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: phoneY, scale: phoneScale }}
          className="lg:col-span-5 relative"
        >
          <PhoneMockup parallax={scrollYProgress} />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-fg-dim uppercase tracking-[0.3em] flex flex-col items-center gap-2">
        <span>scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-fg-dim to-transparent" />
      </div>
    </section>
  );
}

function PhoneMockup({ parallax }: { parallax: MotionValue<number> }) {
  // coins drift outward as user scrolls
  const cTL = useTransform(parallax, [0, 1], [0, -120]);
  const cTLY = useTransform(parallax, [0, 1], [0, -60]);
  const cTR = useTransform(parallax, [0, 1], [0, 120]);
  const cTRY = useTransform(parallax, [0, 1], [0, -40]);
  const cBL = useTransform(parallax, [0, 1], [0, -100]);
  const cBLY = useTransform(parallax, [0, 1], [0, 80]);
  const cBR = useTransform(parallax, [0, 1], [0, 140]);
  const cBRY = useTransform(parallax, [0, 1], [0, 50]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, ease, delay: 0.35 }}
      className="relative mx-auto w-[300px] sm:w-[340px] aspect-[9/19]"
    >
      {/* Glow */}
      <div className="absolute -inset-10 glow-cyan blur-3xl opacity-60" />
      <div className="absolute -inset-10 glow-orange blur-3xl opacity-40" />

      {/* Floating coins with scroll parallax */}
      <motion.div style={{ x: cTL, y: cTLY }}>
        <FloatingCoin className="-left-14 top-10" color="#fed798" delay={0} />
      </motion.div>
      <motion.div style={{ x: cTR, y: cTRY }}>
        <FloatingCoin
          className="-right-12 top-32"
          color="#07eeff"
          delay={0.6}
          size={56}
        />
      </motion.div>
      <motion.div style={{ x: cBL, y: cBLY }}>
        <FloatingCoin
          className="-left-8 bottom-16"
          color="#7a5af8"
          delay={1.2}
          size={48}
        />
      </motion.div>
      <motion.div style={{ x: cBR, y: cBRY }}>
        <FloatingCoin
          className="-right-16 bottom-6"
          color="#fd7f42"
          delay={1.8}
          size={64}
        />
      </motion.div>

      {/* Conic glow ring */}
      <div
        className="absolute -inset-2 rounded-[3rem] opacity-60 blur-2xl"
        style={{
          background:
            "conic-gradient(from 0deg, #07eeff, #fd7f42, #e8e1ff, #07eeff)",
        }}
      />

      {/* Phone bezel */}
      <div className="relative h-full rounded-[2.4rem] bg-gradient-to-b from-[#1a1a22] to-[#0a0a0e] p-1.5 shadow-[0_30px_80px_-20px_rgba(7,238,255,0.4)] border border-fg/10">
        <div className="relative h-full rounded-[2rem] overflow-hidden bg-[#0a0a0e] border border-fg/5">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-10" />

          {/* Screen content */}
          <div className="relative h-full flex flex-col px-4 pt-12 pb-4">
            <div className="flex items-center justify-between text-[10px] text-fg-muted">
              <span>9:41</span>
              <span>● ● ●</span>
            </div>

            <div className="mt-5">
              <div className="text-[11px] text-fg-dim uppercase tracking-wider">
                Total balance
              </div>
              <div className="font-display text-2xl mt-1">$ 24,810.42</div>
              <div className="text-[11px] text-cyan mt-1">
                ↑ 3.21% today
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-5 grid grid-cols-4 gap-2">
              {[
                ["Swap", Spark],
                ["Stake", Bolt],
                ["Lend", Chat],
                ["More", Arrow],
              ].map(([label, Icon]) => {
                const I = Icon as typeof Spark;
                return (
                  <div
                    key={label as string}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-fg/5 border border-fg/5"
                  >
                    <I className="size-4 text-cyan" />
                    <span className="text-[10px] text-fg-muted">
                      {label as string}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chat preview */}
            <div className="mt-5 rounded-2xl bg-fg/[0.03] border border-fg/5 p-3 flex-1 flex flex-col justify-end gap-2">
              <ChatBubble side="left">
                Swap 250 USDC on Base to ETH on Arbitrum
              </ChatBubble>
              <ChatBubble side="right" tint>
                Best route via Stargate · 0 gas · ~12s
              </ChatBubble>
              <ChatBubble side="right" tint>
                Confirm to proceed →
              </ChatBubble>
              <div className="mt-2 rounded-pill bg-cyan/15 border border-cyan/40 text-cyan text-[11px] py-2 text-center">
                Confirm Swap
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ChatBubble({
  children,
  side,
  tint,
}: {
  children: React.ReactNode;
  side: "left" | "right";
  tint?: boolean;
}) {
  return (
    <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${
          tint
            ? "bg-cyan/10 text-cyan border border-cyan/20"
            : "bg-fg/8 text-fg border border-fg/5"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function FloatingCoin({
  className = "",
  color,
  delay = 0,
  size = 60,
}: {
  className?: string;
  color: string;
  delay?: number;
  size?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 + delay, ease }}
      className={`absolute ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{
          duration: 5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="relative w-full h-full"
      >
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-60"
          style={{ background: color }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}, ${color}55 60%, ${color}11 100%)`,
            border: `1px solid ${color}66`,
            boxShadow: `0 8px 32px ${color}55, inset 0 0 16px ${color}33`,
          }}
        />
        <div
          className="absolute inset-[22%] rounded-full border"
          style={{ borderColor: `${color}99` }}
        />
      </motion.div>
    </motion.div>
  );
}
