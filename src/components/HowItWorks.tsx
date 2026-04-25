"use client";

import { motion } from "framer-motion";
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

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24 lg:py-32">
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
          {/* connecting line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fg/40 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative size-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full glow-brand blur-2xl opacity-50" />
                  <div className="relative size-24 rounded-full glass border border-fg/10 grid place-items-center font-display text-xl tracking-tight">
                    {s.n}
                  </div>
                  <div
                    className="absolute -inset-1 rounded-full -z-10 opacity-50 animate-spin-slow"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent, #0a0a0a, transparent 30%)",
                      filter: "blur(2px)",
                    }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-display tracking-tight text-base">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] text-fg-muted leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
