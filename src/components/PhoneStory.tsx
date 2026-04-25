"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Brain, Bolt, Check, Spark, Arrow } from "./icons";

// Build a strictly-increasing 4-stop offset window centered on a scene's range.
// Returns [enterStart, enterEnd, exitStart, exitEnd] all in [0, 1] and ordered.
function sceneStops(index: number, total: number): [number, number, number, number] {
  const start = index / total;
  const end = (index + 1) / total;
  const eps = 1e-3;
  const a = Math.max(0, start - 0.06);
  const b = Math.min(1, Math.max(a + eps, start + 0.02));
  const c = Math.min(1, Math.max(b + eps, end - 0.02));
  const d = Math.min(1, Math.max(c + eps, end + 0.06));
  return [a, b, c, d];
}

const scenes = [
  {
    eyebrow: "01 · Intent",
    title: "You say what you want.",
    body: "Type or tap. The smart agent reads your goal — swap, stake, snipe, lend — and translates it into the exact onchain steps. No bridges to figure out, no chains to remember.",
    accent: "#07c8d6",
  },
  {
    eyebrow: "02 · Route",
    title: "The agent finds the best path.",
    body: "It scans liquidity across every supported chain in real time, picks the route with the lowest slippage and gas, and surfaces it to you in plain language.",
    accent: "#7a5af8",
  },
  {
    eyebrow: "03 · Execute",
    title: "Unus executes — across chains, in one click.",
    body: "Account abstraction handles signatures. Gas abstraction lets you pay fees in any token. Omnichain messaging carries the action across rollups in seconds.",
    accent: "#fd7f42",
  },
  {
    eyebrow: "04 · Result",
    title: "Your outcome. Instantly.",
    body: "Funds arrive on the destination chain. Position opens. Yield starts compounding. You stay in control the whole way — non-custodial, end to end.",
    accent: "#fed798",
  },
];

export default function PhoneStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Each scene occupies 1/N of the scroll
  const N = scenes.length;

  return (
    <section
      ref={ref}
      id="how"
      className="relative"
      style={{ height: `${N * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background gradient blob that shifts color per scene */}
        <BlobBackdrop progress={scrollYProgress} />

        <div className="mx-auto max-w-7xl px-5 lg:px-8 w-full grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: scene copy */}
          <div className="lg:col-span-7 relative h-[60vh] flex items-center">
            {scenes.map((s, i) => (
              <SceneCopy
                key={s.eyebrow}
                index={i}
                total={N}
                progress={scrollYProgress}
                {...s}
              />
            ))}

            {/* Scene dots */}
            <div className="absolute bottom-0 left-0 flex items-center gap-2">
              {scenes.map((s, i) => (
                <SceneDot
                  key={s.eyebrow}
                  index={i}
                  total={N}
                  progress={scrollYProgress}
                  color={s.accent}
                />
              ))}
              <SceneCounter progress={scrollYProgress} total={N} />
            </div>
          </div>

          {/* Right: pinned phone */}
          <div className="lg:col-span-5 relative">
            <PinnedPhone progress={scrollYProgress} total={N} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SceneCopy({
  index,
  total,
  progress,
  eyebrow,
  title,
  body,
  accent,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
}) {
  const stops = sceneStops(index, total);
  const opacity = useTransform(progress, stops, [0, 1, 1, 0]);
  const y = useTransform(progress, stops, [40, 0, 0, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div
        className="inline-flex items-center gap-2 rounded-pill glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-fg-muted self-start"
      >
        <span className="size-1.5 rounded-full" style={{ background: accent }} />
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] tracking-[-0.02em] font-semibold max-w-2xl">
        {title}
      </h2>
      <p className="mt-5 text-[15.5px] leading-relaxed text-fg-muted max-w-xl">
        {body}
      </p>
    </motion.div>
  );
}

function SceneDot({
  index,
  total,
  progress,
  color,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  color: string;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const eps = 1e-3;
  const s = Math.max(0, start);
  const e = Math.max(s + eps, Math.min(1, end));
  const width = useTransform(progress, [s, e], ["10px", "32px"]);
  const stops = sceneStops(index, total);
  const opacity = useTransform(progress, stops, [0.3, 1, 1, 0.3]);

  return (
    <motion.span
      className="h-[3px] rounded-full"
      style={{ width, opacity, background: color }}
    />
  );
}

function SceneCounter({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const idx = useTransform(progress, (v) =>
    String(Math.min(total, Math.floor(v * total) + 1)).padStart(2, "0")
  );
  return (
    <div className="ml-3 text-[11px] uppercase tracking-[0.25em] text-fg-dim flex items-center gap-1">
      <motion.span>{idx}</motion.span>
      <span>/ {String(total).padStart(2, "0")}</span>
    </div>
  );
}

function BlobBackdrop({ progress }: { progress: MotionValue<number> }) {
  const x1 = useTransform(progress, [0, 1], ["-20%", "30%"]);
  const y1 = useTransform(progress, [0, 1], ["-10%", "20%"]);
  const x2 = useTransform(progress, [0, 1], ["50%", "-10%"]);
  const y2 = useTransform(progress, [0, 1], ["20%", "60%"]);
  const rotate = useTransform(progress, [0, 1], [0, 180]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ x: x1, y: y1, rotate }}
        className="absolute -top-32 -left-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
      >
        <div className="w-full h-full glow-cyan" />
      </motion.div>
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
      >
        <div className="w-full h-full glow-violet" />
      </motion.div>
      <motion.div
        style={{ x: x1, y: y2 }}
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
      >
        <div className="w-full h-full glow-orange" />
      </motion.div>
      <div className="absolute inset-0 bg-grid opacity-50" />
    </div>
  );
}

/* ---------- Pinned phone with morphing screens ---------- */

function PinnedPhone({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const tilt = useTransform(progress, [0, 1], [-2, 2]);
  const yFloat = useTransform(progress, [0, 1], [-10, 10]);
  const ringRotate = useTransform(progress, [0, 1], [0, 360]);
  const glowOpacity = useTransform(progress, [0, 0.5, 1], [0.5, 0.9, 0.5]);

  return (
    <motion.div
      style={{ rotate: tilt, y: yFloat }}
      className="relative mx-auto w-[300px] sm:w-[340px] aspect-[9/19]"
    >
      {/* Glow layers */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute -inset-12 glow-cyan blur-3xl"
      />
      <motion.div
        style={{ opacity: glowOpacity, rotate: ringRotate }}
        className="absolute -inset-2 rounded-[3rem] blur-2xl"
      >
        <div
          className="w-full h-full rounded-[3rem]"
          style={{
            background:
              "conic-gradient(from 0deg, #07eeff, #fd7f42, #7a5af8, #fed798, #07eeff)",
          }}
        />
      </motion.div>

      {/* Bezel */}
      <div className="relative h-full rounded-[2.4rem] bg-gradient-to-b from-[#1a1a22] to-[#0a0a0e] p-1.5 shadow-[0_30px_80px_-20px_rgba(7,200,214,0.5)] border border-fg/10">
        <div className="relative h-full rounded-[2rem] overflow-hidden bg-[#0a0a0e] border border-white/5">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-10" />

          {/* Cycling screen content */}
          <div className="relative h-full flex flex-col px-4 pt-12 pb-4 text-white">
            <div className="flex items-center justify-between text-[10px] text-white/60">
              <span>9:41</span>
              <span>● ● ●</span>
            </div>

            <div className="relative flex-1 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <Screen
                  key={i}
                  index={i}
                  total={total}
                  progress={progress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Screen({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const stops = sceneStops(index, total);
  const opacity = useTransform(progress, stops, [0, 1, 1, 0]);
  const y = useTransform(progress, stops, [20, 0, 0, -20]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col"
    >
      {index === 0 && <ScreenIntent />}
      {index === 1 && <ScreenRoute />}
      {index === 2 && <ScreenExecute />}
      {index === 3 && <ScreenResult />}
    </motion.div>
  );
}

function ScreenIntent() {
  return (
    <div className="flex-1 flex flex-col justify-end gap-2">
      <Bubble side="left">Hey Unus — what can I do?</Bubble>
      <Bubble side="left">
        Swap 250 USDC on Base to ETH on Arbitrum, fastest route.
      </Bubble>
      <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60">
        <span className="size-1.5 rounded-full bg-cyan animate-pulse" />
        Agent is thinking…
      </div>
    </div>
  );
}

function ScreenRoute() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[10px] uppercase tracking-wider text-white/50">
        Best route
      </div>
      <div className="rounded-xl p-3 bg-white/5 border border-white/10">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white">USDC · Base</span>
          <Arrow className="size-3 text-cyan" />
          <span className="text-white">ETH · Arbitrum</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-white/60">
          <span>via Stargate</span>
          <span className="text-cyan">~12s</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-1">
        <Stat label="Slippage" value="0.04%" />
        <Stat label="Gas" value="$0.00" tint />
        <Stat label="Saved" value="$1.42" tint />
      </div>
      <div className="mt-3 rounded-pill bg-cyan/20 border border-cyan/40 text-cyan text-[11px] py-2 text-center">
        Confirm route
      </div>
    </div>
  );
}

function ScreenExecute() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3">
      <div className="relative size-24 rounded-full">
        <div className="absolute inset-0 rounded-full border-2 border-cyan/30" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan animate-spin" />
        <div className="absolute inset-3 rounded-full bg-cyan/10 grid place-items-center">
          <Spark className="size-6 text-cyan" />
        </div>
      </div>
      <div className="text-[12px] text-white/80">Executing across chains…</div>
      <div className="grid grid-cols-3 gap-1 w-full mt-2">
        <Pill label="Sign" done />
        <Pill label="Bridge" active />
        <Pill label="Swap" />
      </div>
    </div>
  );
}

function ScreenResult() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 rounded-full glow-cyan blur-xl" />
        <div className="relative size-20 rounded-full bg-cyan/15 border-2 border-cyan grid place-items-center">
          <Check className="size-10 text-cyan" />
        </div>
      </div>
      <div className="font-display text-base text-white">+ 0.0742 ETH</div>
      <div className="text-[11px] text-white/60">Settled on Arbitrum</div>
      <div className="mt-2 w-full rounded-xl p-3 bg-white/5 border border-white/10 flex items-center gap-2 text-[10px]">
        <Brain className="size-3.5 text-cyan" />
        <span className="text-white/70">
          Agent saved $1.42 vs market average
        </span>
      </div>
      <div className="mt-1 rounded-pill bg-white/5 border border-white/10 text-white/80 text-[11px] py-2 px-4 flex items-center gap-1.5">
        Stake earned ETH <Bolt className="size-3 text-cyan" />
      </div>
    </div>
  );
}

function Bubble({
  children,
  side,
}: {
  children: React.ReactNode;
  side: "left" | "right";
}) {
  return (
    <div className={side === "right" ? "flex justify-end" : "flex justify-start"}>
      <div
        className={`max-w-[88%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${
          side === "right"
            ? "bg-cyan/15 text-cyan border border-cyan/30"
            : "bg-white/8 text-white border border-white/10"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tint,
}: {
  label: string;
  value: string;
  tint?: boolean;
}) {
  return (
    <div className="rounded-md bg-white/5 border border-white/10 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-wider text-white/50">
        {label}
      </div>
      <div className={`text-[11px] mt-0.5 ${tint ? "text-cyan" : "text-white"}`}>
        {value}
      </div>
    </div>
  );
}

function Pill({
  label,
  active,
  done,
}: {
  label: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <div
      className={`text-[9px] py-1 text-center rounded-full border ${
        done
          ? "bg-cyan/20 text-cyan border-cyan/40"
          : active
            ? "bg-white/10 text-white border-white/20"
            : "bg-white/5 text-white/40 border-white/10"
      }`}
    >
      {label}
    </div>
  );
}
