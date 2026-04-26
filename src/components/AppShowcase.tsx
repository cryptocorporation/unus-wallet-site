"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  cubicBezier,
  MotionValue,
} from "framer-motion";

type Scene = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  stat?: { value: string; label: string };
  image: string;
};

const scenes: Scene[] = [
  {
    eyebrow: "Welcome",
    title: "Meet your new wallet.",
    body: "One self-custody wallet for every chain you use. Hold, swap, trade and track your portfolio without juggling bridges, gas tokens or accounts.",
    bullets: [
      "Self-custody by default — keys live on your device",
      "Built around a single, calm dashboard",
      "Designed for clarity, built for speed",
    ],
    image: "/assets/trans/welcome.png",
  },
  {
    eyebrow: "01 · Multi-chain dashboard",
    title: "All your assets. One clean view.",
    body: "ETH on Mainnet, BONK on Solana, FRAX on Arbitrum — every token and NFT, balanced and tracked side by side. Receive, send, swap or trade in a tap.",
    bullets: [
      "Native + ERC-20 tokens unified into one balance",
      "Real-time prices and 24h PnL per asset",
      "NFTs in the same place, no second app",
    ],
    stat: { value: "7+", label: "chains live, more in flight" },
    image: "/assets/trans/1.png",
  },
  {
    eyebrow: "02 · Cross-chain swaps",
    title: "Swap and bridge in one tap.",
    body: "Move value across chains without juggling bridges. The router picks the best route — slippage, gas and ETA are shown up front.",
    bullets: [
      "Optimal route auto-selected per swap",
      "Slippage, gas estimate and ETA before you sign",
      "Gas paid in any token via account abstraction",
    ],
    image: "/assets/trans/2.png",
  },
  {
    eyebrow: "03 · Onchain trading",
    title: "Spot prices, candles, leverage.",
    body: "Open longs and shorts on the assets you already hold. Real-time PnL, decentralized execution, no order-book intermediaries.",
    bullets: [
      "Real candle charts · 1H / 1D / 1W / 1M / YTD",
      "Long and short the same asset from one screen",
      "Self-custody throughout — no exchange deposit",
    ],
    stat: { value: "Long & short", label: "self-custody throughout" },
    image: "/assets/trans/3.png",
  },
];

// 4-stop offset window for scene i of n scenes.
// `entry`/`exit` widen the fade band; smaller numbers = punchier swap with
// more hold time per scene. With 7 scenes at entry/exit = 0.018, each scene
// holds at full opacity for ~10% of total scroll (~35vh of 50vh budget).
function stops(i: number, n: number): [number, number, number, number] {
  const start = i / n;
  const end = (i + 1) / n;
  const eps = 1e-3;
  const entry = 0.018;
  const exit = 0.018;
  const a = Math.max(0, start - entry);
  const b = Math.min(1, Math.max(a + eps, start + entry));
  const c = Math.min(1, Math.max(b + eps, end - exit));
  const d = Math.min(1, Math.max(c + eps, end + exit));
  return [a, b, c, d];
}

// useTransform's `ease` option requires a function, not a bezier tuple.
const screenEase = cubicBezier(0.22, 1, 0.36, 1);

export default function AppShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const N = scenes.length;

  return (
    <section
      ref={ref}
      className="relative"
      // 60vh per scene — with 4 scenes the showcase is ~240vh total, snappy
      // (one wheel-notch advances visibly) while leaving each scene a long
      // hold window after the tightened fade band.
      style={{ height: `${N * 60}vh` }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center"
        style={{ contain: "layout paint" }}
      >
        <Backdrop progress={scrollYProgress} />

        <div className="mx-auto max-w-7xl px-5 lg:px-8 w-full grid lg:grid-cols-12 gap-10 items-center">
          {/* Left — scrolling copy */}
          <div className="lg:col-span-7 relative h-[68vh] sm:h-[72vh] flex items-center order-2 lg:order-1">
            {scenes.map((s, i) => (
              <SceneCopy key={s.eyebrow} index={i} total={N} progress={scrollYProgress} {...s} />
            ))}
            <SceneIndicator
              progress={scrollYProgress}
              total={N}
              scenes={scenes}
            />
          </div>

          {/* Right — pinned phone with morphing screens */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 grid place-items-center">
            <PinnedPhone progress={scrollYProgress} total={N} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Backdrop({ progress }: { progress: MotionValue<number> }) {
  const x1 = useTransform(progress, [0, 1], ["-10%", "20%"]);
  const y1 = useTransform(progress, [0, 1], ["-5%", "15%"]);
  const x2 = useTransform(progress, [0, 1], ["20%", "-10%"]);
  const y2 = useTransform(progress, [0, 1], ["10%", "30%"]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-32 -left-32 size-[600px] rounded-full glow-mist blur-3xl opacity-60"
      />
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute top-1/3 -right-40 size-[500px] rounded-full glow-brand blur-3xl opacity-50"
      />
      <div className="absolute inset-0 bg-grid opacity-40" />
    </div>
  );
}

function SceneCopy({
  index,
  total,
  progress,
  eyebrow,
  title,
  body,
  bullets,
  stat,
}: Scene & {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const s = stops(index, total);
  const opacity = useTransform(progress, s, [0, 1, 1, 0], { ease: screenEase });
  const y = useTransform(progress, s, [50, 0, 0, -50], { ease: screenEase });
  const zIndex = useTransform(progress, s, [0, 2, 2, 1]);

  return (
    <motion.div
      style={{ opacity, y, zIndex, willChange: "transform, opacity" }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="inline-flex items-center gap-2 rounded-pill border border-fg/10 bg-bg-2 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-fg-muted self-start font-semibold">
        <span className="size-1.5 rounded-full bg-fg" />
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] tracking-[-0.035em] font-extrabold text-fg max-w-2xl">
        {title}
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-fg-muted max-w-xl">
        {body}
      </p>

      {/* Supporting bullets */}
      <ul className="mt-5 space-y-2 max-w-xl">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-[13.5px] leading-snug text-fg-muted"
          >
            <span className="mt-[7px] size-1.5 rounded-full bg-fg shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Stat strip — optional per scene */}
      {stat && (
        <div className="mt-6 inline-flex items-baseline gap-3 self-start rounded-card border border-fg/10 bg-bg/70 backdrop-blur px-4 py-2.5">
          <span className="font-display font-extrabold text-fg text-[clamp(1.5rem,2.6vw,2rem)] tracking-tight leading-none">
            {stat.value}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-fg-dim font-semibold">
            {stat.label}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function SceneIndicator({
  progress,
  total,
  scenes,
}: {
  progress: MotionValue<number>;
  total: number;
  scenes: Scene[];
}) {
  const idx = useTransform(progress, (v) =>
    String(Math.min(total, Math.floor(v * total) + 1)).padStart(2, "0")
  );

  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        {scenes.map((_, i) => (
          <Dot key={i} index={i} total={total} progress={progress} />
        ))}
      </div>
      <div className="text-[11px] uppercase tracking-[0.25em] text-fg-dim font-semibold flex items-center gap-1">
        <motion.span>{idx}</motion.span>
        <span>/ {String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

function Dot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const eps = 1e-3;
  const a = Math.max(0, start);
  const b = Math.max(a + eps, Math.min(1, end));
  const width = useTransform(progress, [a, b], ["10px", "32px"]);
  const s = stops(index, total);
  const opacity = useTransform(progress, s, [0.2, 1, 1, 0.2]);

  return (
    <motion.span
      className="h-[3px] rounded-full bg-fg"
      style={{ width, opacity }}
    />
  );
}

function PinnedPhone({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  // Subtle parallax — the device renders breathe slightly through the journey
  const tilt = useTransform(progress, [0, 1], [-2, 2]);
  const yFloat = useTransform(progress, [0, 1], [-10, 10]);

  return (
    <motion.div
      style={{ rotate: tilt, y: yFloat, willChange: "transform" }}
      // The trans/*.png mockups are rendered at ~6720x6000 (~1.12 : 1).
      // The container locks that aspect so layered <Image> children fill
      // it without distorting.
      className="relative w-full max-w-[480px] mx-auto aspect-[112/100]"
    >
      <ScreenStack progress={progress} total={total} />
    </motion.div>
  );
}

function ScreenStack({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  return (
    <div className="relative w-full h-full">
      {scenes.map((s, i) => (
        <ScreenLayer
          key={s.eyebrow}
          index={i}
          total={total}
          progress={progress}
          image={s.image}
          alt={s.title}
        />
      ))}
    </div>
  );
}

function ScreenLayer({
  index,
  total,
  progress,
  image,
  alt,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  image: string;
  alt: string;
}) {
  const s = stops(index, total);
  const opacity = useTransform(progress, s, [0, 1, 1, 0], { ease: screenEase });
  const y = useTransform(progress, s, [56, 0, 0, -56], { ease: screenEase });
  const scale = useTransform(progress, s, [0.94, 1, 1, 0.98], { ease: screenEase });
  const zIndex = useTransform(progress, s, [0, 2, 2, 1]);

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        zIndex,
        willChange: "transform, opacity",
      }}
      className="absolute inset-0"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 90vw, 480px"
        className="object-contain select-none"
        priority={index === 0}
        draggable={false}
      />
    </motion.div>
  );
}
