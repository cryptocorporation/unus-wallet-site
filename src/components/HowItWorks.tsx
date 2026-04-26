"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  cubicBezier,
  MotionValue,
} from "framer-motion";
import { SectionHeader } from "./CoreFeatures";

const steps = [
  {
    n: "01",
    title: "User Intent",
    body: "You simply choose what you want to do — no complex steps required.",
  },
  {
    n: "02",
    title: "Agent Suggests",
    body: "The smart agent finds the best path and optimizes your transaction.",
  },
  {
    n: "03",
    title: "Unus Wallet Executes",
    body: "Secure cross-chain infrastructure carries out the action seamlessly.",
  },
  {
    n: "04",
    title: "Result Visible Instantly",
    body: "Your outcome appears right away, across any connected chain.",
  },
];

const ease = cubicBezier(0.22, 1, 0.36, 1);

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 40%"],
  });

  // Line draws across the row as the section scrolls past
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1], { ease });
  const headLeft = useTransform(lineProgress, (v) => `${v * 100}%`);

  return (
    <section id="how" ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="How it works"
          title={
            <>
              From your intent to{" "}
              <span className="text-gradient">instant results.</span>
            </>
          }
          subtitle="Our smart agent streamlines every step. It suggests the best path, Unus Wallet executes securely, and outcomes appear across chains in seconds."
        />

        <div className="mt-16 relative">
          {/* Connecting track + drawn line. Hidden on small screens (vertical
              flow doesn't need a horizontal line). */}
          <div
            className="hidden lg:block absolute left-0 right-0 pointer-events-none"
            style={{ top: 48 }}
          >
            <div className="relative h-px mx-[12.5%]">
              {/* idle track */}
              <div className="absolute inset-0 bg-fg/12" />
              {/* drawn portion — grows with scroll */}
              <motion.div
                style={{ scaleX: lineProgress, transformOrigin: "left" }}
                className="absolute inset-0 bg-fg origin-left"
              />
              {/* travelling pulse at the leading edge */}
              <motion.div
                style={{ left: headLeft }}
                className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2"
              >
                <div className="size-3 rounded-full bg-fg shadow-[0_0_18px_rgba(10,10,10,0.55)]" />
                <div className="absolute inset-0 size-3 rounded-full bg-fg animate-ping opacity-60" />
              </motion.div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
            {steps.map((s, i) => (
              <Step
                key={s.n}
                index={i}
                total={steps.length}
                progress={lineProgress}
                step={s}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  total,
  progress,
  step,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  step: { n: string; title: string; body: string };
}) {
  // Step ignites when the drawn-line head reaches its position. Each step
  // sits at fraction (index + 0.5) / total of the line.
  const activatePoint = (index + 0.5) / total;
  const safeStart = Math.max(0, activatePoint - 0.05);
  const safeEnd = Math.min(1, activatePoint + 0.05);
  const eps = 1e-3;
  const stops: [number, number] = [
    safeStart,
    Math.max(safeStart + eps, safeEnd),
  ];

  const circleBg = useTransform(progress, stops, [
    "rgba(10,10,10,0)",
    "rgba(10,10,10,1)",
  ]);
  const circleColor = useTransform(progress, stops, [
    "rgba(10,10,10,1)",
    "rgba(255,255,255,1)",
  ]);
  const circleScale = useTransform(progress, stops, [1, 1.05]);
  const ringOpacity = useTransform(progress, stops, [0, 1]);
  const copyOpacity = useTransform(progress, stops, [0.55, 1]);
  const copyY = useTransform(progress, stops, [10, 0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="relative"
    >
      <motion.div
        style={{ scale: circleScale }}
        className="relative size-24 mx-auto mb-6"
      >
        {/* outer activated ring */}
        <motion.div
          style={{ opacity: ringOpacity }}
          className="absolute -inset-2 rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(10,10,10,0.5), transparent 50%)",
              filter: "blur(2px)",
            }}
          />
        </motion.div>

        {/* circle itself */}
        <motion.div
          style={{ background: circleBg, color: circleColor }}
          className="relative size-24 rounded-full border border-fg/15 grid place-items-center font-display text-xl tracking-tight font-semibold backdrop-blur"
        >
          {step.n}
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: copyOpacity, y: copyY }}
        className="text-center"
      >
        <h3 className="font-display tracking-tight text-base font-bold text-fg">
          {step.title}
        </h3>
        <p className="mt-2 text-[13.5px] text-fg-muted leading-relaxed">
          {step.body}
        </p>
      </motion.div>
    </motion.div>
  );
}
