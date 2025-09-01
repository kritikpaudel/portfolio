import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function useLenis() {
  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      // keep default easing—feels natural with Framer Motion
      duration: prefersReduced ? 0.4 : 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smooth: !prefersReduced,
      lerp: prefersReduced ? 1 : 0.12,
      wheelMultiplier: 1,
      infinite: false,
    });

    // Hook Lenis to rAF
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth scroll for in-page anchors
    function onClick(e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (href === "#" || href === "#!") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -12 }); // slight offset for sticky nav
      }
    }
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
}
