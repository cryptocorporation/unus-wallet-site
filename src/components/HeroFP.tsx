"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Arrow } from "./icons";
import {
  PhoneFrame,
  DashboardScreen,
  TransactionsScreenDark,
  TradeScreenDark,
} from "./AppMocks";
import PriceTicker from "./PriceTicker";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroFP() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);
  const phoneTrayY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden min-h-svh pt-28 pb-4"
      style={{
        // Solid gray gradient — never white. CSS-only, can't fail.
        background:
          "linear-gradient(180deg, #ececec 0%, #e6e6e6 50%, #efefef 100%)",
      }}
    >
      {/* Hero video backdrop — branded animation looped silently */}
      <motion.div
        style={{ y: canvasY, scale: canvasScale }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <video
          src="/assets/Hero-Section.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
        {/* Soft wash so foreground text stays readable on top of the video */}
        <div className="absolute inset-0 bg-bg-2/30 mix-blend-luminosity" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-grid opacity-25" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 rounded-pill border border-fg/10 bg-bg-2 px-3.5 py-1.5 text-[12.5px] text-fg-muted"
        >
          <span className="size-1.5 rounded-full bg-positive animate-pulse" />
          Self-custody · multi-chain · live
        </motion.div>

        <motion.h1
          style={{ y: copyY, opacity: copyOpacity }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.05 }}
          className="mt-7 font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.96] tracking-[-0.045em] font-extrabold text-fg"
        >
          One wallet.
          <br />
          <span className="text-gradient">Infinite possibilities.</span>
        </motion.h1>

        <motion.p
          style={{ opacity: copyOpacity }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.15 }}
          className="mt-6 max-w-2xl mx-auto text-[16px] leading-relaxed text-fg-muted"
        >
          Hold, swap, trade and explore — across every chain — from a single
          self-custody wallet. Built for clarity. Designed for speed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-pill btn-brand px-7 py-3.5 text-[14px] font-semibold"
          >
            Get the app <Arrow className="size-4" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-pill border border-fg/12 bg-bg px-7 py-3.5 text-[14px] text-fg hover:bg-bg-2 transition-colors"
          >
            See how it works
          </a>
        </motion.div>
      </div>

      <div className="mt-10 lg:mt-12">
        <PriceTicker />
      </div>

      <motion.div style={{ y: phoneTrayY }} className="mt-6 lg:mt-8 relative">
        <PhoneArc parallax={scrollYProgress} />
      </motion.div>

      <div className="mt-6 flex flex-col items-center gap-2 text-[11px] text-fg-dim uppercase tracking-[0.3em]">
        <span>scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-fg-dim to-transparent" />
      </div>
    </section>
  );
}

function PhoneArc({ parallax }: { parallax: MotionValue<number> }) {
  const cTL = useTransform(parallax, [0, 1], [0, -160]);
  const cTLY = useTransform(parallax, [0, 1], [0, -80]);
  const cTR = useTransform(parallax, [0, 1], [0, 160]);
  const cTRY = useTransform(parallax, [0, 1], [0, -40]);
  const cBL = useTransform(parallax, [0, 1], [0, -120]);
  const cBLY = useTransform(parallax, [0, 1], [0, 80]);
  const cBR = useTransform(parallax, [0, 1], [0, 200]);
  const cBRY = useTransform(parallax, [0, 1], [0, 60]);

  return (
    <div className="relative mx-auto max-w-7xl h-[500px] sm:h-[540px] flex items-end justify-center">
      <div className="absolute inset-x-0 bottom-[-15%] h-[80%] glow-brand blur-3xl" />

      {/* Silver coins */}
      <motion.div
        style={{ x: cTL, y: cTLY }}
        className="absolute left-[8%] top-[8%] hidden sm:block"
      >
        <SilverCoin size={84} />
      </motion.div>
      <motion.div
        style={{ x: cTR, y: cTRY }}
        className="absolute right-[6%] top-[14%] hidden sm:block"
      >
        <SilverCoin size={64} delay={0.6} />
      </motion.div>
      <motion.div
        style={{ x: cBL, y: cBLY }}
        className="absolute left-[12%] bottom-[8%] hidden md:block"
      >
        <SilverCoin size={56} delay={1.2} dark />
      </motion.div>
      <motion.div
        style={{ x: cBR, y: cBRY }}
        className="absolute right-[10%] bottom-[12%] hidden md:block"
      >
        <SilverCoin size={92} delay={1.8} />
      </motion.div>

      {/* Back-left phone — Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: -10, x: -30 }}
        animate={{ opacity: 1, y: 0, rotate: -8, x: 0 }}
        transition={{ duration: 1, delay: 0.35, ease }}
        className="absolute left-1/2 -translate-x-[80%] bottom-0 z-10 origin-bottom-right"
      >
        <PhoneFrame width={200} dark>
          <TransactionsScreenDark />
        </PhoneFrame>
      </motion.div>

      {/* Back-right phone — Trade */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: 10, x: 30 }}
        animate={{ opacity: 1, y: 0, rotate: 8, x: 0 }}
        transition={{ duration: 1, delay: 0.45, ease }}
        className="absolute left-1/2 translate-x-[-20%] bottom-0 z-10 origin-bottom-left"
      >
        <PhoneFrame width={200} dark>
          <TradeScreenDark />
        </PhoneFrame>
      </motion.div>

      {/* Center phone — Dashboard, elevated */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease }}
        className="relative z-20 -translate-y-2"
      >
        <PhoneFrame width={234} elevated>
          <DashboardScreen />
        </PhoneFrame>
      </motion.div>
    </div>
  );
}

function SilverCoin({
  size = 64,
  delay = 0,
  dark,
}: {
  size?: number;
  delay?: number;
  dark?: boolean;
}) {
  return (
    <motion.div
      animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 rounded-full blur-2xl opacity-40 bg-fg/30" />
      <div
        className="relative size-full rounded-full"
        style={{
          background: dark
            ? "linear-gradient(135deg, #4a4a4a 0%, #0a0a0a 60%, #1a1a1a 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #d4d4d4 50%, #a3a3a3 100%)",
          boxShadow: `0 14px 36px rgba(10, 10, 10, 0.25), inset 0 0 22px rgba(255,255,255,${dark ? 0.15 : 0.6})`,
          border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(10,10,10,0.18)"}`,
        }}
      >
        <div
          className="absolute inset-[18%] rounded-full"
          style={{
            border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(10,10,10,0.2)"}`,
            background: dark
              ? "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), transparent 60%)"
              : "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.7), transparent 60%)",
          }}
        />
        <div
          className="absolute left-[30%] right-[30%] top-[42%] h-px rounded"
          style={{
            background: dark
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}
