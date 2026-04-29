"use client";

import { motion, type Transition } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";
import { Brain, Gas, Shield, Wallet } from "./icons";

type IconAnim = {
  animate: Record<string, number[] | string[]>;
  transition: Transition;
};

const components: Array<{
  icon: typeof Wallet;
  title: string;
  body: string;
  anim: IconAnim;
}> = [
  {
    icon: Wallet,
    title: "Unus Wallet v2",
    body: "Secure omnichain messaging infrastructure.",
    // Wallet pulse — subtle scale + tiny lift
    anim: {
      animate: { scale: [1, 1.08, 1], y: [0, -2, 0] },
      transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
    },
  },
  {
    icon: Brain,
    title: "Smart Agent",
    body: "AI-powered transaction optimization.",
    // Multi-phase brain wave
    anim: {
      animate: { scale: [1, 1.05, 1, 1.07, 1] },
      transition: {
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      },
    },
  },
  {
    icon: Gas,
    title: "Gas Abstraction",
    body: "Pay fees in any token across chains.",
    // Pump-up bounce — fuel filling
    anim: {
      animate: { scaleY: [1, 1.18, 1], y: [0, -2, 0] },
      transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
    },
  },
  {
    icon: Shield,
    title: "Account Abstraction",
    body: "Simplified UX with advanced security.",
    // Protective bounce — tilt + scale
    anim: {
      animate: { rotate: [0, -4, 4, 0], scale: [1, 1.06, 1.06, 1] },
      transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
    },
  },
];

export default function Infrastructure() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Infrastructure"
          title={
            <>
              Powered by{" "}
              <span className="text-gradient">Unus Wallet v2.</span>
            </>
          }
          subtitle="Advanced tech stack — omnichain messaging, AI optimization, gas abstraction, and account abstraction — working in concert."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {components.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative rounded-card overflow-hidden p-7 border border-fg/8 bg-bg-2 hover:bg-bg hover:border-fg/15 transition-all"
              >
                <motion.div
                  className="size-11 rounded-xl bg-fg text-bg grid place-items-center mb-5 relative overflow-hidden"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22), transparent 70%)",
                    }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.25,
                    }}
                  />
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%)",
                      backgroundSize: "200% 200%",
                    }}
                    initial={{ backgroundPosition: "200% 0" }}
                    whileHover={{ backgroundPosition: "-50% 0" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <motion.div
                    animate={c.anim.animate}
                    transition={c.anim.transition}
                    className="relative"
                  >
                    <Icon className="size-5" />
                  </motion.div>
                </motion.div>
                <h3 className="font-display text-base tracking-tight font-bold text-fg">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-fg-muted leading-relaxed">
                  {c.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
