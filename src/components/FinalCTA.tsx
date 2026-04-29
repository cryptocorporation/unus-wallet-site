"use client";

import { motion } from "framer-motion";
import { Arrow } from "./icons";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] overflow-hidden isolate"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-fg" />
            {/* DeFi animation as a centered focal element (not full-bleed).
                Sized to ~360px native width with a soft fade-out around it
                so it reads as a glowing graphic, not a tiled background. */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[420px] aspect-square pointer-events-none"
              style={{
                maskImage:
                  "radial-gradient(circle at center, black 35%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 35%, transparent 75%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/DeFi.webp"
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-55 mix-blend-screen"
              />
            </div>
            <div className="absolute inset-0 bg-grid opacity-15" />
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-white/4 blur-3xl" />
          </div>

          <div className="relative px-8 py-20 lg:py-28 text-center">
            <div className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/70">
              <span className="size-1.5 rounded-full bg-positive animate-pulse" />
              Get started
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.04] tracking-[-0.035em] font-extrabold text-white">
              Join the future of
              <br className="hidden md:block" />
              <span className="opacity-70">omnichain finance with Unus.</span>
            </h2>
            <p className="mt-6 text-[16px] text-white/60 max-w-xl mx-auto leading-relaxed">
              One wallet. One smart agent. Every chain. Launch the app — or join
              the community shaping it.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://app.unuswallet.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-pill bg-white text-fg px-7 py-3.5 font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                Launch App <Arrow className="size-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-7 py-3.5 text-sm text-white hover:bg-white/10 transition-colors"
              >
                Join Community
              </a>
            </div>
            <div className="mt-10 text-[11px] text-white/40 uppercase tracking-[0.28em]">
              There is no risk-free trading
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
