"use client";

import { motion } from "framer-motion";
import { Lock } from "./icons";
import { PhoneFrame, DashboardScreen } from "./AppMocks";

export default function DownloadCTA() {
  return (
    <section id="download" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-pill glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            <span className="size-1.5 rounded-full bg-brand animate-pulse" />
            Get started in 60 seconds
          </div>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.03em] font-extrabold text-deep">
            Welcome to the <span className="text-gradient">future of payments.</span>
          </h2>
          <p className="mt-5 max-w-md text-[16px] text-fg-muted leading-relaxed">
            One app. Every chain. No banks. Download now and send your first
            payment in under a minute.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <StoreButton variant="apple" />
            <StoreButton variant="google" />
          </div>

          <div className="mt-8 flex items-center gap-2 text-[12px] text-fg-dim">
            <Lock className="size-3.5" />
            Non-custodial · End-to-end encrypted
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square max-w-lg mx-auto w-full"
        >
          <div className="absolute inset-[8%] rounded-[3rem] glow-brand blur-3xl opacity-70" />

          {/* Center phone — real Unus dashboard */}
          <div className="absolute inset-0 grid place-items-center">
            <PhoneFrame width={260} elevated>
              <DashboardScreen />
            </PhoneFrame>
          </div>

          {/* Floating card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 right-2 sm:right-4 w-44 aspect-[16/10] rounded-2xl text-white p-4 relative overflow-hidden"
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
          </motion.div>

          {/* Floating coin */}
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-2 sm:left-6 size-20 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #d4d4d4 100%)",
              border: "1px solid rgba(10, 10, 10, 0.3)",
              boxShadow:
                "0 16px 36px rgba(10, 10, 10, 0.3), inset 0 0 22px rgba(255,255,255,0.5)",
            }}
          >
            <div
              className="absolute inset-[18%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.7), transparent 60%)",
                border: "1px solid rgba(10, 10, 10, 0.25)",
              }}
            />
          </motion.div>

          {/* Lock badge */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 right-6 size-14 rounded-2xl glass-strong grid place-items-center"
          >
            <Lock className="size-6 text-brand" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StoreButton({ variant }: { variant: "apple" | "google" }) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 rounded-2xl bg-deep text-white px-5 py-3 hover:bg-ink transition-colors min-w-[160px]"
    >
      {variant === "apple" ? (
        <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
          <path d="M16.365 1.43c0 1.14-.42 2.232-1.247 3.072-.832.85-1.967 1.404-3.07 1.345-.106-1.078.44-2.207 1.213-3.024.85-.9 2.166-1.482 3.104-1.393zM20.5 17.36c-.62 1.443-1.39 2.92-2.41 4.116-.93 1.077-2.09 2.376-3.5 2.39-1.366.012-1.81-.886-3.66-.882-1.85.005-2.34.886-3.706.873-1.41-.013-2.49-1.18-3.43-2.255-2.59-3.06-4.59-8.65-1.92-12.42 1.32-1.87 3.69-3.05 6.25-3.085 1.42-.025 2.76.96 3.66.96.9 0 2.51-1.18 4.24-1.01.72.03 2.74.29 4.04 2.18-3.55 1.94-2.97 6.95.43 9.13z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
          <path d="m13.42 11.39 2.74-1.59-9.4-5.42L13.4 11l.02.39zM3.6 3.62A2 2 0 0 0 3 5.04v13.92c0 .55.22 1.04.56 1.41l9.41-9.4-9.37-7.35zM18 11.66l-2.62-1.51-3.06 3.06 3.06 3.06L18 14.76a1.5 1.5 0 0 0 0-3.1zM6.78 19.66l9.4-5.42-2.74-1.59-.02.39-6.64 6.62z" />
        </svg>
      )}
      <div>
        <div className="text-[10px] uppercase tracking-wider opacity-70 leading-none">
          {variant === "apple" ? "Download on the" : "Get it on"}
        </div>
        <div className="font-display font-bold text-[15px] leading-tight">
          {variant === "apple" ? "App Store" : "Google Play"}
        </div>
      </div>
    </a>
  );
}
