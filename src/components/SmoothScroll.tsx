"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Skip Lenis on touch devices (native momentum is already great + Lenis
    // adds a JS interpolation layer that feels laggy on phones) and when the
    // user has prefers-reduced-motion set.
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        "ontouchstart" in window);
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    const lenis = new Lenis({
      // Snappier than the default — was 1.15s, now 0.7s. Combined with the
      // shorter scene budget in AppShowcase, one wheel notch advances the
      // scroll noticeably so each scene transition completes inside one
      // gesture instead of needing two or three.
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.6,
    });

    // Lenis owns scroll, so native anchor jumps fall through with no easing.
    // Intercept clicks on any in-page hash link and route through lenis.scrollTo
    // with a longer, more cinematic ease and an offset for the fixed 64px nav.
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#" || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: -80,
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onAnchorClick);

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
