"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

export type Scene = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  stat?: { value: string; label: string };
  image: string;
};

export const scenes: Scene[] = [
  {
    eyebrow: "Welcome",
    title: "Meet your new wallet.",
    body: "One self-custody wallet for every chain you use. Hold, swap, trade and track your portfolio without juggling bridges, gas tokens or accounts.",
    bullets: [
      "Self-custody by default. Keys live on your device",
      "Built around a single, calm dashboard",
      "Designed for clarity, built for speed",
    ],
    image: "/assets/trans/welcome.png",
  },
  {
    eyebrow: "01 · Multi-chain dashboard",
    title: "All your assets. One clean view.",
    body: "ETH on Mainnet, BONK on Solana, FRAX on Arbitrum: every token and NFT, balanced and tracked side by side. Receive, send, swap or trade in a tap.",
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
    body: "Move value across chains without juggling bridges. The router picks the best route. Slippage, gas and ETA are shown up front.",
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
      "Self-custody throughout, no exchange deposit",
    ],
    stat: { value: "Long & short", label: "self-custody throughout" },
    image: "/assets/trans/3.png",
  },
];

const N = scenes.length;

// WAAPI requires offsets in [0, 1] and monotonically non-decreasing. clamp01
// + sortedClamp keep every useTransform input safe regardless of how the
// per-scene segment math falls out.
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const sortedClamp = (arr: number[]) => {
  const out = arr.map(clamp01);
  for (let i = 1; i < out.length; i++) {
    if (out[i] < out[i - 1]) out[i] = out[i - 1];
  }
  return out;
};

// Compute the 4 progress stops for a scene's opacity curve.
// Crossfades centered exactly on the boundary cause both adjacent scenes
// to sit at 50% opacity at p=segEnd — two giant headlines stack and become
// illegible. To avoid that, the fade-OUT of scene i finishes a hair before
// the boundary (PRE_GAP) while the fade-IN of scene i+1 starts AT the
// boundary. The micro-gap reads as a clean swap rather than a smear.
const FADE_IN = 0.022;
const FADE_OUT = 0.018;
const PRE_GAP = 0.006;
function sceneOpacityStops(index: number) {
  const isFirst = index === 0;
  const isLast = index === N - 1;
  const segStart = index / N;
  const segEnd = (index + 1) / N;
  return {
    offsets: sortedClamp([
      isFirst ? 0 : segStart,
      isFirst ? 0 : segStart + FADE_IN,
      isLast ? 1 : segEnd - PRE_GAP - FADE_OUT,
      isLast ? 1 : segEnd - PRE_GAP,
    ]),
    values: [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0] as [
      number,
      number,
      number,
      number,
    ],
  };
}

export default function AppShowcase() {
  return (
    <>
      <MobileCarousel />
      <DesktopTypeTakeover />
    </>
  );
}

/* ============================================================
   Desktop · Type Takeover
   Single pinned section spans N*100svh. One shared scroll
   progress drives all three layers (headline, phone, body)
   so transitions stay continuous instead of restarting per
   scene. Sharp 0.025 fade windows so only one scene at a time.
   ============================================================ */
function DesktopTypeTakeover() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Snappier spring than the default — keeps progress close to actual
  // scroll position so motion never feels like it's lagging behind.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.3,
  });

  return (
    <section
      ref={ref}
      className="relative hidden lg:block"
      // 60svh per scene (was 100svh): each scroll viewport advances ~1.6
      // scenes instead of 1, so the section never feels "stuck" between
      // headline transitions.
      style={{ height: `${N * 60}svh` }}
    >
      <div
        className="sticky top-0 h-svh overflow-hidden bg-bg"
        style={{ perspective: "1400px" }}
      >
        {/* Phone pinned right with parallax + idle float */}
        <PhoneStage progress={smooth} />

        {/* Giant headline left, sized to leave room for the phone */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="relative w-full lg:w-[55%] pl-[6vw] lg:pl-[8vw] pr-[6vw]">
            {scenes.map((s, i) => (
              <HeadlineLayer key={s.eyebrow} scene={s} index={i} progress={smooth} />
            ))}
          </div>
        </div>

        {/* Eyebrow + body bottom-left, staggered slide-in */}
        <div className="absolute bottom-[6vh] left-[6vw] right-[6vw] lg:left-[8vw] lg:right-[42%] max-w-[520px]">
          {scenes.map((s, i) => (
            <CopyLayer key={s.eyebrow} scene={s} index={i} progress={smooth} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneStage({ progress }: { progress: MotionValue<number> }) {
  // Bigger parallax range so the phone visibly drifts as you scroll within
  // any single scene — eliminates the "scroll did nothing" feeling.
  const parallaxY = useTransform(progress, [0, 1], [80, -80]);
  const rotateY = useTransform(progress, [0, 0.5, 1], [-6, 0, 6]);
  return (
    <motion.div
      style={{ y: parallaxY, rotateY, transformStyle: "preserve-3d" }}
      className="absolute top-1/2 right-[4vw] -translate-y-1/2 w-[clamp(280px,32vw,460px)] aspect-[6720/6000]"
    >
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {scenes.map((s, i) => (
          <PhoneScreen key={s.image} scene={s} index={i} progress={progress} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function PhoneScreen({
  scene,
  index,
  progress,
}: {
  scene: Scene;
  index: number;
  progress: MotionValue<number>;
}) {
  const { offsets, values } = sceneOpacityStops(index);
  const opacity = useTransform(progress, offsets, values);
  const y = useTransform(progress, offsets, [40, 0, 0, -40]);
  const scale = useTransform(progress, offsets, [0.92, 1, 1, 0.92]);
  return (
    <motion.div style={{ opacity, y, scale }} className="absolute inset-0">
      <Image
        src={scene.image}
        alt={scene.title}
        fill
        className="object-contain select-none"
        sizes="(max-width: 1024px) 100vw, 460px"
        priority={index === 0}
        draggable={false}
      />
    </motion.div>
  );
}

function HeadlineLayer({
  scene,
  index,
  progress,
}: {
  scene: Scene;
  index: number;
  progress: MotionValue<number>;
}) {
  const { offsets, values } = sceneOpacityStops(index);
  const opacity = useTransform(progress, offsets, values);
  const y = useTransform(progress, offsets, [24, 0, 0, -24]);
  return (
    <motion.h2
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-fg"
    >
      <span className="text-[clamp(2.4rem,8.5vw,7.5rem)] block">
        {scene.title}
      </span>
    </motion.h2>
  );
}

function CopyLayer({
  scene,
  index,
  progress,
}: {
  scene: Scene;
  index: number;
  progress: MotionValue<number>;
}) {
  const isFirst = index === 0;
  const isLast = index === N - 1;
  const segStart = index / N;
  const segEnd = (index + 1) / N;
  const stagger = 0.018;

  // Eyebrow uses the same opacity stops as the headline so all elements
  // disappear and reappear together at the boundary — no straggler stays
  // on screen during a swap.
  const eyebrow = sceneOpacityStops(index);
  const eyebrowOpacity = useTransform(
    progress,
    eyebrow.offsets,
    eyebrow.values
  );
  const eyebrowX = useTransform(progress, eyebrow.offsets, [-32, 0, 0, -16]);

  // Body slides in slightly later than headline+eyebrow (stagger). Its
  // fade-out stops at the same pre-gap point as the rest of the scene.
  const bodyOffsets = sortedClamp([
    isFirst ? 0 : segStart + stagger,
    isFirst ? 0 : segStart + FADE_IN + stagger,
    isLast ? 1 : segEnd - PRE_GAP - FADE_OUT,
    isLast ? 1 : segEnd - PRE_GAP,
  ]);
  const bodyOpacity = useTransform(
    progress,
    bodyOffsets,
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
  const bodyY = useTransform(progress, bodyOffsets, [22, 0, 0, -12]);
  const bodyBlur = useTransform(progress, bodyOffsets, [
    "blur(6px)",
    "blur(0px)",
    "blur(0px)",
    "blur(4px)",
  ]);

  return (
    <div className="absolute inset-x-0 bottom-0">
      <motion.div
        style={{ opacity: eyebrowOpacity, x: eyebrowX }}
        className="inline-flex items-center gap-2 rounded-pill border border-fg/10 bg-bg-2 px-3 py-1 text-[10.5px] uppercase tracking-[0.22em] text-fg-muted font-semibold"
      >
        <span className="size-1.5 rounded-full bg-fg" />
        {scene.eyebrow}
      </motion.div>
      <motion.p
        style={{ opacity: bodyOpacity, y: bodyY, filter: bodyBlur }}
        className="mt-3 text-[14px] leading-relaxed text-fg-muted"
      >
        {scene.body}
      </motion.p>
    </div>
  );
}

/* ============================================================
   Mobile · Snap carousel (unchanged from previous version —
   scroll-jacking is too laggy on phones, native snap is fine)
   ============================================================ */
function MobileCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="lg:hidden relative py-12 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 size-[420px] rounded-full glow-mist blur-3xl opacity-50" />
        <div className="absolute top-1/3 -right-32 size-[360px] rounded-full glow-brand blur-3xl opacity-40" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      <div className="px-5 mb-6">
        <div className="inline-flex items-center gap-2 rounded-pill border border-fg/10 bg-bg-2 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-fg-muted font-semibold">
          <span className="size-1.5 rounded-full bg-fg" />
          App tour
        </div>
        <h2 className="mt-3 font-display text-[clamp(1.7rem,7vw,2.2rem)] leading-[1.05] tracking-[-0.03em] font-extrabold text-fg">
          One wallet. Every chain.
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
          Swipe through the app. Each screen, in your hand.
        </p>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {scenes.map((s) => (
          <article
            key={s.eyebrow}
            className="snap-center shrink-0 w-[calc(100vw-2.5rem)] max-w-[420px] rounded-2xl border border-fg/10 bg-bg overflow-hidden"
          >
            <div className="relative w-full aspect-[112/100] bg-bg-2">
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 480px) 90vw, 420px"
                className="object-contain"
              />
            </div>
            <div className="p-5 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-pill border border-fg/10 bg-bg-2 px-3 py-1 text-[10.5px] uppercase tracking-[0.22em] text-fg-muted font-semibold">
                <span className="size-1.5 rounded-full bg-fg" />
                {s.eyebrow}
              </div>
              <h3 className="font-display text-[1.4rem] leading-tight tracking-tight font-extrabold text-fg">
                {s.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-fg-muted">
                {s.body}
              </p>
              <ul className="space-y-2 pt-1">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[13px] leading-snug text-fg-muted"
                  >
                    <span className="mt-1.5 size-1.5 rounded-full bg-fg shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {s.stat && (
                <div className="mt-2 inline-flex items-baseline gap-3 rounded-card border border-fg/10 bg-bg/70 px-3.5 py-2">
                  <span className="font-display font-extrabold text-fg text-[1.25rem] tracking-tight leading-none">
                    {s.stat.value}
                  </span>
                  <span className="text-[10.5px] uppercase tracking-[0.2em] text-fg-dim font-semibold">
                    {s.stat.label}
                  </span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {scenes.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-8 bg-fg" : "w-1.5 bg-fg/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
