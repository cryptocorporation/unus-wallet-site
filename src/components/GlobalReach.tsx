"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobalReach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const widgetY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const coinY = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-pill glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-fg-muted"
          >
            <span className="size-1.5 rounded-full bg-brand" />
            Borderless
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] tracking-[-0.03em] font-extrabold text-deep"
          >
            One App. <br />
            <span className="text-gradient">No borders. No banks.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 text-[16px] text-fg-muted leading-relaxed max-w-md"
          >
            Through partner integrations, your wallet doubles as a global crypto
            debit card — accepted at merchants and cash-out points worldwide.
          </motion.p>

          <div className="mt-8 flex items-center gap-6">
            <div>
              <div className="font-display text-4xl font-extrabold text-deep">
                182
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-fg-dim mt-1">
                countries
              </div>
            </div>
            <div className="h-12 w-px bg-fg/15" />
            <div>
              <div className="font-display text-4xl font-extrabold text-deep">
                24/7
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-fg-dim mt-1">
                cash-out
              </div>
            </div>
          </div>

          <a
            href="#download"
            className="mt-8 inline-flex items-center gap-2 rounded-pill btn-brand px-5 py-2.5 text-[13.5px] font-semibold"
          >
            Spend anywhere
          </a>
        </div>

        <div ref={ref} className="lg:col-span-7 relative aspect-square max-w-2xl mx-auto w-full">
          {/* Glow */}
          <div className="absolute inset-0 glow-mist blur-3xl opacity-60" />

          {/* Globe */}
          <motion.div
            style={{ rotate }}
            className="absolute inset-[8%] rounded-full globe-bg overflow-hidden"
          >
            {/* Latitude lines */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-30">
              <defs>
                <radialGradient id="globeGloss" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                  <stop offset="60%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((y) => (
                <ellipse
                  key={y}
                  cx="100"
                  cy={y}
                  rx={Math.sqrt(Math.max(0, 100 * 100 - (y - 100) * (y - 100)))}
                  ry="3"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="0.4"
                  fill="none"
                />
              ))}
              {[0, 30, 60, 90, 120, 150].map((deg) => (
                <ellipse
                  key={deg}
                  cx="100"
                  cy="100"
                  rx="100"
                  ry={Math.abs(100 * Math.cos((deg * Math.PI) / 180))}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.4"
                  fill="none"
                  transform={`rotate(${deg} 100 100)`}
                />
              ))}
              <rect width="200" height="200" fill="url(#globeGloss)" />
            </svg>

            {/* Pulse pins */}
            {[
              { top: "28%", left: "38%" },
              { top: "42%", left: "62%" },
              { top: "60%", left: "30%" },
              { top: "55%", left: "70%" },
              { top: "35%", left: "20%" },
            ].map((pos, i) => (
              <motion.span
                key={i}
                className="absolute size-2.5 rounded-full bg-white"
                style={{
                  ...pos,
                  boxShadow: "0 0 12px rgba(255,255,255,0.9), 0 0 24px #d4d4d4",
                }}
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{
                  duration: 2.2 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </motion.div>

          {/* Floating widget — country count */}
          <motion.div
            style={{ y: widgetY }}
            className="absolute top-8 right-2 sm:right-6 glass-strong rounded-2xl px-4 py-3 text-left animate-float"
          >
            <div className="text-[10px] uppercase tracking-[0.18em] text-fg-dim">
              live network
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand animate-pulse" />
              <span className="font-display font-bold text-deep">
                182 countries
              </span>
            </div>
          </motion.div>

          {/* Floating widget — coin */}
          <motion.div
            style={{ y: coinY }}
            className="absolute bottom-12 left-2 sm:left-8 glass-strong rounded-2xl px-4 py-3 text-left animate-float-slow"
          >
            <div className="flex items-center gap-3">
              <div
                className="size-9 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #fff, #f0f0f0 50%, #d4d4d4 100%)",
                  border: "1px solid rgba(10, 10, 10, 0.3)",
                  boxShadow: "0 8px 20px rgba(10, 10, 10, 0.25)",
                }}
              />
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-fg-dim">
                  Cash-out
                </div>
                <div className="text-[12px] font-semibold text-deep">
                  $250.00 USDC
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card widget */}
          <motion.div
            style={{ y: cardY }}
            className="absolute bottom-0 right-4 sm:right-12"
          >
            <div
              className="w-44 aspect-[16/10] rounded-2xl text-white p-4 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #2a2a2a 0%, #0a0a0a 60%, #d4d4d4 100%)",
                boxShadow: "0 30px 60px -20px rgba(10, 10, 10, 0.55)",
              }}
            >
              <div className="text-[9px] uppercase tracking-wider opacity-70">
                unus card
              </div>
              <div className="mt-1 text-[14px] font-display font-bold">
                •••• 4982
              </div>
              <div className="absolute bottom-3 left-4 text-[9px] uppercase tracking-wider opacity-80">
                global · debit
              </div>
              <div className="absolute bottom-3 right-4 size-5 rounded-full bg-white/30 blur-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
