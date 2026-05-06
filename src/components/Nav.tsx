"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Arrow } from "./icons";

const links = [
  { label: "Features", href: "#features" },
  { label: "Highlights", href: "#highlights" },
  { label: "How It Works", href: "#how" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Comparison", href: "#comparison" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape so users have a keyboard escape hatch
  // beyond tapping the same hamburger again.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors",
        scrolled ? "backdrop-blur-xl bg-white/70 border-b border-fg/5" : ""
      )}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center group" aria-label="Unus Wallet">
          {/* Brand wordmark */}
          <img
            src="/assets/Unus-Logo.svg"
            alt="Unus Wallet"
            width={94}
            height={12}
            className="h-5 w-auto"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-fg-muted hover:text-fg transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://app.unuswallet.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-pill btn-brand px-5 py-2.5 text-[13.5px] font-medium"
          >
            Launch App <Arrow className="size-4" />
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden size-10 rounded-full glass grid place-items-center"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block w-4 h-4">
              <span
                className={cn(
                  "absolute left-0 w-4 h-0.5 bg-fg origin-center transition-all duration-150",
                  open ? "top-[7px] rotate-45" : "top-[2px]"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] w-4 h-0.5 bg-fg transition-opacity duration-150",
                  open ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 w-4 h-0.5 bg-fg origin-center transition-all duration-150",
                  open ? "top-[7px] -rotate-45" : "top-[12px]"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Tap-outside-to-close scrim — rendered before the panel so the panel
          paints on top in normal stacking order (no z-index needed). lg:hidden
          so desktop is unaffected. */}
      <AnimatePresence>
        {open && (
          <motion.button
            key="scrim"
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-fg/20 backdrop-blur-sm cursor-default"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            // Framer's default tween for height: "auto" runs ~350ms which
            // feels noticeably laggy on mobile taps. Cap at 0.16s with a
            // sharp ease-out so the panel reads as instant.
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="lg:hidden relative overflow-hidden border-t border-fg/5 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-fg-muted hover:text-fg rounded-lg hover:bg-fg/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://app.unuswallet.com"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center gap-1.5 rounded-pill btn-brand px-5 py-2.5 text-sm font-medium justify-center"
              >
                Launch App <Arrow className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

