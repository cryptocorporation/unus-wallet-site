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
  const [lang, setLang] = useState<"EN" | "ES">("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <div className="hidden md:flex items-center text-[12px] text-fg-muted">
            <button
              onClick={() => setLang("EN")}
              className={cn(
                "px-1.5 transition-colors",
                lang === "EN" ? "text-fg font-semibold" : "hover:text-fg"
              )}
            >
              EN
            </button>
            <span className="text-fg/30">/</span>
            <button
              onClick={() => setLang("ES")}
              className={cn(
                "px-1.5 transition-colors",
                lang === "ES" ? "text-fg font-semibold" : "hover:text-fg"
              )}
            >
              ES
            </button>
          </div>

          <a
            href="#cta"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-pill btn-brand px-5 py-2.5 text-[13.5px] font-medium"
          >
            Get Started <Arrow className="size-4" />
          </a>
          <button
            aria-label="Open menu"
            className="lg:hidden size-10 rounded-full glass grid place-items-center"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block w-4 h-0.5 bg-fg before:content-[''] before:absolute before:left-0 before:-top-1.5 before:w-4 before:h-0.5 before:bg-fg after:content-[''] after:absolute after:left-0 after:top-1.5 after:w-4 after:h-0.5 after:bg-fg" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-fg/5 bg-white/95 backdrop-blur-xl"
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
                href="#cta"
                className="mt-2 inline-flex items-center gap-1.5 rounded-pill btn-brand px-5 py-2.5 text-sm font-medium justify-center"
              >
                Get Started <Arrow className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

