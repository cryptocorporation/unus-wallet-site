"use client";

import { Twitter, LinkedIn, Instagram, YouTube } from "./icons";

const cols = [
  {
    title: "Quick Links",
    links: [
      { label: "Features", href: "#features" },
      { label: "Highlights", href: "#highlights" },
      { label: "How It Works", href: "#how" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Comparison", href: "#comparison" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "About", href: "#" },
      { label: "Security", href: "#" },
      { label: "Support", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
];

const socials = [
  { Icon: Twitter, href: "#", label: "X" },
  { Icon: LinkedIn, href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: YouTube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative mt-12 border-t border-fg/5">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="lgf" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#07eeff" />
                  <stop offset="100%" stopColor="#e8e1ff" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#lgf)" />
              <path
                d="M10 11v7a6 6 0 0 0 12 0v-7"
                stroke="#07080c"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-display font-semibold tracking-tight text-lg">
              Unus<span className="text-cyan">.</span>
            </span>
          </div>
          <p className="mt-5 text-[14px] text-fg-muted max-w-sm leading-relaxed">
            One wallet, infinite possibilities. Omnichain finance, made simple
            by an intelligent smart agent.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="size-10 rounded-full glass grid place-items-center text-fg-muted hover:text-cyan hover:border-cyan/40 transition-colors"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-10">
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] uppercase tracking-[0.22em] text-fg-dim mb-5">
                {c.title}
              </div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14px] text-fg-muted hover:text-fg transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-fg/5">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-fg-dim">
          <div>© 2026 Unus Wallet. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-cyan" />
            All systems nominal
          </div>
        </div>
      </div>
    </footer>
  );
}
