"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      style={{
        scaleX,
        background: "linear-gradient(90deg, #d4d4d4, #0a0a0a 60%, #2a2a2a 90%)",
      }}
      className="fixed top-0 left-0 right-0 z-50 h-0.5 origin-left"
    />
  );
}
