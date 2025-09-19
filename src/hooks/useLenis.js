import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Make it feel quicker and more "direct"
    const lenis = new Lenis({
      duration: prefersReduced ? 0.4 : 0.7,          // was 1.1
      easing: (t) => 1 - Math.pow(1 - t, 2.5),       // faster ease-out
      smooth: !prefersReduced,
      lerp: prefersReduced ? 1 : 0.18,               // was 0.12 -> a bit snappier
      wheelMultiplier: 1,
      infinite: false,
      // Note: avoid extra options that might not exist in your Lenis version
    });

    // Ensure the browser doesn't fight Lenis
    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth scroll for anchor links
    function onClick(e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#" || href === "#!") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // small negative offset for sticky nav
        lenis.scrollTo(target, { offset: -12, duration: 0.6 });
      }
    }
    document.addEventListener("click", onClick, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
      lenis.destroy();
    };
  }, []);
}
