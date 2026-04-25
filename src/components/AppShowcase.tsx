"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  cubicBezier,
  MotionValue,
} from "framer-motion";
import {
  PhoneFrame,
  ReceiveScreen,
  DashboardScreen,
  SwapScreen,
  TransactionsScreen,
  TradeScreen,
  StocksScreen,
  PlaceOrderScreen,
} from "./AppMocks";

type Scene = {
  eyebrow: string;
  title: string;
  body: string;
  Screen: React.ComponentType;
};

const scenes: Scene[] = [
  {
    eyebrow: "01 · Self-custody",
    title: "Your keys. Your coins. Your wallet.",
    body: "Generate, receive and hold across every chain you use. Non-custodial by default — Unus never holds your keys or touches your funds.",
    Screen: ReceiveScreen,
  },
  {
    eyebrow: "02 · Multi-chain dashboard",
    title: "All your assets. One clean view.",
    body: "ETH on Mainnet, BONK on Solana, FRAX on Arbitrum — every token and NFT, balanced and tracked side by side. Receive, send, swap or trade in a tap.",
    Screen: DashboardScreen,
  },
  {
    eyebrow: "03 · Cross-chain swaps",
    title: "Swap and bridge in one tap.",
    body: "Move value across chains without juggling bridges. The router picks the best route — slippage, gas and ETA are shown up front.",
    Screen: SwapScreen,
  },
  {
    eyebrow: "04 · Receipts & history",
    title: "Every send, swap and trade — receipted.",
    body: "Confirmed, pending or failed: filter by address, asset or type. Search across every chain at once.",
    Screen: TransactionsScreen,
  },
  {
    eyebrow: "05 · Onchain trading",
    title: "Spot prices, candles, leverage.",
    body: "Open longs and shorts on the assets you already hold. Real-time PnL, decentralized execution, no order-book intermediaries.",
    Screen: TradeScreen,
  },
  {
    eyebrow: "06 · Place an order",
    title: "Long, short — with the controls of a real desk.",
    body: "Pick your size, margin mode and leverage. See your liquidation price up front. Isolated by default so a wrong call never touches the rest of your book.",
    Screen: PlaceOrderScreen,
  },
  {
    eyebrow: "07 · Tokenized stocks",
    title: "Wall Street, in your wallet.",
    body: "Trade tokenized shares of Tesla, Apple, Amazon, Microsoft and more — onchain, 24/7, settled in USDC. Coming Q3 2026.",
    Screen: StocksScreen,
  },
];

// 4-stop offset window for scene i of n scenes.
// `entry`/`exit` widen the fade band; smaller numbers = punchier swap.
function stops(i: number, n: number): [number, number, number, number] {
  const start = i / n;
  const end = (i + 1) / n;
  const eps = 1e-3;
  const entry = 0.035; // narrow fade-in window (~3.5% of total scroll)
  const exit = 0.035; // narrow fade-out window
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
      // 50vh per scene — responsive on a single scroll. With 7 scenes total
      // height is ~350vh, comparable to the previous 5-scene × 60vh budget.
      style={{ height: `${N * 50}vh` }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center"
        style={{ contain: "layout paint" }}
      >
        <Backdrop progress={scrollYProgress} />

        <div className="mx-auto max-w-7xl px-5 lg:px-8 w-full grid lg:grid-cols-12 gap-10 items-center">
          {/* Left — scrolling copy */}
          <div className="lg:col-span-7 relative h-[60vh] flex items-center order-2 lg:order-1">
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
      <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] tracking-[-0.035em] font-extrabold text-fg max-w-2xl">
        {title}
      </h2>
      <p className="mt-5 text-[16px] leading-relaxed text-fg-muted max-w-xl">
        {body}
      </p>
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
  // Subtle parallax — phone tilts slightly through the journey
  const tilt = useTransform(progress, [0, 1], [-3, 3]);
  const yFloat = useTransform(progress, [0, 1], [-12, 12]);
  const ringRotate = useTransform(progress, [0, 1], [0, 90]);

  return (
    <motion.div
      style={{ rotate: tilt, y: yFloat, willChange: "transform" }}
      className="relative"
    >
      {/* Decorative pulse ring */}
      <motion.div
        style={{ rotate: ringRotate, willChange: "transform" }}
        className="absolute -inset-6 rounded-[3rem] opacity-30 pointer-events-none"
      >
        <div
          className="w-full h-full rounded-[3rem] blur-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(10,10,10,0.15), transparent 30%, rgba(10,10,10,0.1) 60%, transparent 75%)",
          }}
        />
      </motion.div>

      <PhoneFrame width={260} elevated>
        <ScreenStack progress={progress} total={total} />
      </PhoneFrame>
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
          Screen={s.Screen}
        />
      ))}
    </div>
  );
}

function ScreenLayer({
  index,
  total,
  progress,
  Screen,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  Screen: React.ComponentType;
}) {
  const s = stops(index, total);
  // Sharper opacity ramp via tightened stops + ease
  const opacity = useTransform(progress, s, [0, 1, 1, 0], { ease: screenEase });
  // Pronounced slide: incoming rises from below (+56), outgoing exits upward (-56)
  const y = useTransform(progress, s, [56, 0, 0, -56], { ease: screenEase });
  // Tiny depth pop on entry
  const scale = useTransform(progress, s, [0.94, 1, 1, 0.98], { ease: screenEase });
  // Higher z while a scene is active, so the incoming screen lands on top
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
      <Screen />
    </motion.div>
  );
}
