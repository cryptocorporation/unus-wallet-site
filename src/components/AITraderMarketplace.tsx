"use client";

import { motion, type Transition } from "framer-motion";
import { SectionHeader } from "./CoreFeatures";
import { Brain, Chart, Wallet } from "./icons";

type IconAnim = {
  animate: Record<string, number[] | string[]>;
  transition: Transition;
};

const steps: Array<{
  icon: typeof Brain;
  title: string;
  body: string;
  anim: IconAnim;
}> = [
  {
    icon: Brain,
    title: "Train Your Own Trader",
    body: "Fine-tune your personal AI trading model on your strategies and risk profile. It learns how you trade, then trades for you.",
    // Brain-wave breathing, matching the Smart Agent card elsewhere on the page.
    anim: {
      animate: { scale: [1, 1.08, 1] },
      transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
    },
  },
  {
    icon: Chart,
    title: "Rent the Best",
    body: "Browse the model marketplace and hire top-performing AI traders, ranked by verified on-chain performance.",
    // Ranking: a small climb rather than a pulse.
    anim: {
      animate: { y: [0, -3, 0], scaleY: [1, 1.12, 1] },
      transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
    },
  },
  {
    icon: Wallet,
    title: "Earn a Share",
    body: "Built a model that performs? List it. Every time someone rents your trader, you earn a % of the fees.",
    anim: {
      animate: { scale: [1, 1.06, 1], y: [0, -2, 0] },
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
    },
  },
];

export default function AITraderMarketplace() {
  return (
    <section id="marketplace" className="relative py-14 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-brand blur-3xl opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          title={
            <>
              Train it. Rent it.{" "}
              <span className="text-gradient">Earn from it.</span>
            </>
          }
          subtitle="Unus isn't just a wallet with an AI — it's a marketplace of them. Rolling out Q1 2027."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
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
                    animate={s.anim.animate}
                    transition={s.anim.transition}
                    className="relative"
                  >
                    <Icon className="size-5" />
                  </motion.div>
                </motion.div>
                <h3 className="font-display text-[17px] tracking-tight font-bold text-fg">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-fg-muted leading-relaxed">
                  {s.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
