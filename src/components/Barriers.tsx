"use client";

import { motion, type Transition } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";
import { Gas, X, Stack } from "./icons";

type IconAnim = {
  animate: Record<string, number[] | string[]>;
  transition: Transition;
};

const items: Array<{
  icon: typeof Stack;
  title: string;
  body: string;
  anim: IconAnim;
}> = [
  {
    icon: Stack,
    title: "Complex Bridging",
    // Layers shimmy out of alignment then back — visual "bridges fail to line up"
    anim: {
      animate: { x: [0, -3, 3, -2, 0], rotate: [0, -4, 4, -2, 0] },
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
    body: "Moving assets across chains is slow, risky, and requires extra steps.",
  },
  {
    icon: Gas,
    title: "Gas Management",
    // Fuel-meter pulse — scaleY up like a pump under stress
    anim: {
      animate: { scaleY: [1, 1.18, 0.92, 1.1, 1], scaleX: [1, 0.96, 1.04, 0.98, 1] },
      transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
    },
    body: "Managing different wallets and tokens for fees makes Web3 frustrating.",
  },
  {
    icon: X,
    title: "Poor UX",
    // X shakes like a rejection
    anim: {
      animate: { rotate: [0, -12, 10, -6, 0], scale: [1, 1.08, 1, 1.06, 1] },
      transition: {
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.3, 1],
      },
    },
    body: "Complex interfaces create barriers for users trying to access DeFi.",
  },
];

export default function Barriers() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="The problem"
          title={
            <>
              Traditional Web3{" "}
              <span className="text-fg-400" style={{ color: "#0a0a0a" }}>
                has barriers.
              </span>
            </>
          }
          subtitle="Traditional wallets force users to juggle bridges, gas tokens, and multiple accounts. This complexity creates friction, slows adoption, and limits what's possible in Web3."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative rounded-card border border-fg/8 bg-bg-2 hover:bg-bg p-7 overflow-hidden hover:border-fg/15 transition-all"
              >
                <motion.div
                  className="size-11 rounded-xl bg-fg text-bg grid place-items-center mb-5 relative overflow-hidden"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  {/* Faint inner glow that breathes — adds life at rest */}
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
                      delay: i * 0.3,
                    }}
                  />
                  {/* Diagonal sheen on hover */}
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
                    animate={it.anim.animate}
                    transition={it.anim.transition}
                    className="relative"
                  >
                    <Icon className="size-5" />
                  </motion.div>
                </motion.div>
                <h3 className="font-display text-lg tracking-tight font-bold text-fg">
                  {it.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-fg-muted leading-relaxed">
                  {it.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
