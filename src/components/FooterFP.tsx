"use client";

import { Twitter, LinkedIn, Instagram, YouTube } from "./icons";

const socials = [
  { Icon: Twitter, href: "#", label: "X" },
  { Icon: LinkedIn, href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: YouTube, href: "#", label: "YouTube" },
];

const quickLinks = [
  { label: "Features", href: "#features" },
  { label: "Highlights", href: "#highlights" },
  { label: "How It Works", href: "#how" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Comparison", href: "#comparison" },
];

const productLinks = [
  { label: "About", href: "#" },
  { label: "Security", href: "#" },
  { label: "Support", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

export default function FooterFP() {
  return (
    <footer className="relative border-t border-fg/8 bg-bg-2/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center">
              <img
                src="/assets/Unus-Logo.svg"
                alt="Unus Wallet"
                width={126}
                height={16}
                className="h-7 w-auto"
              />
            </div>
            <p className="mt-5 text-[14px] text-fg-muted max-w-sm leading-relaxed">
              One wallet, infinite possibilities. Omnichain finance, simplified
              by an intelligent smart agent.
            </p>
            <div className="mt-5 text-[11px] uppercase tracking-[0.25em] text-fg-dim">
              There is no risk-free trading
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.22em] text-fg-dim mb-4 font-semibold">
              Quick Links
            </div>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
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

          <div className="lg:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.22em] text-fg-dim mb-4 font-semibold">
              Product
            </div>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
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

          <div className="lg:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.22em] text-fg-dim mb-4 font-semibold">
              Socials
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="size-10 rounded-full bg-bg border border-fg/10 grid place-items-center text-fg-muted hover:text-fg hover:border-fg/30 transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-fg/8">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-fg-dim">
          <div>© 2026 Unus Wallet. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-positive animate-pulse" />
            All systems nominal
          </div>
        </div>
      </div>
    </footer>
  );
}

